import { useState, useRef, useEffect } from "react";
import { Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CameraCapture = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Front camera
        audio: false,
      });
      setStream(mediaStream);
      setIsActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to capture your beauty! 📸",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL("image/png");
        setCapturedImage(imageData);
        toast({
          title: "📸 Perfect Shot!",
          description: "Captured your peak beauty! ✨",
        });
      }
    }
  };

  useEffect(() => {
    // Auto-start camera when component mounts
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-heart-beat">
          Peak Beauty Moment 🌟
        </h3>
        <p className="text-muted-foreground text-lg">
          Let me capture your beautiful smile!
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-romantic bg-soft-pink p-8">
        {!isActive && !capturedImage && (
          <div className="text-center py-20">
            <Camera className="w-24 h-24 mx-auto mb-6 text-primary animate-float" />
            <p className="text-muted-foreground">Starting camera...</p>
          </div>
        )}

        {isActive && (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-glow">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover mirror"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={capturePhoto}
                size="lg"
                className="bg-gradient-romantic text-white font-bold px-8 rounded-full shadow-glow"
              >
                <Camera className="w-5 h-5 mr-2" />
                Capture
              </Button>
              <Button
                onClick={stopCamera}
                size="lg"
                variant="secondary"
                className="rounded-full px-8"
              >
                Stop Camera
              </Button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img src={capturedImage} alt="Captured" className="w-full" />
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setCapturedImage(null)}
                size="lg"
                className="bg-gradient-romantic text-white font-bold px-8 rounded-full"
              >
                Take Another
              </Button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default CameraCapture;
