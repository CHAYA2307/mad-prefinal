import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import {
  Badge,
} from "../components/ui/badge";

import { Button } from "../components/ui/button";


// 🔥 FIREBASE
import {
  auth,
  db,
} from "../../firebase";

import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";


export default function CustomerDashboard() {

  const navigate = useNavigate();

  const [bookings, setBookings] =
    useState<any[]>([]);

  const [userData, setUserData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);


  // 🔥 FETCH BOOKINGS
  useEffect(() => {

    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) {

            navigate("/login");

            return;
          }

          try {

            // 🔥 GET USER
            const userDoc =
              await getDoc(
                doc(
                  db,
                  "users",
                  user.uid
                )
              );

            const userInfo =
              userDoc.data();

            setUserData(userInfo);

            // 🚫 BLOCK CREATORS
            if (
              userInfo?.role ===
              "creator"
            ) {

              navigate("/dashboard");

              return;
            }

            // 🔥 BOOKINGS QUERY
            const q = query(
              collection(
                db,
                "bookings"
              ),
              where(
                "customerId",
                "==",
                user.uid
              )
            );

            const unsubscribeBookings =
              onSnapshot(
                q,
                (snapshot) => {

                  const bookingData =
                    snapshot.docs.map(
                      (doc) => ({
                        id: doc.id,
                        ...doc.data(),
                      })
                    );

                  setBookings(
                    bookingData
                  );

                  setLoading(false);
                }
              );

            return () =>
              unsubscribeBookings();

          } catch (error) {

            console.log(error);

          }
        }
      );

    return () =>
      unsubscribeAuth();

  }, [navigate]);


  // 🔥 STATUS COLOR
  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "accepted":
        return "bg-green-100 text-green-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  // 🔥 STATUS ICON
  const getStatusIcon = (
    status: string
  ) => {

    switch (status) {

      case "pending":
        return (
          <Clock className="w-4 h-4" />
        );

      case "accepted":
        return (
          <CheckCircle className="w-4 h-4" />
        );

      case "completed":
        return (
          <CheckCircle className="w-4 h-4" />
        );

      case "rejected":
        return (
          <XCircle className="w-4 h-4" />
        );

      default:
        return null;
    }
  };


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">

          Loading bookings...

        </p>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-6 pb-8">

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <Camera className="w-6 h-6" />

            <h1 className="text-xl">

              Customer Dashboard

            </h1>

          </div>


          {/* LOGOUT */}
          <button
            onClick={async () => {

              await signOut(auth);

              navigate("/login");

            }}
            className="p-2 hover:bg-blue-500 rounded-full transition-colors"
          >

            <LogOut className="w-5 h-5" />

          </button>

        </div>


        {/* USER */}
        <div>

          <h2 className="text-2xl mb-1">

            {userData?.name}

          </h2>

          <p className="text-blue-100">

            Your bookings & services

          </p>

        </div>

      </div>


      {/* CONTENT */}
      <div className="p-6 -mt-4 space-y-4">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3">

          <Card>

            <CardContent className="p-4 text-center">

              <div className="text-2xl text-yellow-600 mb-1">

                {
                  bookings.filter(
                    (b) =>
                      b.status ===
                      "pending"
                  ).length
                }

              </div>

              <div className="text-xs text-gray-600">

                Pending

              </div>

            </CardContent>

          </Card>


          <Card>

            <CardContent className="p-4 text-center">

              <div className="text-2xl text-green-600 mb-1">

                {
                  bookings.filter(
                    (b) =>
                      b.status ===
                      "accepted"
                  ).length
                }

              </div>

              <div className="text-xs text-gray-600">

                Accepted

              </div>

            </CardContent>

          </Card>


          <Card>

            <CardContent className="p-4 text-center">

              <div className="text-2xl text-blue-600 mb-1">

                {
                  bookings.filter(
                    (b) =>
                      b.status ===
                      "completed"
                  ).length
                }

              </div>

              <div className="text-xs text-gray-600">

                Completed

              </div>

            </CardContent>

          </Card>

        </div>


        {/* BOOKINGS */}
        <div className="space-y-4">

          {bookings.length === 0 ? (

            <Card>

              <CardContent className="p-8 text-center">

                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />

                <p className="text-gray-500">

                  No bookings yet

                </p>

              </CardContent>

            </Card>

          ) : (

            bookings.map((booking) => (

              <Card
                key={booking.id}
                className="border-gray-200"
              >

                <CardContent className="p-4">

                  <div className="flex justify-between items-start mb-3">

                    <div>

                      <h3 className="text-lg text-gray-900">

                        {booking.creatorName}

                      </h3>

                      <p className="text-gray-600 text-sm">

                        {booking.serviceType}

                      </p>

                    </div>


                    <Badge
                      className={`flex items-center gap-1 ${getStatusColor(
                        booking.status
                      )}`}
                    >

                      {getStatusIcon(
                        booking.status
                      )}

                      {booking.status}

                    </Badge>

                  </div>


                  <div className="space-y-2 text-sm text-gray-700">

                    <div className="flex items-center gap-2">

                      <Calendar className="w-4 h-4 text-gray-400" />

                      <span>
                        {booking.date}
                      </span>

                    </div>


                    <div className="flex items-center gap-2">

                      <Clock className="w-4 h-4 text-gray-400" />

                      <span>
                        {booking.time}
                      </span>

                    </div>


                    <div className="pt-2 border-t border-gray-100 flex justify-between">

                      <span className="text-gray-600">

                        Amount

                      </span>

                      <span className="text-blue-600 text-lg">

                        ₹
                        {booking.amount?.toLocaleString()}

                      </span>

                    </div>

                  </div>

                </CardContent>

              </Card>
            ))
          )}

        </div>

      </div>

    </div>
  );
}