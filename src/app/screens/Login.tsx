import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  Mail,
  Lock,
} from "lucide-react";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";


// 🔥 FIREBASE
import {
  auth,
  db,
} from "../../firebase";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";


export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // 🔥 ROLE
  const [role, setRole] =
    useState<
      "customer" | "creator"
    >("customer");


  // 🔥 LOGIN
  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      // 🔥 FIREBASE LOGIN
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;


      // 🔥 GET USER DATA
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


      // 🚫 WRONG ROLE LOGIN
      if (
        userData?.role !== role
      ) {

        alert(
          `This account is registered as ${userData?.role}`
        );

        return;
      }


      // 🔥 NAVIGATION
      if (role === "creator") {

        navigate("/dashboard");

      } else {

        navigate("/categories");

      }

    } catch (error: any) {

      console.log(error);

      alert(error.message);

    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-white flex flex-col p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8 pt-4">

        <div className="bg-blue-600 p-2 rounded-lg">

          <Camera className="w-6 h-6 text-white" />

        </div>

        <h1 className="text-2xl text-gray-900">

          Clip Crew

        </h1>

      </div>


      {/* LOGIN CARD */}
      <div className="flex-1 flex items-center justify-center">

        <Card className="w-full max-w-md border-gray-200">

          <CardHeader>

            <CardTitle>
              Welcome Back
            </CardTitle>

            <CardDescription>
              Login to continue
            </CardDescription>

          </CardHeader>

          <CardContent>

            {/* ROLE SELECTOR */}
            <div className="grid grid-cols-2 gap-2 mb-6">

              <button
                type="button"
                onClick={() =>
                  setRole(
                    "customer"
                  )
                }
                className={`p-3 rounded-lg border transition-colors ${
                  role ===
                  "customer"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >

                Customer

              </button>


              <button
                type="button"
                onClick={() =>
                  setRole(
                    "creator"
                  )
                }
                className={`p-3 rounded-lg border transition-colors ${
                  role ===
                  "creator"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >

                Creator

              </button>

            </div>


            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >

              {/* EMAIL */}
              <div className="space-y-2">

                <Label htmlFor="email">
                  Email
                </Label>

                <div className="relative">

                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="pl-10"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div className="space-y-2">

                <Label htmlFor="password">
                  Password
                </Label>

                <div className="relative">

                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="pl-10"
                    required
                  />

                </div>

              </div>


              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >

                {loading
                  ? "Logging in..."
                  : `Login as ${
                      role ===
                      "creator"
                        ? "Creator"
                        : "Customer"
                    }`}

              </Button>


              {/* REGISTER */}
              <div className="text-center text-sm text-gray-600">

                Don't have an account?{" "}

                <button
                  type="button"
                  onClick={() =>
                    navigate("/register")
                  }
                  className="text-blue-600 hover:underline"
                >

                  Register

                </button>

              </div>

            </form>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}