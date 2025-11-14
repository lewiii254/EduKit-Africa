import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { seedResources, getResourceStats } from '@/utils/seedResources';
import { Loader2, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ResourceStats {
  totalResources: number;
  resourcesByCategory: Record<string, number>;
}

export default function SeedDatabase() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);
  const [stats, setStats] = useState<ResourceStats | null>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    setResult(null);
    
    try {
      const seedResult = await seedResources();
      setResult(seedResult);
      
      if (seedResult.success) {
        toast.success(seedResult.message);
        // Fetch updated stats
        const newStats = await getResourceStats();
        setStats(newStats);
      } else {
        toast.error(seedResult.message);
      }
    } catch (error) {
      toast.error('Failed to seed database');
      setResult({
        success: false,
        message: 'An unexpected error occurred'
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleLoadStats = async () => {
    const newStats = await getResourceStats();
    setStats(newStats);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <Database className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Database Seeder</h1>
            <p className="text-muted-foreground text-lg">
              Populate the database with curated learning resources across 8 tech categories
            </p>
          </div>

          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Seed Sample Resources</h2>
            <p className="text-muted-foreground mb-6">
              This will add high-quality learning resources covering Computer Science, Web Development, 
              Cloud Computing, Blockchain, AI/ML, Mobile Development, DevOps, and Cybersecurity.
            </p>

            <div className="space-y-4">
              <Button
                onClick={handleSeed}
                disabled={isSeeding}
                size="lg"
                className="w-full"
              >
                {isSeeding ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Seeding Database...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-5 w-5" />
                    Seed Database
                  </>
                )}
              </Button>

              <Button
                onClick={handleLoadStats}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Load Current Statistics
              </Button>
            </div>

            {result && (
              <div className={`mt-6 p-4 rounded-lg border ${
                result.success 
                  ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800' 
                  : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-start gap-3">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-semibold ${
                      result.success 
                        ? 'text-emerald-900 dark:text-emerald-100' 
                        : 'text-red-900 dark:text-red-100'
                    }`}>
                      {result.success ? 'Success!' : 'Error'}
                    </p>
                    <p className={`text-sm ${
                      result.success 
                        ? 'text-emerald-700 dark:text-emerald-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {result.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {stats && (
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Database Statistics</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-2">Total Resources</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-3">Resources by Category</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(stats.byCategory as Record<string, number>).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center p-2 rounded bg-muted">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm font-bold text-primary">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-3">Resources by Difficulty</p>
                  <div className="flex gap-2">
                    {Object.entries(stats.byDifficulty as Record<string, number>).map(([difficulty, count]) => (
                      <div key={difficulty} className="flex-1 p-3 rounded bg-muted text-center">
                        <p className="text-sm text-muted-foreground">{difficulty}</p>
                        <p className="text-xl font-bold text-primary">{count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="mt-8 p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> The seed script automatically avoids duplicates. 
              You can run it multiple times safely. Resources are sourced from reputable 
              educational platforms including Coursera, freeCodeCamp, MIT, Stanford, and more.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
