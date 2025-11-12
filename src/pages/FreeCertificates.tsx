import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ExternalLink, Award, Clock } from 'lucide-react';
import { freeCertificates, categories, regions } from '@/data/freeCertificates';

export default function FreeCertificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  
  // Last updated date
  const lastUpdated = new Date('2025-11-12').toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const filteredCertificates = freeCertificates.filter((cert) => {
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || cert.category === selectedCategory;

    const matchesRegion =
      selectedRegion === 'All' || cert.region === selectedRegion;

    return matchesSearch && matchesCategory && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground">
        Skip to main content
      </a>
      <Navigation />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center justify-center gap-3">
            <Award className="h-12 w-12 text-primary" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              🎓 Free Certificates You Can Earn Now
            </h1>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Discover verified free certification programs from top platforms — learn new tech skills and earn globally recognized certificates for free.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>Last updated: {lastUpdated}</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button size="lg" asChild>
              <a href="#certificates">Start Learning Today</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://t.me/edukitafrica" target="_blank" rel="noopener noreferrer">
                Join Telegram for Updates
              </a>
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4" id="certificates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search certificates, providers, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search certificates"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger aria-label="Filter by category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Region Filter */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger aria-label="Filter by region">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-muted-foreground">
            Showing {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedRegion !== 'All' && ` from ${selectedRegion}`}
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
            <p className="text-muted-foreground text-lg">
              No certificates found matching your search.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedRegion('All');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {filteredCertificates.map((cert, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="shrink-0">
                        {cert.category}
                      </Badge>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {cert.level}
                      </Badge>
                      {cert.region !== 'Global' && (
                        <Badge variant="default" className="shrink-0 text-xs bg-green-600">
                          {cert.region}
                        </Badge>
                      )}
                    </div>
                    <Award className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {cert.name}
                  </CardTitle>
                  <div className="text-sm text-primary font-medium">
                    {cert.provider}
                  </div>
                  <CardDescription className="mt-2">
                    {cert.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                  >
                    View Certificate Program
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Additional Info Section */}
        <div className="mt-16 p-6 bg-muted/30 rounded-lg border border-border">
          <h2 className="text-2xl font-bold mb-4">💡 Tips for Success</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Many certificates offer financial aid or free audit options - check each program's details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Some platforms require payment only for the certificate, while the course content is free</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Complete all assignments and projects to strengthen your portfolio</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Join our Telegram community to stay updated on new free certificate opportunities</span>
            </li>
          </ul>
        </div>

        {/* Source Attribution */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Certificate data curated from{' '}
            <a 
              href="https://free-certifications.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              free-certifications.com
            </a>
            {' '}and other trusted sources
          </p>
        </div>
      </main>
    </div>
  );
}
