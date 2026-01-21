'use server';
/**
 * @fileOverview A Genkit flow for generating a profile photo.
 *
 * - generateProfilePhoto - Generates a realistic profile photo of a person.
 * - GenerateProfilePhotoOutput - The return type for the generateProfilePhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfilePhotoOutputSchema = z.object({
  photoDataUri: z.string().describe("A photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateProfilePhotoOutput = z.infer<typeof GenerateProfilePhotoOutputSchema>;

export async function generateProfilePhoto(): Promise<GenerateProfilePhotoOutput> {
    return generateProfilePhotoFlow();
}

const generateProfilePhotoFlow = ai.defineFlow(
    {
      name: 'generateProfilePhotoFlow',
      outputSchema: GenerateProfilePhotoOutputSchema,
    },
    async () => {
        const { media } = await ai.generate({
            model: 'googleai/imagen-4.0-fast-generate-001',
            prompt: 'Generate a realistic, professional headshot of a person for a corporate profile. The person should be smiling and looking directly at the camera. The background should be neutral and uncluttered.',
          });
        
          if (!media.url) {
            throw new Error('Failed to generate image.');
          }

          return { photoDataUri: media.url };
    }
  );
