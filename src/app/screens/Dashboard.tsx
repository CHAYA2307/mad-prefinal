import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Camera,
  Upload,
  Calendar,
  IndianRupee,
  LogOut,
  Trash2,
  MessageCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import { Button } from "../components/ui/button";


// 🔥 FIREBASE
import {
  auth,
  db,
} from "../../firebase";

import {
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";


export default function Dashboard() {

  const navigate =
    useNavigate();

  const [creator,
    setCreator] =
    useState<any>(null);

  const [bookings,
    setBookings] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);


  // 🔥 FETCH DATA
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) {

            navigate("/login");

            return;
          }

          try {

            // 🔥 CREATOR DATA
            const creatorDoc =
              await getDoc(
                doc(
                  db,
                  "creators",
                  user.uid
                )
              );

            if (
              creatorDoc.exists()
            ) {

              setCreator({
                id:
                  creatorDoc.id,
                ...creatorDoc.data(),
              });

            } else {

              alert(
                "Only creators can access dashboard"
              );

              navigate(
                "/categories"
              );

              return;
            }


            // 🔥 BOOKINGS
            const bookingsQuery =
              query(
                collection(
                  db,
                  "bookings"
                ),
                where(
                  "creatorId",
                  "==",
                  user.uid
                )
              );

            const bookingsSnapshot =
              await getDocs(
                bookingsQuery
              );

            const bookingsData =
              bookingsSnapshot.docs.map(
                (doc) => ({
                  id: doc.id,
                  ...doc.data(),
                })
              );

            setBookings(
              bookingsData
            );

          } catch (error) {

            console.log(error);

          }

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, [navigate]);


  // 🔥 LOGOUT
  const handleLogout =
    async () => {

      await signOut(auth);

      navigate("/login");
    };


  // 🔥 DELETE ACCOUNT
  const handleDeleteAccount =
    async () => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete your account?"
        );

      if (!confirmDelete)
        return;

      try {

        const user =
          auth.currentUser;

        if (!user)
          return;


        // 🔥 DELETE USER DOC
        await deleteDoc(
          doc(
            db,
            "users",
            user.uid
          )
        );


        // 🔥 DELETE CREATOR DOC
        await deleteDoc(
          doc(
            db,
            "creators",
            user.uid
          )
        );


        // 🔥 DELETE AUTH
        await deleteUser(
          user
        );

        alert(
          "Account deleted successfully"
        );

        navigate("/login");

      } catch (
        error: any
      ) {

        console.log(error);

        alert(
          error.message
        );
      }
    };


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">

          Loading Dashboard...

        </p>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* PROFILE IMAGE */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white">

              {creator?.profileImage ? (

                <img
                  src={
                    creator.profileImage
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="w-full h-full flex items-center justify-center text-blue-600 text-xl font-bold">

                  {creator?.name?.charAt(
                    0
                  )}

                </div>

              )}

            </div>


            <div>

              <h1 className="text-2xl">

                {creator?.name}

              </h1>

              <p className="text-blue-100">

                {
                  creator?.subCategory
                }

              </p>

            </div>

          </div>


          <button
            onClick={
              handleLogout
            }
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >

            <LogOut className="w-5 h-5" />

          </button>

        </div>

      </div>


      {/* CONTENT */}
      <div className="p-6 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">

          <Card>

            <CardContent className="p-4">

              <div className="flex items-center gap-3">

                <Calendar className="w-8 h-8 text-blue-600" />

                <div>

                  <p className="text-gray-500 text-sm">

                    Total Bookings

                  </p>

                  <h2 className="text-2xl">

                    {
                      bookings.length
                    }

                  </h2>

                </div>

              </div>

            </CardContent>

          </Card>


          <Card>

            <CardContent className="p-4">

              <div className="flex items-center gap-3">

                <IndianRupee className="w-8 h-8 text-green-600" />

                <div>

                  <p className="text-gray-500 text-sm">

                    Price

                  </p>

                  <h2 className="text-2xl">

                    ₹
                    {
                      creator?.price
                    }

                  </h2>

                </div>

              </div>

            </CardContent>

          </Card>

        </div>


        {/* ACTIONS */}
        <Card>

          <CardContent className="p-6">

            <h2 className="text-xl mb-4">

              Quick Actions

            </h2>

            <div className="grid grid-cols-3 gap-4">

              {/* PORTFOLIO */}
              <button
                onClick={() =>
                  navigate(
                    "/portfolio-upload"
                  )
                }
                className="flex flex-col items-center gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >

                <Upload className="w-6 h-6 text-blue-600" />

                <span>

                  Portfolio

                </span>

              </button>


              {/* PROFILE */}
              <button
                onClick={() =>
                  navigate(
                    `/creator/${creator.id}`
                  )
                }
                className="flex flex-col items-center gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >

                <Camera className="w-6 h-6 text-blue-600" />

                <span>

                  View Profile

                </span>

              </button>

              {/* MESSAGES */}
<button
  onClick={() =>
    navigate(
      `/chat/${creator.id}`
    )
  }
  className="flex flex-col items-center gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
>

  <MessageCircle className="w-6 h-6 text-green-600" />

  <span>
    Messages
  </span>

</button>

            </div>

          </CardContent>

        </Card>


        {/* BOOKINGS */}
        <Card>

          <CardContent className="p-6">

            <h2 className="text-xl mb-4">

              Recent Bookings

            </h2>


            {bookings.length === 0 ? (

              <p className="text-gray-500">

                No bookings yet

              </p>

            ) : (

              <div className="space-y-4">

                {bookings.map(
                  (booking) => (

                    <div
                      key={
                        booking.id
                      }
                      className="border rounded-xl p-4"
                    >

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="font-medium">

                            {
                              booking.customerName
                            }

                          </h3>

                          <p className="text-sm text-gray-500">

                            {
                              booking.date
                            }{" "}
                            at{" "}
                            {
                              booking.time
                            }

                          </p>

                        </div>

                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                          {
                            booking.status
                          }

                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </CardContent>

        </Card>


      {/* DELETE ACCOUNT */}
<button
  onClick={
    handleDeleteAccount
  }
  className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
>

  <Trash2 className="w-4 h-4" />

  Delete Account

</button>

      </div>

    </div>
  );
}