import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Code2, 
  Globe, 
  Cloud, 
  Blocks, 
  Brain, 
  Smartphone,
  Server,
  Shield,
  Database,
  Gamepad2,
  Palette,
  Wifi,
  Atom,
  GitBranch
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Computer Science',
    description: 'Fundamentals, algorithms, and data structures',
    icon: Code2,
  },
  {
    name: 'Web Development',
    description: 'Frontend, backend, and full-stack development',
    icon: Globe,
  },
  {
    name: 'Cloud Computing',
    description: 'AWS, Azure, GCP, and cloud-native technologies',
    icon: Cloud,
  },
  {
    name: 'Blockchain & Web3',
    description: 'Smart contracts, DeFi, and decentralized apps',
    icon: Blocks,
  },
  {
    name: 'AI/ML & Data Science',
    description: 'Machine learning, deep learning, and data analysis',
    icon: Brain,
  },
  {
    name: 'Mobile Development',
    description: 'iOS, Android, and cross-platform development',
    icon: Smartphone,
  },
  {
    name: 'DevOps',
    description: 'CI/CD, automation, and infrastructure',
    icon: Server,
  },
  {
    name: 'Cybersecurity',
    description: 'Security practices and ethical hacking',
    icon: Shield,
  },
  {
    name: 'Data Engineering',
    description: 'Data pipelines, ETL, and big data tools',
    icon: Database,
  },
  {
    name: 'Game Development',
    description: 'Unity, Unreal, and game design patterns',
    icon: Gamepad2,
  },
  {
    name: 'UI/UX Design',
    description: 'User research, prototyping, and design systems',
    icon: Palette,
  },
  {
    name: 'Internet of Things',
    description: 'Embedded systems, sensors, and IoT platforms',
    icon: Wifi,
  },
  {
    name: 'Quantum Computing',
    description: 'Quantum algorithms and quantum programming',
    icon: Atom,
  },
  {
    name: 'Open Source',
    description: 'Contributing to and maintaining open source projects',
    icon: GitBranch,
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
