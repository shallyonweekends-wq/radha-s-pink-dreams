import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Laugh, Users, Flower, Camera } from "lucide-react";
import CameraCapture from "./CameraCapture";

// Import images from organized folders
const importImages = (folder: string) => {
  try {
    const images = import.meta.glob('@/assets/gallery/**/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}', { eager: true });
    return Object.entries(images)
      .filter(([path]) => path.includes(`/gallery/${folder}/`))
      .map(([path, module]) => (module as { default: string }).default);
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("funny");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio files for each tab
  const tabMusic = {
    funny: "/music/funny.mp3",
    together: "/music/together.mp3",
    lovely: "/music/lovely.mp3",
    flower: "/music/flower.mp3",
    "peak-beauty": "/music/peak-beauty.mp3",
  };

  const galleries = {
    funny: importImages("funny"),
    together: importImages("together"),
    lovely: importImages("lovely"),
    flower: importImages("flower"),
  };

  // Play music when tab changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const musicSrc = tabMusic[activeTab as keyof typeof tabMusic];
    if (musicSrc) {
      audioRef.current = new Audio(musicSrc);
      audioRef.current.loop = true;
      audioRef.current.play().catch(err => console.log("Audio playback failed:", err));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [activeTab]);

  const GalleryGrid = ({ images, category }: { images: string[]; category: string }) => {
    if (images.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No images yet! Add photos to <code className="bg-soft-pink px-2 py-1 rounded">src/assets/gallery/{category}/</code>
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-romantic transition-all duration-300 hover:scale-105"
          >
            <img
              src={image}
              alt={`${category} ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-romantic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-primary animate-heart-beat">
          Our Beautiful Memories 💖
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-12 bg-soft-pink p-2 rounded-2xl">
            <TabsTrigger value="funny" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Laugh className="w-4 h-4 mr-2" />
              Funny
            </TabsTrigger>
            <TabsTrigger value="together" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4 mr-2" />
              Us Together
            </TabsTrigger>
            <TabsTrigger value="lovely" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="w-4 h-4 mr-2" />
              Lovely
            </TabsTrigger>
            <TabsTrigger value="flower" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Flower className="w-4 h-4 mr-2" />
              Flower
            </TabsTrigger>
            <TabsTrigger value="peak-beauty" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Camera className="w-4 h-4 mr-2" />
              Peak Beauty
            </TabsTrigger>
          </TabsList>

          <TabsContent value="funny" className="mt-8">
            <GalleryGrid images={galleries.funny} category="funny" />
          </TabsContent>

          <TabsContent value="together" className="mt-8">
            <GalleryGrid images={galleries.together} category="together" />
          </TabsContent>

          <TabsContent value="lovely" className="mt-8">
            <GalleryGrid images={galleries.lovely} category="lovely" />
          </TabsContent>

          <TabsContent value="flower" className="mt-8">
            <GalleryGrid images={galleries.flower} category="flower" />
          </TabsContent>

          <TabsContent value="peak-beauty" className="mt-8">
            <CameraCapture />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Gallery;
