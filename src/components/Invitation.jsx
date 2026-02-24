import React from 'react';
import { weddingInfo } from '../data/info';
import { Phone, Mail } from 'lucide-react';
import useScrollFadeIn from '../hooks/useScrollFadeIn';

const Invitation = () => {
  const animatedItem = useScrollFadeIn();

  return (
    <section className="py-24 px-6 bg-gray-50/30">
      <div
        {...animatedItem}
        className={`${animatedItem.className} max-w-sm mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center`}
      >
        <h3 className="text-xl font-serif mb-12 text-wedding-accent font-bold">소중한 분들을 초대합니다</h3>
        <p className="text-gray-600 leading-[2.2] mb-16 whitespace-pre-line font-serif">
          {weddingInfo.message}
        </p>

        <div className="space-y-8 text-gray-700 font-serif">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-wedding-accent/70 uppercase tracking-widest">Groom</span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-base text-gray-500">{weddingInfo.groom.father} · {weddingInfo.groom.mother}</span>
              <span className="text-xs text-gray-300">의 장남</span>
              <span className="text-lg font-bold">{weddingInfo.groom.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-wedding-accent/70 uppercase tracking-widest">Bride</span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-base text-gray-500">{weddingInfo.bride.father} · {weddingInfo.bride.mother}</span>
              <span className="text-xs text-gray-300">의 장녀</span>
              <span className="text-lg font-bold">{weddingInfo.bride.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-wedding-accent text-wedding-accent text-xs font-bold transition hover:bg-wedding-accent hover:text-white uppercase tracking-tighter">
            <Phone size={14} /> 연락하기
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-wedding-accent text-wedding-accent text-xs font-bold transition hover:bg-wedding-accent hover:text-white uppercase tracking-tighter">
            <Mail size={14} /> 축하메시지
          </button>
        </div>
      </div>
    </section>
  );
};

export default Invitation;
