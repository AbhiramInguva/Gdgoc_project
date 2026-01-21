'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KeyRound, ServerCrash, ShieldOff, User, FileX, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

const consequences = [
  { icon: KeyRound, text: 'Passwords Stolen', color: 'text-red-500' },
  { icon: User, text: 'Accounts Hacked', color: 'text-yellow-500' },
  { icon: FileX, text: 'Data Compromised', color: 'text-blue-500' },
];


export function PhotoGenerationAnimation() {
  const [isAttacked, setIsAttacked] = useState(false);
  const [visibleConsequences, setVisibleConsequences] = useState<number[]>([]);

  useEffect(() => {
    if (isAttacked) {
      const timers = consequences.map((_, index) =>
        setTimeout(() => {
          setVisibleConsequences(prev => [...prev, index]);
        }, index * 2000)
      );

      const resetTimer = setTimeout(() => {
        setIsAttacked(false);
        setVisibleConsequences([]);
      }, consequences.length * 2000);

      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(resetTimer);
      };
    }
  }, [isAttacked]);

  const handleAttack = () => {
    if (!isAttacked) {
      setIsAttacked(true);
    }
  }

  return (
    <div className="relative rounded-lg border-2 border-dashed border-destructive/50 p-6 text-center animate-fade-in-up flex flex-col justify-between items-center min-h-[350px]" style={{ animationDelay: '0.7s' }}>
      <div className="absolute -top-4 -left-4 -right-4 flex justify-center">
        <div className="bg-background px-4 text-sm font-semibold text-destructive text-glow-destructive">DANGER DEMO</div>
      </div>

        <div className='flex flex-col items-center'>
            <ServerCrash className="mx-auto h-8 w-8 text-destructive" />
            <p className="mt-4 text-lg font-semibold text-glow">The Danger of Malicious Links</p>
            <p className="text-muted-foreground mt-2 text-sm text-balance">A single click on a bad link can compromise your entire digital life.</p>
        </div>
      
      <div className="mt-6 w-full h-40 flex items-center justify-center relative">
        <div className='flex flex-col items-center gap-4'>
            <div className='relative w-32 h-32'>
                <div className={cn("absolute inset-0 flex items-center justify-center transition-all", isAttacked && "animate-glitch")}>
                  <Gift className="w-24 h-24 text-blue-500" />
                </div>
                {isAttacked && (
                      <div className="absolute inset-0 bg-red-900/50 rounded-full flex items-center justify-center">
                        <ShieldOff className="h-16 w-16 text-destructive animate-ping" />
                    </div>
                )}
                  {consequences.map((item, index) => {
                        const Icon = item.icon;
                        return (
                        <div
                            key={index}
                            className={cn(
                            'absolute flex items-center gap-2 rounded-lg bg-card p-2 shadow-lg',
                            item.color,
                             isAttacked && visibleConsequences.includes(index) ? 'animate-fly-out' : 'opacity-0'
                            )}
                            style={{ animationDelay: `${index * 0.3}s` }}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-sm font-medium">{item.text}</span>
                        </div>
                        );
                    })}
            </div>
              <Button onClick={handleAttack} variant="destructive" disabled={isAttacked}>
                Click to Claim Your FREE Prize!
            </Button>
        </div>
      </div>
    </div>
  );
}
