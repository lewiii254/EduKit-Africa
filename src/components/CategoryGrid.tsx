import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Code2, 
  Globe, 
  Cloud, 
  Blocks, 
  Brain, 
  Smartphone,
  Server,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Computer Science',
    description: 'Fundamentals, algorithms, and data structures',
    icon: Code2,
    color: 'text-primary',
  },
  {
    name: 'Web Development',
    description: 'Frontend, backend, and full-stack development',
    icon: Globe,
    color: 'text-primary',
  },
  {
    name: 'Cloud Computing',
    description: 'AWS, Azure, GCP, and cloud-native technologies',
    icon: Cloud,
    color: 'text-primary',
  },
  {
    name: 'Blockchain & Web3',
    description: 'Smart contracts, DeFi, and decentralized apps',
    icon: Blocks,
    color: 'text-primary',
  },
  {
    name: 'AI/ML & Data Science',
    description: 'Machine learning, deep learning, and data analysis',
    icon: Brain,
    color: 'text-primary',
  },
  {
    name: 'Mobile Development',
    description: 'iOS, Android, and cross-platform development',
    icon: Smartphone,
    color: 'text-primary',
  },
  {
    name: 'DevOps',
    description: 'CI/CD, automation, and infrastructure',
    icon: Server,
    color: 'text-primary',
  },
  {
    name: 'Cybersecurity',
    description: 'Security practices and ethical hacking',
    icon: Shield,
    color: 'text-primary',
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Learning Tracks</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated categories to find the perfect resources for your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} to={`/tracks?category=${encodeURIComponent(category.name)}`}>
                <Card className="h-full hover:shadow-hover transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="mb-2">
                      <Icon className={`h-8 w-8 ${category.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
