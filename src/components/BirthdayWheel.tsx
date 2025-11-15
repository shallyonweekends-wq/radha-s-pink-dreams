import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Wheel } from "react-custom-roulette";

const wheelOptions = [
  { 
    id: 1, 
    option: "let's go for death ride",
    message: "Hold tight baby! Time for an adrenaline rush! 🎢💨",
    imagePlaceholder: "/images/death-ride.jpg",
    style: { backgroundColor: '#3b82f6', textColor: 'white' }
  },
  { 
    id: 2, 
    option: "secret behind....",
    message: "Shhhh... I've been hiding something special for you! 🤫✨",
    imagePlaceholder: "/images/secret.jpg",
    style: { backgroundColor: '#ef4444', textColor: 'white' }
  },
  { 
    id: 3, 
    option: "something cringe but lovely",
    message: "Warning: Maximum cringe levels incoming! But you'll love it 😘💖",
    imagePlaceholder: "/images/cringe-lovely.jpg",
    style: { backgroundColor: '#f59e0b', textColor: 'white' }
  },
  { 
    id: 4, 
    option: "catwalk",
    message: "Time to show off those moves, gorgeous! Work it! 💃✨",
    imagePlaceholder: "/images/catwalk.jpg",
    style: { backgroundColor: '#10b981', textColor: 'white' }
  },
  { 
    id: 5, 
    option: "let's live",
    message: "Life is short, let's make every moment count together! 🌟💕",
    imagePlaceholder: "/images/lets-live.jpg",
    style: { backgroundColor: '#ec4899', textColor: 'white' }
  }
];

const BirthdayWheel = () => {
  const [showButton, setShowButton] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spinWheel = () => {
    if (mustSpin || currentIndex >= wheelOptions.length) return;
    
    setPrizeNumber(currentIndex);
    setMustSpin(true);
    setSelectedOption(null);
  };

  const handleSpinComplete = () => {
    setMustSpin(false);
    setSelectedOption(currentIndex);
    setCurrentIndex(prev => prev + 1);
  };

  if (selectedOption === null) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
        <div className="text-center space-y-12">
          {/* Birthday Message - Always visible */}
          <div className="animate-scale-in">
            <div className="mb-8 animate-heart-beat">
              <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
                🎉 Happy Birthday Tony! 🎂
              </h1>
              <p className="text-3xl md:text-4xl text-secondary-foreground animate-pulse">
                Time to celebrate YOU! ✨
              </p>
            </div>
            <div className="flex gap-4 justify-center text-6xl animate-float">
              🎈 🎁 🎊 🎉 🎂
            </div>
          </div>

          {/* Spinning Wheel and Button */}
          {showButton && (
            <div className="animate-fade-in space-y-8">
              {!mustSpin && (
                <h2 className="text-4xl md:text-6xl font-bold text-primary animate-heart-beat">
                  Let's do something fun! 🎯
                </h2>
              )}
              
              <div className="flex flex-col items-center gap-8">
                <div className="relative">
                  <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={wheelOptions}
                    onStopSpinning={handleSpinComplete}
                    outerBorderColor="#ff1493"
                    outerBorderWidth={8}
                    innerBorderColor="#ffffff"
                    innerBorderWidth={4}
                    radiusLineColor="#ffffff"
                    radiusLineWidth={2}
                    fontSize={18}
                    textDistance={70}
                    spinDuration={0.5}
                  />
                </div>
                
                {!mustSpin && (
                  <Button
                    onClick={spinWheel}
                    disabled={currentIndex >= wheelOptions.length}
                    size="lg"
                    className="bg-gradient-romantic text-white font-bold text-2xl px-12 py-8 rounded-full shadow-glow hover:scale-110 transition-transform"
                  >
                    <Sparkles className="w-8 h-8 mr-3" />
                    {currentIndex >= wheelOptions.length ? "All Done! 🎉" : "Spin the Wheel!"}
                  </Button>
                )}
              </div>
            </div>
          )}
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
              🎉 {option.option} 🎉
            </h3>
            <p className="text-xl md:text-2xl text-primary-foreground mb-8">
              {option.message}
            </p>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-glow bg-muted">
              <img
                src={option.imagePlaceholder}
                alt={option.option}
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
