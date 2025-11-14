import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import VideoSection from "@/components/VideoSection";
import Gallery from "@/components/Gallery";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen">
      <VideoSection />
      <Gallery />
    </div>
  );
};

export default Index;
