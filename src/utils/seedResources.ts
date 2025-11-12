import { supabase } from '@/integrations/supabase/client';
import sampleResources from '@/data/sampleResources.json';

interface SeedResult {
  success: boolean;
  message: string;
  count?: number;
  error?: string;
}

/**
 * Seeds the database with sample learning resources
 * This function will insert resources that don't already exist (based on title)
 */
export async function seedResources(): Promise<SeedResult> {
  try {
    console.log('🌱 Starting database seed...');
    
    // First, check existing resources to avoid duplicates
    const { data: existingResources, error: fetchError } = await supabase
      .from('resources')
      .select('title');

    if (fetchError) {
      throw new Error(`Failed to fetch existing resources: ${fetchError.message}`);
    }

    const existingTitles = new Set(existingResources?.map(r => r.title) || []);
    
    // Filter out resources that already exist
    const newResources = sampleResources.filter(
      resource => !existingTitles.has(resource.title)
    );

    if (newResources.length === 0) {
      return {
        success: true,
        message: '✅ Database already contains all sample resources',
        count: 0
      };
    }

    console.log(`📦 Preparing to insert ${newResources.length} new resources...`);

    // Insert new resources
    const { error: insertError } = await supabase
      .from('resources')
      .insert(newResources);

    if (insertError) {
      throw new Error(`Failed to insert resources: ${insertError.message}`);
    }

    const categoryCounts = newResources.reduce((acc, resource) => {
      acc[resource.category] = (acc[resource.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('✅ Resources added successfully:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   • ${category}: ${count} resources`);
    });

    return {
      success: true,
      message: `✅ Successfully added ${newResources.length} new learning resources across ${Object.keys(categoryCounts).length} categories`,
      count: newResources.length
    };

  } catch (error) {
    console.error('❌ Seed failed:', error);
    return {
      success: false,
      message: '❌ Failed to seed database',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Helper function to get resource statistics
 */
export async function getResourceStats() {
  const { data, error } = await supabase
    .from('resources')
    .select('category, difficulty');

  if (error || !data) {
    console.error('Failed to fetch stats:', error);
    return null;
  }

  const stats = {
    total: data.length,
    byCategory: data.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byDifficulty: data.reduce((acc, r) => {
      acc[r.difficulty] = (acc[r.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return stats;
}
