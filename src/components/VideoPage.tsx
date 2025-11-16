interface VideoPageProps {
  videoSrc: string;
  title?: string;
}

const VideoPage = ({ videoSrc, title }: VideoPageProps) => {
  return (
    <section className="h-dvh w-screen snap-start snap-always flex flex-col items-center justify-center bg-gradient-soft overflow-hidden">
      <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl px-4 sm:px-6 md:px-8">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-primary animate-heart-beat">
            {title}
          </h2>
        )}

        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-romantic bg-black">
          <video
            src={videoSrc}
            className="w-full h-auto max-h-[70vh] object-contain"
            controls
            // autoPlay
            // loop
            // muted
            playsInline
            onError={(e) => {
              console.error('Video failed to load:', videoSrc);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Decorative floating hearts */}
      <div className="absolute top-10 left-5 text-3xl sm:text-4xl opacity-30 animate-float">
        💖
      </div>
      <div className="absolute bottom-20 right-5 text-3xl sm:text-4xl opacity-30 animate-float-delayed">
        🎬
      </div>
    </section>
  );
};

export default VideoPage;
