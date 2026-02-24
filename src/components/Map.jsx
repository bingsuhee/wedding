import React from 'react';
import { weddingInfo } from '../data/info';
import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const Map = () => {
  const { lat, lng, name, address } = weddingInfo.location;
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;

  const staticMapUrl = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?w=600&h=400&center=${lng},${lat}&level=15&markers=type:d|size:mid|pos:${lng}%20${lat}&X-NCP-APIGW-API-KEY-ID=${clientId}`;

  const openNaverMap = () => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(name)}`, '_blank');
  };

  const openKakaoMap = () => {
    window.open(`https://map.kakao.com/link/map/${encodeURIComponent(name)},${lat},${lng}`, '_blank');
  };

  return (
    <section className="flex items-center justify-center py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false }}
        className="w-full max-w-sm"
      >
        <h3 className="text-xl font-serif mb-12 text-wedding-accent font-bold italic">오시는 길</h3>
        <div className="mb-10">
          <p className="font-serif font-bold text-xl mb-3">{name}</p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[240px] mx-auto">{address}</p>
        </div>

        <div className="w-full aspect-[4/3] bg-gray-50 rounded-2xl mb-10 flex items-center justify-center text-gray-300 overflow-hidden shadow-sm border border-gray-100">
          {clientId ? (
            <img
              src={staticMapUrl}
              alt="지도"
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<p class="text-xs px-10 text-gray-400">지도를 불러올 수 없습니다.<br/>API 키 설정을 확인해주세요.</p>';
              }}
            />
          ) : (
            <div className="flex flex-col items-center gap-3">
              <MapPin size={32} className="text-wedding-accent/30" />
              <p className="text-xs">네이버 지도 API 키가 필요합니다.</p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={openNaverMap}
            className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm"
          >
            <Navigation size={14} className="text-wedding-accent" /> 네이버 지도
          </button>
          <button
            onClick={openKakaoMap}
            className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm"
          >
            <Navigation size={14} className="text-wedding-accent" /> 카카오 맵
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Map;
