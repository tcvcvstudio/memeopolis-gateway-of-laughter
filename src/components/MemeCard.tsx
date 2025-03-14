
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare } from 'lucide-react';
import { Meme } from '@/data/memes';
import CategoryPill from './CategoryPill';

interface MemeCardProps {
  meme: Meme;
  featured?: boolean;
}

const MemeCard = ({ meme, featured = false }: MemeCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/meme/${meme.id}`}
      className={`block glass-card overflow-hidden group ${
        featured ? 'aspect-[16/9]' : 'aspect-square'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full">
        {/* Image */}
        <div className={`absolute inset-0 transition-transform duration-700 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}>
          <div className={isImageLoaded ? '' : 'img-loading'}>
            <img
              src={meme.imageUrl}
              alt={meme.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

        {/* Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <CategoryPill category={meme.category} />
            
            {meme.trending && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                Trending
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
              {meme.title}
            </h3>
            
            {featured && (
              <p className="text-white/80 text-sm line-clamp-2">{meme.description}</p>
            )}
            
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1 text-white/90">
                <Heart size={14} className="fill-white/80 stroke-white/80" />
                <span className="text-xs">{meme.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-white/90">
                <MessageSquare size={14} />
                <span className="text-xs">{meme.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MemeCard;
