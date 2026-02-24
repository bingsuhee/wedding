import React from 'react';
import { weddingInfo } from '../data/info';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Invitation = () => {
  return (
    <section className="flex items-center justify-center py-24 px-6 bg-gray-50/30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false }}
        className="max-w-sm mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center"
      >
        <h3 className="text-xl font-serif mb-12 text-wedding-accent font-bold">소중한 분들을 초대합니다</h3>
        <p className="text-gray-600 leading-[2.2] mb-16 whitespace-pre-line font-serif text-sm">
          {weddingInfo.message}
        </p>

        <div className="space-y-8 text-gray-700 font-serif">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-wedding-accent/70 uppercase tracking-widest">Groom</span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm text-gray-500">{weddingInfo.groom.father} · {weddingInfo.groom.mother}</span>
              <span className="text-xs text-gray-300">의 장남</span>
              <span className="text-base font-bold">{weddingInfo.groom.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-wedding-accent/70 uppercase tracking-widest">Bride</span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm text-gray-500">{weddingInfo.bride.father} · {weddingInfo.bride.mother}</span>
              <span className="text-xs text-gray-300">의 장녀</span>
              <span className="text-base font-bold">{weddingInfo.bride.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-wedding-accent text-wedding-accent text-[10px] font-bold transition hover:bg-wedding-accent hover:text-white uppercase tracking-tighter">
            <Phone size={12} /> 연락하기
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-wedding-accent text-wedding-accent text-[10px] font-bold transition hover:bg-wedding-accent hover:text-white uppercase tracking-tighter">
            <Mail size={12} /> 축하메시지
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Invitation;
