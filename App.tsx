
import React, { useState, useEffect, useCallback } from 'react';
import { Message, LeaderboardQuote } from './types';
import { CHAT_ROOMS } from './constants';
import * as geminiService from './services/geminiService';
import * as leaderboardService from './services/leaderboardService';
import Header from './components/Header';
import ChatPanel from './components/ChatPanel';
import ChatControls from './components/ChatControls';
import QuoteCardWrapper from './components/QuoteCardWrapper';
import Leaderboard from './components/Leaderboard';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>(CHAT_ROOMS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastReply, setLastReply] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [leaderboardQuotes, setLeaderboardQuotes] = useState<LeaderboardQuote[]>([]);
  const [isBoardLoading, setIsBoardLoading] = useState<boolean>(true);

  const fetchLeaderboard = useCallback(async () => {
    setIsBoardLoading(true);
    try {
      const quotes = await leaderboardService.fetchLeaderboard();
      setLeaderboardQuotes(quotes);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setIsBoardLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    const newMessages: Message[] = [...messages, { user: 'You', text: trimmedInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);
    setLastReply(null);
    setHashtags([]);

    try {
      const reply = await geminiService.askGemini(trimmedInput, selectedRoom);
      setMessages(prev => [...prev, { user: 'Gemini', text: reply }]);
      setLastReply(reply);
      
      // Best-effort calls, don't block UI for these
      leaderboardService.saveQuoteToBoard(reply).catch(console.warn);
      geminiService.generateHashtags(reply).then(setHashtags).catch(console.warn);

    } catch (error) {
      console.error("Error asking Gemini:", error);
      const errorMessage = 'An error occurred. Please try again.';
      setMessages(prev => [...prev, { user: 'Gemini', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setLastReply(null);
    setUserInput('');
    setHashtags([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-7">
        <div className="bg-white/5 shadow-2xl rounded-2xl p-6 backdrop-blur-sm">
            <Header
                selectedRoom={selectedRoom}
                onRoomChange={(e) => setSelectedRoom(e.target.value)}
                rooms={CHAT_ROOMS}
            />

            <div className="mt-4 flex flex-col lg:flex-row gap-6">
                <div className="flex-1 lg:order-1 order-2 min-w-0">
                    <ChatPanel messages={messages} />
                    <ChatControls
                        userInput={userInput}
                        setUserInput={setUserInput}
                        handleSendMessage={handleSendMessage}
                        handleClearChat={handleClearChat}
                        isLoading={isLoading}
                    />
                    {lastReply && (
                        <QuoteCardWrapper quoteText={lastReply} hashtags={hashtags} />
                    )}
                </div>

                <div className="w-full lg:w-80 lg:order-2 order-1 flex-shrink-0">
                    <Leaderboard quotes={leaderboardQuotes} onRefresh={fetchLeaderboard} isLoading={isBoardLoading} />
                    <InfoPanel />
                </div>
            </div>
            <Footer />
        </div>
    </div>
  );
};

export default App;
