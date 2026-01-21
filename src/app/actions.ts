'use server';

import { getCybersecurityNews } from "@/ai/flows/get-cybersecurity-news";
import { generateProfilePhoto } from "@/ai/flows/generate-profile-photo";

export async function fetchNews() {
  try {
    const news = await getCybersecurityNews();
    return news.articles;
  } catch (error) {
    console.error("Error fetching cybersecurity news:", error);
    return [];
  }
}

export async function generatePhoto() {
  try {
    const photo = await generateProfilePhoto();
    return photo.photoDataUri;
  } catch (error) {
    console.error("Error generating photo:", error);
    return null;
  }
}
