import React, { useState } from 'react';
import { Map as KakaoMap, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { weddingInfo } from '../data/info';
import { Navigation, Info, X } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const Map = () => {
  const { lat, lng, name, address } = weddingInfo.location;
  const [isOpen, setIsOpen] = useState(false);

  const openNaverMap = () => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(name)}`, '_blank');
  };

  const openKakaoMap = () => {
    window.open(`https://map.kakao.com/link/map/${encodeURIComponent(name)},${lat},${lng}`, '_blank');
  };

  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center py-20 px-6 overflow-hidden relative paper-texture">
      <ScrollAnimationWrapper amount={0.4} className="w-full max-w-sm px-4">
        <div className="text-center">
          <h3 className="text-xl mb-12 text-wedding-accent font-bold marker-highlight inline-block">오시는 길</h3>
          <div className="mb-8">
            <p className="font-bold text-2xl mb-3">{name}</p>
            <p className="text-gray-400 text-xl leading-relaxed max-w-[240px] mx-auto marker-highlight inline-block">{address}</p>
          </div>

          <div className="w-full aspect-[4/3] mb-6 flex items-center justify-center overflow-hidden shadow-sm sketchy-border p-1 bg-white relative">
            <KakaoMap
              center={{ lat, lng }}
              style={{ width: '100%', height: '100%' }}
              level={5}
            >
              <MapMarker
                position={{ lat, lng }}
                onClick={() => setIsOpen(true)}
              />
              {isOpen && (
                <CustomOverlayMap position={{ lat, lng }}>
                  <div className="bg-white p-3 rounded-lg shadow-xl border-2 border-wedding-accent relative min-w-[150px] -translate-y-24">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                    <p className="text-sm font-bold text-gray-800 mb-1">{name}</p>
                    <p className="text-[10px] text-gray-500 leading-tight">{address}</p>
                  </div>
                </CustomOverlayMap>
              )}
            </KakaoMap>
          </div>

          <div className="bg-white/80 p-5 text-left doodle-border w-full max-w-[320px] mb-8 mx-auto grid-pattern">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-wedding-accent mt-1.5 shrink-0" />
                <span>영등포역 타임스퀘어에서 <strong>도보 7분</strong></span>
              </li>
              <li className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-wedding-accent mt-1.5 shrink-0" />
                <span>문래역에서 <strong>도보 7분</strong></span>
              </li>
              <li className="flex items-start gap-2 text-base text-gray-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-wedding-accent mt-1.5 shrink-0" />
                <span>문래역 4번 출구 뒤쪽에서 <strong>셔틀버스 상시(5분 주기) 운행</strong></span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-2 w-full max-w-[320px] mx-auto">
            <div className="flex gap-2">
              <button
                onClick={openNaverMap}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-white doodle-border text-base font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm"
              >
                <Navigation size={12} className="text-wedding-accent" /> 네이버 지도
              </button>
              <button
                onClick={openKakaoMap}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-white doodle-border text-base font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm"
              >
                <Navigation size={12} className="text-wedding-accent" /> 카카오 맵
              </button>
            </div>
            <button
              onClick={() => window.open('http://www.jkart.co.kr/location/#request', '_blank')}
              className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-white text-wedding-accent doodle-border text-base font-bold hover:bg-gray-50 transition shadow-sm"
            >
              <Info size={12} /> 약도 및 상세 안내
            </button>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
};

export default Map;
