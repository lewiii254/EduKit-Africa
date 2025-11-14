import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resourceId: string;
  onRatingSubmitted: () => void;
}

export function RatingDialog({ open, onOpenChange, resourceId, onRatingSubmitted }: RatingDialogProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user || rating === 0) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('ratings')
        .upsert({
          resource_id: resourceId,
          user_id: user.id,
          rating,
          comment: comment.trim() || null,
        }, {
          onConflict: 'resource_id,user_id'
        });

      if (error) throw error;

      toast.success('Rating submitted successfully!');
      onRatingSubmitted();
      onOpenChange(false);
      setRating(0);
      setComment('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit rating';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate this Resource</DialogTitle>
          <DialogDescription>
            Share your experience with this learning resource
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    'h-8 w-8',
                    (hoveredRating >= star || rating >= star)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  )}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Add a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0 || submitting}>
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
