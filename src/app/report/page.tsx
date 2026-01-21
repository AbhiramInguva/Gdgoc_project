import { Header } from "@/components/phish-aware/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, MailWarning, ShieldAlert } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ReportPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-12 md:py-16">
        <Card className="bg-card/50 shadow-xl">
          <CardHeader className="text-center">
            <ShieldAlert className="mx-auto h-12 w-12 text-primary text-glow-primary" />
            <CardTitle className="text-3xl font-bold tracking-tight text-glow-primary mt-4">
              How to Report a Phishing Attack
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Your quick action can protect yourself and others. Here’s what to do if you suspect you've received a phishing email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            
            <section>
              <h3 className="text-2xl font-semibold text-glow-secondary mb-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6" />
                Immediate Steps
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>1. Don't Click, Don't Reply, Don't Download:</strong> Do not interact with any links, attachments, or reply to the sender.</p>
                <p><strong>2. Don't Panic:</strong> If you accidentally clicked a link or opened an attachment, disconnect your device from the internet immediately to prevent further damage.</p>
                <p><strong>3. Change Your Passwords:</strong> If you entered any login credentials, change the password for that account and any other accounts using the same password immediately.</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-glow-secondary mb-4 flex items-center gap-3">
                <MailWarning className="h-6 w-6" />
                Reporting the Email
              </h3>
              <p className="text-muted-foreground mb-6">
                Reporting the email helps email providers and security organizations block attackers and prevent future scams. Here’s how to do it in common email clients.
              </p>

              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="gmail" className="border border-border/50 bg-background/30 rounded-lg">
                  <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Gmail" className="h-6 w-6" />
                      <span>Reporting in Gmail</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0">
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Open the suspicious email in Gmail.</li>
                      <li>Click the three vertical dots (More options) next to the reply arrow.</li>
                      <li>Select <strong>"Report phishing"</strong> from the dropdown menu.</li>
                      <li>Gmail will move the email to your Spam folder and send a report for analysis.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="outlook" className="border border-border/50 bg-background/30 rounded-lg">
                  <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/2491px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png" alt="Outlook" className="h-6 w-6" />
                      <span>Reporting in Outlook</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0">
                     <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Select the suspicious message in your inbox.</li>
                      <li>In the ribbon at the top, select the <strong>"Report"</strong> button.</li>
                      <li>From the dropdown menu, choose <strong>"Report Phishing"</strong>.</li>
                      <li>This will send the email to Microsoft for analysis and move it to your Deleted Items folder.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
              <AlertTriangle className="h-4 w-4 !text-destructive" />
              <AlertTitle className="text-destructive text-glow-destructive">Forwarding Phishing Emails</AlertTitle>
              <AlertDescription className="text-destructive/80">
                If you need to forward a phishing email to your IT department or another reporting body, do not just click "Forward." This can lose important header information. Instead, forward it as an attachment.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
