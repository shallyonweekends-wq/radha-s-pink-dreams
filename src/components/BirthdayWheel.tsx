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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false);
      setShowButton(true);
    }, 5000);

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

  if (showCelebration) {
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
          <div className="relative w-80 h-80 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center animate-spin">
              <div className="w-full h-full rounded-full border-8 border-primary border-t-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-primary animate-pulse">
                🎰
              </div>
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
