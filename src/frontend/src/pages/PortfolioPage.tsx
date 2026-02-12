import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';

export default function PortfolioPage() {
  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in-down text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            My <span className="text-neon-blue">Portfolio</span>
          </h1>
        </div>

        <div className="glass-panel animate-scale-in overflow-hidden rounded-3xl border border-white/10">
          <iframe
            src="https://gorleprasanth.github.io/portfolio/"
            title="Portfolio"
            className="h-[calc(100vh-200px)] w-full"
            frameBorder="0"
          />
        </div>
      </div>
    </AnimatedRouteWrapper>
  );
}
