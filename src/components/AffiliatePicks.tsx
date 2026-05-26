import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Sparkles } from 'lucide-react';

const picks = [
  {
    name: 'Coursera Plus',
    tagline: 'Unlimited access to 7,000+ courses & certificates',
    href: 'https://www.coursera.org/courseraplus?utm_source=edukit-africa',
    cta: 'Start 7-day free trial',
    accent: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    name: 'DataCamp',
    tagline: 'Hands-on data science & AI tracks with real datasets',
    href: 'https://www.datacamp.com/?utm_source=edukit-africa',
    cta: 'Try DataCamp free',
    accent: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    name: 'Udemy Tech',
    tagline: 'Bestselling web dev, AI, and DevOps courses from $9.99',
    href: 'https://www.udemy.com/courses/development/?utm_source=edukit-africa',
    cta: 'Browse offers',
    accent: 'from-fuchsia-500/20 to-purple-500/20',
  },
];

export function AffiliatePicks() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold">Premium Picks for African Devs</h2>
        <Badge variant="secondary" className="ml-2">Sponsored</Badge>
      </div>
      <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
        Hand-picked paid programs we recommend when you're ready to go deeper. Buying through these links
        supports EduKit Africa at no extra cost to you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {picks.map((p) => (
          <Card key={p.name} className={`bg-gradient-to-br ${p.accent} border-border hover:shadow-hover transition-all`}>
            <CardContent className="p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{p.tagline}</p>
              <a
                href={p.href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
              >
                {p.cta}
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}