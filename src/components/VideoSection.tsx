import { useRef, useEffect } from "react";

interface VideoSectionProps {
  videoUrl?: string;
}

const VideoSection = ({ videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" }: VideoSectionProps) => {
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Auto-play is handled by the YouTube embed URL parameters
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
      <div className="w-full max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden shadow-romantic animate-pulse-glow">
          <div className="aspect-video w-full bg-black">
            {/* YouTube video - commented out */}
            {/* <iframe
              ref={videoRef}
              className="w-full h-full"
              src={videoUrl}
              title="Special Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
            
            {/* Local video player */}
            <video
              ref={videoRef as any}
              className="w-full h-full"
              controls
              autoPlay
              muted
              loop
            >
              <source src="/videos/special-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <p className="text-center mt-8 text-2xl md:text-3xl font-bold text-primary animate-heart-beat">
          This one's for you 💕
        </p>
      </div>
    </section>
  );
};

export default VideoSection;
