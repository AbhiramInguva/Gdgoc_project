import { Header } from "@/components/phish-aware/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-8">
        
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-glow-primary">
            Phishing Detection and Awareness
          </h1>
          <p className="mt-2 text-2xl text-muted-foreground">System Documentation</p>
        </section>

        <Card className="bg-card/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-glow">Project Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To create a tool that analyzes incoming emails for phishing indicators using the Gmail API and provide a public-facing awareness resource.</p>
            <h4 className="font-semibold text-lg mt-6 mb-4 text-glow-secondary">Core Deliverables:</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Automated Python script for email analysis and scoring.</li>
              <li>Structured storage of analysis data in Google Drive.</li>
              <li>User-friendly Phishing Awareness website built on Google Sites.</li>
            </ul>
          </CardContent>
        </Card>

        {/* 1. System Architecture Overview */}
        <Card className="bg-card/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-glow">1. System Architecture Overview</CardTitle>
            <CardDescription>
              The system operates in four sequential phases, integrating Google Workspace and third-party cybersecurity tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Function</TableHead>
                    <TableHead>Tools Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Data Collection</TableCell>
                    <TableCell>Authenticates, fetches raw email content and headers from target mailboxes.</TableCell>
                    <TableCell>Gmail API (Python)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Data Storage</TableCell>
                    <TableCell>Stores raw <code>.eml</code> files and structured analysis results (<code>.csv</code>, <code>.json</code>).</TableCell>
                    <TableCell>Google Drive API</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Analysis Engine</TableCell>
                    <TableCell>Parses headers, extracts URLs, performs external checks, and generates a risk score.</TableCell>
                    <TableCell>Python Scripting, <code>email</code> library, BeautifulSoup, cURL/Nmap</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Awareness Portal</TableCell>
                    <TableCell>Hosts educational content and best practices for end-users.</TableCell>
                    <TableCell>Google Sites</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 2. Phase I: System Setup & Prerequisites */}
        <Card className="bg-card/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-glow">2. Phase I: System Setup & Prerequisites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-glow-secondary">2.1. Google Cloud Project (GCP) Setup</h3>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><strong>Project Creation:</strong> Create a new project in the Google Cloud Console.</li>
                <li><strong>Enable APIs:</strong> Navigate to the API Library and enable the following services:
                  <ul className="list-disc list-inside pl-6 mt-2 space-y-1">
                    <li>Gmail API</li>
                    <li>Google Drive API</li>
                  </ul>
                </li>
                <li><strong>Create Credentials:</strong>
                  <ol className="list-decimal list-inside pl-6 mt-2 space-y-1">
                    <li>Go to APIs & Services {'>'} Credentials.</li>
                    <li>Click "Create Credentials" and select OAuth Client ID.</li>
                    <li>Choose "Desktop app" for local development, or "Web application" if deployed on a server.</li>
                    <li>Download the JSON file containing the client secret (e.g., <code>client_secret.json</code>). Keep this file secure.</li>
                  </ol>
                </li>
              </ul>
            </div>
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-xl font-semibold mb-3 text-glow-secondary">2.2. Environment and Tooling</h3>
               <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><strong>Python Environment:</strong> Use Python 3.x and set up a virtual environment (<code>python -m venv venv</code>).</li>
                <li><strong>Dependencies:</strong> Install required Python libraries:
                  <pre className="bg-background/70 p-3 rounded-md my-2 text-sm text-foreground overflow-x-auto"><code>pip install google-api-python-client google-auth-oauthlib google-auth-httplib2 beautifulsoup4</code></pre>
                </li>
                <li><strong>External Tools:</strong> Ensure cURL (for fetching and redirect tracing) is installed and accessible via your scripting environment.</li>
              </ul>
            </div>
             <div className="border-t border-border/50 pt-6">
              <h3 className="text-xl font-semibold mb-3 text-glow-secondary">2.3. Initial Authentication (Generating Token)</h3>
              <p className="text-muted-foreground mb-3">A one-time script must be run to generate the permanent access token:</p>
               <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><strong>Define Scopes:</strong> Request the required permissions:
                  <ul className="list-disc list-inside pl-6 mt-2 space-y-1">
                    <li><code>https://www.googleapis.com/auth/gmail.readonly</code></li>
                    <li><code>https://www.googleapis.com/auth/drive</code></li>
                  </ul>
                </li>
                <li><strong>Authorization Flow:</strong> The script will open a browser window, prompting the user to log in to the target Gmail account and grant the specified permissions.</li>
                <li><strong>Token Storage:</strong> The successful flow generates a <code>token.json</code> file. This file securely stores the access token and is used for all future API calls, preventing repeated logins.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3. Phase II: Data Collection & Storage (Gmail API) */}
        <Card className="bg-card/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-glow">3. Phase II: Data Collection & Storage (Gmail API)</CardTitle>
            <CardDescription>The <code>email_fetcher.py</code> script executes these steps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-glow-secondary">3.1. Fetching Raw Email Messages</h3>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><strong>Build Service:</strong> Initialize the Gmail API service using <code>token.json</code>.</li>
                <li><strong>Querying:</strong> Call the <code>users.messages.list</code> endpoint using specific search queries for sample collection (e.g., searching the spam folder):
                    <p className="text-xs text-muted-foreground italic my-2">Query Examples: <code>is:spam</code>, <code>label:inbox subject:"urgent action required"</code>, or <code>label:inbox has:attachment</code></p>
                </li>
                <li><strong>Retrieving Raw Content:</strong> For each <code>messageId</code> returned by the list query, call <code>users.messages.get</code> with the parameter <code>format='raw'</code>.
                  <p className="text-xs text-muted-foreground italic mt-2"><strong>Reason:</strong> The 'raw' format returns the email in RFC 2822 format, which contains the complete, unedited email headers and content, essential for deep analysis.</p>
                </li>
              </ul>
            </div>
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-xl font-semibold mb-3 text-glow-secondary">3.2. Data Storage and Preprocessing</h3>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><strong>Drive Upload (Raw Archive):</strong> Use the Google Drive API to upload the full raw MIME content of each email (saved as a <code>.eml</code> file) to a designated Drive folder (e.g., <code>/Phishing_Archive/</code>).
                  <p className="text-xs text-muted-foreground italic mt-2"><strong>Purpose:</strong> This preserves the original message for forensic review.</p>
                </li>
                <li><strong>Initial Parsing:</strong> Use Python's built-in <code>email</code> module to parse the raw string into a structured Message object.
                  <ul className="list-disc list-inside pl-6 mt-2 space-y-1">
                    <li><strong>Header Extraction:</strong> Extract and store the key-value pairs for the headers (e.g., <code>From</code>, <code>Subject</code>, <code>Date</code>, <code>Return-Path</code>).</li>
                    <li><strong>Body Identification:</strong> Isolate the HTML part of the email body, as this is where hidden links reside.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {/* 4. Phase III: Analysis & Detection Engine */}
        <Card className="bg-card/50 shadow-xl">
            <CardHeader>
                <CardTitle className="text-glow">4. Phase III: Analysis & Detection Engine</CardTitle>
                <CardDescription>The <code>analysis_engine.py</code> script applies detection logic to the preprocessed data and calculates the Phishing Risk Score (PRS).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-glow-secondary">4.1. Feature Extraction and Header Analysis</h3>
                    <p className="text-muted-foreground mb-4">The script assigns penalty points (weights) for suspicious indicators found in the email headers and text.</p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Indicator</TableHead>
                                    <TableHead>Header/Field</TableHead>
                                    <TableHead>Phishing Pattern</TableHead>
                                    <TableHead className="text-right">PRS Weight</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Sender Spoofing</TableCell>
                                    <TableCell><code>From</code>, <code>Return-Path</code>, <code>Reply-To</code></TableCell>
                                    <TableCell>Mismatch between the display name and the actual email domain.</TableCell>
                                    <TableCell className="text-right"><Badge variant="destructive">+20</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Auth Failure</TableCell>
                                    <TableCell><code>Authentication-Results</code></TableCell>
                                    <TableCell>Explicit results showing <code>spf=fail</code> or <code>dkim=fail</code>.</TableCell>
                                    <TableCell className="text-right"><Badge variant="destructive">+30</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Urgency Keywords</TableCell>
                                    <TableCell><code>Subject</code>, Body Text</TableCell>
                                    <TableCell>Presence of high-pressure terms like "suspended," "immediate action," or "frozen."</TableCell>
                                    <TableCell className="text-right"><Badge variant="destructive" className="bg-orange-500 hover:bg-orange-500/80">+15</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Obscured Domain</TableCell>
                                    <TableCell><code>From</code></TableCell>
                                    <TableCell>Sender domain uses homoglyphs (e.g., <code>micr0soft.com</code> instead of <code>microsoft.com</code>).</TableCell>
                                    <TableCell className="text-right"><Badge variant="destructive">+25</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Attachments</TableCell>
                                    <TableCell><code>Content-Type</code>, <code>Filename</code></TableCell>
                                    <TableCell>Unexpected <code>.zip</code>, <code>.exe</code>, or <code>.iso</code> attachments.</TableCell>
                                    <TableCell className="text-right"><Badge variant="destructive" className="bg-yellow-500 hover:bg-yellow-500/80">+10</Badge></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="border-t border-border/50 pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-glow-secondary">4.2. Deep Link Analysis (The Critical Step)</h3>
                    <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                        <li><strong>HTML Link Parsing:</strong>
                            <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
                                <li>Use the <code>BeautifulSoup</code> library to parse the HTML body.</li>
                                <li>Iterate through all anchor tags (<code>&lt;a&gt;</code>) to extract the two key components:
                                    <ul className="list-disc list-inside pl-6 mt-2 space-y-1">
                                        <li><strong>Visual Text (Anchor Text):</strong> <code>tag.text</code> (What the user sees, e.g., "https://www.mybank.com")</li>
                                        <li><strong>Target URL (Href):</strong> <code>tag['href']</code> (Where the user actually goes, e.g., "http://192.168.1.1/login")</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong>Link Spoofing Check (Internal):</strong>
                            <p className="pl-6">Compare the domain of the Visual Text against the domain of the Target URL. A mismatch is a strong indicator of spoofing. <Badge variant="destructive">+25 PRS</Badge></p>
                        </li>
                         <li><strong>External Redirect Tracing (cURL/Nmap):</strong>
                            <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
                                <li>Use cURL to perform a safe, automated check on the Target URL.</li>
                                <li>Command: <pre className="bg-background/70 p-3 rounded-md my-2 text-sm text-foreground overflow-x-auto"><code>curl -L -s -o /dev/null -w '%&#123;url_effective&#125;' [Target URL]</code></pre></li>
                                <li>The <code>-L</code> flag ensures all HTTP redirects are followed. The output is the final landing page URL.</li>
                                <li><strong>Redirect Indicator:</strong> If the initial Target URL redirects to a different, suspicious-looking domain, significantly increase the PRS. <Badge variant="destructive">+40 PRS</Badge></li>
                            </ul>
                        </li>
                        <li><strong>Domain Reputation Check (Optional):</strong> Integrate with a public blocklist API (like Google Safe Browsing Lookup) to check the final effective URL against known malicious lists.</li>
                    </ul>
                </div>
                 <div className="border-t border-border/50 pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-glow-secondary">4.3. Final Scoring and Reporting</h3>
                    <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                        <li><strong>Risk Score Calculation:</strong> Sum all accumulated weights to generate the final Phishing Risk Score (0-100).
                            <p className="text-xs text-muted-foreground italic mt-2"><strong>Action Threshold:</strong> Define a threshold (e.g., PRS {'>'} 75) to flag emails for human review or automated quarantine.</p>
                        </li>
                        <li><strong>Structured Output:</strong> Compile all features and the final score into a structured data format (e.g., a CSV row or JSON object).</li>
                        <li><strong>Store Analysis Results:</strong> Append the structured data to a master file (<code>analysis_results.csv</code>) and upload/update it on Google Drive.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>

        {/* 5. Phase IV: User Awareness Portal */}
        <Card className="bg-card/50 shadow-xl">
            <CardHeader>
                <CardTitle className="text-glow">5. Phase IV: User Awareness Portal (Google Sites)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-glow-secondary">5.1. Site Structure and Content</h3>
                    <p className="text-muted-foreground mb-4">The awareness site must be easy to navigate and focused on actionable advice.</p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Page Name</TableHead>
                                    <TableHead>Key Content Points</TableHead>
                                    <TableHead>Critical Element</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Home</TableCell>
                                    <TableCell>Welcome, Mission Statement, Quick links to resources.</TableCell>
                                    <TableCell>Clear, professional design.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Spot Phishing</TableCell>
                                    <TableCell>Detailed, step-by-step guidance on identifying red flags.</TableCell>
                                    <TableCell>The "Hover Test": An annotated image showing where the true URL appears when hovering over a link.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Real-World Examples</TableCell>
                                    <TableCell>Anonymized screenshots of past/analyzed phishing emails, with red flags clearly circled and explained.</TableCell>
                                    <TableCell>Visual Context: Use actual data collected by the detection engine.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Report Phishing</TableCell>
                                    <TableCell>Clear instructions: Do not click. Forward the suspicious email to the security team's dedicated reporting address, then delete.</TableCell>
                                    <TableCell>Immediate Action Plan: Focus on reducing panic and ensuring compliance.</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
                 <div className="border-t border-border/50 pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-glow-secondary">5.2. Google Sites Best Practices</h3>
                    <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                        <li><strong>Simplicity:</strong> Keep the layout clean to ensure key information is immediately visible (especially on mobile devices).</li>
                        <li><strong>Accessibility:</strong> Use clear headings, bullet points, and high-contrast text.</li>
                        <li><strong>Engagement:</strong> Embed a simple Google Forms quiz to test user knowledge and track training effectiveness.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
        
        {/* 6. Deployment and Maintenance */}
        <Card className="bg-card/50 shadow-xl">
            <CardHeader>
                <CardTitle className="text-glow">6. Deployment and Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div>
                    <h3 className="text-xl font-semibold mb-3 text-glow-secondary">6.1. System Automation</h3>
                    <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                        <li><strong>Scheduling:</strong> Deploy the Python scripts (<code>email_fetcher.py</code> and <code>analysis_engine.py</code>) to run automatically on a fixed schedule (e.g., every hour) using a job scheduler like cron (Linux), Task Scheduler (Windows), or a Google Cloud Function (Serverless).</li>
                    </ul>
                </div>
                 <div className="border-t border-border/50 pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-glow-secondary">6.2. Alerting</h3>
                    <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                        <li><strong>Integrate a notification mechanism</strong> (e.g., send an email alert via the Gmail API, or log to a dedicated Google Sheet) if any email exceeds the defined Phishing Risk Score (PRS) threshold.</li>
                    </ul>
                </div>
                 <div className="border-t border-border/50 pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-glow-secondary">6.3. Maintenance and Feedback Loop</h3>
                     <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                        <li><strong>Rule Tuning:</strong> Regularly review the <code>analysis_results.csv</code> on Google Drive. If a live phishing campaign is missed, update the keyword list or adjust the PRS weights in your analysis script.</li>
                        <li><strong>Content Refresh:</strong> Update the Google Sites portal with new phishing examples every quarter to keep the awareness training relevant to current threats.</li>
                        <li><strong>URL List Management:</strong> Regularly update your list of known good domains to reduce false positives.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
