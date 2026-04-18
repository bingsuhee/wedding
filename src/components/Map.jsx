import React from 'react';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import { weddingInfo } from '../data/info';

const Map = () => {
  const { lat, lng, name, address, naverUrl, kakaoUrl } = weddingInfo.location;
  const tmapUrl = `tmap://?rGoName=${encodeURIComponent(name)}&rGoY=${lat}&rGoX=${lng}`;

  return (
    <section className="section-block gap-8">
      <div className="text-center">
        <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.04em] text-black">
          오시는 길
        </h2>
        <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-black/35">LOCATION</p>
      </div>

      <div className="space-y-3">
        <p className="text-[17px] font-medium tracking-[-0.03em] text-black">{name}</p>
        <p className="text-[13px] leading-relaxed text-black/65">
          {address}
        </p>
      </div>

      <div className="overflow-hidden bg-[#f5f5f5]">
        <div className="aspect-[4/3]">
          <KakaoMap center={{ lat, lng }} style={{ width: '100%', height: '100%' }} level={4}>
            <MapMarker position={{ lat, lng }} />
          </KakaoMap>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => window.open(naverUrl, '_blank', 'noopener,noreferrer')}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-[13px] text-black transition hover:bg-black hover:text-white"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#03C75A] text-[10px] font-bold text-white">N</span>
          네이버지도
        </button>
        <button
          type="button"
          onClick={() => window.open(kakaoUrl, '_blank', 'noopener,noreferrer')}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-[13px] text-black transition hover:bg-black hover:text-white"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FEE500] text-[10px] font-bold text-[#3C1E1E]">K</span>
          카카오맵
        </button>
        <button
          type="button"
          onClick={() => window.open(tmapUrl, '_blank', 'noopener,noreferrer')}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-[13px] text-black transition hover:bg-black hover:text-white"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0A43FF] text-[10px] font-bold text-white">T</span>
          티맵
        </button>
      </div>

      <p className="text-[13px] leading-[1.9] text-black/65">
        영등포역 타임스퀘어에서 도보 7분
        <br />
        문래역에서 도보 7분
        <br />
        문래역 4번 출구 뒤쪽에서 셔틀버스 상시(5분 주기) 운행
      </p>
    </section>
  );
};

export default Map;
