import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MessageSquare,
} from "lucide-react";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import { Label } from "../components/ui/label";

import { Textarea } from "../components/ui/textarea";

import { Calendar } from "../components/ui/calendar";


// 🔥 FIREBASE
import {
  auth,
  db,
} from "../../firebase";

import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";


export default function Booking() {

  const navigate = useNavigate();

  const { creatorId } = useParams();

  const [creator, setCreator] =
    useState<any>(null);

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  // 🔥 BOOKING DATA
  const [date, setDate] =
    useState<Date | undefined>(undefined);

  const [time, setTime] =
    useState("10:00");

  const [message, setMessage] =
    useState("");

  // 🔥 FETCH DATA
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          // 🚫 NOT LOGGED IN
          if (!user) {

            navigate("/login");

            return;
          }

          setCurrentUser(user);

          try {

            // 🔥 GET USER ROLE
            const userDoc =
              await getDoc(
                doc(
                  db,
                  "users",
                  user.uid
                )
              );

            const userData =
              userDoc.data();

            // 🚫 BLOCK CREATORS
            if (
              userData?.role ===
              "creator"
            ) {

              alert(
                "Creators cannot book services"
              );

              navigate("/dashboard");

              return;
            }

            // 🔥 FETCH CREATOR
            const creatorRef = doc(
              db,
              "creators",
              creatorId as string
            );

            const creatorSnap =
              await getDoc(
                creatorRef
              );

            if (
              creatorSnap.exists()
            ) {

              setCreator({
                id:
                  creatorSnap.id,
                ...creatorSnap.data(),
              });

            } else {

              setCreator(null);

            }

          } catch (error) {

            console.log(error);

          }

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [creatorId, navigate]);

  // 🔥 BOOKING FUNCTION
  const handleBooking =
    async () => {

      if (!date) {

        alert(
          "Please select date"
        );

        return;
      }

      if (!creator) return;

      setBookingLoading(true);

      try {

        // 🔥 FETCH CUSTOMER NAME
        const userDoc =
          await getDoc(
            doc(
              db,
              "users",
              currentUser.uid
            )
          );

        const userData =
          userDoc.data();

        // 🔥 SAVE BOOKING
        await addDoc(
          collection(
            db,
            "bookings"
          ),
          {
            customerId:
              currentUser.uid,

            customerName:
              userData?.name ||
              "Customer",

            customerEmail:
              currentUser.email,

            creatorId:
              creator.id,

            creatorName:
              creator.name,

            serviceType:
              creator.subCategory,

            date:
              date.toLocaleDateString(),

            time,

            message,

            amount:
              creator.price,

            status:
              "pending",

            createdAt:
              serverTimestamp(),
          }
        );

        alert(
          "Booking request sent successfully!"
        );

        navigate(
          "/categories"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Booking failed"
        );

      }

      setBookingLoading(false);
    };

  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">

          Loading booking...

        </p>

      </div>
    );
  }

  // 🔥 NOT FOUND
  if (!creator) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">

          Creator not found

        </p>

      </div>
    );
  }

  // 🔥 TIME SLOTS
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-6">

        <button
          onClick={() =>
            navigate(-1)
          }
          className="p-2 hover:bg-blue-500 rounded-full transition-colors mb-4"
        >

          <ArrowLeft className="w-5 h-5" />

        </button>

        <h1 className="text-2xl mb-1">

          Book Service

        </h1>

        <p className="text-blue-100">

          Schedule with{" "}
          {creator.name}

        </p>

      </div>

      <div className="p-6 -mt-4">

        {/* CREATOR INFO */}
        <Card className="border-gray-200 shadow-sm mb-6">

          <CardContent className="p-4">

            <div className="flex gap-4">

              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl shrink-0">

                {creator.name?.charAt(0)}

              </div>

              <div className="flex-1">

                <h3 className="text-lg text-gray-900">

                  {creator.name}

                </h3>

                <p className="text-gray-600 text-sm mb-2">

                  {creator.subCategory}

                </p>

                <p className="text-xl text-blue-600">

                  ₹
                  {creator.price?.toLocaleString()}

                </p>

              </div>

            </div>

          </CardContent>

        </Card>

        {/* DATE */}
        <Card className="border-gray-200 mb-6">

          <CardContent className="p-6">

            <div className="flex items-center gap-2 mb-4">

              <CalendarIcon className="w-5 h-5 text-blue-600" />

              <h3 className="text-lg text-gray-900">

                Select Date

              </h3>

            </div>

            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => {

                const today =
                  new Date();

                today.setHours(
                  0,
                  0,
                  0,
                  0
                );

                return date < today;
              }}
              initialFocus
              className="rounded-md border border-gray-200 mx-auto"
            />

          </CardContent>

        </Card>

        {/* TIME */}
        <Card className="border-gray-200 mb-6">

          <CardContent className="p-6">

            <div className="flex items-center gap-2 mb-4">

              <Clock className="w-5 h-5 text-blue-600" />

              <h3 className="text-lg text-gray-900">

                Select Time

              </h3>

            </div>

            <div className="grid grid-cols-3 gap-2">

              {timeSlots.map(
                (slot) => (

                  <button
                    key={slot}
                    onClick={() =>
                      setTime(slot)
                    }
                    className={`p-3 rounded-lg border transition-colors ${
                      time === slot
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                    }`}
                  >

                    {slot}

                  </button>
                )
              )}

            </div>

          </CardContent>

        </Card>

        {/* MESSAGE */}
        <Card className="border-gray-200 mb-6">

          <CardContent className="p-6">

            <div className="flex items-center gap-2 mb-4">

              <MessageSquare className="w-5 h-5 text-blue-600" />

              <Label
                htmlFor="message"
                className="text-lg text-gray-900"
              >

                Additional Message
                (Optional)

              </Label>

            </div>

            <Textarea
              id="message"
              placeholder="Tell the creator about your requirements..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              className="min-h-32"
            />

          </CardContent>

        </Card>

        {/* SUMMARY */}
        <Card className="border-gray-200 mb-6">

          <CardContent className="p-6">

            <h3 className="text-lg text-gray-900 mb-4">

              Booking Summary

            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Service

                </span>

                <span className="text-gray-900">

                  {creator.subCategory}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Date

                </span>

                <span className="text-gray-900">

                  {date
                    ? date.toLocaleDateString()
                    : "Not selected"}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Time

                </span>

                <span className="text-gray-900">

                  {time}

                </span>

              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between">

                <span className="text-gray-900">

                  Total Amount

                </span>

                <span className="text-xl text-blue-600">

                  ₹
                  {creator.price?.toLocaleString()}

                </span>

              </div>

            </div>

          </CardContent>

        </Card>

        {/* BUTTON */}
        <Button
          onClick={handleBooking}
          disabled={bookingLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
        >

          {bookingLoading
            ? "Booking..."
            : "Confirm Booking"}

        </Button>

      </div>

    </div>
  );
}