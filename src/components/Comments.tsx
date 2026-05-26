import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Link } from 'react-router-dom';
import { MessageCircle, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CommentRow {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  username?: string;
}

export function Comments({ resourceId }: { resourceId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('id,user_id,content,created_at')
      .eq('resource_id', resourceId)
      .order('created_at', { ascending: false });

    if (!data) {
      setComments([]);
      setLoading(false);
      return;
    }

    const userIds = [...new Set(data.map((c) => c.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id,username')
      .in('id', userIds);

    const nameMap = new Map((profiles ?? []).map((p) => [p.id, p.username]));
    setComments(data.map((c) => ({ ...c, username: nameMap.get(c.user_id) ?? 'Anonymous' })));
    setLoading(false);
  }, [resourceId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const submit = async () => {
    if (!user || !draft.trim()) return;
    setPosting(true);
    const { error } = await supabase.from('comments').insert({
      resource_id: resourceId,
      user_id: user.id,
      content: draft.trim(),
    });
    setPosting(false);
    if (error) {
      toast.error('Could not post comment');
      return;
    }
    setDraft('');
    toast.success('Comment posted');
    fetchComments();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) {
      toast.error('Could not delete');
      return;
    }
    fetchComments();
  };

  return (
    <div className="mt-4 pt-4 border-t border-border space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <MessageCircle className="h-4 w-4 text-primary" />
        Discussion ({comments.length})
      </div>

      {user ? (
        <div className="space-y-2">
          <Textarea
            placeholder="Share your thoughts or tips on this resource…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            maxLength={1000}
          />
          <Button size="sm" onClick={submit} disabled={posting || !draft.trim()}>
            {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Post comment'}
          </Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to join the discussion.
        </p>
      )}

      {loading ? (
        <p className="text-xs text-muted-foreground">Loading…</p>
      ) : comments.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">No comments yet — be the first.</p>
      ) : (
        <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {comments.map((c) => (
            <li key={c.id} className="text-sm bg-muted/40 rounded-md p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-xs">{c.username}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                  {user?.id === c.user_id && (
                    <button
                      onClick={() => remove(c.id)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Delete comment"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-foreground whitespace-pre-wrap break-words">{c.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}