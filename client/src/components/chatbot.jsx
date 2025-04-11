import React, { useState } from 'react';
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

const chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const togglePopup = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg, { role: 'bot', content: 'Loading...' }]);
    setInput('');

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://www.sitename.com',
          'X-Title': 'SiteName',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content || 'No response received.';

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'bot', content: botReply };
        return updated;
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'bot', content: `Error: ${err.message}` };
        return updated;
      });
    }
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="fixed bottom-5 right-5 bg-gray-700 text-white w-14 h-14 rounded-full shadow-lg text-2xl z-50 cursor-pointer"
      >
        🩺
        {/* +🤖 */}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 w-80 bg-white rounded-lg shadow-2xl p-4 z-50">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">Ask HealNow Bot</h2>
          <div className="bg-gray-100 p-2 rounded-md h-40 overflow-y-auto mb-2 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-1 ${msg.role === 'user' ? 'font-bold text-black' : ''}`}>
                {msg.role === 'user' ? 'You: ' : 'Bot: '}
                {msg.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Enter your question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border px-2 py-1 rounded-md mb-2 text-sm"
          />
          <button
            onClick={sendMessage}
            className="w-full bg-blue-300 text-white py-2 rounded-md text-sm hover:bg-blue-300"
          >
            Ask
          </button>
        </div>
      )}
    </>
  );
};

export default chatbot;
