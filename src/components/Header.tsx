
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MenuIcon, X } from 'lucide-react';
import { getAllCategories, categoryInfo } from '@/data/memes';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const categories = getAllCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/home" 
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-bold font-serif bg-gradient-to-r from-primary to-science bg-clip-text text-transparent">
              Memeopolis
            </span>
            <span className="hidden md:inline-block text-xs bg-secondary px-2 py-0.5 rounded-full font-medium">
              Gateway of Laughter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className={`text-sm font-medium transition-colors hover:text-${categoryInfo[category].color} relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:origin-bottom-right after:scale-x-0 after:bg-${categoryInfo[category].color} after:transition-transform hover:after:origin-bottom-left hover:after:scale-x-100`}
              >
                {categoryInfo[category].name}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            
            <button 
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] glass-effect animate-fade-in overflow-y-auto max-h-[calc(100vh-60px)]">
          <div className="p-4 space-y-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className={`block p-3 rounded-lg bg-${categoryInfo[category].color}-light text-${categoryInfo[category].color}-dark font-medium transition-colors hover:bg-${categoryInfo[category].color}/20`}
              >
                <div className="flex items-center gap-2">
                  <span>{categoryInfo[category].emoji}</span>
                  <span>{categoryInfo[category].name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
