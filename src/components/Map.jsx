import React, { useEffect, useRef } from 'react';
import { weddingInfo } from '../data/info';
import { MapPin, Navigation } from 'lucide-react';
import { loadKakaoMap } from '../lib/sdkLoader';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
    if (!apiKey) return;

    loadKakaoMap(apiKey).then((kakao) => {
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(weddingInfo.location.lat, weddingInfo.location.lng),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      const markerPosition = new kakao.maps.LatLng(weddingInfo.location.lat, weddingInfo.location.lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }).catch(err => {
      console.error('Failed to load Kakao Map:', err);
    });
  }, []);

  return (
    <section className="py-24 px-6 text-center">
      <h3 className="text-xl font-serif mb-12 text-wedding-accent italic">오시는 길</h3>
      <div className="mb-8">
        <p className="font-bold text-lg mb-2">{weddingInfo.location.name}</p>
        <p className="text-gray-500 text-sm leading-relaxed">{weddingInfo.location.address}</p>
      </div>

      <div
        ref={mapRef}
        className="w-full h-72 bg-gray-100 rounded-2xl mb-8 flex items-center justify-center text-gray-400 overflow-hidden"
      >
        {!import.meta.env.VITE_KAKAO_MAP_API_KEY && (
          <div className="flex flex-col items-center gap-2">
            <MapPin size={32} />
            <p className="text-sm">지도를 불러오려면 API 키가 필요합니다.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium hover:bg-gray-100 transition">
          <Navigation size={18} /> 네이버 지도
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium hover:bg-gray-100 transition">
          <Navigation size={18} /> 카카오 맵
        </button>
      </div>
    </section>
  );
};

export default Map;
