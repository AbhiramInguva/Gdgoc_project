'use client';

import { Header } from '@/components/phish-aware/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Eye } from 'lucide-react';
import Link from 'next/link';

export function PhishAwareDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
          
          <section className="text-center animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-glow-primary">
              Securing Your Inbox, Empowering Your Awareness.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
              Welcome to the Phishing Detection and Awareness Portal. In an era where digital threats are evolving rapidly, email remains one of the most vulnerable entry points for cyberattacks. We are dedicated to helping you stay safe by combining automated technology with practical education.
            </p>
          </section>

          <section className="mt-12 grid gap-8 md:grid-cols-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className='text-glow'>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our primary goal is to create a comprehensive tool that analyzes incoming emails for phishing indicators using the Gmail API, while simultaneously providing a public-facing resource to educate users on cybersecurity best practices.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className='text-glow'>Who We Are</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We are a student initiative part of GDG On Campus GITAM Hyderabad. Our team leverages Google Workspace technologies and third-party tools to build solutions that detect, score, and flag malicious emails before they cause harm.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className='text-glow text-center text-2xl'>What We Offer</CardTitle>
                <CardDescription className='text-center'>Our platform operates on two main pillars:</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-8 md:grid-cols-2">
                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-glow-secondary">Automated Detection</h3>
                  <p className="text-muted-foreground mt-2">
                    We use advanced Python scripts to analyze email headers, trace suspicious links, and assign risk scores to potential threats.
                  </p>
                </div>
                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-glow-secondary">User Awareness</h3>
                  <p className="text-muted-foreground mt-2">
                    We believe technology is only half the battle. This portal hosts educational content and actionable advice to help you recognize and neutralize threats on your own.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-glow">
              Explore the Portal
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link href="/learn" passHref>
                <Card className="p-6 text-center hover:bg-primary/10 hover:shadow-primary/20 transition-all cursor-pointer h-full">
                  <Eye className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">Spot Phishing</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Learn to identify red flags using real-world examples and our detailed "Hover Test" guide.</p>
                </Card>
              </Link>
              <Link href="/report" passHref>
                <Card className="p-6 text-center hover:bg-primary/10 hover:shadow-primary/20 transition-all cursor-pointer h-full">
                  <FileText className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">Report Phishing</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Access clear instructions on how to handle suspicious emails and the immediate action plan for reporting threats.</p>
                </Card>
              </Link>
              <Link href="/docs" passHref>
                <Card className="p-6 text-center hover:bg-primary/10 hover:shadow-primary/20 transition-all cursor-pointer h-full">
                  <BookOpen className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">Project Documentation</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Dive into the technical architecture behind our analysis engine and risk scoring system.</p>
                </Card>
              </Link>
            </div>
          </section>

        </div>
      </main>
      <footer className="py-8">
      </footer>
    </div>
  );
}
