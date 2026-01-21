'use client';

import { infographicData } from '@/lib/infographic-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SpamPieChart } from './spam-pie-chart';
import { KeywordsBarChart } from './keywords-bar-chart';
import { AttachmentsBarChart } from './attachments-bar-chart';
import { ImpersonatedBrandsList } from './impersonated-brands-list';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, FileWarning, KeyRound, Crown, BarChart2, PieChart, List } from 'lucide-react';
import { format } from 'date-fns';

export function InfographicSection() {
  const { meta, spam_categories, top_keywords, malicious_attachments, impersonated_brands } = infographicData;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-glow-primary">
          Global Phishing Threat Landscape
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Spam Categories Pie Chart */}
        <Card className="lg:col-span-2 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/50 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
                <PieChart className="h-6 w-6 text-primary" />
                <CardTitle className="text-glow">Spam Categories Breakdown</CardTitle>
            </div>
            <CardDescription>Distribution of different types of malicious emails.</CardDescription>
          </CardHeader>
          <CardContent>
            <SpamPieChart data={spam_categories} />
          </CardContent>
        </Card>

        {/* Impersonated Brands */}
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-glow">Top Impersonated Brands</CardTitle>
            </div>
            <CardDescription>The most frequently mimicked brands in phishing attacks.</CardDescription>
          </CardHeader>
          <CardContent>
            <ImpersonatedBrandsList data={impersonated_brands} />
          </CardContent>
        </Card>

        {/* Top Keywords */}
        <Card className="lg:col-span-2 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/50 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
             <div className="flex items-center gap-3">
                <KeyRound className="h-6 w-6 text-secondary" />
                <CardTitle className="text-glow">Top Phishing Keywords</CardTitle>
            </div>
            <CardDescription>Common phrases used to create urgency and manipulate users.</CardDescription>
          </CardHeader>
          <CardContent>
            <KeywordsBarChart data={top_keywords} />
          </CardContent>
        </Card>

        {/* Malicious Attachments */}
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
                <FileWarning className="h-6 w-6 text-destructive" />
                <CardTitle className="text-glow">Malicious Attachment Types</CardTitle>
            </div>
            <CardDescription>File types most commonly used to deliver malware.</CardDescription>
          </CardHeader>
          <CardContent>
            <AttachmentsBarChart data={malicious_attachments} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
