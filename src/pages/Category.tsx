
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Meme, getMemesByCategory, categoryInfo } from '@/data/memes';
import Header from '@/components/Header';
import MemeCard from '@/components/MemeCard';
import Footer from '@/components/Footer';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      setIsLoading(true);
      try {
        const categoryMemes = getMemesByCategory(categoryId as any);
        setMemes(categoryMemes);
      } catch (error) {
        console.error('Error fetching memes:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse inline-block w-16 h-16 rounded-full bg-secondary mb-4"></div>
          <p className="text-muted-foreground">Loading memes...</p>
        </div>
      </div>
    );
  }

  if (!categoryId || !categoryInfo[categoryId as any]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Category not found</h2>
          <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const { name, emoji, description, color } = categoryInfo[categoryId as any];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Header */}
      <div className={`pt-32 pb-16 bg-${color}-light`}>
        <div className="page-container">
          <div className="max-w-3xl animate-fade-in">
            <div className="text-5xl mb-4">{emoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              {name}
            </h1>
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Memes Grid */}
      <div className="page-container py-16">
        {memes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {memes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No memes found</h3>
            <p className="text-muted-foreground">
              There are no memes in this category yet.
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Category;
