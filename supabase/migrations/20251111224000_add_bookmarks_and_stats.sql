-- Create bookmarks table for favorite resources
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, resource_id)
);

-- Enable RLS on bookmarks
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Bookmarks policies
CREATE POLICY "Users can view their own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON public.bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON public.bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- Add view_count to resources table
ALTER TABLE public.resources ADD COLUMN view_count INTEGER DEFAULT 0 NOT NULL;

-- Create resource_views table to track unique views
CREATE TABLE public.resource_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on resource_views
ALTER TABLE public.resource_views ENABLE ROW LEVEL SECURITY;

-- Resource views policies
CREATE POLICY "Anyone can view resource views"
  ON public.resource_views FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create resource views"
  ON public.resource_views FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX idx_bookmarks_resource ON public.bookmarks(resource_id);
CREATE INDEX idx_resource_views_resource ON public.resource_views(resource_id);
CREATE INDEX idx_resource_views_user ON public.resource_views(user_id);
CREATE INDEX idx_resources_view_count ON public.resources(view_count DESC);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION public.increment_view_count(resource_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.resources
  SET view_count = view_count + 1
  WHERE id = resource_uuid;
END;
$$;
