
import { Link } from 'react-router-dom';
import { getAllCategories, categoryInfo } from '@/data/memes';

const Footer = () => {
  const categories = getAllCategories();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-primary to-science bg-clip-text text-transparent">
                Memeopolis
              </h2>
            </Link>
            <p className="text-muted-foreground">
              Where humor meets intellect. Discover memes that make you laugh and learn at the same time.
            </p>
          </div>

          {/* Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/category/${category}`}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <span>{categoryInfo[category].emoji}</span>
                    <span>{categoryInfo[category].name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-muted-foreground hover:text-foreground transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => alert('Random meme feature coming soon!')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Random Meme
                </button>
              </li>
              <li>
                <button 
                  onClick={() => alert('Submit feature coming soon!')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submit a Meme
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest memes delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-background border border-border rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg text-sm font-medium transition-colors hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} Memeopolis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
