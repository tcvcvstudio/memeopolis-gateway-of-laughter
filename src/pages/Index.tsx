
import { useState, useEffect } from 'react';
import { getFeaturedMemes, getTrendingMemes, getAllCategories, categoryInfo, Meme } from '@/data/memes';
import Header from '@/components/Header';
import FeaturedMeme from '@/components/FeaturedMeme';
import MemeCard from '@/components/MemeCard';
import CategoryPill from '@/components/CategoryPill';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import UploadButton from '@/components/UploadButton';
import AdminUploadButton from '@/components/AdminUploadButton';

const Index = () => {
  const [featuredMemes, setFeaturedMemes] = useState<Meme[]>([]);
  const [trendingMemes, setTrendingMemes] = useState<Meme[]>([]);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const categories = getAllCategories();

  useEffect(() => {
    setFeaturedMemes(getFeaturedMemes());
    setTrendingMemes(getTrendingMemes());
  }, []);

  // Rotate featured memes every 10 seconds
  useEffect(() => {
    if (featuredMemes.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % featuredMemes.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [featuredMemes.length]);

  if (featuredMemes.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Featured Meme */}
      {featuredMemes.length > 0 && (
        <FeaturedMeme meme={featuredMemes[currentFeatureIndex]} />
      )}
      
      {/* Trending Section */}
      <section className="page-container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-serif">
            Trending Memes
          </h2>
          <div className="flex items-center gap-4">
            <AdminUploadButton />
            <UploadButton />
            <Link 
              to="/trending"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>See all</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingMemes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="bg-secondary/30 py-16">
        <div className="page-container">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">
            Explore Categories
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="glass-card p-6 hover:translate-y-[-4px] transition-transform"
              >
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">{categoryInfo[category].emoji}</div>
                  <h3 className="text-xl font-bold mb-2">{categoryInfo[category].name}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {categoryInfo[category].description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className={`text-${categoryInfo[category].color} flex items-center gap-1 font-medium`}>
                      <span>Browse memes</span>
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="page-container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-secondary px-3 py-1 rounded-full text-xs font-medium mb-4">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Get the freshest memes delivered to your inbox
          </h2>
          <p className="text-muted-foreground mb-8">
            Join our newsletter for a weekly dose of the best intellectual memes across all categories.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-background border border-border rounded-l-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-r-lg text-sm font-medium transition-colors hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
