'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MailWarning, Link, Hourglass, type LucideIcon, ShieldCheck, Search, MousePointer, ExternalLink, MessageCircleWarning } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PhotoGenerationAnimation } from './photo-generation-animation';
import { useEffect, useState } from 'react';

interface PhishingType {
  icon: LucideIcon;
  title: string;
  description: string;
  tips: string[];
}

const phishingTypes: PhishingType[] = [
  {
    icon: MailWarning,
    title: 'Email Phishing',
    description: 'Scammers send emails pretending to be from legitimate organizations to trick you into revealing personal information.',
    tips: ['Check for generic greetings like "Dear Customer".', 'Verify the sender\'s email address.', 'Look for spelling and grammar mistakes.'],
  },
  {
    icon: Link,
    title: 'Link Spoofing & Malicious Websites',
    description: 'Links that appear legitimate but direct you to a fake website designed to steal your credentials or install malware.',
    tips: ['Hover over links to see the actual URL.', 'Be wary of shortened URLs from unknown sources.', 'Ensure websites use HTTPS.'],
  },
  {
    icon: Hourglass,
    title: 'Urgent Action Scams',
    description: 'Emails that create a sense of urgency or fear to pressure you into acting quickly without thinking.',
    tips: ['Beware of threats to close your account.', 'Be skeptical of "limited-time" offers.', 'Contact the company directly to verify the request.'],
  },
];

const realWorldExamples = [
  {
    title: "Example 1: Fake Invoice",
    content: "From: Accounts <invoice-noreply@amazn.co>\nSubject: Your recent order #123-4567890 cannot be shipped\n\nDear customer,\n\nWe had a problem with your payment for order #1234567890. Please update your payment information immediately by clicking here: http://update.amazn.co/payment-update",
    highlights: ["amazn.co (typo in domain)", 'generic "Dear customer"', "payment for order", "update your payment information immediately", "http://update.amazn.co/payment-update"],
    explanation: "This email uses a fake domain ('amazn.co') to impersonate Amazon, creates urgency around a failed payment, and pressures the user to click a suspicious link."
  },
  {
    title: "Example 2: 'Account Security' Alert",
    content: "From: Microsoft Security Team <secure@microsft.com>\nSubject: Unusual sign-in activity\n\nWe detected an unusual sign-in attempt from a new location. If this wasn't you, please secure your account now.\n\nClick here: http://microsft.com/secure-account-login",
    highlights: ["microsft.com (typo)", "Unusual sign-in activity", "secure your account now", "http://microsft.com/secure-account-login"],
    explanation: "This example uses a common fear tactic—an account security alert. It includes a misspelled domain ('microsft.com') and a direct link that doesn't go to the official Microsoft website."
  },
];

