import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Star, MapPin, Briefcase, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { creators } from "../data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function CreatorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const creator = creators.find((c) => c.id === id);

  if (!creator) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Creator not found</p>
      </div>
    );
  }

  const allMedia = [...creator.portfolioImages, ...creator.portfolioVideos];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-blue-500 rounded-full transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white text-3xl shrink-0">
            {creator.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl mb-2">{creator.name}</h1>
            <p className="text-blue-100 mb-3">{creator.subCategory}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-white text-white" />
                <span>{creator.rating}</span>
                <span className="text-blue-200">({creator.totalReviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{creator.experience} years</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Location & Price */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{creator.location}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Starting from</div>
                <div className="text-2xl text-blue-600">₹{creator.price.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">About</h2>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <p className="text-gray-700 leading-relaxed">{creator.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio */}
        <div>
          <h2 className="text-lg text-gray-900 mb-3">Portfolio</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All ({allMedia.length})
              </TabsTrigger>
              <TabsTrigger value="images" className="flex-1">
                Images ({creator.portfolioImages.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex-1">
                Videos ({creator.portfolioVideos.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {allMedia.map((url, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={url} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              {allMedia.length === 0 && (
                <p className="text-center text-gray-500 py-8">No portfolio items yet</p>
              )}
            </TabsContent>
            <TabsContent value="images" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {creator.portfolioImages.map((url, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={url} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              {creator.portfolioImages.length === 0 && (
                <p className="text-center text-gray-500 py-8">No images yet</p>
              )}
            </TabsContent>
            <TabsContent value="videos" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {creator.portfolioVideos.map((url, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={url} alt={`Video thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              {creator.portfolioVideos.length === 0 && (
                <p className="text-center text-gray-500 py-8">No videos yet</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3 max-w-2xl mx-auto">
          <Button
            variant="outline"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => alert("Chat feature coming soon!")}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate(`/booking/${creator.id}`)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
