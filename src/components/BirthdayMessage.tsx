const BirthdayMessage = () => {
  return (
    <section className="h-dvh w-screen snap-start snap-always flex items-center justify-center bg-gradient-soft overflow-hidden">
      <div className="text-center px-6 max-w-5xl mx-auto">
        <div className="animate-scale-in">
          <div className="mb-6 md:mb-8 animate-heart-beat">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary mb-3 md:mb-4">
              🎉 Happy Birthday Pagal! 🎂
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-secondary-foreground animate-pulse">
              Time to celebrate YOU! ✨
              I've got nothing much better than memories to share in some what unique way by making stories with some context behind it.
            </p>
          </div>
          <div className="flex gap-3 md:gap-4 lg:gap-6 justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-float">
            🎈 🎁 🎊 🎉 🎂
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayMessage;
