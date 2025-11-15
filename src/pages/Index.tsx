import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import VideoSection from "@/components/VideoSection";
import BirthdayWheel from "@/components/BirthdayWheel";
import Gallery from "@/components/Gallery";
import FeedbackForm from "@/components/FeedbackForm";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen">
      <VideoSection />
      <BirthdayWheel />
      <Gallery />
      <FeedbackForm />
    </div>
  );
};

export default Index;
