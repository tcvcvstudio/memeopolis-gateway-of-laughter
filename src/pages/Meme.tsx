
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Meme as MemeType, getMemeById } from '@/data/memes';
import Header from '@/components/Header';
import MemeView from '@/components/MemeView';
import Footer from '@/components/Footer';

const Meme = () => {
  const { memeId } = useParams<{ memeId: string }>();
  const [meme, setMeme] = useState<MemeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (memeId) {
      setIsLoading(true);
      try {
        const fetchedMeme = getMemeById(memeId);
        if (fetchedMeme) {
          setMeme(fetchedMeme);
        } else {
          setError('Meme not found');
        }
      } catch (err) {
        setError('Error loading meme');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [memeId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse inline-block w-16 h-16 rounded-full bg-secondary mb-4"></div>
          <p className="text-muted-foreground">Loading meme...</p>
        </div>
      </div>
    );
  }

  if (error || !meme) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MemeView meme={meme} />
      <Footer />
    </div>
  );
};

export default Meme;
