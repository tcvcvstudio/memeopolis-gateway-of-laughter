
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { Meme } from '@/data/memes';
import CategoryPill from './CategoryPill';

interface FeaturedMemeProps {
  meme: Meme;
}

const FeaturedMeme = ({ meme }: FeaturedMemeProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative h-[calc(100vh-6rem)] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className={isImageLoaded ? '' : 'img-loading'}>
          <img
            src={meme.imageUrl}
            alt={meme.title}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isImageLoaded ? 'opacity-60' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="page-container h-full flex flex-col justify-end pb-16">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            <CategoryPill category={meme.category} className="mb-2 md:mb-4" />
            
            <h1 className="text-4xl md:text-6xl font-bold font-serif">
              {meme.title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
              {meme.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link
                to={`/meme/${meme.id}`}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95"
              >
                View Meme
              </Link>
              
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>{meme.likes}</span>
                </button>
                
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>{meme.comments}</span>
                </button>
                
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMeme;
