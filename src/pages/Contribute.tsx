import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CATEGORIES, DIFFICULTIES } from '@/components/SearchAndFilter';
import { z } from 'zod';
import { Plus, X, BookOpen, Award, Youtube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const resourceSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000),
  link: z.string().url('Must be a valid URL'),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.string().min(1, 'Difficulty is required'),
});

const certificateSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  provider: z.string().min(2, 'Provider is required').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000),
  link: z.string().url('Must be a valid URL'),
  category: z.string().min(1, 'Category is required'),
  region: z.string().optional(),
});

const youtubeSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  channel: z.string().min(2, 'Channel name is required').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000),
  videoUrl: z.string().url('Must be a valid YouTube URL').refine(
    (url) => url.includes('youtube.com') || url.includes('youtu.be'),
    'Must be a valid YouTube URL'
  ),
  category: z.string().min(1, 'Category is required'),
});

export default function Contribute() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    category: '',
    difficulty: '',
    tags: [] as string[],
  });

  const [certFormData, setCertFormData] = useState({
    title: '',
    provider: '',
    description: '',
    link: '',
    category: '',
    region: '',
    tags: [] as string[],
  });

  const [youtubeFormData, setYoutubeFormData] = useState({
    title: '',
    channel: '',
    description: '',
    videoUrl: '',
    category: '',
    tags: [] as string[],
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to contribute resources');
      navigate('/auth');
    }
  }, [user, navigate]);

  const addTag = (type: 'resource' | 'cert' | 'youtube') => {
    const tag = tagInput.trim().toLowerCase();
    if (!tag) return;
    
    if (type === 'resource' && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput('');
    } else if (type === 'cert' && !certFormData.tags.includes(tag) && certFormData.tags.length < 10) {
      setCertFormData({ ...certFormData, tags: [...certFormData.tags, tag] });
      setTagInput('');
    } else if (type === 'youtube' && !youtubeFormData.tags.includes(tag) && youtubeFormData.tags.length < 10) {
      setYoutubeFormData({ ...youtubeFormData, tags: [...youtubeFormData.tags, tag] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string, type: 'resource' | 'cert' | 'youtube') => {
    if (type === 'resource') {
      setFormData({
        ...formData,
        tags: formData.tags.filter((tag) => tag !== tagToRemove),
      });
    } else if (type === 'cert') {
      setCertFormData({
        ...certFormData,
        tags: certFormData.tags.filter((tag) => tag !== tagToRemove),
      });
    } else {
      setYoutubeFormData({
        ...youtubeFormData,
        tags: youtubeFormData.tags.filter((tag) => tag !== tagToRemove),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const validated = resourceSchema.parse(formData);
      setLoading(true);

      const { error } = await supabase.from('resources').insert({
        title: validated.title,
        description: validated.description,
        link: validated.link,
        category: validated.category,
        difficulty: validated.difficulty,
        tags: formData.tags,
        contributor_id: user.id,
      });

      if (error) throw error;

      toast.success('✅ Resource Added Successfully');
      setFormData({
        title: '',
        description: '',
        link: '',
        category: '',
        difficulty: '',
        tags: [],
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Failed to add resource');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      certificateSchema.parse(certFormData);
      setLoading(true);
      toast.success('✅ Certificate submission received! Our team will review it shortly.');
      setCertFormData({
        title: '',
        provider: '',
        description: '',
        link: '',
        category: '',
        region: '',
        tags: [],
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Failed to submit certificate');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleYoutubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      youtubeSchema.parse(youtubeFormData);
      setLoading(true);
      toast.success('✅ YouTube video submission received! Our team will review it shortly.');
      setYoutubeFormData({
        title: '',
        channel: '',
        description: '',
        videoUrl: '',
        category: '',
        tags: [],
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Failed to submit video');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Contribute to EduKit Africa
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Help build Africa's largest open-source tech learning platform. Share resources, certifications, and educational content with thousands of learners.
            </p>
          </div>

          <Tabs defaultValue="resource" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="resource" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learning Resource
              </TabsTrigger>
              <TabsTrigger value="certificate" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Free Certificate
              </TabsTrigger>
              <TabsTrigger value="youtube" className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                YouTube Video
              </TabsTrigger>
            </TabsList>

            {/* Learning Resource Form */}
            <TabsContent value="resource">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Share a Learning Resource
                  </CardTitle>
                  <CardDescription>
                    Contribute tutorials, articles, courses, or any educational content that helped you learn tech skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Resource Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Complete React Course for Beginners"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe what makes this resource valuable..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="link">Resource URL *</Label>
                      <Input
                        id="link"
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        placeholder="https://example.com/resource"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty *</Label>
                        <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            {DIFFICULTIES.map((diff) => (
                              <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (Optional)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="tags"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('resource'))}
                          placeholder="Add tags (press Enter)"
                        />
                        <Button type="button" onClick={() => addTag('resource')} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag, 'resource')} />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" disabled={loading} className="w-full" size="lg">
                      {loading ? 'Submitting...' : 'Submit Resource'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificate Form */}
            <TabsContent value="certificate">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Share a Free Certificate Program
                  </CardTitle>
                  <CardDescription>
                    Help others discover free certification opportunities from reputable providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCertSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cert-title">Certificate Name *</Label>
                      <Input
                        id="cert-title"
                        value={certFormData.title}
                        onChange={(e) => setCertFormData({ ...certFormData, title: e.target.value })}
                        placeholder="e.g., AWS Certified Cloud Practitioner"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provider">Provider *</Label>
                      <Input
                        id="provider"
                        value={certFormData.provider}
                        onChange={(e) => setCertFormData({ ...certFormData, provider: e.target.value })}
                        placeholder="e.g., Amazon Web Services, Microsoft, Google"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cert-description">Description *</Label>
                      <Textarea
                        id="cert-description"
                        value={certFormData.description}
                        onChange={(e) => setCertFormData({ ...certFormData, description: e.target.value })}
                        placeholder="Describe what this certification covers..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cert-link">Certificate URL *</Label>
                      <Input
                        id="cert-link"
                        type="url"
                        value={certFormData.link}
                        onChange={(e) => setCertFormData({ ...certFormData, link: e.target.value })}
                        placeholder="https://example.com/certification"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cert-category">Category *</Label>
                        <Select value={certFormData.category} onValueChange={(value) => setCertFormData({ ...certFormData, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="region">Region (Optional)</Label>
                        <Input
                          id="region"
                          value={certFormData.region}
                          onChange={(e) => setCertFormData({ ...certFormData, region: e.target.value })}
                          placeholder="e.g., Global, Africa, Kenya"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cert-tags">Tags (Optional)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="cert-tags"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('cert'))}
                          placeholder="Add tags (press Enter)"
                        />
                        <Button type="button" onClick={() => addTag('cert')} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {certFormData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {certFormData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag, 'cert')} />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" disabled={loading} className="w-full" size="lg">
                      {loading ? 'Submitting...' : 'Submit Certificate'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* YouTube Video Form */}
            <TabsContent value="youtube">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-primary" />
                    Share Educational YouTube Content
                  </CardTitle>
                  <CardDescription>
                    Recommend quality YouTube videos or channels that teach tech skills effectively
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleYoutubeSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="yt-title">Video/Channel Title *</Label>
                      <Input
                        id="yt-title"
                        value={youtubeFormData.title}
                        onChange={(e) => setYoutubeFormData({ ...youtubeFormData, title: e.target.value })}
                        placeholder="e.g., Complete Python Tutorial for Beginners"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="channel">Channel Name *</Label>
                      <Input
                        id="channel"
                        value={youtubeFormData.channel}
                        onChange={(e) => setYoutubeFormData({ ...youtubeFormData, channel: e.target.value })}
                        placeholder="e.g., freeCodeCamp, Traversy Media"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yt-description">Description *</Label>
                      <Textarea
                        id="yt-description"
                        value={youtubeFormData.description}
                        onChange={(e) => setYoutubeFormData({ ...youtubeFormData, description: e.target.value })}
                        placeholder="What makes this video/channel valuable for learners..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="video-url">YouTube URL *</Label>
                      <Input
                        id="video-url"
                        type="url"
                        value={youtubeFormData.videoUrl}
                        onChange={(e) => setYoutubeFormData({ ...youtubeFormData, videoUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yt-category">Category *</Label>
                      <Select value={youtubeFormData.category} onValueChange={(value) => setYoutubeFormData({ ...youtubeFormData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yt-tags">Tags (Optional)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="yt-tags"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('youtube'))}
                          placeholder="Add tags (press Enter)"
                        />
                        <Button type="button" onClick={() => addTag('youtube')} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {youtubeFormData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {youtubeFormData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag, 'youtube')} />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" disabled={loading} className="w-full" size="lg">
                      {loading ? 'Submitting...' : 'Submit YouTube Content'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Contribution Guidelines */}
          <Card className="mt-8 border-primary/20 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">📝 Contribution Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Ensure the resource is <strong>freely accessible</strong> or has a substantial free tier</p>
              <p>• Provide accurate and complete information</p>
              <p>• Resources should be <strong>high-quality</strong> and valuable to learners</p>
              <p>• Avoid duplicate submissions - check if the resource already exists</p>
              <p>• Use descriptive titles and detailed descriptions</p>
              <p>• For certificates, verify they are genuinely free to obtain</p>
              <p>• YouTube content should be educational and well-structured</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
