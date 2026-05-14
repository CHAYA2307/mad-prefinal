import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  Sparkles,
  Palette,
  ChevronRight,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../components/ui/card";


// 🔥 FIREBASE
import { db } from "../../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";


// 🔥 ICON MAP
const iconMap: Record<string, any> = {
  Camera,
  Sparkles,
  Palette,
};


export default function Categories() {

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);


  // 🔥 FETCH CATEGORIES
  useEffect(() => {

    const fetchCategories = async () => {

      try {

        // 🔥 FETCH ALL CREATORS
        const snapshot = await getDocs(
          collection(db, "creators")
        );

        const creators = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );


        // 🔥 BUILD DYNAMIC CATEGORIES
        const grouped: any = {};

        creators.forEach((creator: any) => {

          if (!grouped[creator.category]) {

            grouped[creator.category] = {
              id: creator.category,
              name: creator.category,
              icon: "Camera",
              subcategories: [],
            };
          }

          if (
            !grouped[
              creator.category
            ].subcategories.includes(
              creator.subCategory
            )
          ) {

            grouped[
              creator.category
            ].subcategories.push(
              creator.subCategory
            );
          }
        });


        setCategories(
          Object.values(grouped)
        );

      } catch (error) {

        console.log(error);

      }

      setLoading(false);
    };

    fetchCategories();

  }, []);


  // 🔥 NAVIGATION
  const handleCategoryClick = (
    categoryId: string,
    subcategory: string
  ) => {

    navigate(
      `/creators/${categoryId}/${encodeURIComponent(
        subcategory
      )}`
    );
  };


  // 🔥 LOADING
  if (loading) {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center">

        <p className="text-gray-600">
          Loading categories...
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
              Clip Crew
            </h1>

          </div>


          {/* DASHBOARD */}
          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="p-2 hover:bg-blue-500 rounded-full transition-colors"
          >

            <User className="w-6 h-6" />

          </button>

        </div>


        <h2 className="text-2xl mb-1">

          Discover Creators

        </h2>

        <p className="text-blue-100">

          Choose a service category

        </p>

      </div>


      {/* CATEGORIES */}
      <div className="p-6 -mt-4">

        <div className="space-y-6">

          {categories.length === 0 ? (

            <Card className="border-gray-200">

              <CardContent className="p-8 text-center">

                <p className="text-gray-600">

                  No categories found

                </p>

              </CardContent>

            </Card>

          ) : (

            categories.map((category: any) => {

              const Icon =
                iconMap[category.icon] ||
                Camera;

              return (

                <Card
                  key={category.id}
                  className="border-gray-200 shadow-sm"
                >

                  <CardContent className="p-4">

                    {/* CATEGORY HEADER */}
                    <div className="flex items-center gap-3 mb-4">

                      <div className="bg-blue-100 p-3 rounded-lg">

                        <Icon className="w-6 h-6 text-blue-600" />

                      </div>


                      <h3 className="text-lg text-gray-900">

                        {category.name}

                      </h3>

                    </div>


                    {/* SUBCATEGORIES */}
                    <div className="space-y-2">

                      {category.subcategories.map(
                        (subcategory: string) => (

                          <button
                            key={subcategory}
                            onClick={() =>
                              handleCategoryClick(
                                category.id,
                                subcategory
                              )
                            }
                            className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                          >

                            <span className="text-gray-700">

                              {subcategory}

                            </span>


                            <ChevronRight className="w-5 h-5 text-gray-400" />

                          </button>
                        )
                      )}

                    </div>

                  </CardContent>

                </Card>
              );
            })
          )}

        </div>

      </div>

    </div>
  );
}