
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';

interface ChatPanelProps {
  messages: Message[];
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-black/20 p-3 rounded-xl h-96 overflow-y-auto flex flex-col gap-3">
      {messages.map((msg, index) => (
        <div key={index} className={`max-w-[80%] w-fit rounded-xl px-4 py-2 ${msg.user === 'You' ? 'bg-indigo-500 self-end' : 'bg-purple-900/80 self-start'}`}>
          <strong className="text-sm">{msg.user}</strong>
          <p className="text-white/90 text-base whitespace-pre-wrap mt-1">{msg.text}</p>
        </div>
      ))}
       {messages.length === 0 && (
        <div className="m-auto text-center text-white/50">
            <p>Chat history will appear here.</p>
            <p className="text-sm mt-1">Select a room and ask a question to start.</p>
        </div>
       )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatPanel;
