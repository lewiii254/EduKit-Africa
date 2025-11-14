import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Star, User, Bookmark, Eye } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { RatingDialog } from './RatingDialog';
import { useBookmarks } from '@/hooks/useBookmarks';
import { ShareButtons } from './ShareButtons';

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    link: string;
    category: string;
    difficulty: string;
    tags: string[];
    contributor_id: string;
    created_at: string;
    view_count?: number;
  };
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { user } = useAuth();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingsCount, setRatingsCount] = useState<number>(0);
  const [contributorName, setContributorName] = useState<string>('');
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const bookmarked = isBookmarked(resource.id);

  const fetchRatings = useCallback(async () => {
    const { data, error } = await supabase
      .from('ratings')
      .select('rating')
      .eq('resource_id', resource.id);

    if (!error && data) {
      setRatingsCount(data.length);
      if (data.length > 0) {
        const avg = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length;
        setAverageRating(avg);
      }
    }
  }, [resource.id]);

  useEffect(() => {
    const fetchContributor = async () => {
      if (resource.contributor_id) {
        const { data } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', resource.contributor_id)
          .single();

        if (data) {
          setContributorName(data.username);
        }
      }
    };

    fetchRatings();
    fetchContributor();
  }, [resource.id, resource.contributor_id, fetchRatings]);

  const difficultyColors = {
    Beginner: 'bg-primary/10 text-primary border-primary/20',
    Intermediate: 'bg-secondary/10 text-secondary-foreground border-secondary/20',
    Advanced: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-hover transition-all duration-300 border-border">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
            <Badge className={difficultyColors[resource.difficulty as keyof typeof difficultyColors]}>
              {resource.difficulty}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1">
          <div className="space-y-3">
            <Badge variant="outline">{resource.category}</Badge>
            
            {resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {resource.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {resource.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{resource.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {ratingsCount > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span>({ratingsCount})</span>
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {contributorName && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>by {contributorName}</span>
                </div>
              )}
              {resource.view_count !== undefined && resource.view_count > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{resource.view_count}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Share this resource</span>
                <ShareButtons resource={resource} />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button asChild variant="default" className="flex-1">
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              View Resource
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          {user && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowRatingDialog(true)}
                title="Rate this resource"
                aria-label="Rate this resource"
              >
                <Star className="h-4 w-4" />
              </Button>
              <Button
                variant={bookmarked ? "default" : "outline"}
                size="icon"
                onClick={() => toggleBookmark(resource.id)}
                title={bookmarked ? "Remove bookmark" : "Bookmark resource"}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark resource"}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <RatingDialog
        open={showRatingDialog}
        onOpenChange={setShowRatingDialog}
        resourceId={resource.id}
        onRatingSubmitted={fetchRatings}
      />
    </>
  );
}
