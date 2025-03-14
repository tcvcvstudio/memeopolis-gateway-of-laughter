
import { Link } from 'react-router-dom';
import { Category, categoryInfo } from '@/data/memes';

interface CategoryPillProps {
  category: Category;
  showIcon?: boolean;
  className?: string;
}

const CategoryPill = ({ category, showIcon = true, className = '' }: CategoryPillProps) => {
  const { name, emoji, color } = categoryInfo[category];
  
  return (
    <Link
      to={`/category/${category}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-transform hover:scale-105 category-${category} ${className}`}
    >
      {showIcon && <span>{emoji}</span>}
      <span>{name}</span>
    </Link>
  );
};

export default CategoryPill;
