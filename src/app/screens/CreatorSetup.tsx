import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  Briefcase,
  IndianRupee,
  FileText,
  User,
  MapPin,
  Image,
} from "lucide-react";

import { auth, db } from "../../firebase";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";

import { Button } from "../components/ui/button";

import { Label } from "../components/ui/label";


export default function CreatorSetup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [subCategory, setSubCategory] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [about, setAbout] =
    useState("");

  const [profileImage,
    setProfileImage] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // 🔥 SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const user = auth.currentUser;

      if (!user) {

        alert("User not found");

        return;
      }

      // 🔥 SAVE CREATOR PROFILE
      await setDoc(
        doc(db, "creators", user.uid),
        {
          uid: user.uid,

          name,

          email: user.email,

          category,

          subCategory,

          experience:
            Number(experience),

          price:
            Number(price),

          location,

          about,

          profileImage,

          rating: 4.8,

          totalReviews: 120,

          portfolioImages: [],

          portfolioVideos: [],

          createdAt:
            new Date(),
        }
      );

      alert(
        "Creator Profile Created!"
      );

      navigate("/dashboard");

    } catch (error: any) {

      console.log(error);

      alert(error.message);

    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-white p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8 pt-4">

        <div className="bg-blue-600 p-2 rounded-lg">

          <Camera className="w-6 h-6 text-white" />

        </div>

        <h1 className="text-2xl text-gray-900">

          Creator Setup

        </h1>

      </div>


      {/* CARD */}
      <Card className="max-w-md mx-auto">

        <CardHeader>

          <CardTitle>

            Complete Your Profile

          </CardTitle>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* NAME */}
            <div className="space-y-2">

              <Label>
                Full Name
              </Label>

              <div className="relative">

                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                <Input
                  placeholder="Rahul Photography"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="pl-10"
                  required
                />

              </div>

            </div>


            {/* CATEGORY */}
            <div className="space-y-2">

              <Label>
                Category
              </Label>

              <div className="relative">

                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                <Input
                  placeholder="Media"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="pl-10"
                  required
                />

              </div>

            </div>


            {/* SUBCATEGORY */}
            <div className="space-y-2">

              <Label>
                Sub Category
              </Label>

              <Input
                placeholder="Photographer"
                value={subCategory}
                onChange={(e) =>
                  setSubCategory(
                    e.target.value
                  )
                }
                required
              />

            </div>


            {/* EXPERIENCE */}
            <div className="space-y-2">

              <Label>
                Experience
              </Label>

              <Input
                type="number"
                placeholder="5"
                value={experience}
                onChange={(e) =>
                  setExperience(
                    e.target.value
                  )
                }
                required
              />

            </div>


            {/* PRICE */}
            <div className="space-y-2">

              <Label>
                Pricing
              </Label>

              <div className="relative">

                <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                <Input
                  type="number"
                  placeholder="5000"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
                  className="pl-10"
                  required
                />

              </div>

            </div>


            {/* LOCATION */}
            <div className="space-y-2">

              <Label>
                Location
              </Label>

              <div className="relative">

                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                <Input
                  placeholder="Bangalore"
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="pl-10"
                  required
                />

              </div>

            </div>


            {/* PROFILE IMAGE URL */}
            <div className="space-y-2">

              <Label>
                Profile Image URL
              </Label>

              <div className="relative">

                <Image className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                <Input
                  placeholder="https://example.com/image.jpg"
                  value={profileImage}
                  onChange={(e) =>
                    setProfileImage(
                      e.target.value
                    )
                  }
                  className="pl-10"
                  required
                />

              </div>

            </div>


            {/* ABOUT */}
            <div className="space-y-2">

              <Label>
                About
              </Label>

              <div className="relative">

                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

                <textarea
                  placeholder="Tell about yourself..."
                  value={about}
                  onChange={(e) =>
                    setAbout(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-md p-3 pl-10"
                  rows={4}
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
                ? "Saving..."
                : "Create Profile"}

            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}