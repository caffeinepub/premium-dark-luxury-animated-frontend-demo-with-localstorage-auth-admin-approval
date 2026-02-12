export default function BabyComedyLoginAnimation() {
  return (
    <div className="relative w-full h-48 mb-6 overflow-hidden rounded-2xl">
      {/* Main baby laughing animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/assets/generated/baby-full-body-laugh.dim_768x768.png"
          alt=""
          className="h-40 w-auto object-contain animate-baby-laugh"
        />
      </div>

      {/* Kiss overlay animation */}
      <div className="absolute top-4 right-8 animate-kiss-pop">
        <img
          src="/assets/generated/baby-kiss-overlay.dim_512x512.png"
          alt=""
          className="h-16 w-16 object-contain"
        />
      </div>

      {/* Sparkles animation */}
      <div className="absolute top-8 left-8 animate-sparkle-burst">
        <img
          src="/assets/generated/baby-sparkles.dim_512x512.png"
          alt=""
          className="h-12 w-12 object-contain"
        />
      </div>

      {/* Heart burst animation */}
      <div className="absolute bottom-8 right-12 animate-heart-burst">
        <img
          src="/assets/generated/heart-burst.dim_512x512.png"
          alt=""
          className="h-14 w-14 object-contain"
        />
      </div>

      {/* Additional floating hearts */}
      <div className="absolute bottom-12 left-12 animate-float-heart animation-delay-200">
        <div className="text-3xl">💋</div>
      </div>

      <div className="absolute top-12 right-16 animate-float-heart animation-delay-300">
        <div className="text-2xl">❤️</div>
      </div>
    </div>
  );
}
