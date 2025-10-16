
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getSystemInstruction = (room: string): string => {
    switch (room) {
        case 'Ask a Sociologist':
            return "You are an expert sociologist. Provide insightful, clear, and academic answers to questions about sociology, social structures, and human behavior. Cite thinkers or theories where appropriate, but keep it accessible.";
        case 'Study Advice (Psychology)':
            return "You are a friendly and encouraging academic advisor specializing in psychology. Offer practical, evidence-based study tips and advice for students. Frame your answers in a supportive tone.";
        case 'Debate Corner':
            return "You are a neutral and highly intelligent debate moderator. When presented with a topic, provide a concise, well-structured argument for one side. Be prepared to argue the opposing side if asked. Your goal is to stimulate critical thinking.";
        case 'Research Discussion':
            return "You are a research assistant in the social sciences. Discuss research methodologies, data analysis, and academic writing. Be precise and technical, but explain complex concepts clearly.";
        default:
            return "You are a helpful AI assistant specializing in sociology and social sciences.";
    }
};

export const askGemini = async (message: string, room: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: message }] }],
            config: {
                systemInstruction: getSystemInstruction(room),
            },
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return "Sorry, I encountered an error while processing your request. Please try again.";
    }
};

export const generateHashtags = async (text: string): Promise<string[]> => {
    try {
        const prompt = `Generate exactly 3 short, relevant, trending hashtags for the following quote. Respond ONLY with the hashtags separated by spaces, for example: #sociology #research #AI. Do not add any other text or explanation. Quote: "${text}"`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                temperature: 0.5,
            }
        });

        const rawTags = response.text.trim();
        const tags = rawTags.split(/\s+/).filter(tag => tag.startsWith('#')).slice(0, 3);
        return tags.length > 0 ? tags : ['#Sociology', '#SocialScience', '#Quote'];
    } catch (error) {
        console.error("Hashtag generation failed:", error);
        return ['#Sociology', '#SocialScience', '#Quote'];
    }
};
