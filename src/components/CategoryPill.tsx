
import { Link } from 'react-router-dom';
import { Category, categoryInfo } from '@/data/memes';

interface CategoryPillProps {
  category: Category;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

const CategoryPill = ({ 
  category, 
  showIcon = true, 
  className = '',
  onClick
}: CategoryPillProps) => {
  const { name, emoji, color } = categoryInfo[category];
  
  const content = (
    <>
      {showIcon && <span>{emoji}</span>}
      <span>{name}</span>
    </>
  );
  
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-transform hover:scale-105 category-${category} ${className}`}
      >
        {content}
      </button>
    );
  }
  
  return (
    <Link
      to={`/category/${category}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-transform hover:scale-105 category-${category} ${className}`}
    >
      {content}
    </Link>
  );
};

export default CategoryPill;
