import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import Guestbook from './components/Guestbook';
import Map from './components/Map';
import { weddingInfo } from './data/info';

const INTRO_DURATION_MS = 2600;
const CEREMONY_DATE = new Date(2026, 9, 11);
const PLACEHOLDER_VIDEO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

function SectionTitle({ children, bold = false }) {
  return (
    <h2
      className={`text-[28px] leading-[1.2] tracking-[-0.04em] text-black ${
        bold ? 'font-semibold' : 'font-normal'
      }`}
    >
      {children}
    </h2>
  );
}

function AccountAccordion({ title, people }) {
  const [open, setOpen] = useState(false);
  const [copiedValue, setCopiedValue] = useState('');

  const copyText = async (account) => {
    try {
      await navigator.clipboard.writeText(account);
      setCopiedValue(account);
      window.setTimeout(() => setCopiedValue(''), 1600);
    } catch (error) {
      console.error('Failed to copy account:', error);
    }
  };

  return (
    <div className="rounded-[28px] border border-black/10 bg-[#fafafa]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-base font-medium text-black">{title} 계좌번호</span>
        <span className="text-sm text-black/50">{open ? '닫기' : '열기'}</span>
      </button>

      {open && (
        <div className="border-t border-black/10 px-5 py-2">
          {people.map((person) => (
            <div
              key={`${title}-${person.label}-${person.account}`}
              className="flex items-center justify-between gap-4 border-b border-black/5 py-4 last:border-b-0"
            >
              <div>
                <p className="text-sm text-black/45">{person.label}</p>
                <p className="mt-1 text-lg font-medium text-black">{person.name}</p>
                <p className="mt-1 text-sm text-black/60">{person.account}</p>
              </div>

              <button
                type="button"
                onClick={() => copyText(person.account)}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-black/10 px-3 py-2 text-sm text-black transition hover:bg-black hover:text-white"
              >
                {copiedValue === person.account ? <Check size={14} /> : <Copy size={14} />}
                {copiedValue === person.account ? '복사됨' : '복사'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageCarousel({ title, images }) {
  const viewportRef = useRef(null);

  const scrollByCard = (direction) => {
    const node = viewportRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.88, 320), behavior: 'smooth' });
  };

  return (
    <section className="section-block gap-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle bold>{title}</SectionTitle>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={`${title} 이전`}
            onClick={() => scrollByCard(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-black hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label={`${title} 다음`}
            onClick={() => scrollByCard(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-black hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={viewportRef} className="carousel-track">
        {images.map((image) => (
          <figure key={`${title}-${image.src}`} className="carousel-card">
            <img
              src={`${import.meta.env.BASE_URL}${image.src}`}
              alt={image.caption}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <figcaption className="border-t border-black/5 px-5 py-4 text-sm text-black/60">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CalendarBlock() {
  const weeks = useMemo(() => {
    const year = 2026;
    const monthIndex = 9;
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const cells = Array.from({ length: firstDay }, () => null);

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(day);
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    const weekRows = [];
    for (let i = 0; i < cells.length; i += 7) {
      weekRows.push(cells.slice(i, i + 7));
    }

    return weekRows;
  }, []);

  return (
    <div className="rounded-[32px] border border-black/10 bg-[#fafafa] p-6">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xl font-medium text-black">2026.10</p>
        <p className="text-sm text-black/45">Sun Mon Tue Wed Thu Fri Sat</p>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm text-black/45">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-2 space-y-2">
        {weeks.map((week, rowIndex) => (
          <div key={`week-${rowIndex}`} className="grid grid-cols-7 gap-2">
            {week.map((day, colIndex) => {
              const isHighlight = day === 11;
              return (
                <div
                  key={`day-${rowIndex}-${colIndex}`}
                  className={`flex aspect-square items-center justify-center rounded-full text-base ${
                    isHighlight ? 'bg-black text-white' : 'text-black'
                  }`}
                >
                  {day ?? ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [dDayText, setDDayText] = useState('D-00');

  const loveStoryImages = weddingInfo.gallery.slice(0, 5);
  const galleryImages = weddingInfo.gallery.slice(5, 10);

  useEffect(() => {
    document.title = `${weddingInfo.groom.name} and ${weddingInfo.bride.name} | Wedding Invitation`;

    const description = `${weddingInfo.dateLabel} ${weddingInfo.timeLabel}, ${weddingInfo.location.name}`;

    const updateMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', document.title, true);
    updateMeta('og:description', description, true);
    updateMeta('twitter:title', document.title);
    updateMeta('twitter:description', description);
  }, []);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (introVisible) {
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      body.style.touchAction = 'none';
    } else {
      body.style.overflow = '';
      html.style.overflow = '';
      body.style.touchAction = '';
    }

    const timer = window.setTimeout(() => {
      setIntroVisible(false);
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
      body.style.overflow = '';
      html.style.overflow = '';
      body.style.touchAction = '';
    };
  }, [introVisible]);

  useEffect(() => {
    const updateDDay = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diffDays = Math.max(
        0,
        Math.ceil((CEREMONY_DATE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      );
      setDDayText(`D-${String(diffDays).padStart(2, '0')}`);
    };

    updateDDay();
  }, []);

  return (
    <>
      {introVisible && (
        <div className="intro-overlay">
          <div className="intro-text">
            <div className="intro-line intro-line-primary">
              <span className="intro-name">박수빈</span>
              <span className="intro-amp">&amp;</span>
              <span className="intro-name">김소희</span>
            </div>
            <div className="intro-line intro-line-secondary">저희의 결혼식에 초대드립니다.</div>
          </div>
        </div>
      )}

      <div className="app-shell">
        <main className="mx-auto flex w-full max-w-[480px] flex-col bg-white">
          <section className="flex flex-col gap-8">
            <div className="overflow-hidden bg-black">
              <div className="relative aspect-[4/6]">
                <video
                  className="h-full w-full object-cover object-center"
                  src={PLACEHOLDER_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-transparent via-white/55 to-white" />
              </div>
            </div>

            <div className="space-y-4 px-6 text-center">
              <div className="space-y-2">
                <p className="leading-tight text-black">
                  <span className="text-[24px] font-bold">박수빈</span>
                  <span className="mx-2 text-[20px] font-normal">그리고</span>
                  <span className="text-[24px] font-bold">김소희</span>
                </p>
                <p className="text-[22px] leading-tight tracking-[-0.04em] text-black">
                  10월 11일 저희 결혼합니다.
                </p>
              </div>
            </div>
          </section>

          <section className="section-block gap-4 pt-0 text-center">
            <p className="text-[1.15rem] leading-relaxed text-black/70">
              2026.10.11 (일) 12:00
                <br />
              JK아트컨벤션 아트리움홀
            </p>
          </section>

          <section className="section-block gap-8">
            <div className="grid grid-cols-2 gap-4">
              <article className="overflow-hidden rounded-[32px] border border-black/10 bg-[#fafafa]">
                <div className="aspect-square">
                  <img
                    src={`${import.meta.env.BASE_URL}${weddingInfo.gallery[0].src}`}
                    alt="신랑 박수빈"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2 px-5 py-5 text-center">
                  <p className="text-sm leading-relaxed text-black/55">
                    박경수, 신정미의 장남
                  </p>
                  <p className="text-[1.65rem] font-medium tracking-[-0.04em] text-black">수빈</p>
                </div>
              </article>

              <article className="overflow-hidden rounded-[32px] border border-black/10 bg-[#fafafa]">
                <div className="aspect-square">
                  <img
                    src={`${import.meta.env.BASE_URL}${weddingInfo.gallery[1].src}`}
                    alt="신부 김소희"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2 px-5 py-5 text-center">
                  <p className="text-sm leading-relaxed text-black/55">
                    김종범, 송해란의 장녀
                  </p>
                  <p className="text-[1.65rem] font-medium tracking-[-0.04em] text-black">소희</p>
                </div>
              </article>
            </div>

            <div className="grid gap-4">
              <AccountAccordion
                title="신랑측"
                people={[
                  { label: '신랑', name: weddingInfo.groom.name, account: weddingInfo.groom.account },
                  {
                    label: '부',
                    name: weddingInfo.groom.father.name,
                    account: weddingInfo.groom.father.account,
                  },
                  {
                    label: '모',
                    name: weddingInfo.groom.mother.name,
                    account: weddingInfo.groom.mother.account,
                  },
                ]}
              />
              <AccountAccordion
                title="신부측"
                people={[
                  { label: '신부', name: weddingInfo.bride.name, account: weddingInfo.bride.account },
                  {
                    label: '부',
                    name: weddingInfo.bride.father.name,
                    account: weddingInfo.bride.father.account,
                  },
                  {
                    label: '모',
                    name: weddingInfo.bride.mother.name,
                    account: weddingInfo.bride.mother.account,
                  },
                ]}
              />
            </div>
          </section>

          <section className="section-block text-center">
            <p className="text-[28px] leading-[1.7] tracking-[-0.03em] text-black">
              오래 알고 지낸 친구처럼,
              <br />
              앞으로도 그렇게 함께하려 합니다.
              <br />
              따뜻한 축복으로 자리를 빛내 주세요.
            </p>
          </section>

          <section className="section-block gap-8">
            <SectionTitle>D-Day</SectionTitle>
            <CalendarBlock />
            <div className="text-center">
              <p className="text-lg text-black/55">수빈 and 소희 결혼식까지</p>
              <p className="mt-3 text-[3rem] font-semibold tracking-[-0.06em] text-black">
                {dDayText}
              </p>
            </div>
          </section>

          <ImageCarousel title="우리의 이야기" images={loveStoryImages} />
          <ImageCarousel title="갤러리" images={galleryImages} />

          <section className="section-block gap-8">
            <SectionTitle bold>안내사항</SectionTitle>
            <figure className="overflow-hidden rounded-[32px] border border-black/10 bg-[#fafafa]">
              <img
                src={`${import.meta.env.BASE_URL}images/timeline/anniversary.jpg`}
                alt="안내사항 이미지"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
          </section>

          <Map />
          <Guestbook />
        </main>
      </div>
    </>
  );
}

export default App;
