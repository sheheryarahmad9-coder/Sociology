
import React, { useRef, useState } from 'react';

interface QuoteCardWrapperProps {
  quoteText: string;
  hashtags: string[];
}

// Separate component for the visual card to make targeting with html2canvas easier
const QuoteCard: React.ForwardRefRenderFunction<HTMLDivElement, { quoteText: string }> = ({ quoteText }, ref) => (
    <div id="quoteCard" ref={ref} className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white p-5 rounded-xl max-w-lg mx-auto shadow-lg">
        <p className="text-lg leading-tight font-medium">"{quoteText}"</p>
        <div className="mt-4 pt-3 border-t border-white/20 text-xs">
            <p className="font-bold">— Gemini AI · Sociology and Social Research</p>
            <a href="https://www.facebook.com/SociologyAndSocialResearch" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:underline">
                facebook.com/SociologyAndSocialResearch
            </a>
        </div>
    </div>
);
const ForwardedQuoteCard = React.forwardRef(QuoteCard);


const QuoteCardWrapper: React.FC<QuoteCardWrapperProps> = ({ quoteText, hashtags }) => {
    const quoteCardRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveImage = async () => {
        const element = quoteCardRef.current;
        if (!element || !(window as any).html2canvas) return;

        setIsSaving(true);
        try {
            const canvas = await (window as any).html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: null, // Keep gradient
            });
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'Sociology_and_Social_Research_quote.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Failed to create image:', error);
            alert('Failed to create image. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };
    
    const shareText = encodeURIComponent(`"${quoteText}" — via Sociology and Social Research ${hashtags.join(' ')}`);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.facebook.com/SociologyAndSocialResearch')}&quote=${shareText}`;
    const waShareUrl = `https://wa.me/?text=${shareText}`;
    const inShareUrl = `https://www.instagram.com/`; // Instagram requires manual upload

    return (
        <div className="mt-6 animate-fade-in">
            <ForwardedQuoteCard ref={quoteCardRef} quoteText={quoteText} />
            
            <div className="flex gap-2 justify-center mt-4 flex-wrap">
                <button onClick={handleSaveImage} disabled={isSaving} className="share-btn">
                    📸 {isSaving ? 'Saving...' : 'Save Image'}
                </button>
                <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="social-btn bg-[#1877F2]">🔵 Facebook</a>
                <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className="social-btn bg-[#25D366] text-black">💬 WhatsApp</a>
                <a href={inShareUrl} target="_blank" rel="noopener noreferrer" className="social-btn bg-[#E1306C]">📷 Instagram</a>
            </div>

            <div className="text-center mt-3 text-sm text-white/80">
                {hashtags.map(tag => <span key={tag} className="mx-2">{tag}</span>)}
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                .share-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background-color 0.2s; }
                .share-btn:hover:not(:disabled) { background-color: rgba(255,255,255,0.1); }
                .share-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .social-btn { padding: 8px 12px; border-radius: 8px; text-decoration: none; color: white; font-weight: 600; }
            `}</style>
        </div>
    );
};

export default QuoteCardWrapper;
