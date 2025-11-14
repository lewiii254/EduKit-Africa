import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ResourceCard } from '@/components/ResourceCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Twitter, Linkedin, Users, BookOpen, Award, TrendingUp } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  difficulty: string;
  tags?: string[];
  contributor_id: string;
  created_at: string;
}

export default function Index() {
  const [topResources, setTopResources] = useState<Resource[]>([]);
  const [stats, setStats] = useState({
    totalResources: 0,
    totalContributors: 0,
    categories: 8,
  });

  useEffect(() => {
    fetchTopResources();
    fetchStats();
  }, []);

  const fetchTopResources = async () => {
    const { data: resources } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (resources) {
      setTopResources(resources);
    }
  };

  const fetchStats = async () => {
    const { count: resourceCount } = await supabase
      .from('resources')
      .select('*', { count: 'exact', head: true });

    const { data: contributors } = await supabase
      .from('resources')
      .select('contributor_id');

    const uniqueContributors = new Set(contributors?.map(r => r.contributor_id).filter(Boolean));

    setStats({
      totalResources: resourceCount || 0,
      totalContributors: uniqueContributors.size,
      categories: 8,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Stats Section */}
      <section className="py-16 container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{stats.totalResources}+</div>
              <div className="text-muted-foreground">Learning Resources</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 text-center">
              <Users className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">
                {stats.totalContributors >= 3 && stats.totalContributors < 4 
                  ? '3+' 
                  : `${stats.totalContributors}+`}
              </div>
              <div className="text-muted-foreground">Contributors</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 text-center">
              <Award className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{stats.categories}</div>
              <div className="text-muted-foreground">Tech Categories</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <CategoryGrid />

      {topResources.length > 0 && (
        <section className="py-16 container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recently Added Resources</h2>
              <p className="text-muted-foreground">
                Check out the latest contributions from our community
              </p>
            </div>
            <Link to="/tracks">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">EduKit Africa</h3>
              <p className="text-muted-foreground text-sm">
                Open-source platform for curated African tech learning resources.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/tracks" className="text-muted-foreground hover:text-primary transition-colors">
                    Browse Resources
                  </Link>
                </li>
                <li>
                  <Link to="/contribute" className="text-muted-foreground hover:text-primary transition-colors">
                    Contribute
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              Made with ❤️ in Africa by the Open Source Community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
