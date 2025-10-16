
import React from 'react';

interface HeaderProps {
  selectedRoom: string;
  onRoomChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  rooms: string[];
}

const Header: React.FC<HeaderProps> = ({ selectedRoom, onRoomChange, rooms }) => {
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap pb-4 border-b border-white/10">
      <div>
        <h1 className="text-2xl font-bold tracking-wide">SociologyTalk — AI Chat Community</h1>
        <p className="text-sm text-white/75 mt-1">
          Ask Sociologist • Study Advice • Debate Corner — Powered by Gemini · <span className="font-semibold text-white/90">Sociology and Social Research</span>
        </p>
      </div>
      <div className="text-right">
        <select
          id="room"
          value={selectedRoom}
          onChange={onRoomChange}
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          title="Chat room"
        >
          {rooms.map(room => (
            <option key={room} className="bg-purple-700 text-white">{room}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
