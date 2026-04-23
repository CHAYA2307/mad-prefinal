import { useNavigate } from "react-router";
import { Camera, User, LogOut, Camera as CameraIcon, Video, Film, Edit, Palette, Users, Mic, Music, Briefcase, Heart } from "lucide-react";

const categories = [
  {
    name: "Media",
    icon: CameraIcon,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    subcategories: [
      { name: "Photographer", icon: Camera },
      { name: "Videographer", icon: Video },
      { name: "Reel Creator", icon: Film },
      { name: "Video Editor", icon: Edit },
    ],
  },
  {
    name: "Event",
    icon: Palette,
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    subcategories: [
      { name: "Makeup Artist", icon: Palette },
      { name: "Stylist", icon: Users },
      { name: "Anchor", icon: Mic },
    ],
  },
  {
    name: "Entertainment",
    icon: Music,
    color: "bg-pink-50",
    iconColor: "text-pink-600",
    subcategories: [
      { name: "DJ", icon: Music },
      { name: "Band", icon: Music },
      { name: "Dancer", icon: Heart },
    ],
  },
  {
    name: "Professional",
    icon: Briefcase,
    color: "bg-green-50",
    iconColor: "text-green-600",
    subcategories: [
      { name: "Event Planner", icon: Briefcase },
      { name: "Decorator", icon: Palette },
    ],
  },
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-xl">Clip Crew</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/home")}
                className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-2xl mb-2">Discover Creators</h1>
            <p className="text-blue-100">Choose a service category</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.name} className="bg-white rounded-2xl shadow-sm p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${category.color} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${category.iconColor}`} />
                  </div>
                  <h2 className="text-lg text-gray-800">{category.name}</h2>
                </div>

                {/* Subcategories */}
                <div className="space-y-2">
                  {category.subcategories.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <button
                        key={sub.name}
                        onClick={() => navigate(`/creators/${sub.name.toLowerCase().replace(" ", "-")}`)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <SubIcon className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700">{sub.name}</span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
