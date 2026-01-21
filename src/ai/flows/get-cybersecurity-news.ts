'use server';
/**
 * @fileOverview A Genkit flow for fetching the latest cybersecurity news.
 *
 * - getCybersecurityNews - Fetches a list of recent cybersecurity news articles with snippets.
 * - CybersecurityNewsOutput - The return type for the getCybersecurityNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArticleSchema = z.object({
  title: z.string().describe('The headline of the news article.'),
  url: z.string().url().describe('The direct URL to the full news article.'),
  snippet: z.string().describe('A one or two-sentence summary of the article.'),
  source: z.string().describe('The name of the news publication (e.g., TechCrunch, Wired).'),
});

const CybersecurityNewsOutputSchema = z.object({
  articles: z.array(ArticleSchema).describe('A list of 9 recent cybersecurity news articles.'),
});
export type CybersecurityNewsOutput = z.infer<typeof CybersecurityNewsOutputSchema>;

export async function getCybersecurityNews(): Promise<CybersecurityNewsOutput> {
  return getCybersecurityNewsFlow();
}

const newsPrompt = ai.definePrompt({
  name: 'getCybersecurityNewsPrompt',
  output: {schema: CybersecurityNewsOutputSchema},
  prompt: `You are a cybersecurity news aggregator. Your task is to provide a list of the nine most recent and relevant cybersecurity news articles from major tech news sources. 
  
  For each article, provide:
  1.  A plausible and current title.
  2.  The URL, which must ALWAYS be 'https://techcrunch.com/category/security/'.
  3.  A concise one or two-sentence snippet summarizing the article.
  4.  The name of the source publication.
  
  Ensure all URLs are set to the exact placeholder provided.`,
});

const getCybersecurityNewsFlow = ai.defineFlow(
  {
    name: 'getCybersecurityNewsFlow',
    outputSchema: CybersecurityNewsOutputSchema,
  },
  async () => {
    const {output} = await newsPrompt();
    return output!;
  }
);
