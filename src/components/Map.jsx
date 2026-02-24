import React from 'react';
import { weddingInfo } from '../data/info';
import { MapPin, Navigation } from 'lucide-react';

const Map = () => {
  const { lat, lng, name, address } = weddingInfo.location;
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;

  // Naver Static Map API URL
  const staticMapUrl = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?w=600&h=400&center=${lng},${lat}&level=15&markers=type:d|size:mid|pos:${lng}%20${lat}&X-NCP-APIGW-API-KEY-ID=${clientId}`;

  const openNaverMap = () => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(name)}`, '_blank');
  };

  const openKakaoMap = () => {
    window.open(`https://map.kakao.com/link/map/${encodeURIComponent(name)},${lat},${lng}`, '_blank');
  };

  return (
    <section className="py-24 px-6 text-center">
      <h3 className="text-xl font-serif mb-12 text-wedding-accent italic">오시는 길</h3>
      <div className="mb-8">
        <p className="font-bold text-lg mb-2">{name}</p>
        <p className="text-gray-500 text-sm leading-relaxed">{address}</p>
      </div>

      <div className="w-full aspect-[3/2] bg-gray-100 rounded-2xl mb-8 flex items-center justify-center text-gray-400 overflow-hidden shadow-inner border border-gray-100">
        {clientId ? (
          <img
            src={staticMapUrl}
            alt="지도"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = '<p class="text-sm px-4">지도를 불러올 수 없습니다.<br/>API 키와 도메인 설정을 확인해주세요.</p>';
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <MapPin size={32} />
            <p className="text-sm">VITE_NAVER_CLIENT_ID가 설정되지 않았습니다.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={openNaverMap}
          className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium hover:bg-gray-100 transition border border-gray-100"
        >
          <Navigation size={18} /> 네이버 지도
        </button>
        <button
          onClick={openKakaoMap}
          className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium hover:bg-gray-100 transition border border-gray-100"
        >
          <Navigation size={18} /> 카카오 맵
        </button>
      </div>
    </section>
  );
};

export default Map;
