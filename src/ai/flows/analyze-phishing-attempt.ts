'use server';
/**
 * @fileOverview A Genkit flow for analyzing text or images for phishing attempts.
 *
 * - analyzePhishingAttempt - Analyzes content and returns a risk assessment.
 * - PhishingAnalysisInput - The input type for the analysis.
 * - PhishingAnalysisOutput - The return type for the analysis.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PhishingAnalysisInputSchema = z.object({
  text: z.string().optional().describe('The textual content of the email or message to analyze.'),
  imageDataUri: z.string().optional().describe("An optional image of the content, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type PhishingAnalysisInput = z.infer<typeof PhishingAnalysisInputSchema>;

const PhishingAnalysisOutputSchema = z.object({
  riskLevel: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('The overall assessed risk level of the content.'),
  reasoning: z.string().describe('A detailed explanation of why the content was assigned its risk level.'),
  suspiciousElements: z.array(z.object({
    element: z.string().describe('The specific part of the content that is suspicious (e.g., a URL, a phrase, sender info).'),
    reason: z.string().describe('Why this specific element is considered suspicious.'),
  })).describe('A list of specific elements flagged as suspicious.'),
});
export type PhishingAnalysisOutput = z.infer<typeof PhishingAnalysisOutputSchema>;

export async function analyzePhishingAttempt(input: PhishingAnalysisInput): Promise<PhishingAnalysisOutput> {
  return analyzePhishingAttemptFlow(input);
}

const analysisPrompt = ai.definePrompt({
  name: 'phishingAnalysisPrompt',
  input: {schema: PhishingAnalysisInputSchema},
  output: {schema: PhishingAnalysisOutputSchema},
  prompt: `You are an expert cybersecurity analyst specializing in phishing detection. Analyze the following content and provide a risk assessment.

  Your analysis should be based on common phishing tactics, including but not limited to:
  - Urgency and pressure tactics (e.g., "account will be suspended," "immediate action required").
  - Suspicious links or mismatched URLs.
  - Generic greetings (e.g., "Dear Customer").
  - Spelling and grammar mistakes.
  - Requests for sensitive information.
  - Unsolicited attachments.
  - Sender impersonation.

  Based on the provided text and/or image, determine the risk level (Low, Medium, High, or Critical) and provide a clear, concise reasoning. Also, list the specific elements you found suspicious and explain why.

  Content to analyze:
  {{#if text}}
  Text:
  ---
  {{{text}}}
  ---
  {{/if}}

  {{#if imageDataUri}}
  Image:
  {{media url=imageDataUri}}
  {{/if}}
  `,
});

const analyzePhishingAttemptFlow = ai.defineFlow(
  {
    name: 'analyzePhishingAttemptFlow',
    inputSchema: PhishingAnalysisInputSchema,
    outputSchema: PhishingAnalysisOutputSchema,
  },
  async (input) => {
    if (!input.text && !input.imageDataUri) {
      throw new Error('Either text or an image must be provided for analysis.');
    }
    
    const {output} = await analysisPrompt(input);
    return output!;
  }
);
