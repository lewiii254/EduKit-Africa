import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ExternalLink, Youtube } from 'lucide-react';

interface YouTubeChannel {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  subscribers?: string;
}

const youtubeChannels: YouTubeChannel[] = [
  // Computer Science
  {
    name: "freeCodeCamp.org",
    description: "Learn to code for free with in-depth tutorials on web development, programming, computer science, and more.",
    url: "https://www.youtube.com/@freecodecamp",
    category: "Computer Science",
    tags: ["tutorials", "programming", "full-courses"],
    subscribers: "8M+"
  },
  {
    name: "CS Dojo",
    description: "Computer science and programming tutorials with focus on algorithms, data structures, and coding interviews.",
    url: "https://www.youtube.com/@CSDojo",
    category: "Computer Science",
    tags: ["algorithms", "interviews", "Python"],
    subscribers: "2M+"
  },
  {
    name: "MIT OpenCourseWare",
    description: "Free lecture videos from MIT courses including computer science, algorithms, and mathematics.",
    url: "https://www.youtube.com/@mitocw",
    category: "Computer Science",
    tags: ["lectures", "university", "theory"],
    subscribers: "5M+"
  },
  {
    name: "Abdul Bari",
    description: "Clear explanations of algorithms, data structures, and computer science fundamentals.",
    url: "https://www.youtube.com/@abdul_bari",
    category: "Computer Science",
    tags: ["algorithms", "data-structures", "theory"],
    subscribers: "1M+"
  },
  
  // Web Development
  {
    name: "Traversy Media",
    description: "Web development and programming tutorials covering modern frameworks, languages, and tools.",
    url: "https://www.youtube.com/@TraversyMedia",
    category: "Web Development",
    tags: ["JavaScript", "React", "Node.js", "tutorials"],
    subscribers: "2M+"
  },
  {
    name: "Web Dev Simplified",
    description: "Simplified web development tutorials focusing on JavaScript, React, CSS, and modern web technologies.",
    url: "https://www.youtube.com/@WebDevSimplified",
    category: "Web Development",
    tags: ["JavaScript", "React", "CSS", "beginner-friendly"],
    subscribers: "1.5M+"
  },
  {
    name: "Kevin Powell",
    description: "CSS tutorials and tips from a CSS evangelist - learn responsive design, animations, and modern CSS.",
    url: "https://www.youtube.com/@KevinPowell",
    category: "Web Development",
    tags: ["CSS", "responsive", "design", "animations"],
    subscribers: "1M+"
  },
  {
    name: "The Net Ninja",
    description: "Web development tutorials covering JavaScript, React, Vue, Node.js, Flutter, and more.",
    url: "https://www.youtube.com/@NetNinja",
    category: "Web Development",
    tags: ["JavaScript", "React", "Vue", "Flutter"],
    subscribers: "1M+"
  },
  {
    name: "Fireship",
    description: "High-intensity code tutorials and tech news in 100 seconds - modern web development and beyond.",
    url: "https://www.youtube.com/@Fireship",
    category: "Web Development",
    tags: ["quick-tutorials", "JavaScript", "trends", "entertaining"],
    subscribers: "3M+"
  },
  {
    name: "JavaScript Mastery",
    description: "Build real-world projects with JavaScript, React, Next.js, and modern web technologies.",
    url: "https://www.youtube.com/@javascriptmastery",
    category: "Web Development",
    tags: ["JavaScript", "React", "projects", "Next.js"],
    subscribers: "1M+"
  },
  
  // Cloud Computing
  {
    name: "A Cloud Guru",
    description: "Cloud computing certification training for AWS, Azure, and Google Cloud Platform.",
    url: "https://www.youtube.com/@AcloudGuru",
    category: "Cloud Computing",
    tags: ["AWS", "Azure", "GCP", "certification"],
    subscribers: "500K+"
  },
  {
    name: "TechWorld with Nana",
    description: "DevOps and Cloud tutorials covering Docker, Kubernetes, AWS, and infrastructure automation.",
    url: "https://www.youtube.com/@TechWorldwithNana",
    category: "Cloud Computing",
    tags: ["DevOps", "Kubernetes", "Docker", "AWS"],
    subscribers: "1M+"
  },
  {
    name: "AWS Online Tech Talks",
    description: "Official AWS channel featuring technical deep dives, best practices, and service announcements.",
    url: "https://www.youtube.com/@AWSOnlineTechTalks",
    category: "Cloud Computing",
    tags: ["AWS", "official", "technical", "deep-dives"],
    subscribers: "200K+"
  },
  {
    name: "Google Cloud Tech",
    description: "Learn about Google Cloud Platform services, architecture, and best practices from Google experts.",
    url: "https://www.youtube.com/@googlecloudtech",
    category: "Cloud Computing",
    tags: ["GCP", "Google", "cloud-native", "architecture"],
    subscribers: "1M+"
  },
  
  // AI/ML & Data Science
  {
    name: "3Blue1Brown",
    description: "Visual explanations of mathematics, linear algebra, calculus, and machine learning concepts.",
    url: "https://www.youtube.com/@3blue1brown",
    category: "AI/ML & Data Science",
    tags: ["mathematics", "visualization", "neural-networks", "theory"],
    subscribers: "6M+"
  },
  {
    name: "sentdex",
    description: "Python programming tutorials focusing on machine learning, neural networks, and data analysis.",
    url: "https://www.youtube.com/@sentdex",
    category: "AI/ML & Data Science",
    tags: ["Python", "ML", "neural-networks", "tutorials"],
    subscribers: "1M+"
  },
  {
    name: "StatQuest with Josh Starmer",
    description: "Statistics and machine learning concepts explained clearly and memorably with visual aids.",
    url: "https://www.youtube.com/@statquest",
    category: "AI/ML & Data Science",
    tags: ["statistics", "ML", "concepts", "beginner-friendly"],
    subscribers: "1M+"
  },
  {
    name: "Krish Naik",
    description: "Machine learning, deep learning, and data science tutorials with real-world projects.",
    url: "https://www.youtube.com/@krishnaik06",
    category: "AI/ML & Data Science",
    tags: ["ML", "deep-learning", "projects", "Python"],
    subscribers: "1M+"
  },
  {
    name: "Two Minute Papers",
    description: "Latest AI and machine learning research papers explained in an accessible and exciting way.",
    url: "https://www.youtube.com/@TwoMinutePapers",
    category: "AI/ML & Data Science",
    tags: ["research", "AI", "papers", "cutting-edge"],
    subscribers: "1.5M+"
  },
  
  // Mobile Development
  {
    name: "Philipp Lackner",
    description: "Android development tutorials with Kotlin, Jetpack Compose, and modern Android architecture.",
    url: "https://www.youtube.com/@PhilippLackner",
    category: "Mobile Development",
    tags: ["Android", "Kotlin", "Jetpack-Compose"],
    subscribers: "500K+"
  },
  {
    name: "Flutter",
    description: "Official Flutter channel with tutorials, tips, and updates on cross-platform mobile development.",
    url: "https://www.youtube.com/@flutterdev",
    category: "Mobile Development",
    tags: ["Flutter", "Dart", "cross-platform", "official"],
    subscribers: "500K+"
  },
  {
    name: "iOS Academy",
    description: "Swift and iOS development tutorials covering UIKit, SwiftUI, and modern iOS app development.",
    url: "https://www.youtube.com/@iOSAcademy",
    category: "Mobile Development",
    tags: ["iOS", "Swift", "SwiftUI", "tutorials"],
    subscribers: "300K+"
  },
  {
    name: "React Native Radio",
    description: "React Native development tutorials, tips, and discussions about cross-platform mobile apps.",
    url: "https://www.youtube.com/@reactnativeradio",
    category: "Mobile Development",
    tags: ["React-Native", "JavaScript", "cross-platform"],
    subscribers: "50K+"
  },
  
  // DevOps
  {
    name: "DevOps Toolkit",
    description: "DevOps practices, tools, and tutorials covering Kubernetes, GitOps, and cloud-native technologies.",
    url: "https://www.youtube.com/@DevOpsToolkit",
    category: "DevOps",
    tags: ["DevOps", "Kubernetes", "GitOps", "cloud-native"],
    subscribers: "200K+"
  },
  {
    name: "TechWorld with Nana",
    description: "Complete DevOps bootcamp covering Docker, Kubernetes, CI/CD, and infrastructure automation.",
    url: "https://www.youtube.com/@TechWorldwithNana",
    category: "DevOps",
    tags: ["DevOps", "Docker", "Kubernetes", "CI-CD"],
    subscribers: "1M+"
  },
  {
    name: "Cloudreach",
    description: "Cloud and DevOps tutorials with focus on AWS, Azure, and infrastructure automation.",
    url: "https://www.youtube.com/@cloudreach",
    category: "DevOps",
    tags: ["cloud", "DevOps", "AWS", "Azure"],
    subscribers: "50K+"
  },
  
  // Blockchain & Web3
  {
    name: "Dapp University",
    description: "Learn blockchain development and build decentralized applications with Ethereum and Solidity.",
    url: "https://www.youtube.com/@DappUniversity",
    category: "Blockchain & Web3",
    tags: ["blockchain", "Ethereum", "Solidity", "dApps"],
    subscribers: "500K+"
  },
  {
    name: "Eat The Blocks",
    description: "Blockchain and smart contract development tutorials for Ethereum, Solidity, and Web3.",
    url: "https://www.youtube.com/@EatTheBlocks",
    category: "Blockchain & Web3",
    tags: ["blockchain", "Solidity", "smart-contracts", "Web3"],
    subscribers: "200K+"
  },
  {
    name: "Patrick Collins",
    description: "Smart contract development, Web3, DeFi, and blockchain engineering tutorials.",
    url: "https://www.youtube.com/@PatrickAlphaC",
    category: "Blockchain & Web3",
    tags: ["smart-contracts", "Web3", "DeFi", "Solidity"],
    subscribers: "400K+"
  },
  {
    name: "Whiteboard Crypto",
    description: "Blockchain concepts, cryptocurrency, and Web3 explained with whiteboard animations.",
    url: "https://www.youtube.com/@WhiteboardCrypto",
    category: "Blockchain & Web3",
    tags: ["blockchain", "crypto", "concepts", "beginner-friendly"],
    subscribers: "500K+"
  },
  
  // Cybersecurity
  {
    name: "NetworkChuck",
    description: "IT, networking, and cybersecurity tutorials with hands-on labs and certifications guidance.",
    url: "https://www.youtube.com/@NetworkChuck",
    category: "Cybersecurity",
    tags: ["networking", "security", "certifications", "tutorials"],
    subscribers: "3M+"
  },
  {
    name: "John Hammond",
    description: "Cybersecurity, malware analysis, CTF challenges, and ethical hacking tutorials.",
    url: "https://www.youtube.com/@_JohnHammond",
    category: "Cybersecurity",
    tags: ["security", "CTF", "malware", "ethical-hacking"],
    subscribers: "500K+"
  },
  {
    name: "HackerSploit",
    description: "Ethical hacking and penetration testing tutorials covering web security and network security.",
    url: "https://www.youtube.com/@HackerSploit",
    category: "Cybersecurity",
    tags: ["ethical-hacking", "pentesting", "security", "tutorials"],
    subscribers: "1M+"
  },
  {
    name: "The Cyber Mentor",
    description: "Cybersecurity training, ethical hacking, and penetration testing courses for beginners.",
    url: "https://www.youtube.com/@TCMSecurityAcademy",
    category: "Cybersecurity",
    tags: ["security", "ethical-hacking", "training", "beginner-friendly"],
    subscribers: "500K+"
  },
  {
    name: "IppSec",
    description: "HackTheBox walkthroughs and penetration testing tutorials with detailed explanations.",
    url: "https://www.youtube.com/@ippsec",
    category: "Cybersecurity",
    tags: ["HackTheBox", "pentesting", "walkthroughs", "CTF"],
    subscribers: "400K+"
  }
];

