export default function BabyComedyLoginAnimation() {
  return (
    <div className="pointer-events-none relative mb-6 flex h-48 w-full items-center justify-center overflow-hidden">
      {/* Baby character with laughter bounce */}
      <div className="baby-laugh-bounce relative z-10">
        <img
          src="/assets/generated/baby-laugh.dim_512x512.png"
          alt="Happy baby"
          className="h-32 w-32 drop-shadow-2xl sm:h-40 sm:w-40"
        />
      </div>

      {/* Running motion streaks - left side */}
      <div className="baby-run-left absolute left-8 top-1/2 z-0">
        <img
          src="/assets/generated/run-streaks.dim_256x256.png"
          alt=""
          className="h-16 w-16 opacity-70 sm:h-20 sm:w-20"
        />
      </div>

      {/* Running motion streaks - right side */}
      <div className="baby-run-right absolute right-8 top-1/2 z-0">
        <img
          src="/assets/generated/run-streaks.dim_256x256.png"
          alt=""
          className="h-16 w-16 rotate-180 opacity-70 sm:h-20 sm:w-20"
        />
      </div>

      {/* Kissing hearts - top left */}
      <div className="baby-heart-left absolute left-12 top-8 z-20">
        <img
          src="/assets/generated/kiss-hearts.dim_256x256.png"
          alt=""
          className="h-12 w-12 sm:h-16 sm:w-16"
        />
      </div>

      {/* Kissing hearts - top right */}
      <div className="baby-heart-right absolute right-12 top-8 z-20">
        <img
          src="/assets/generated/kiss-hearts.dim_256x256.png"
          alt=""
          className="h-12 w-12 sm:h-16 sm:w-16"
        />
      </div>

      {/* Additional floating hearts for comedy effect */}
      <div className="baby-heart-float-left absolute bottom-12 left-1/4 z-20">
        <img
          src="/assets/generated/kiss-hearts.dim_256x256.png"
          alt=""
          className="h-8 w-8 sm:h-10 sm:w-10"
        />
      </div>

      <div className="baby-heart-float-right absolute bottom-12 right-1/4 z-20">
        <img
          src="/assets/generated/kiss-hearts.dim_256x256.png"
          alt=""
          className="h-8 w-8 sm:h-10 sm:w-10"
        />
      </div>
    </div>
  );
}
