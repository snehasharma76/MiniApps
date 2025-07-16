import { CarouselClient } from './client-components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Polaroid Carousel <span className="text-blue-500">on Base</span>
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Create and share your blockchain journey with a retro Polaroid vibe
        </p>
      </header>
      
      <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <CarouselClient />
      </main>
      
      <footer className="max-w-4xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Built for Base Mini Apps & Farcaster</p>
      </footer>
    </div>
  );
}
