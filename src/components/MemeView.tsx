
import { useState } from 'react';
import { ArrowLeft, Heart, MessageSquare, Share2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Meme } from '@/data/memes';
import CategoryPill from './CategoryPill';

interface MemeViewProps {
  meme: Meme;
}

const MemeView = ({ meme }: MemeViewProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <div className="page-container py-24">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CategoryPill category={meme.category} />
              <span className="text-muted-foreground text-sm">{meme.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif">
              {meme.title}
            </h1>
          </div>

          {/* Meme Image */}
          <div className="relative glass-card overflow-hidden">
            <div className={isImageLoaded ? '' : 'img-loading aspect-[16/9]'}>
              <img
                src={meme.imageUrl}
                alt={meme.title}
                className={`w-full transition-opacity duration-500 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground">
            {meme.description}
          </p>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b">
            <div className="flex items-center gap-6">
              <button 
                className="flex items-center gap-2 text-sm hover:text-foreground transition-colors"
                onClick={handleLike}
              >
                <Heart 
                  className={`w-5 h-5 transition-colors ${
                    liked ? 'fill-red-500 stroke-red-500' : 'text-muted-foreground'
                  }`} 
                />
                <span className={liked ? 'text-foreground' : 'text-muted-foreground'}>
                  {liked ? meme.likes + 1 : meme.likes}
                </span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>{meme.comments}</span>
              </button>
            </div>
            
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>

          {/* Comments Section Placeholder */}
          <div className="space-y-4 pt-6">
            <h3 className="text-xl font-bold">Comments</h3>
            <div className="glass-card p-8 text-center text-muted-foreground">
              <p>Comments are loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeView;
