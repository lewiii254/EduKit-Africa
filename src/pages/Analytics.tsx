import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { TrendingUp, BookOpen, Users, Star, Award, BarChart3 } from 'lucide-react';

interface CategoryData {
  name: string;
  count: number;
}

interface DifficultyData {
  name: string;
  count: number;
}

interface TrendData {
  month: string;
  resources: number;
}

const CHART_COLORS = [
  'hsl(158, 75%, 39%)',
  'hsl(40, 100%, 50%)',
  'hsl(200, 70%, 50%)',
  'hsl(340, 70%, 50%)',
  'hsl(270, 60%, 55%)',
  'hsl(30, 80%, 55%)',
  'hsl(180, 60%, 45%)',
  'hsl(0, 70%, 55%)',
  'hsl(120, 50%, 45%)',
  'hsl(60, 70%, 50%)',
  'hsl(220, 65%, 55%)',
  'hsl(300, 50%, 50%)',
  'hsl(15, 75%, 50%)',
  'hsl(90, 55%, 45%)',
];

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalResources: 0,
    totalContributors: 0,
    totalRatings: 0,
    avgRating: 0,
    totalCategories: 0,
  });
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [difficultyData, setDifficultyData] = useState<DifficultyData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [topRated, setTopRated] = useState<{ title: string; avg: number; count: number }[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);

    // Fetch all resources
    const { data: resources } = await supabase
      .from('resources')
      .select('id, category, difficulty, created_at, contributor_id');

    // Fetch all ratings
    const { data: ratings } = await supabase
      .from('ratings')
      .select('resource_id, rating');

    if (!resources) {
      setLoading(false);
      return;
    }

    // Stats
    const uniqueContributors = new Set(resources.map(r => r.contributor_id).filter(Boolean));
    const categories = new Set(resources.map(r => r.category));
    const allRatings = ratings || [];
    const avgRating = allRatings.length > 0
      ? allRatings.reduce((a, r) => a + r.rating, 0) / allRatings.length
      : 0;

    setStats({
      totalResources: resources.length,
      totalContributors: uniqueContributors.size,
      totalRatings: allRatings.length,
      avgRating,
      totalCategories: categories.size,
    });

    // Category breakdown
    const catMap: Record<string, number> = {};
    resources.forEach(r => {
      catMap[r.category] = (catMap[r.category] || 0) + 1;
    });
    setCategoryData(
      Object.entries(catMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    );

    // Difficulty breakdown
    const diffMap: Record<string, number> = {};
    resources.forEach(r => {
      diffMap[r.difficulty] = (diffMap[r.difficulty] || 0) + 1;
    });
    setDifficultyData(
      Object.entries(diffMap).map(([name, count]) => ({ name, count }))
    );

    // Trend data (resources added per month)
    const monthMap: Record<string, number> = {};
    resources.forEach(r => {
      const month = new Date(r.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    setTrendData(
      Object.entries(monthMap)
        .map(([month, count]) => ({ month, resources: count }))
        .slice(-12)
    );

    // Top rated resources
    if (allRatings.length > 0) {
      const ratingMap: Record<string, { sum: number; count: number }> = {};
      allRatings.forEach(r => {
        if (!ratingMap[r.resource_id]) ratingMap[r.resource_id] = { sum: 0, count: 0 };
        ratingMap[r.resource_id].sum += r.rating;
        ratingMap[r.resource_id].count += 1;
      });

      const topIds = Object.entries(ratingMap)
        .map(([id, { sum, count }]) => ({ id, avg: sum / count, count }))
        .filter(r => r.count >= 1)
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 5);

      const { data: topResources } = await supabase
        .from('resources')
        .select('id, title')
        .in('id', topIds.map(t => t.id));

      if (topResources) {
        setTopRated(
          topIds.map(t => {
            const res = topResources.find(r => r.id === t.id);
            return { title: res?.title || 'Unknown', avg: t.avg, count: t.count };
          })
        );
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-28" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="h-4 w-4" />
            Platform Insights
          </div>
          <h1 className="text-4xl font-bold mb-3">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Real-time insights into EduKit Africa's learning ecosystem
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalResources}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" /> Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalContributors}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4" /> Ratings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalRatings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : 'N/A'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="h-4 w-4" /> Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCategories}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Resources by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Resources by Category</CardTitle>
              <CardDescription>Distribution across tech domains</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" width={140} className="text-xs" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(158, 75%, 39%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Difficulty Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Difficulty Distribution</CardTitle>
              <CardDescription>Breakdown by skill level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {difficultyData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Growth Trend + Top Rated */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Growth</CardTitle>
              <CardDescription>Resources added over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 11 }} />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="resources"
                    stroke="hsl(158, 75%, 39%)"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(158, 75%, 39%)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Rated */}
          <Card>
            <CardHeader>
              <CardTitle>Top Rated Resources</CardTitle>
              <CardDescription>Highest rated by the community</CardDescription>
            </CardHeader>
            <CardContent>
              {topRated.length === 0 ? (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  <p>No ratings yet. Be the first to rate!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {topRated.map((resource, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">{resource.count} rating{resource.count !== 1 ? 's' : ''}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-bold text-sm">{resource.avg.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
