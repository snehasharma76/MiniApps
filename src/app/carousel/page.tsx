import { CarouselClient, BaseConnection } from '../client-components';

export default function CarouselPage() {
  return (
    <div className="min-h-screen bg-vintage-cream py-12 px-4">
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-amber-800 font-caveat">
              Polaroid Moments <span className="text-amber-600">Onchain</span>
            </h1>
            <p className="text-amber-700 mt-2">
              Capture your blockchain journey with a retro Polaroid vibe
            </p>
          </div>
          <BaseConnection />
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow-lg p-6 backdrop-blur-sm">
        <CarouselClient />
      </main>
      
      <footer className="max-w-4xl mx-auto mt-8 text-center text-amber-700 text-sm">
        <p>Built for Base Mini Apps & Farcaster</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://docs.base.org/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">Base Docs</a>
          <span>•</span>
          <a href="https://farcaster.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">Farcaster</a>
        </div>
      </footer>
    </div>
  );
}
