import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Star, MapPin, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { creators } from "../data/mockData";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";

export default function CreatorList() {
  const navigate = useNavigate();
  const { category, subcategory } = useParams();
  const decodedSubcategory = subcategory ? decodeURIComponent(subcategory) : "";

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);

  const filteredCreators = useMemo(() => {
    return creators.filter(
      (creator) =>
        creator.category === category &&
        creator.subCategory === decodedSubcategory &&
        creator.price >= priceRange[0] &&
        creator.price <= priceRange[1] &&
        creator.rating >= minRating
    );
  }, [category, decodedSubcategory, priceRange, minRating]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/categories")}
            className="p-2 hover:bg-blue-500 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl mb-1">{decodedSubcategory}</h1>
            <p className="text-blue-100">{filteredCreators.length} professionals found</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-blue-500 rounded-full transition-colors">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Filter creators by price and rating</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-3">
                  <Label>
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </Label>
                  <Slider
                    min={0}
                    max={10000}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label>Minimum Rating: {minRating.toFixed(1)} ⭐</Label>
                  <Slider
                    min={0}
                    max={5}
                    step={0.5}
                    value={[minRating]}
                    onValueChange={(val) => setMinRating(val[0])}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setMinRating(0);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Creator List */}
      <div className="p-6 -mt-4 space-y-4">
        {filteredCreators.length === 0 ? (
          <Card className="border-gray-200">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No creators found matching your filters</p>
              <Button
                variant="link"
                onClick={() => {
                  setPriceRange([0, 10000]);
                  setMinRating(0);
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredCreators.map((creator) => (
            <Card
              key={creator.id}
              className="border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/creator/${creator.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-2xl shrink-0">
                    {creator.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg text-gray-900 mb-1">{creator.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{creator.rating}</span>
                        <span className="text-gray-400">({creator.totalReviews})</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span>{creator.experience} years exp</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{creator.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl text-blue-600">₹{creator.price.toLocaleString()}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
