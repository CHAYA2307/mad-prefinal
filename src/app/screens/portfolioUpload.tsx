import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Video,
} from "lucide-react";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
} from "../components/ui/card";


// 🔥 FIREBASE
import {
  auth,
  db,
  storage,
} from "../../firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

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

  const navigate = useNavigate();

  const [creator, setCreator] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);


  // 🔥 FETCH CREATOR
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

            const creatorRef =
              doc(
                db,
                "creators",
                user.uid
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

            }

          } catch (error) {

            console.log(error);

          }

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [navigate]);


  // 🔥 IMAGE UPLOAD
  const handleImageUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0];

      if (!file || !creator)
        return;

      setUploading(true);

      try {

        // 🔥 STORAGE PATH
        const storageRef =
          ref(
            storage,
            `portfolio/images/${Date.now()}-${file.name}`
          );

        // 🔥 UPLOAD FILE
        await uploadBytes(
          storageRef,
          file
        );

        // 🔥 GET URL
        const downloadURL =
          await getDownloadURL(
            storageRef
          );

        // 🔥 SAVE IN FIRESTORE
        await updateDoc(
          doc(
            db,
            "creators",
            creator.id
          ),
          {
            portfolioImages:
              arrayUnion(
                downloadURL
              ),
          }
        );

        // 🔥 UPDATE LOCAL STATE
        setCreator(
          (prev: any) => ({
            ...prev,
            portfolioImages: [
              ...(prev.portfolioImages || []),
              downloadURL,
            ],
          })
        );

        alert(
          "Image uploaded successfully!"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Image upload failed"
        );

      }

      setUploading(false);
    };


  // 🔥 VIDEO UPLOAD
  const handleVideoUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0];

      if (!file || !creator)
        return;

      setUploading(true);

      try {

        // 🔥 STORAGE PATH
        const storageRef =
          ref(
            storage,
            `portfolio/videos/${Date.now()}-${file.name}`
          );

        // 🔥 UPLOAD FILE
        await uploadBytes(
          storageRef,
          file
        );

        // 🔥 GET URL
        const downloadURL =
          await getDownloadURL(
            storageRef
          );

        // 🔥 SAVE IN FIRESTORE
        await updateDoc(
          doc(
            db,
            "creators",
            creator.id
          ),
          {
            portfolioVideos:
              arrayUnion(
                downloadURL
              ),
          }
        );

        // 🔥 UPDATE LOCAL STATE
        setCreator(
          (prev: any) => ({
            ...prev,
            portfolioVideos: [
              ...(prev.portfolioVideos || []),
              downloadURL,
            ],
          })
        );

        alert(
          "Video uploaded successfully!"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Video upload failed"
        );

      }

      setUploading(false);
    };


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">

          Loading portfolio...

        </p>

      </div>
    );
  }


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

          Portfolio Upload

        </h1>

        <p className="text-blue-100">

          Upload your images and videos

        </p>

      </div>


      {/* CONTENT */}
      <div className="p-6 space-y-6">

        {/* IMAGE UPLOAD */}
        <Card className="border-gray-200">

          <CardContent className="p-6">

            <div className="flex items-center gap-2 mb-4">

              <ImageIcon className="w-5 h-5 text-blue-600" />

              <h2 className="text-lg text-gray-900">

                Upload Images

              </h2>

            </div>


            <label className="block">

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={
                  handleImageUpload
                }
              />

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">

                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />

                <p className="text-gray-700">

                  Click to upload image

                </p>

              </div>

            </label>

          </CardContent>

        </Card>


        {/* VIDEO UPLOAD */}
        <Card className="border-gray-200">

          <CardContent className="p-6">

            <div className="flex items-center gap-2 mb-4">

              <Video className="w-5 h-5 text-blue-600" />

              <h2 className="text-lg text-gray-900">

                Upload Videos

              </h2>

            </div>


            <label className="block">

              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={
                  handleVideoUpload
                }
              />

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">

                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />

                <p className="text-gray-700">

                  Click to upload video

                </p>

              </div>

            </label>

          </CardContent>

        </Card>


        {/* IMAGE PREVIEW */}
        <div>

          <h2 className="text-lg text-gray-900 mb-4">

            Uploaded Images

          </h2>


          <div className="grid grid-cols-2 gap-4">

            {(creator?.portfolioImages || []).map(
              (
                url: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="rounded-lg overflow-hidden bg-gray-100 aspect-square"
                >

                  <img
                    src={url}
                    alt={`Portfolio ${index}`}
                    className="w-full h-full object-cover"
                  />

                </div>
              )
            )}

          </div>

        </div>


        {/* VIDEO PREVIEW */}
        <div>

          <h2 className="text-lg text-gray-900 mb-4">

            Uploaded Videos

          </h2>


          <div className="grid grid-cols-1 gap-4">

            {(creator?.portfolioVideos || []).map(
              (
                url: string,
                index: number
              ) => (

                <video
                  key={index}
                  src={url}
                  controls
                  className="rounded-lg w-full h-64 bg-black"
                />

              )
            )}

          </div>

        </div>


        {/* BUTTON */}
        <Button
          onClick={() =>
            navigate("/dashboard")
          }
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >

          {uploading
            ? "Uploading..."
            : "Back to Dashboard"}

        </Button>

      </div>

    </div>
  );
}