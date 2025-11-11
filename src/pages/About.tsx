import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Heart, Users, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About EduKit Africa</h1>
            <p className="text-xl text-muted-foreground">
              Empowering African tech talent through open-source education
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                EduKit Africa is an open-source platform dedicated to curating and sharing high-quality
                learning resources in technology fields. We believe that education should be accessible
                to everyone, and we're committed to showcasing the incredible contributions of African
                developers and educators to the global tech community.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform serves as a bridge, connecting learners with carefully curated resources
                in Computer Science, Web Development, Cloud Computing, Blockchain, AI/ML, and more.
                Every resource is contributed by community members who are passionate about sharing
                knowledge and fostering growth in the African tech ecosystem.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Community-Driven
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built by the community, for the community. Every resource on our platform is
                  contributed and rated by learners and educators who understand the unique needs
                  and challenges of the African tech landscape.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  Open Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  EduKit Africa is completely open source. We believe in transparency and
                  collaboration. You can contribute to the platform itself, not just the
                  learning resources.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-6 w-6 text-primary" />
                How to Contribute
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Share Learning Resources</h3>
                <p className="text-muted-foreground">
                  Found an amazing course, tutorial, or documentation? Share it with the community
                  through our contribution page. Every resource helps someone on their learning journey.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rate and Review</h3>
                <p className="text-muted-foreground">
                  Help others make informed decisions by rating and reviewing resources you've used.
                  Your feedback is invaluable to learners choosing their next learning path.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Spread the Word</h3>
                <p className="text-muted-foreground">
                  Share EduKit Africa with fellow learners and developers. The more people join
                  our community, the richer our collective knowledge becomes.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center py-8 border-t border-border">
            <p className="text-muted-foreground mb-2">
              Made with <Heart className="inline h-4 w-4 text-primary fill-primary" /> in Africa
            </p>
            <p className="text-sm text-muted-foreground">
              by the Open Source Community
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
