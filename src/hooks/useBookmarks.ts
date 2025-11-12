import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function useBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarks(new Set());
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('resource_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const bookmarkIds = new Set(data?.map(b => b.resource_id) || []);
      setBookmarks(bookmarkIds);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (resourceId: string) => {
    if (!user) {
      toast.error('Please sign in to bookmark resources');
      return;
    }

    const isBookmarked = bookmarks.has(resourceId);

    try {
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('resource_id', resourceId);

        if (error) throw error;

        setBookmarks(prev => {
          const newSet = new Set(prev);
          newSet.delete(resourceId);
          return newSet;
        });
        toast.success('Bookmark removed');
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert({ user_id: user.id, resource_id: resourceId });

        if (error) throw error;

        setBookmarks(prev => new Set([...prev, resourceId]));
        toast.success('Resource bookmarked');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update bookmark';
      toast.error(errorMessage);
    }
  };

  const isBookmarked = (resourceId: string) => bookmarks.has(resourceId);

  return {
    bookmarks,
    loading,
    toggleBookmark,
    isBookmarked,
  };
}
