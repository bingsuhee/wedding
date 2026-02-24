import React from 'react';
import Main from './components/Main';
import Invitation from './components/Invitation';
import Map from './components/Map';
import Guestbook from './components/Guestbook';
import ProgressBar from './components/ProgressBar';
import { Heart } from 'lucide-react';

function App() {
  return (
    <>
      <ProgressBar />
      <main className="min-h-screen">
        <Main />
        <Invitation />
        <Map />
        <Guestbook />

        <section className="flex flex-col items-center justify-center bg-gray-50/50">
          <Heart size={24} className="mx-auto text-wedding-accent mb-4 opacity-30" />
          <p className="text-sm text-gray-400 font-serif">
            © 2024. All rights reserved.
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
