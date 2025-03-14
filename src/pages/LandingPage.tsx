
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TeamMember = {
  name: string;
  role: string;
  imageSrc: string;
};

// Sample team members - in a real app these would come from a database
const defaultTeamMembers: TeamMember[] = [
  {
    name: "Alex Johnson",
    role: "Lead Developer",
    imageSrc: "/placeholder.svg"
  },
  {
    name: "Sam Taylor",
    role: "UI/UX Designer",
    imageSrc: "/placeholder.svg"
  },
  {
    name: "Jordan Smith",
    role: "Content Manager",
    imageSrc: "/placeholder.svg"
  },
  {
    name: "Casey Williams",
    role: "Marketing Director",
    imageSrc: "/placeholder.svg"
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);
  const [teamMembers] = useState<TeamMember[]>(defaultTeamMembers);

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    // Countdown display
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30">
      <div className="text-center max-w-3xl px-4 animate-fade-in">
        <h1 className="text-5xl font-bold font-serif mb-2">Group 7</h1>
        <p className="text-muted-foreground mb-12">The creative minds behind Memeopolis</p>
        
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-3 border-2 border-primary">
                  <AvatarImage src={member.imageSrc} alt={member.name} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <Users size={32} />
                  </AvatarFallback>
                </Avatar>
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Redirecting to Memeopolis in <span className="font-bold">{timeLeft}</span> seconds...
        </p>
        
        <Button onClick={handleSkip} variant="outline" className="px-8">
          Skip
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
