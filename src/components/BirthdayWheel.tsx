import { useState, useEffect } from "react";
import { Wheel } from 'react-custom-roulette';
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, X } from "lucide-react";

const wheelOptions = [
  {
    option: "let's go for death ride",
    message: "Hold tight baby! Time for an adrenaline rush! 🎢💨",
    imagePlaceholder: "/media/deathride.mp4",
    style: { backgroundColor: '#3b82f6', textColor: 'white' }
  },
  {
    option: "Secret behind.... ",
    message: "Secret behind height is this...🤫✨",
    imagePlaceholder: "/media/secret.jpg",
    style: { backgroundColor: '#ef4444', textColor: 'white' }
  },
  {
    option: "something cringe but lovely",
    message: "Warning: Maximum cringe levels incoming!",
    imagePlaceholder: "/media/cringe.mp4",
    style: { backgroundColor: '#f59e0b', textColor: 'white' }
  },
  {
    option: "catwalk",
    message: "Time to show off those moves, gorgeous! Work it! 💃✨",
    imagePlaceholder: "/media/catwalk.mp4",
    style: { backgroundColor: '#10b981', textColor: 'white' }
  },
  {
    option: "let's live",
    message: "HERE WE GOOOOO!!!! (sorry for being romantic here, can't stop myself)",
    imagePlaceholder: "/media/lived.MOV",
    style: { backgroundColor: '#ec4899', textColor: 'white' }
  }
];

const BirthdayWheel = () => {
  const [showButton, setShowButton] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isMediaExpanded, setIsMediaExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const spinWheel = () => {
    if (mustSpin || currentIndex >= wheelOptions.length) return;

    setShowResult(false);
    setPrizeNumber(currentIndex);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setShowResult(true);
    setIsMediaExpanded(true); // Auto-open fullscreen
    setCurrentIndex(prev => prev + 1);

    // Confetti celebration with pink theme
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff1493', '#ff69b4', '#ffc0cb', '#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#ec4899']
    });
  };

  return (
    <section className="h-dvh w-screen snap-start snap-always flex items-center justify-center bg-gradient-soft overflow-y-auto relative">
      <div className="text-center w-full max-h-full py-4 sm:py-6 md:py-8 px-4 sm:px-6">
        {/* Wheel Section */}
        {showButton && (
          <div className={`animate-fade-in space-y-4 sm:space-y-6 transition-opacity duration-300 ${showResult ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}>
            {!mustSpin && (
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary animate-heart-beat">
                Let's do something fun! 🎯
              </h2>
            )}

            <div className="flex flex-col items-center gap-6 md:gap-8">
              <div className="w-[75vw] sm:w-[85vw] max-w-[400px] md:max-w-[500px] h-[75vw] sm:h-[85vw] max-h-[400px] md:max-h-[500px]">
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={wheelOptions}
                  onStopSpinning={handleStopSpinning}
                  backgroundColors={wheelOptions.map(o => o.style.backgroundColor)}
                  textColors={wheelOptions.map(o => o.style.textColor)}
                  fontSize={16}
                  outerBorderColor="#ffffff"
                  outerBorderWidth={5}
                  innerBorderColor="#ffffff"
                  innerBorderWidth={3}
                  radiusLineColor="#ffffff"
                  radiusLineWidth={2}
                  spinDuration={0.5}
                />
              </div>

              {!mustSpin && (
                <Button
                  onClick={spinWheel}
                  disabled={currentIndex >= wheelOptions.length}
                  size="lg"
                  className="bg-gradient-romantic text-white font-bold text-lg sm:text-xl md:text-2xl px-8 md:px-12 py-6 md:py-8 rounded-full shadow-glow hover:scale-110 transition-transform"
                >
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3" />
                  {currentIndex >= wheelOptions.length ? "All Done! 🎉" : "Spin the Wheel!"}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Result Overlay */}
        {showResult && (
          <div className="max-w-4xl mx-auto text-center animate-scale-in px-4 sm:px-6">
            <div className="bg-soft-pink rounded-2xl md:rounded-3xl shadow-romantic p-6 md:p-8 mb-6 md:mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6 animate-heart-beat">
                🎉 {wheelOptions[prizeNumber].option} 🎉
              </h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground mb-6 md:mb-8">
                {wheelOptions[prizeNumber].message}
              </p>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-glow bg-muted">
                {wheelOptions[prizeNumber].imagePlaceholder.match(/\.(mp4|mov|webm|avi)$/i) ? (
                  <video
                    src={wheelOptions[prizeNumber].imagePlaceholder}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    loop
                    // muted
                    playsInline
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <img
                    src={wheelOptions[prizeNumber].imagePlaceholder}
                    alt={wheelOptions[prizeNumber].option}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                )}
                <div className="hidden absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <p className="text-lg">Add media here:</p>
                    <code className="text-sm bg-background px-3 py-1 rounded">
                      public{wheelOptions[prizeNumber].imagePlaceholder}
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
        )}

        {/* Fullscreen Media Dialog */}
        <Dialog open={isMediaExpanded} onOpenChange={setIsMediaExpanded}>
          <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 bg-black/98 border-none">
            {/* Close Button */}
            <button
              onClick={() => setIsMediaExpanded(false)}
              className="absolute top-4 right-4 z-50 bg-primary/90 hover:bg-primary text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
              {/* Title and Message */}
              <div className="text-center space-y-2 px-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-heart-beat">
                  🎉 {wheelOptions[prizeNumber]?.option} 🎉
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-pink-200">
                  {wheelOptions[prizeNumber]?.message}
                </p>
              </div>

              {/* Media */}
              <div className="flex-1 w-full flex items-center justify-center max-h-[70vh]">
                {wheelOptions[prizeNumber]?.imagePlaceholder.match(/\.(mp4|mov|webm|avi)$/i) ? (
                  <video
                    src={wheelOptions[prizeNumber].imagePlaceholder}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    controls
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={wheelOptions[prizeNumber]?.imagePlaceholder}
                    alt={wheelOptions[prizeNumber]?.option}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                )}
              </div>

              {/* Spin Again Button */}
              {currentIndex < wheelOptions.length && (
                <Button
                  onClick={() => {
                    setIsMediaExpanded(false);
                    setTimeout(() => spinWheel(), 300);
                  }}
                  size="lg"
                  className="bg-gradient-romantic text-white font-bold text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-6 rounded-full shadow-glow hover:scale-110 transition-transform mb-4"
                >
                  <Sparkles className="w-6 h-6 mr-2" />
                  Spin Again!
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BirthdayWheel;
