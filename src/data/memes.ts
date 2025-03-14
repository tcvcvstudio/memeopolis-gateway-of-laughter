
export type Category = 
  | 'science' 
  | 'history' 
  | 'economics' 
  | 'literature' 
  | 'mathematics' 
  | 'culture';

export interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  category: Category;
  description: string;
  likes: number;
  comments: number;
  date: string;
  trending?: boolean;
  featured?: boolean;
}

export const categoryInfo = {
  science: {
    name: 'Science & Technology',
    description: 'Memes that make physics, chemistry, biology, and tech concepts hilariously accessible.',
    emoji: '🔬',
    color: 'science'
  },
  history: {
    name: 'History & Politics',
    description: 'Historical events and political concepts explained through humor and satire.',
    emoji: '📜',
    color: 'history'
  },
  economics: {
    name: 'Economics & Finance',
    description: 'Making sense of markets, money, and economic theories through clever memes.',
    emoji: '📊',
    color: 'economics'
  },
  literature: {
    name: 'Language & Literature',
    description: 'Grammar rules, famous quotes, and literary classics reimagined as entertaining memes.',
    emoji: '📚',
    color: 'literature'
  },
  mathematics: {
    name: 'Mathematics & Logic',
    description: 'Equations, theorems, and logical puzzles presented with a humorous twist.',
    emoji: '🧮',
    color: 'mathematics'
  },
  culture: {
    name: 'Pop Culture & Media',
    description: 'Clever takes on books, movies, TV shows, and current media trends.',
    emoji: '🎬',
    color: 'culture'
  }
};

export const memes: Meme[] = [
  {
    id: '1',
    title: "Schrödinger's Cat Dilemma",
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1000",
    category: 'science',
    description: "When your cat is both alive and dead until you check the box, but all you really care about is if it knocked over your coffee again.",
    likes: 1342,
    comments: 86,
    date: "2023-04-15",
    trending: true,
    featured: true
  },
  {
    id: '2',
    title: "Napoleon's Height Complex",
    imageUrl: "https://images.unsplash.com/photo-1551796880-ddd03f861ae7?q=80&w=1000",
    category: 'history',
    description: "When you conquer most of Europe but people only remember you for being short (which wasn't even true).",
    likes: 987,
    comments: 42,
    date: "2023-05-20",
    trending: true
  },
  {
    id: '3',
    title: "Invisible Hand of the Market",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000",
    category: 'economics',
    description: "Adam Smith's 'invisible hand' trying to regulate the market while everyone panic buys toilet paper.",
    likes: 756,
    comments: 38,
    date: "2023-03-10"
  },
  {
    id: '4',
    title: "To Be or Not To Be: Grammar Edition",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000",
    category: 'literature',
    description: "Shakespeare's internal struggle deciding between 'your' and 'you're' in modern texting.",
    likes: 1129,
    comments: 67,
    date: "2023-06-05",
    trending: true
  },
  {
    id: '5',
    title: "Dividing by Zero",
    imageUrl: "https://images.unsplash.com/photo-1635372722656-389f87a941db?q=80&w=1000",
    category: 'mathematics',
    description: "Mathematicians explaining why dividing by zero breaks the universe vs. Me just wanting to split the bill evenly.",
    likes: 834,
    comments: 51,
    date: "2023-02-28"
  },
  {
    id: '6',
    title: "Game of Thrones Finale Logic",
    imageUrl: "https://images.unsplash.com/photo-1599002138244-7af1cf203fef?q=80&w=1000",
    category: 'culture',
    description: "Eight seasons of character development leading to 'but who has a better story than Bran?'",
    likes: 2341,
    comments: 215,
    date: "2023-01-15",
    featured: true
  },
  {
    id: '7',
    title: "Newton's Third Law of Exams",
    imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1000",
    category: 'science',
    description: "For every action (studying) there is an equal and opposite reaction (forgetting everything the moment you enter the exam room).",
    likes: 921,
    comments: 47,
    date: "2023-05-12"
  },
  {
    id: '8',
    title: "French Revolution Escalation",
    imageUrl: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000",
    category: 'history',
    description: "Peasants: 'We have no bread.' Marie Antoinette: 'Let them eat cake.' Peasants: *invents guillotine*",
    likes: 876,
    comments: 63,
    date: "2023-04-25",
    trending: true
  },
  {
    id: '9',
    title: "Inflation Explained",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000",
    category: 'economics',
    description: "Your salary in 2010 vs. Your salary in 2023 vs. The cost of everything in 2023.",
    likes: 1564,
    comments: 132,
    date: "2023-06-18"
  },
  {
    id: '10',
    title: "Oxford Comma Drama",
    imageUrl: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=1000",
    category: 'literature',
    description: "I invited the strippers, JFK, and Stalin vs. I invited the strippers, JFK and Stalin.",
    likes: 932,
    comments: 87,
    date: "2023-03-22"
  },
  {
    id: '11',
    title: "Pi Day Problems",
    imageUrl: "https://images.unsplash.com/photo-1562181559-43ee7525938d?q=80&w=1000",
    category: 'mathematics',
    description: "Celebrating Pi Day by reciting digits vs. Celebrating Pi Day by eating pie. Both are irrational.",
    likes: 718,
    comments: 41,
    date: "2023-03-14"
  },
  {
    id: '12',
    title: "Philosophy in Movies",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000",
    category: 'culture',
    description: "Philosophy professors watching 'The Matrix' vs. Philosophy professors watching 'The Fast and the Furious'.",
    likes: 1243,
    comments: 94,
    date: "2023-05-30"
  }
];

export const getFeaturedMemes = (): Meme[] => {
  return memes.filter(meme => meme.featured);
};

export const getTrendingMemes = (): Meme[] => {
  return memes.filter(meme => meme.trending);
};

export const getMemesByCategory = (category: Category): Meme[] => {
  return memes.filter(meme => meme.category === category);
};

export const getMemeById = (id: string): Meme | undefined => {
  return memes.find(meme => meme.id === id);
};

export const getRandomMeme = (): Meme => {
  const randomIndex = Math.floor(Math.random() * memes.length);
  return memes[randomIndex];
};

export const getAllCategories = (): Category[] => {
  return Object.keys(categoryInfo) as Category[];
};
