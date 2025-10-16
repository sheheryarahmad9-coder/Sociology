
import React from 'react';
import { LeaderboardQuote } from '../types';

interface LeaderboardProps {
  quotes: LeaderboardQuote[];
  onRefresh: () => void;
  isLoading: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ quotes, onRefresh, isLoading }) => {
  return (
    <div className="bg-black/20 p-4 rounded-xl">
      <h3 className="font-bold text-lg">🏆 Top Shared Quotes</h3>
      <div className="mt-3 space-y-3 min-h-[150px]">
        {isLoading ? (
          <div className="text-center text-white/60 pt-8">Loading...</div>
        ) : (
          quotes.map((q) => (
            <div key={q._id} className="bg-white/5 p-3 rounded-lg text-sm">
              <p className="italic text-white/90">“{q.text}”</p>
              <div className="text-xs text-white/70 mt-2">❤️ {q.likes ?? 0}</div>
            </div>
          ))
        )}
        {!isLoading && quotes.length === 0 && (
             <div className="text-center text-white/60 pt-8">No quotes yet.</div>
        )}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-transparent border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
