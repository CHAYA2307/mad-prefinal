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
  Send,
} from "lucide-react";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";


// 🔥 FIREBASE
import {
  auth,
  db,
} from "../../firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";


export default function Chat() {

  const navigate =
    useNavigate();

  const { creatorId } =
    useParams();


  const [currentUser,
    setCurrentUser] =
    useState<any>(null);

  const [creator,
    setCreator] =
    useState<any>(null);

  const [messages,
    setMessages] =
    useState<any[]>([]);

  const [message,
    setMessage] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);


  // 🔥 CHAT ID
  const chatId =
    creatorId &&
    auth.currentUser
      ? [auth.currentUser.uid, creatorId]
          .sort()
          .join("_")
      : "";


  // 🔥 AUTH + CREATOR
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) {

            navigate("/login");

            return;
          }

          setCurrentUser(user);

          try {

            const creatorDoc =
              await getDoc(
                doc(
                  db,
                  "creators",
                  creatorId!
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

            }

          } catch (error) {

            console.log(error);

          }

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, [
    creatorId,
    navigate,
  ]);


  // 🔥 REALTIME MESSAGES
  useEffect(() => {

    if (!chatId)
      return;

    const q =
      query(
        collection(
          db,
          "chats",
          chatId,
          "messages"
        ),
        orderBy(
          "createdAt",
          "asc"
        )
      );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {

          const data =
            snapshot.docs.map(
              (doc) => ({
                id:
                  doc.id,
                ...doc.data(),
              })
            );

          setMessages(data);
        }
      );

    return () =>
      unsubscribe();

  }, [chatId]);


  // 🔥 SEND MESSAGE
  const sendMessage =
    async () => {

      if (!message.trim())
        return;

      try {

        await addDoc(
          collection(
            db,
            "chats",
            chatId,
            "messages"
          ),
          {
            text: message,

            senderId:
              currentUser.uid,

            receiverId:
              creatorId,

            createdAt:
              serverTimestamp(),
          }
        );

        setMessage("");

      } catch (error) {

        console.log(error);

      }
    };


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        Loading chat...

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-4 flex items-center gap-4">

        <button
          onClick={() =>
            navigate(-1)
          }
          className="p-2 hover:bg-blue-500 rounded-full"
        >

          <ArrowLeft className="w-5 h-5" />

        </button>


        {/* PROFILE IMAGE */}
        {creator?.profileImage && (

          <img
            src={
              creator.profileImage
            }
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />

        )}


        <div>

          <h2 className="text-lg">

            {creator?.name}

          </h2>

          <p className="text-blue-100 text-sm">

            {creator?.subCategory}

          </p>

        </div>

      </div>


      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.length === 0 && (

          <div className="text-center text-gray-500 mt-10">

            Start conversation 👋

          </div>

        )}


        {messages.map(
          (msg) => {

            const isMine =
              msg.senderId ===
              currentUser.uid;

            return (

              <div
                key={msg.id}
                className={`flex ${
                  isMine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    isMine
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >

                  {msg.text}

                </div>

              </div>

            );
          }
        )}

      </div>


      {/* INPUT */}
      <div className="bg-white border-t p-4 flex gap-2">

        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              sendMessage();
            }
          }}
        />


        <Button
          onClick={
            sendMessage
          }
          className="bg-blue-600 hover:bg-blue-700"
        >

          <Send className="w-4 h-4" />

        </Button>

      </div>

    </div>
  );
}