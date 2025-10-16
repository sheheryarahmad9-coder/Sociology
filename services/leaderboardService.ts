
import { LeaderboardQuote } from '../types';

const MOCK_QUOTES: LeaderboardQuote[] = [
  { _id: '1', text: "The sociological imagination enables us to grasp history and biography and the relations between the two within society.", likes: 128 },
  { _id: '2', text: "Society is a complex system whose parts work together to promote solidarity and stability.", likes: 94 },
  { _id: '3', text: "Culture is the widening of the mind and of the spirit.", likes: 72 },
];

export const fetchLeaderboard = (): Promise<LeaderboardQuote[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_QUOTES.sort((a, b) => b.likes - a.likes));
    }, 800);
  });
};

export const saveQuoteToBoard = (text: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    console.log('Simulating save quote to leaderboard:', text);
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};
