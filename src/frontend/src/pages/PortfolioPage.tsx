import { Briefcase } from 'lucide-react';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';

export default function PortfolioPage() {
  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 animate-fade-in-down text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-blue/20 shadow-neon">
            <Briefcase className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            <span className="text-neon-blue">Portfolio</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400">Explore my work</p>
        </div>

        <div className="glass-panel rounded-3xl border border-white/10 p-4 md:p-8 backdrop-blur-xl animate-fade-in-up">
          <div className="w-full" style={{ height: 'calc(100vh - 300px)', minHeight: '500px' }}>
            <iframe
              src="https://www.telusmobility.com/en/mobility/phones"
              title="Portfolio"
              className="w-full h-full rounded-2xl border border-white/10"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    </AnimatedRouteWrapper>
  );
}
