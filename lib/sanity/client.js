import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Sanity project IDs must contain only a-z, 0-9, and dashes.
// We validate this to prevent Sanity Client validation errors from crashing build/prerender processes.
const isValidProjectId = rawProjectId && /^[a-z0-9-]+$/i.test(rawProjectId) && rawProjectId !== "your-sanity-project-id" && rawProjectId !== "your_sanity_project_id";

const projectId = isValidProjectId ? rawProjectId : "placeholder-id";

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-25", // Use current local date
  useCdn: true, // Use CDN cache for performance
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return "";
  // Check if it's already a full HTTP url or local path
  if (typeof source === "string" && (source.startsWith("http") || source.startsWith("/"))) {
    return source;
  }
  try {
    return builder.image(source).url();
  } catch (error) {
    console.warn("Sanity image builder failed. Source:", source);
    return "";
  }
};
export { isValidProjectId };
