import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Image,
  Video,
  ArrowLeft,
  Plus,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";


// 🔥 FIREBASE
import {
  auth,
  db,
} from "../../firebase";

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";


export default function PortfolioUpload() {

  const navigate =
    useNavigate();

  const [creator,
    setCreator] =
    useState<any>(null);

  const [loading,
    setLoading] =
    useState(false);


  // 🔥 URL STATES
  const [imageUrl,
    setImageUrl] =
    useState("");

  const [videoUrl,
    setVideoUrl] =
    useState("");


  // 🔥 EXISTING PORTFOLIO
  const [images,
    setImages] =
    useState<string[]>([]);

  const [videos,
    setVideos] =
    useState<string[]>([]);


  // 🔥 LOAD CREATOR
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

              const data =
                creatorDoc.data();

              setCreator(data);

              setImages(
                data.portfolioImages || []
              );

              setVideos(
                data.portfolioVideos || []
              );
            }

          } catch (error) {

            console.log(error);

          }
        }
      );

    return () =>
      unsubscribe();

  }, [navigate]);


  // 🔥 ADD IMAGE
  const addImage =
    async () => {

      if (!imageUrl)
        return;

      setLoading(true);

      try {

        const user =
          auth.currentUser;

        if (!user)
          return;

        await updateDoc(
          doc(
            db,
            "creators",
            user.uid
          ),
          {
            portfolioImages:
              arrayUnion(
                imageUrl
              ),
          }
        );

        setImages(
          (prev) => [
            ...prev,
            imageUrl,
          ]
        );

        setImageUrl("");

        alert(
          "Image added!"
        );

      } catch (error) {

        console.log(error);

      }

      setLoading(false);
    };


  // 🔥 ADD VIDEO
  const addVideo =
    async () => {

      if (!videoUrl)
        return;

      setLoading(true);

      try {

        const user =
          auth.currentUser;

        if (!user)
          return;

        await updateDoc(
          doc(
            db,
            "creators",
            user.uid
          ),
          {
            portfolioVideos:
              arrayUnion(
                videoUrl
              ),
          }
        );

        setVideos(
          (prev) => [
            ...prev,
            videoUrl,
          ]
        );

        setVideoUrl("");

        alert(
          "Video added!"
        );

      } catch (error) {

        console.log(error);

      }

      setLoading(false);
    };


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

        <h1 className="text-2xl">

          Portfolio Upload

        </h1>

        <p className="text-blue-100">

          Add your work links

        </p>

      </div>


      {/* CONTENT */}
      <div className="p-6 space-y-6">

        {/* IMAGE URL */}
        <Card>

          <CardContent className="p-6 space-y-4">

            <div className="flex items-center gap-2">

              <Image className="w-5 h-5 text-blue-600" />

              <h2 className="text-lg">

                Add Image URL

              </h2>

            </div>


            <Input
              placeholder="Paste image URL"
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(
                  e.target.value
                )
              }
            />


            <Button
              onClick={addImage}
              disabled={loading}
              className="w-full"
            >

              <Plus className="w-4 h-4 mr-2" />

              Add Image

            </Button>

          </CardContent>

        </Card>


        {/* VIDEO URL */}
        <Card>

          <CardContent className="p-6 space-y-4">

            <div className="flex items-center gap-2">

              <Video className="w-5 h-5 text-blue-600" />

              <h2 className="text-lg">

                Add Video URL

              </h2>

            </div>


            <Input
              placeholder="Paste YouTube/video URL"
              value={videoUrl}
              onChange={(e) =>
                setVideoUrl(
                  e.target.value
                )
              }
            />


            <Button
              onClick={addVideo}
              disabled={loading}
              className="w-full"
            >

              <Plus className="w-4 h-4 mr-2" />

              Add Video

            </Button>

          </CardContent>

        </Card>


        {/* IMAGES */}
        <div>

          <h2 className="text-xl mb-4">

            Uploaded Images

          </h2>

          <div className="grid grid-cols-2 gap-4">

            {images.map(
              (
                image,
                index
              ) => (

                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-full h-40 object-cover rounded-lg border"
                />

              )
            )}

          </div>

        </div>


        {/* VIDEOS */}
        <div>

          <h2 className="text-xl mb-4">

            Uploaded Videos

          </h2>

          <div className="space-y-4">

            {videos.map(
              (
                video,
                index
              ) => (

                <a
                  key={index}
                  href={video}
                  target="_blank"
                  className="block p-4 border rounded-lg hover:bg-gray-50"
                >

                  {video}

                </a>

              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
