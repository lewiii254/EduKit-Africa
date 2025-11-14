import { Button } from './ui/button';
import { Twitter, Linkedin, Facebook, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareButtonsProps {
  resource: {
    title: string;
    description: string;
    link: string;
    category: string;
  };
  className?: string;
}

export function ShareButtons({ resource, className = '' }: ShareButtonsProps) {
  const [isSharing, setIsSharing] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/tracks?resource=${encodeURIComponent(resource.title)}`
    : '';
  
  const shareText = `Check out this ${resource.category} resource: ${resource.title}`;
  const hashtags = 'EduKitAfrica,TechEducation,LearnToCode';

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(resource.link)}&hashtags=${hashtags}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resource.link)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resource.link)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
  };

  const handleNativeShare = async () => {
    if (!navigator.share) {
      toast.error('Share not supported on this device');
      return;
    }

    setIsSharing(true);
    try {
      await navigator.share({
        title: resource.title,
        text: shareText,
        url: resource.link,
      });
      toast.success('Shared successfully!');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleTwitterShare}
        title="Share on Twitter"
        aria-label="Share on Twitter"
        className="h-8 w-8"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLinkedInShare}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
        className="h-8 w-8"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={handleFacebookShare}
        title="Share on Facebook"
        aria-label="Share on Facebook"
        className="h-8 w-8"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      {navigator.share && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNativeShare}
          disabled={isSharing}
          title="Share via..."
          aria-label="Share via native share menu"
          className="h-8 w-8"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
