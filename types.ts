
export interface Message {
  user: 'You' | 'Gemini';
  text: string;
}

export interface LeaderboardQuote {
  _id: string;
  text: string;
  likes: number;
}
