import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Star,
  MapPin,
  Briefcase,
  MessageCircle,
} from "lucide-react";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";


// 🔥 FIREBASE
import { db } from "../../firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";


export default function CreatorProfile() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [creator, setCreator] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);


  // 🔥 FETCH CREATOR
  useEffect(() => {

    const fetchCreator =
      async () => {

        try {

          const creatorRef =
            doc(
              db,
              "creators",
              id as string
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
      };

    fetchCreator();

  }, [id]);


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">

          Loading creator...

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


  // 🔥 MERGE MEDIA
  const allMedia = [
    ...(creator.portfolioImages || []),
    ...(creator.portfolioVideos || []),
  ];


  return (
    <div className="min-h-screen bg-white pb-24">

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


        <div className="flex items-start gap-4">

      {/* PROFILE IMAGE */}
<div className="w-24 h-24 rounded-lg overflow-hidden bg-white/20 shrink-0">

  <img
    src={
      creator.profileImage?.trim()
        ? creator.profileImage
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            creator.name || "Creator"
          )}&background=2563eb&color=fff&size=200`
    }
    alt={creator.name}
    className="w-full h-full object-cover"

    onError={(e) => {
      e.currentTarget.src =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          creator.name || "Creator"
        )}&background=2563eb&color=fff&size=200`;
    }}
  />

</div>


          <div className="flex-1">

            <h1 className="text-2xl mb-2">

              {creator.name}

            </h1>

            <p className="text-blue-100 mb-3">

              {creator.subCategory}

            </p>


            <div className="flex items-center gap-4 text-sm">

              {/* RATING */}
              <div className="flex items-center gap-1">

                <Star className="w-4 h-4 fill-white text-white" />

                <span>
                  {creator.rating || 0}
                </span>

                <span className="text-blue-200">

                  (
                  {creator.totalReviews || 0}
                  )

                </span>

              </div>


              {/* EXPERIENCE */}
              <div className="flex items-center gap-1">

                <Briefcase className="w-4 h-4" />

                <span>

                  {creator.experience || 0}
                  {" "}
                  years

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* CONTENT */}
      <div className="p-6 space-y-6">

        {/* LOCATION & PRICE */}
        <Card className="border-gray-200">

          <CardContent className="p-4">

            <div className="flex items-center justify-between">

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-gray-700">

                <MapPin className="w-5 h-5 text-gray-400" />

                <span>

                  {creator.location ||
                    "Unknown"}

                </span>

              </div>


              {/* PRICE */}
              <div className="text-right">

                <div className="text-sm text-gray-600">

                  Starting from

                </div>

                <div className="text-2xl text-blue-600">

                  ₹
                  {creator.price?.toLocaleString() || 0}

                </div>

              </div>

            </div>

          </CardContent>

        </Card>


        {/* ABOUT */}
        <div>

          <h2 className="text-lg text-gray-900 mb-3">

            About

          </h2>

          <Card className="border-gray-200">

            <CardContent className="p-4">

              <p className="text-gray-700 leading-relaxed">

                {creator.about ||
                  "No description available"}

              </p>

            </CardContent>

          </Card>

        </div>


        {/* PORTFOLIO */}
        <div>

          <h2 className="text-lg text-gray-900 mb-3">

            Portfolio

          </h2>


          <Tabs
            defaultValue="all"
            className="w-full"
          >

            <TabsList className="w-full">

              <TabsTrigger
                value="all"
                className="flex-1"
              >

                All (
                {allMedia.length}
                )

              </TabsTrigger>


              <TabsTrigger
                value="images"
                className="flex-1"
              >

                Images (
                {creator.portfolioImages?.length || 0}
                )

              </TabsTrigger>


              <TabsTrigger
                value="videos"
                className="flex-1"
              >

                Videos (
                {creator.portfolioVideos?.length || 0}
                )

              </TabsTrigger>

            </TabsList>


            {/* ALL */}
            <TabsContent
              value="all"
              className="mt-4"
            >

              <div className="grid grid-cols-2 gap-3">

                {allMedia.map(
                  (
                    url: string,
                    idx: number
                  ) => (

                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >

                      <img
                        src={url}
                        alt={`Portfolio ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                    </div>
                  )
                )}

              </div>


              {allMedia.length === 0 && (

                <p className="text-center text-gray-500 py-8">

                  No portfolio items yet

                </p>

              )}

            </TabsContent>


            {/* IMAGES */}
            <TabsContent
              value="images"
              className="mt-4"
            >

              <div className="grid grid-cols-2 gap-3">

                {(creator.portfolioImages || []).map(
                  (
                    url: string,
                    idx: number
                  ) => (

                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >

                      <img
                        src={url}
                        alt={`Image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                    </div>
                  )
                )}

              </div>

            </TabsContent>


            {/* VIDEOS */}
            <TabsContent
              value="videos"
              className="mt-4"
            >

              <div className="space-y-3">

                {(creator.portfolioVideos || []).map(
                  (
                    url: string,
                    idx: number
                  ) => (

                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      className="block p-4 border rounded-lg hover:bg-gray-50"
                    >

                      {url}

                    </a>
                  )
                )}

              </div>

            </TabsContent>

          </Tabs>

        </div>

      </div>


      {/* FIXED BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">

        <div className="flex gap-3 max-w-2xl mx-auto">

          {/* CHAT */}
          <Button
            variant="outline"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() =>
              navigate(
                `/chat/${creator.id}`
              )
            }
          >

            <MessageCircle className="w-4 h-4 mr-2" />

            Chat

          </Button>


          {/* BOOK */}
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() =>
              navigate(
                `/booking/${creator.id}`
              )
            }
          >

            Book Now

          </Button>

        </div>

      </div>

    </div>
  );
}