'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchNews } from '@/app/actions';
import type { CybersecurityNewsOutput } from '@/ai/flows/get-cybersecurity-news';
import { ExternalLink, Loader2, Rss } from 'lucide-react';

type Article = CybersecurityNewsOutput['articles'][0];

export function CybersecurityNewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      const newsArticles = await fetchNews();
      setArticles(newsArticles);
      setLoading(false);
    }
    loadNews();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-glow-primary">
          Latest Cybersecurity News
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          Stay informed with the latest updates and threats in the digital world, powered by AI.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Card key={index} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/50 flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full mt-1">
                    <Rss className="h-6 w-6 text-primary text-glow-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-glow text-lg">{article.title}</CardTitle>
                    <CardDescription className="text-xs pt-1">Source: {article.source}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground text-sm mb-4">
                  {article.snippet}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Read more <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
