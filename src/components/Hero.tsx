import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 opacity-20">
        <img
          src={heroImage}
          alt="African tech community learning together"
          className="h-full w-full object-cover mix-blend-overlay"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Learn. Build. Empower.
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
            Discover curated learning resources in Computer Science, Web Development, Cloud, 
            Blockchain, AI/ML, and more—created by African developers, for the global tech community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/tracks">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Explore Learning Tracks
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contribute">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                Contribute Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
