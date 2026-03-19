import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowRight, CheckCircle2, Circle, ExternalLink, 
  Code2, Globe, Cloud, Brain, Smartphone, Shield, Server, Blocks,
  ChevronDown, ChevronUp, BookOpen
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface PathResource {
  id: string;
  title: string;
  description: string;
  link: string;
  difficulty: string;
  tags?: string[] | null;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedHours: number;
  resources: PathResource[];
  icon: typeof Code2;
}

const categoryIcons: Record<string, typeof Code2> = {
  'Computer Science': Code2,
  'Web Development': Globe,
  'Cloud Computing': Cloud,
  'Blockchain & Web3': Blocks,
  'AI/ML & Data Science': Brain,
  'Mobile Development': Smartphone,
  'DevOps': Server,
  'Cybersecurity': Shield,
};

const CURATED_PATHS: Omit<LearningPath, 'resources' | 'id'>[] = [
  {
    title: 'Full-Stack Web Developer',
    description: 'Go from zero to building complete web applications with frontend and backend skills.',
    category: 'Web Development',
    difficulty: 'Beginner',
    estimatedHours: 120,
    icon: Globe,
  },
  {
    title: 'Cloud Engineering Fundamentals',
    description: 'Master cloud platforms and learn to deploy, scale, and manage cloud infrastructure.',
    category: 'Cloud Computing',
    difficulty: 'Intermediate',
    estimatedHours: 80,
    icon: Cloud,
  },
  {
    title: 'AI & Machine Learning Engineer',
    description: 'Learn machine learning from foundations to building production ML systems.',
    category: 'AI/ML & Data Science',
    difficulty: 'Intermediate',
    estimatedHours: 150,
    icon: Brain,
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Build skills in threat detection, security analysis, and incident response.',
    category: 'Cybersecurity',
    difficulty: 'Beginner',
    estimatedHours: 100,
    icon: Shield,
  },
  {
    title: 'Mobile App Developer',
    description: 'Create cross-platform mobile applications for iOS and Android.',
    category: 'Mobile Development',
    difficulty: 'Intermediate',
    estimatedHours: 90,
    icon: Smartphone,
  },
  {
    title: 'DevOps & Site Reliability',
    description: 'Master CI/CD, containerization, monitoring, and infrastructure automation.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    estimatedHours: 110,
    icon: Server,
  },
  {
    title: 'Computer Science Foundations',
    description: 'Build strong CS fundamentals with algorithms, data structures, and system design.',
    category: 'Computer Science',
    difficulty: 'Beginner',
    estimatedHours: 200,
    icon: Code2,
  },
  {
    title: 'Blockchain Developer',
    description: 'Learn smart contract development and decentralized application architecture.',
    category: 'Blockchain & Web3',
    difficulty: 'Intermediate',
    estimatedHours: 80,
    icon: Blocks,
  },
];

export default function LearningPaths() {
  const { user } = useAuth();
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPaths();
  }, []);

  const fetchPaths = async () => {
    setLoading(true);
    
    const builtPaths: LearningPath[] = [];

    for (const pathDef of CURATED_PATHS) {
      const { data: resources } = await supabase
        .from('resources')
        .select('id, title, description, link, difficulty, tags')
        .eq('category', pathDef.category)
        .order('created_at', { ascending: true })
        .limit(8);

      builtPaths.push({
        ...pathDef,
        id: pathDef.category,
        resources: resources || [],
      });
    }

    setPaths(builtPaths);
    setLoading(false);
  };

  const toggleComplete = (resourceId: string) => {
    if (!user) {
      toast.error('Sign in to track your progress');
      return;
    }
    setCompletedResources(prev => {
      const next = new Set(prev);
      if (next.has(resourceId)) {
        next.delete(resourceId);
      } else {
        next.add(resourceId);
      }
      return next;
    });
  };

  const getProgress = (path: LearningPath) => {
    if (path.resources.length === 0) return 0;
    const completed = path.resources.filter(r => completedResources.has(r.id)).length;
    return Math.round((completed / path.resources.length) * 100);
  };

  const difficultyColor: Record<string, string> = {
    Beginner: 'bg-primary/10 text-primary border-primary/20',
    Intermediate: 'bg-secondary/10 text-secondary-foreground border-secondary/20',
    Advanced: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              Curated Learning Roadmaps
            </div>
            <h1 className="text-4xl font-bold mb-3">Learning Paths</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Follow structured roadmaps designed to take you from beginner to proficient in your chosen tech skill.
            </p>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {paths.map(path => {
                const Icon = path.icon;
                const progress = getProgress(path);
                const isExpanded = expandedPath === path.id;

                return (
                  <Card key={path.id} className="overflow-hidden">
                    <CardHeader
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-1">{path.title}</CardTitle>
                            <CardDescription className="text-sm">{path.description}</CardDescription>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge className={difficultyColor[path.difficulty]}>
                                {path.difficulty}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                ~{path.estimatedHours}h • {path.resources.length} resources
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </Button>
                      </div>

                      {user && progress > 0 && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="pt-0">
                        <div className="border-t border-border pt-4">
                          {path.resources.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center py-4">
                              No resources yet for this path. <Link to="/contribute" className="text-primary hover:underline">Contribute some!</Link>
                            </p>
                          ) : (
                            <ol className="space-y-3">
                              {path.resources.map((resource, index) => {
                                const isComplete = completedResources.has(resource.id);
                                return (
                                  <li key={resource.id} className="flex items-start gap-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleComplete(resource.id);
                                      }}
                                      className="mt-1 flex-shrink-0"
                                      aria-label={isComplete ? 'Mark incomplete' : 'Mark complete'}
                                    >
                                      {isComplete ? (
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                      ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground" />
                                      )}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-muted-foreground">
                                          {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className={`text-sm font-medium ${isComplete ? 'line-through text-muted-foreground' : ''}`}>
                                          {resource.title}
                                        </span>
                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                          {resource.difficulty}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {resource.description}
                                      </p>
                                    </div>
                                    <a
                                      href={resource.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="flex-shrink-0"
                                    >
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <ExternalLink className="h-3.5 w-3.5" />
                                      </Button>
                                    </a>
                                  </li>
                                );
                              })}
                            </ol>
                          )}

                          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                            <Link to={`/tracks?category=${encodeURIComponent(path.category)}`}>
                              <Button variant="outline" size="sm">
                                View all {path.category} resources
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
