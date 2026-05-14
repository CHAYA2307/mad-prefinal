import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  User,
  Calendar,
  Upload,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import { Button } from "../components/ui/button";

import { Card, CardContent } from "../components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import { Badge } from "../components/ui/badge";


// 🔥 FIREBASE
import { auth, db } from "../../firebase";

import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


export default function Dashboard() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState<any[]>([]);

  const [creatorProfile, setCreatorProfile] =
    useState<any>(null);

  const [loading, setLoading] = useState(true);


  // 🔥 REALTIME FIREBASE DATA
  useEffect(() => {

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (user) => {

        if (!user) {
          navigate("/login");
          return;
        }

        // 🔥 CREATOR PROFILE
        setCreatorProfile({
          name: user.displayName || "Creator",
        });

        // 🔥 BOOKINGS QUERY
        const q = query(
          collection(db, "bookings"),
          where("creatorId", "==", user.uid)
        );

        const unsubscribeBookings =
          onSnapshot(q, (snapshot) => {

            const bookingData = snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

            setBookings(bookingData);

            setLoading(false);
          });

        return () => unsubscribeBookings();
      }
    );

    return () => unsubscribeAuth();

  }, [navigate]);


  // 🔥 UPDATE BOOKING STATUS
  const updateBookingStatus = async (
    bookingId: string,
    status: string
  ) => {

    try {

      await updateDoc(
        doc(db, "bookings", bookingId),
        {
          status,
        }
      );

    } catch (error) {
      console.log(error);
    }
  };


  // 🔥 FILTER BOOKINGS
  const pendingBookings = bookings.filter(
    (b) => b.status === "pending"
  );

  const upcomingBookings = bookings.filter(
    (b) => b.status === "accepted"
  );

  const completedBookings = bookings.filter(
    (b) => b.status === "completed"
  );


  // 🔥 STATUS ICON
  const getStatusIcon = (status: string) => {

    switch (status) {

      case "pending":
        return <Clock className="w-4 h-4" />;

      case "accepted":
        return <CheckCircle className="w-4 h-4" />;

      case "completed":
        return <CheckCircle className="w-4 h-4" />;

      case "rejected":
        return <XCircle className="w-4 h-4" />;

      default:
        return null;
    }
  };


  // 🔥 STATUS COLORS
  const getStatusColor = (status: string) => {

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


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">
          Loading Dashboard...
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
              Creator Dashboard
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


        {/* PROFILE */}
        <div className="flex items-center gap-4">

          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">

            {creatorProfile?.name?.charAt(0)}

          </div>

          <div>

            <h2 className="text-2xl mb-1">
              {creatorProfile?.name}
            </h2>

            <p className="text-blue-100">
              Creator
            </p>

          </div>

        </div>

      </div>


      <div className="p-6 -mt-4">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mb-6">

          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">

              <div className="text-2xl text-blue-600 mb-1">
                {pendingBookings.length}
              </div>

              <div className="text-xs text-gray-600">
                Pending
              </div>

            </CardContent>
          </Card>


          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">

              <div className="text-2xl text-green-600 mb-1">
                {upcomingBookings.length}
              </div>

              <div className="text-xs text-gray-600">
                Upcoming
              </div>

            </CardContent>
          </Card>


          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">

              <div className="text-2xl text-gray-900 mb-1">
                {completedBookings.length}
              </div>

              <div className="text-xs text-gray-600">
                Completed
              </div>

            </CardContent>
          </Card>

        </div>


        {/* QUICK ACTIONS */}
        <Card className="border-gray-200 mb-6">

          <CardContent className="p-4">

            <h3 className="text-sm text-gray-600 mb-3">
              Quick Actions
            </h3>

            <div className="grid grid-cols-3 gap-2">

              <button className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">

                <User className="w-5 h-5 text-blue-600" />

                <span className="text-xs text-gray-700">
                  Edit Profile
                </span>

              </button>


              <button className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">

                <Upload className="w-5 h-5 text-blue-600" />

                <span className="text-xs text-gray-700">
                  Add Portfolio
                </span>

              </button>


              <button className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">

                <Settings className="w-5 h-5 text-blue-600" />

                <span className="text-xs text-gray-700">
                  Settings
                </span>

              </button>

            </div>

          </CardContent>

        </Card>


        {/* BOOKINGS */}
        <Tabs defaultValue="pending" className="w-full">

          <TabsList className="w-full grid grid-cols-3">

            <TabsTrigger value="pending">
              Pending ({pendingBookings.length})
            </TabsTrigger>

            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>

            <TabsTrigger value="completed">
              Completed ({completedBookings.length})
            </TabsTrigger>

          </TabsList>


          {/* PENDING */}
          <TabsContent
            value="pending"
            className="mt-4 space-y-3"
          >

            {pendingBookings.length === 0 ? (

              <Card className="border-gray-200">
                <CardContent className="p-8 text-center text-gray-500">
                  No pending bookings
                </CardContent>
              </Card>

            ) : (

              pendingBookings.map((booking) => (

                <Card
                  key={booking.id}
                  className="border-gray-200"
                >

                  <CardContent className="p-4">

                    <div className="flex items-start justify-between mb-3">

                      <div>

                        <h4 className="text-gray-900 mb-1">
                          {booking.customerName}
                        </h4>

                        <p className="text-sm text-gray-600">
                          {booking.serviceType}
                        </p>

                      </div>


                      <Badge className={getStatusColor(booking.status)}>

                        <span className="flex items-center gap-1">

                          {getStatusIcon(booking.status)}

                          {booking.status}

                        </span>

                      </Badge>

                    </div>


                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">

                      <Calendar className="w-4 h-4" />

                      <span>{booking.date}</span>

                      <span className="text-gray-300">
                        •
                      </span>

                      <span>{booking.time}</span>

                    </div>


                    <div className="flex gap-2">

                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "accepted"
                          )
                        }
                      >
                        Accept
                      </Button>


                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </Button>

                    </div>

                  </CardContent>

                </Card>

              ))
            )}

          </TabsContent>

        </Tabs>

      </div>

    </div>
  );
}