function HighlightedExample({ content, highlights }: { content: string, highlights: string[] }) {
    if (!highlights || highlights.length === 0) {
        return <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">{content}</p>;
    }
    const regex = new RegExp(`(${highlights.join('|')})`, 'gi');
    const parts = content.split(regex);
  
    return (
      <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
        {parts.map((part, i) =>
          highlights.some(h => new RegExp(h, 'i').test(part)) ? (
            <span key={i} className="bg-destructive/20 text-destructive-foreground rounded-sm px-1 py-0.5 font-semibold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </p>
    );
  }

function HoverTest() {
  return (
    <div className="group relative rounded-lg border-2 border-dashed border-primary/50 p-6 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <div className="absolute -top-4 -left-4 -right-4 flex justify-center">
        <div className="bg-background px-4 text-sm font-semibold text-primary text-glow-primary">VISUAL DEMO</div>
      </div>
      <MousePointer className="mx-auto h-8 w-8 text-primary group-hover:animate-bounce" />
      <p className="mt-4 text-lg font-semibold text-glow">The Hover Test</p>
      <p className="text-muted-foreground mt-2">Hover your mouse over the link below to see where it *really* goes.</p>
      <div className="mt-6">
        <a href="#" className="text-primary text-glow-primary underline text-lg decoration-dotted underline-offset-4" onClick={(e) => e.preventDefault()}>
          Click here to claim your prize!
        </a>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-card border rounded-lg px-3 py-2 text-sm text-foreground shadow-lg">
            <span className="font-semibold">True Destination:</span>
            <p className="font-mono text-destructive">http://totally-a-scam-site.net/malware.exe</p>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-card" />
        </div>
      </div>
    </div>
  );
}

export function PhishingEducationSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-glow">Learn to Spot Phishing Attacks</h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          Knowledge is your best defense. Understand common tactics to protect yourself.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {phishingTypes.map((type, index) => (
          <Card key={type.title} className="shadow-md hover:shadow-xl transition-shadow animate-fade-in-up" style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
            <CardHeader className="items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-2">
                <type.icon className="h-8 w-8 text-primary text-glow-primary" />
              </div>
              <CardTitle className="text-glow">{type.title}</CardTitle>
              <CardDescription className="text-balance">{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-3 text-center text-glow">How to Identify:</h4>
              <ul className="space-y-2">
                {type.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 md:mt-24 grid gap-12 md:grid-cols-2">
        <HoverTest />
        <PhotoGenerationAnimation />
      </div>

      <div className="text-center mt-16 md:mt-24 mb-12 animate-fade-in-up">
        <h3 className="text-3xl font-bold tracking-tight md:text-4xl text-glow">Real-World Examples</h3>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          See how scammers try to trick you. Click on each example to see a breakdown of the red flags.
        </p>
      </div>

      <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {isClient && (
          <Accordion type="single" collapsible className="w-full space-y-4">
              {realWorldExamples.map((example, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 bg-card/50 rounded-lg shadow-md hover:shadow-primary/20 transition-shadow">
                  <AccordionTrigger className="p-6 text-lg font-semibold text-glow hover:no-underline">
                      <div className="flex items-center gap-4">
                          <MessageCircleWarning className="h-6 w-6 text-primary" />
                          {example.title}
                      </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-6 pt-0">
                      <div className="space-y-6">
                          <div className="bg-background/70 p-4 rounded-lg border border-border/30">
                              <HighlightedExample content={example.content} highlights={example.highlights} />
                          </div>
                          <div>
                              <h4 className="font-semibold text-glow-secondary mb-2">Breakdown:</h4>
                              <p className="text-muted-foreground text-sm">{example.explanation}</p>
                          </div>
                      </div>
                  </AccordionContent>
              </AccordionItem>
              ))}
          </Accordion>
        )}
      </div>


      <div className="text-center mt-16 md:mt-24 mb-12 animate-fade-in-up">
        <h3 className="text-3xl font-bold tracking-tight md:text-4xl text-glow">External Tools & Keywords</h3>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          Leverage third-party tools and be aware of common suspicious language.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
         <Card className="shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                        <Search className="h-8 w-8 text-secondary text-glow-secondary" />
                    </div>
                    <div>
                        <CardTitle className="text-glow">Third-Party URL Scanners</CardTitle>
                        <CardDescription>Tools like CheckPhish can analyze URLs for you.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">These services maintain large databases of known phishing sites and use AI to analyze suspicious links in real-time. If you're ever unsure about a link, paste it into a tool like this before clicking.</p>
              <a href="https://checkphish.bolster.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline">
                Visit CheckPhish.ai <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
        </Card>
         <Card className="shadow-md animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
                 <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                        <MailWarning className="h-8 w-8 text-accent text-glow-accent" />
                    </div>
                    <div>
                        <CardTitle className="text-glow">Suspicious Keywords</CardTitle>
                        <CardDescription>Watch out for words that create urgency or demand action.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Attackers often use manipulative language. Be extra cautious if you see phrases like:</p>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-md text-sm font-mono">Urgent</span>
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-md text-sm font-mono">Verify</span>
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-md text-sm font-mono">Suspended</span>
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-md text-sm font-mono">Login required</span>
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-md text-sm font-mono">Action needed</span>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
