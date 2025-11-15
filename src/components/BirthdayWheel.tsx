import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spinWheel = () => {
    if (isSpinning || currentIndex >= wheelOptions.length) return;
    
    setIsSpinning(true);
    setSelectedOption(null);
    
    // Calculate spins: 5 full rotations + landing position
    const segmentAngle = 360 / wheelOptions.length;
    const targetRotation = rotation + 1800 + (segmentAngle * currentIndex);
    
    setRotation(targetRotation);
    
    // Stop spinning after 3 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedOption(currentIndex);
      setCurrentIndex(prev => prev + 1);
    }, 3000);
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
              {!isSpinning && (
                <h2 className="text-4xl md:text-6xl font-bold text-primary animate-heart-beat">
                  Let's do something fun! 🎯
                </h2>
              )}
              
              <div className="flex flex-col items-center gap-8">
                <div className="relative w-[400px] h-[400px]">
                  {/* Pointer at top */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-primary drop-shadow-lg" />
                  </div>
                  
                  {/* Spinning wheel */}
                  <div 
                    className="absolute inset-0 transition-transform duration-[3000ms] ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                      {wheelOptions.map((option, index) => {
                        const angle = (360 / wheelOptions.length) * index - 90;
                        const nextAngle = (360 / wheelOptions.length) * (index + 1) - 90;
                        const midAngle = (angle + nextAngle) / 2;
                        const textRadius = 65;
                        
                        // Calculate path for the segment
                        const startX = 100 + 90 * Math.cos((angle * Math.PI) / 180);
                        const startY = 100 + 90 * Math.sin((angle * Math.PI) / 180);
                        const endX = 100 + 90 * Math.cos((nextAngle * Math.PI) / 180);
                        const endY = 100 + 90 * Math.sin((nextAngle * Math.PI) / 180);
                        
                        return (
                          <g key={option.id}>
                            <path
                              d={`M 100 100 L ${startX} ${startY} A 90 90 0 0 1 ${endX} ${endY} Z`}
                              fill={option.style.backgroundColor}
                              stroke="white"
                              strokeWidth="3"
                            />
                            <text
                              x={100 + textRadius * Math.cos((midAngle * Math.PI) / 180)}
                              y={100 + textRadius * Math.sin((midAngle * Math.PI) / 180)}
                              fill={option.style.textColor}
                              fontSize="11"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              transform={`rotate(${midAngle + 90}, ${100 + textRadius * Math.cos((midAngle * Math.PI) / 180)}, ${100 + textRadius * Math.sin((midAngle * Math.PI) / 180)})`}
                            >
                              {option.option.split(' ').map((word, i) => (
                                <tspan key={i} x={100 + textRadius * Math.cos((midAngle * Math.PI) / 180)} dy={i === 0 ? 0 : 12}>
                                  {word}
                                </tspan>
                              ))}
                            </text>
                          </g>
                        );
                      })}
                      {/* Center circle */}
                      <circle cx="100" cy="100" r="20" fill="#ff1493" stroke="white" strokeWidth="3" />
                      <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="24">
                        🎰
                      </text>
                    </svg>
                  </div>
                </div>
                
                {!isSpinning && (
                  <Button
                    onClick={spinWheel}
                    disabled={currentIndex >= wheelOptions.length}
                    size="lg"
                    className="bg-gradient-romantic text-white font-bold text-2xl px-12 py-8 rounded-full shadow-glow hover:scale-110 transition-transform"
                  >
                    <Sparkles className="w-8 h-8 mr-3" />
                    {currentIndex >= wheelOptions.length ? "All Done! 🎉" : isSpinning ? "Spinning..." : "Spin the Wheel!"}
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
