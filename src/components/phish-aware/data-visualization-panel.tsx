'use client';
import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Image as ImageIcon, Loader2, AlertTriangle, ShieldCheck, ShieldHalf, ShieldAlert, BadgeInfo } from 'lucide-react';
import { analyzeContent, AnalysisResult } from '@/app/actions';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

const riskConfig = {
  Low: {
    icon: ShieldCheck,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    glow: 'text-glow-green',
  },
  Medium: {
    icon: ShieldHalf,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    glow: 'text-glow-yellow',
  },
  High: {
    icon: ShieldAlert,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    glow: 'text-glow-orange',
  },
  Critical: {
    icon: ShieldAlert,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    glow: 'text-glow-destructive',
  },
};

export function DataVisualizationPanel() {
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result;
      if (typeof content !== 'string') return;

      setIsLoading(true);
      let result;
      if (file.type.startsWith('image/')) {
        result = await analyzeContent({ imageDataUri: content });
      } else {
        // Assuming text or .eml for now
        result = await analyzeContent({ text: content });
      }
      setAnalysisResult(result);
      setIsLoading(false);
    };
    
    if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
    } else {
        reader.readAsText(file);
    }
  };

  const handleTextAnalysis = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setError(null);
    setAnalysisResult(null);
    setIsLoading(true);
    const result = await analyzeContent({ text: inputText });
    setAnalysisResult(result);
    setIsLoading(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderAnalysisResult = () => {
    if (!analysisResult) return null;

    const config = riskConfig[analysisResult.riskLevel];
    const Icon = config.icon;

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className={`mt-6 ${config.bgColor} ${config.borderColor} border-2 shadow-lg`}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Icon className={`h-12 w-12 ${config.color}`} />
              <div>
                <CardTitle className={`text-2xl font-bold ${config.color} ${config.glow}`}>
                  Risk Level: {analysisResult.riskLevel}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI-powered analysis summary
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Summary</h4>
              <p className="text-muted-foreground">{analysisResult.reasoning}</p>
            </div>
            {analysisResult.suspiciousElements.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-3">Suspicious Elements Found</h4>
                <div className="space-y-4">
                  {analysisResult.suspiciousElements.map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-3 bg-card/50 rounded-lg border"
                    >
                      <AlertTriangle className="h-5 w-5 mt-1 shrink-0 text-orange-400" />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                            <Badge variant="destructive" className='mr-2'>Suspicious</Badge> 
                            {item.element}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-glow-primary md:text-4xl">
          Phishing Analysis Tool
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground text-balance">
          Paste text or upload a file (.eml, .txt, .png, .jpg) to scan for phishing threats using Gemini.
        </p>
      </div>

      <Card className="mt-8 w-full shadow-xl bg-card/80">
        <CardContent className="p-6">
            <div className="flex border-b mb-4">
                <button onClick={() => setActiveTab('text')} className={cn('py-2 px-4 text-sm font-medium -mb-px border-b-2', activeTab === 'text' ? 'text-primary border-primary' : 'text-muted-foreground border-transparent')}>Analyze Text</button>
                <button onClick={() => setActiveTab('file')} className={cn('py-2 px-4 text-sm font-medium -mb-px border-b-2', activeTab === 'file' ? 'text-primary border-primary' : 'text-muted-foreground border-transparent')}>Analyze File</button>
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'text' && (
                    <div className="space-y-4">
                        <Textarea
                        placeholder="Paste the content of a suspicious email or message here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="h-40 w-full"
                        />
                        <Button onClick={handleTextAnalysis} disabled={isLoading} className="w-full">
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Analyze Text'}
                        </Button>
                    </div>
                    )}

                    {activeTab === 'file' && (
                    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-border p-8 text-center">
                        <div className='flex items-center gap-2 text-muted-foreground'>
                            <FileText />
                            <ImageIcon />
                        </div>
                        <p className="text-muted-foreground">
                        {fileName ? `Selected: ${fileName}` : 'Upload a .txt, .eml, or image file'}
                        </p>
                        <Button onClick={handleUploadClick} variant="outline" disabled={isLoading}>
                            <Upload className="mr-2 h-4 w-4" />
                            {isLoading ? 'Analyzing...' : 'Choose File'}
                        </Button>
                        <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".txt,.eml,.png,.jpg,.jpeg"
                        />
                    </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className='text-muted-foreground'>Analyzing your content with Gemini...</p>
        </div>
      )}

      <AnimatePresence>
        {analysisResult && renderAnalysisResult()}
      </AnimatePresence>
    </div>
  );
}
