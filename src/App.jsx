import React, { useEffect } from 'react';
import Main from './components/Main';
import Invitation from './components/Invitation';
import Map from './components/Map';
import Guestbook from './components/Guestbook';
import ProgressBar from './components/ProgressBar';
import Petals from './components/Petals';
import { Heart } from 'lucide-react';
import { weddingInfo } from './data/info';

function App() {
  useEffect(() => {
    // Dynamic Title
    document.title = `${weddingInfo.groom.name} ♥ ${weddingInfo.bride.name} 저희 결혼합니다`;

    const updateMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const desc = `${weddingInfo.date}, ${weddingInfo.location.name}`;
    updateMeta('description', desc);
    updateMeta('og:title', document.title, true);
    updateMeta('og:description', desc, true);
    updateMeta('twitter:title', document.title);
    updateMeta('twitter:description', desc);
  }, []);

  return (
    <div className="bg-wedding-bg min-h-screen">
      <Petals count={20} />
      <ProgressBar />

      <main className="flex flex-col">
        <Main />
        <Invitation />
        <Map />
        <Guestbook />
      </main>

      <footer className="py-20 flex flex-col items-center justify-center bg-white border-t border-gray-50">
        <Heart size={24} className="mx-auto text-wedding-accent mb-4 opacity-30" />
        <p className="text-sm text-gray-400 font-serif">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
