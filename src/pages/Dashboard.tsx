import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { ResourceCard } from '@/components/ResourceCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { BookMarked, FileText, Star, TrendingUp, Download } from 'lucide-react';
import { toast } from 'sonner';
import { exportToJSON, exportToCSV, exportToMarkdown } from '@/lib/exportBookmarks';

interface Resource {
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
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myResources, setMyResources] = useState<Resource[]>([]);
  const [bookmarkedResources, setBookmarkedResources] = useState<Resource[]>([]);
  const [stats, setStats] = useState({
    totalContributions: 0,
    totalBookmarks: 0,
    totalRatings: 0,
    averageRating: 0,
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view your dashboard');
      navigate('/auth');
      return;
    }
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch user's resources
      const { data: resources } = await supabase
        .from('resources')
        .select('*')
        .eq('contributor_id', user.id)
        .order('created_at', { ascending: false });

      setMyResources(resources || []);

      // Fetch bookmarked resources
      const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('resource_id, resources(*)')
        .eq('user_id', user.id);

      const bookmarkedResourcesList = bookmarks?.map(b => b.resources).filter(Boolean) || [];
      setBookmarkedResources(bookmarkedResourcesList);

      // Fetch ratings count
      const { data: ratings } = await supabase
        .from('ratings')
        .select('rating')
        .eq('user_id', user.id);

      // Calculate stats
      const ratingsGiven = ratings || [];
      const avgRating = ratingsGiven.length > 0
        ? ratingsGiven.reduce((acc, r) => acc + r.rating, 0) / ratingsGiven.length
        : 0;

      setStats({
        totalContributions: resources?.length || 0,
        totalBookmarks: bookmarkedResourcesList.length,
        totalRatings: ratingsGiven.length,
        averageRating: avgRating,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navigation />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Track your contributions and manage your bookmarks
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Contributions
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContributions}</div>
              <p className="text-xs text-muted-foreground">
                Resources shared
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bookmarks
              </CardTitle>
              <BookMarked className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookmarks}</div>
              <p className="text-xs text-muted-foreground">
                Saved resources
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ratings Given
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRatings}</div>
              <p className="text-xs text-muted-foreground">
                Reviews shared
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Rating
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Your ratings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Resources and Bookmarks */}
        <Tabs defaultValue="contributions" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="contributions">My Contributions</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="mt-6">
            {myResources.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No Contributions Yet</CardTitle>
                  <CardDescription>
                    Start contributing resources to share knowledge with the community!
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookmarks" className="mt-6">
            {bookmarkedResources.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No Bookmarks Yet</CardTitle>
                  <CardDescription>
                    Bookmark resources to save them for later reference.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <>
                <div className="flex justify-end mb-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Bookmarks
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        exportToJSON(bookmarkedResources);
                        toast.success('Bookmarks exported as JSON');
                      }}>
                        Export as JSON
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        exportToCSV(bookmarkedResources);
                        toast.success('Bookmarks exported as CSV');
                      }}>
                        Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        exportToMarkdown(bookmarkedResources);
                        toast.success('Bookmarks exported as Markdown');
                      }}>
                        Export as Markdown
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
