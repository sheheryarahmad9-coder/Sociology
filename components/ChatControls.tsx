
import React from 'react';

interface ChatControlsProps {
  userInput: string;
  setUserInput: (value: string) => void;
  handleSendMessage: () => void;
  handleClearChat: () => void;
  isLoading: boolean;
}

const ChatControls: React.FC<ChatControlsProps> = ({ userInput, setUserInput, handleSendMessage, handleClearChat, isLoading }) => {
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex gap-2 mt-3">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about sociology, psychology, or study tips..."
        className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
        disabled={isLoading}
      />
      <button
        onClick={handleSendMessage}
        disabled={isLoading || !userInput}
        className="bg-pink-500 text-black font-semibold px-4 py-2 rounded-lg disabled:bg-pink-500/50 disabled:cursor-not-allowed hover:bg-pink-400 transition-colors"
      >
        {isLoading ? 'Thinking...' : 'Ask Gemini'}
      </button>
      <button
        onClick={handleClearChat}
        className="bg-transparent border border-white/20 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        Clear
      </button>
    </div>
  );
};

export default ChatControls;
