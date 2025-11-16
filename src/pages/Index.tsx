import { useState } from "react";
import IntroSplash from "@/components/IntroSplash";
import SplashScreen from "@/components/SplashScreen";
import BirthdayMessage from "@/components/BirthdayMessage";
import BirthdayWheel from "@/components/BirthdayWheel";
import TextPage from "@/components/TextPage";
import VideoPage from "@/components/VideoPage";
import CameraSection from "@/components/CameraSection";
import FeedbackForm from "@/components/FeedbackForm";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="h-dvh overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <SplashScreen />
      <BirthdayMessage />
      <BirthdayWheel />
      <TextPage text="Thodi cheeesy majak mastiiii" emoji="🎭" />
      <VideoPage videoSrc="/media/dok.mp4" />
      <TextPage text="Is why only Grandhi bapu said,

what did he say????" emoji="🤔" />
      <VideoPage videoSrc="/media/gandhi.mp4" />
      <CameraSection />
      <FeedbackForm />
    </div>
  );
};

export default Index;
