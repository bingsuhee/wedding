import React from 'react';
import { weddingInfo } from '../data/info';
import { Phone, Mail } from 'lucide-react';

const Invitation = () => {
  return (
    <section className="py-24 px-8 bg-gray-50/50 text-center">
      <div className="max-w-xs mx-auto">
        <h3 className="text-xl font-serif mb-12 text-wedding-accent">소중한 분들을 초대합니다</h3>
        <p className="text-gray-600 leading-loose mb-16 whitespace-pre-line font-serif">
          {weddingInfo.message}
        </p>

        <div className="space-y-6 text-gray-700 font-serif">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">신랑</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">{weddingInfo.groom.father} · {weddingInfo.groom.mother}</span>
              <span className="text-xs text-gray-300">의 장남</span>
              <span className="text-lg font-bold">{weddingInfo.groom.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-400">신부</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">{weddingInfo.bride.father} · {weddingInfo.bride.mother}</span>
              <span className="text-xs text-gray-300">의 장녀</span>
              <span className="text-lg font-bold">{weddingInfo.bride.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-wedding-accent text-wedding-accent text-sm transition hover:bg-wedding-accent hover:text-white">
            <Phone size={16} /> 연락하기
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-wedding-accent text-wedding-accent text-sm transition hover:bg-wedding-accent hover:text-white">
            <Mail size={16} /> 축하메시지
          </button>
        </div>
      </div>
    </section>
  );
};

export default Invitation;