const categories = [
  "All",
  "Computer Science",
  "Web Development",
  "Cloud Computing",
  "AI/ML & Data Science",
  "Mobile Development",
  "DevOps",
  "Blockchain & Web3",
  "Cybersecurity"
];

export default function YouTubeVideos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredChannels = youtubeChannels.filter((channel) => {
    const matchesSearch =
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || channel.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const channelsByCategory = categories.slice(1).map(category => ({
    category,
    channels: youtubeChannels.filter(ch => ch.category === category),
    count: youtubeChannels.filter(ch => ch.category === category).length
  }));

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navigation />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Youtube className="h-10 w-10 text-red-600" />
            <h1 className="text-4xl font-bold">YouTube Learning Channels</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Curated collection of top YouTube channels for learning tech across various domains
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('All')}>
              All Channels
            </TabsTrigger>
            <TabsTrigger value="by-category">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search channels, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {filteredChannels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No channels found matching your search.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-muted-foreground">
                  Showing {filteredChannels.length} channel{filteredChannels.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChannels.map((channel, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{channel.name}</CardTitle>
                            <Badge variant="secondary" className="mb-2">
                              {channel.category}
                            </Badge>
                            {channel.subscribers && (
                              <p className="text-sm text-muted-foreground">
                                {channel.subscribers} subscribers
                              </p>
                            )}
                          </div>
                          <Youtube className="h-6 w-6 text-red-600 flex-shrink-0" />
                        </div>
                        <CardDescription className="mt-2">
                          {channel.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {channel.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <a
                          href={channel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          Visit Channel
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="by-category" className="space-y-8">
            {channelsByCategory.map(({ category, channels, count }) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{category}</h2>
                  <Badge variant="secondary">{count} channels</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {channels.map((channel, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{channel.name}</CardTitle>
                            {channel.subscribers && (
                              <p className="text-sm text-muted-foreground">
                                {channel.subscribers} subscribers
                              </p>
                            )}
                          </div>
                          <Youtube className="h-6 w-6 text-red-600 flex-shrink-0" />
                        </div>
                        <CardDescription className="mt-2">
                          {channel.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {channel.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <a
                          href={channel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          Visit Channel
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
