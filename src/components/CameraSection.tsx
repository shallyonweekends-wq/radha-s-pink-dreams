import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart } from "lucide-react";

const CameraSection = () => {
  const [showQuestion, setShowQuestion] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const revealMirror = async () => {
    setIsLoading(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false,
      });
      setStream(mediaStream);
      setShowQuestion(false);
      setIsLoading(false);

      // Wait a bit before setting the stream to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(err => console.error("Video play error:", err));
        }
      }, 100);
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Please allow camera access to see the answer! 📸");
      setShowQuestion(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <section className="h-dvh w-screen snap-start snap-always bg-gradient-soft overflow-hidden flex items-center justify-center relative">
      {/* Decorative floating elements */}
      <div className="absolute top-10 left-10 text-4xl sm:text-5xl opacity-30 animate-float">
        💖
      </div>
      <div className="absolute bottom-20 right-10 text-4xl sm:text-5xl opacity-30 animate-float-delayed">
        ✨
      </div>
      <div className="absolute top-1/4 right-20 text-3xl sm:text-4xl opacity-30 animate-float">
        🌟
      </div>
      <div className="absolute bottom-1/3 left-20 text-3xl sm:text-4xl opacity-30 animate-float-delayed">
        💝
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        {isLoading ? (
          /* Loading Screen */
          <div className="text-center animate-fade-in">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-8 animate-heart-beat">
              Revealing the answer... ✨
            </h3>
            <div className="flex justify-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ) : showQuestion ? (
          /* Question Screen */
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-8 md:mb-12 animate-heart-beat leading-relaxed">
              Who's the most beautiful person in the world? 🌟
            </h2>

            <Button
              onClick={revealMirror}
              size="lg"
              className="bg-gradient-romantic text-white font-bold text-xl sm:text-2xl md:text-3xl px-12 py-8 md:px-16 md:py-10 rounded-full shadow-glow hover:scale-110 transition-all duration-300 animate-pulse-glow"
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
              Click to find out ✨
            </Button>

            {/* Decorative hearts around button */}
            <div className="mt-12 flex justify-center gap-4 text-4xl sm:text-5xl opacity-40">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-float fill-current" />
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-heart-beat fill-current" />
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-float-delayed fill-current" />
            </div>
          </div>
        ) : (
          /* Mirror Screen */
          <div className="animate-scale-in">
            {/* Sweet Message */}
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary animate-heart-beat">
                See? I told you! You're stunning! 💖
              </h3>
            </div>

            {/* Mirror Frame */}
            <div className="relative">
              {/* Decorative corners */}
              <div className="absolute -top-4 -left-4 text-3xl sm:text-4xl animate-sparkle">✨</div>
              <div className="absolute -top-4 -right-4 text-3xl sm:text-4xl animate-sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
              <div className="absolute -bottom-4 -left-4 text-3xl sm:text-4xl animate-sparkle" style={{ animationDelay: '1s' }}>✨</div>
              <div className="absolute -bottom-4 -right-4 text-3xl sm:text-4xl animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</div>

              {/* Mirror with romantic border */}
              <div className="relative rounded-3xl overflow-hidden shadow-romantic border-4 border-primary/30 bg-gradient-romantic p-2">
                <div className="rounded-2xl overflow-hidden shadow-glow">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto max-h-[60vh] object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />
                </div>
              </div>

              {/* Floating hearts around mirror */}
              <div className="absolute top-1/4 -left-8 sm:-left-12">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-float fill-current opacity-60" />
              </div>
              <div className="absolute top-1/2 -right-8 sm:-right-12">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-float-delayed fill-current opacity-60" />
              </div>
              <div className="absolute bottom-1/4 -left-6 sm:-left-10">
                <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-primary animate-float fill-current opacity-60" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CameraSection;
