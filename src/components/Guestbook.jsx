import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Send, User, MessageSquare } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchMessages();

    // Listen to global subscription events from App.jsx
    const handleNewMessage = (e) => {
      const newMessage = e.detail;
      setMessages((prev) => [newMessage, ...prev]);
    };

    window.addEventListener('new-guestbook-message', handleNewMessage);

    return () => {
      window.removeEventListener('new-guestbook-message', handleNewMessage);
    };
  }, []);

  const fetchMessages = async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching guestbook:', error.message);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('guestbook')
        .insert([{ name: name.trim(), content: content.trim() }]);

      if (error) throw error;

      setName('');
      setContent('');
      // No need to call fetchMessages() as Realtime subscription handles it
    } catch (error) {
      console.error('Error adding message:', error.message);
      alert('메시지 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-dvh flex flex-col items-center py-20 px-6 overflow-hidden relative grid-pattern">
      <ScrollAnimationWrapper amount={0.05} className="w-full max-w-sm">
      <div className="flex flex-col">
      <h3 className="text-xl mb-12 text-wedding-accent text-center font-bold marker-highlight inline-block self-center">방명록</h3>

      <form onSubmit={handleSubmit} className="mb-10 bg-white p-6 doodle-border shrink-0 shadow-sm rotate-1">
        <div className="mb-4">
          <input
            type="text"
            placeholder="이름"
            className="w-full px-4 py-2 sketchy-border bg-white focus:outline-none focus:border-wedding-accent/50 text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="축하 메시지를 남겨주세요"
            className="w-full h-16 px-4 py-2 sketchy-border bg-white focus:outline-none focus:border-wedding-accent/50 text-base resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white text-wedding-accent doodle-border text-base font-bold transition hover:bg-gray-50 disabled:bg-gray-100 shadow-sm"
        >
          <Send size={14} /> {loading ? '보내는 중...' : '축하메시지 보내기'}
        </button>
      </form>

      <div className="flex flex-col gap-6 guestbook-list pb-10 px-2">
        {fetching ? (
          <div className="text-center py-10 text-gray-300 text-[10px]">로딩 중...</div>
        ) : messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div
              key={msg.id}
              className={`bg-white p-6 shadow-md flex flex-col gap-3 relative grid-pattern sketchy-border ${idx % 2 === 0 ? 'rotate-1 -translate-x-1' : '-rotate-1 translate-x-1'} -mb-4 hover:z-20 hover:rotate-0 transition-transform duration-300`}
              style={{ backgroundColor: idx % 3 === 0 ? '#fff9c4' : idx % 3 === 1 ? '#e3f2fd' : '#fce4ec' }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center text-gray-400">
                    <User size={16} />
                  </div>
                  <span className="font-bold text-base text-gray-700">{msg.name}</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-base text-gray-600 leading-relaxed whitespace-pre-wrap font-default">{msg.content}</p>
              {/* Washi tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 border border-gray-200/50 rotate-2 pointer-events-none" />
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-300">
            <MessageSquare size={32} className="mx-auto mb-4 opacity-10" />
            <p className="text-base italic">첫 번째 축하 메시지를 남겨주세요.</p>
          </div>
        )}
      </div>
    </div>
    </ScrollAnimationWrapper>
  </section>
  );
};

export default Guestbook;
