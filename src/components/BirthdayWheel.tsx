import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const wheelOptions = [
  { 
    id: 1, 
    text: "let's go for death ride",
    message: "Hold tight baby! Time for an adrenaline rush! 🎢💨",
    imagePlaceholder: "/images/death-ride.jpg"
  },
  { 
    id: 2, 
    text: "secret behind....",
    message: "Shhhh... I've been hiding something special for you! 🤫✨",
    imagePlaceholder: "/images/secret.jpg"
  },
  { 
    id: 3, 
    text: "something cringe but lovely",
    message: "Warning: Maximum cringe levels incoming! But you'll love it 😘💖",
    imagePlaceholder: "/images/cringe-lovely.jpg"
  },
  { 
    id: 4, 
    text: "catwalk",
    message: "Time to show off those moves, gorgeous! Work it! 💃✨",
    imagePlaceholder: "/images/catwalk.jpg"
  },
  { 
    id: 5, 
    text: "let's live",
    message: "Life is short, let's make every moment count together! 🌟💕",
    imagePlaceholder: "/images/lets-live.jpg"
  }
];

const BirthdayWheel = () => {
  const [showCelebration, setShowCelebration] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keep celebration visible, just show button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spinWheel = () => {
    if (spinning || currentIndex >= wheelOptions.length) return;
    
    setSpinning(true);
    setSelectedOption(null);
    
    // Spin animation for 3 seconds
    setTimeout(() => {
      setSelectedOption(currentIndex);
      setSpinning(false);
      setCurrentIndex(prev => prev + 1);
    }, 3000);
  };

  if (!showButton && selectedOption === null) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
        <div className="text-center animate-scale-in">
          <div className="mb-8 animate-heart-beat">
            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
              🎉 Happy Birthday Tony! 🎂
            </h1>
            <p className="text-3xl md:text-4xl text-primary-foreground animate-pulse">
              Time to celebrate YOU! ✨
            </p>
          </div>
          <div className="flex gap-4 justify-center text-6xl animate-float">
            🎈 🎁 🎊 🎉 🎂
          </div>
        </div>
      </section>
    );
  }

  if (showButton && selectedOption === null) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8 animate-heart-beat">
            Let's do something fun! 🎯
          </h2>
          <Button
            onClick={spinWheel}
            disabled={spinning || currentIndex >= wheelOptions.length}
            size="lg"
            className="bg-gradient-romantic text-white font-bold text-2xl px-12 py-8 rounded-full shadow-glow hover:scale-110 transition-transform"
          >
            <Sparkles className="w-8 h-8 mr-3" />
            {currentIndex >= wheelOptions.length ? "All Done! 🎉" : spinning ? "Spinning..." : "Spin the Wheel!"}
          </Button>
        </div>
      </section>
    );
  }

  if (spinning) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
        <div className="text-center">
          <div className="relative w-96 h-96 mx-auto mb-8">
            {/* Spinning wheel with segments */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '0.5s' }}>
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {wheelOptions.map((option, index) => {
                  const angle = (360 / wheelOptions.length) * index;
                  const nextAngle = (360 / wheelOptions.length) * (index + 1);
                  const colors = ['#ff69b4', '#ff1493', '#ff85c0', '#ff3399', '#ff6bb3'];
                  
                  return (
                    <g key={option.id}>
                      <path
                        d={`M 100 100 L ${100 + 90 * Math.cos((angle - 90) * Math.PI / 180)} ${100 + 90 * Math.sin((angle - 90) * Math.PI / 180)} A 90 90 0 0 1 ${100 + 90 * Math.cos((nextAngle - 90) * Math.PI / 180)} ${100 + 90 * Math.sin((nextAngle - 90) * Math.PI / 180)} Z`}
                        fill={colors[index]}
                        stroke="white"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
            {/* Center circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-3xl shadow-glow">
                🎰
              </div>
            </div>
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary animate-pulse">
            Spinning the wheel of fun...
          </p>
        </div>
      </section>
    );
  }

  if (selectedOption !== null) {
    const option = wheelOptions[selectedOption];
    
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
        <div className="max-w-4xl mx-auto text-center animate-scale-in">
          <div className="bg-soft-pink rounded-3xl shadow-romantic p-8 mb-8">
            <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6 animate-heart-beat">
              🎉 {option.text} 🎉
            </h3>
            <p className="text-xl md:text-2xl text-primary-foreground mb-8">
              {option.message}
            </p>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-glow bg-muted">
              <img
                src={option.imagePlaceholder}
                alt={option.text}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg">Add image here:</p>
                  <code className="text-sm bg-background px-3 py-1 rounded">
                    public{option.imagePlaceholder}
                  </code>
                </div>
              </div>
            </div>
          </div>
          
          {currentIndex < wheelOptions.length && (
            <Button
              onClick={spinWheel}
              size="lg"
              className="bg-gradient-romantic text-white font-bold text-xl px-10 py-6 rounded-full shadow-glow hover:scale-110 transition-transform"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Spin Again!
            </Button>
          )}
        </div>
      </section>
    );
  }

  return null;
};

export default BirthdayWheel;
