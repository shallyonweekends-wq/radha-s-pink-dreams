import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const SplashScreen = () => {
  const [hearts, setHearts] = useState<
    { id: number; left: number; delay: number }[]
  >([]);

  useEffect(() => {
    // Generate floating hearts
    const heartCount = 15;
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <section className="h-dvh w-screen snap-start snap-always flex items-center justify-center bg-gradient-romantic overflow-hidden relative">
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-white/30 animate-float"
          style={{
            left: `${heart.left}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${20 + Math.random() * 30}px`,
          }}
          fill="currentColor"
        />
      ))}

      {/* Main text */}
      <div className="relative z-10 text-center px-2">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white animate-heart-beat mb-4">
          Oy meri radhaaa
        </h1>
        <p className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white/90 animate-pulse">
          this one's for you 💕
        </p>
      </div>

      {/* Sparkle effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SplashScreen;
