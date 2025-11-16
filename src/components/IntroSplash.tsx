import { useState, useEffect } from "react";

const IntroSplash = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      text: "Uhmm su lage kevu banayu hase sahil e!???",
      image: "/intro/intro1.JPG",
      duration: 4000
    },
    {
      text: "Are gandiiii, me banayu hoy e saras j hoy",
      image: "/intro/intro2.JPG",
      duration: 3000
    }
  ];

  useEffect(() => {
    if (currentSlide === 0) {
      // First slide - 4 seconds
      const timer = setTimeout(() => {
        setCurrentSlide(1);
      }, slides[0].duration);
      return () => clearTimeout(timer);
    } else if (currentSlide === 1) {
      // Second slide - 3 seconds, then complete
      const timer = setTimeout(() => {
        onComplete();
      }, slides[1].duration);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Background Image */}
        <img
          src={slides[currentSlide].image}
          alt="Intro"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1
            key={currentSlide}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center animate-fade-in drop-shadow-2xl"
          >
            {slides[currentSlide].text}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default IntroSplash;
