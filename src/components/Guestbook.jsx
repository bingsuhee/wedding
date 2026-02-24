import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Send, User, MessageSquare } from 'lucide-react';

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchMessages();
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
      await fetchMessages();
    } catch (error) {
      console.error('Error adding message:', error.message);
      alert('메시지 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-gray-50/30">
      <h3 className="text-xl font-serif mb-12 text-wedding-accent text-center">방명록</h3>

      <form onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-4">
          <input
            type="text"
            placeholder="이름"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-wedding-accent text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="축하 메시지를 남겨주세요"
            className="w-full h-24 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-wedding-accent text-sm resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-wedding-accent text-white rounded-lg text-sm font-medium transition hover:bg-opacity-90 disabled:bg-gray-300"
        >
          <Send size={16} /> {loading ? '보내는 중...' : '축하메시지 보내기'}
        </button>
      </form>

      <div className="space-y-4">
        {fetching ? (
          <div className="text-center py-10 text-gray-400">로딩 중...</div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white p-4 rounded-xl border border-gray-50 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <User size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">{msg.name}</span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            <MessageSquare size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">첫 번째 축하 메시지를 남겨주세요.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Guestbook;
