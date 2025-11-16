interface TextPageProps {
  text: string;
  emoji?: string;
}

const TextPage = ({ text, emoji }: TextPageProps) => {
  return (
    <section className="h-dvh w-screen snap-start snap-always flex items-center justify-center bg-gradient-soft overflow-hidden relative">
      <div className="text-center px-6 sm:px-8 md:px-12 max-w-5xl">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 animate-heart-beat whitespace-pre-line leading-relaxed">
          {text}
        </h2>
        {emoji && (
          <div className="text-6xl sm:text-7xl md:text-8xl animate-bounce mt-6">
            {emoji}
          </div>
        )}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 text-4xl sm:text-5xl md:text-6xl opacity-20 animate-float">
        🎭
      </div>
      <div className="absolute bottom-20 right-10 text-4xl sm:text-5xl md:text-6xl opacity-20 animate-float-delayed">
        😄
      </div>
      <div className="absolute top-1/3 right-20 text-3xl sm:text-4xl md:text-5xl opacity-20 animate-float">
        ✨
      </div>
    </section>
  );
};

export default TextPage;
