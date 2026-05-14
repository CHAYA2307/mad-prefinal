import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Camera, Mail, Lock, User } from "lucide-react";

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

import {
  RadioGroup,
  RadioGroupItem,
} from "../components/ui/radio-group";


// 🔥 FIREBASE
import { auth, db } from "../../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      // 🔥 CREATE USER
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔥 SAVE USER DATA
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: new Date(),
      });

      // 🔥 KEEP YOUR SAME NAVIGATION
      if (role === "creator") {
        navigate("/dashboard");
      } else {
        navigate("/categories");
      }
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <div className="flex items-center gap-3 mb-8 pt-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Camera className="w-6 h-6 text-white" />
        </div>

        <h1 className="text-2xl text-gray-900">Clip Crew</h1>
      </div>

      <div className="flex-1 flex items-center justify-center pb-8">
        <Card className="w-full max-w-md border-gray-200">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>

            <CardDescription>
              Join as a customer or creator
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">

              {/* NAME */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* ROLE */}
              <div className="space-y-2">
                <Label>I am a</Label>

                <RadioGroup value={role} onValueChange={setRole}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="customer"
                      id="customer"
                    />

                    <Label
                      htmlFor="customer"
                      className="cursor-pointer"
                    >
                      Customer (Looking to hire)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="creator"
                      id="creator"
                    />

                    <Label
                      htmlFor="creator"
                      className="cursor-pointer"
                    >
                      Creator (Offering services)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>

              {/* LOGIN */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}