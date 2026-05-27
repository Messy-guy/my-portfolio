import { client, isValidProjectId } from "./client";
import { allPortfolioQuery } from "./queries";
import { fallbackPortfolio } from "../data/fallback";

export async function fetchPortfolioData() {
  // If the Sanity configuration is using placeholder values or is invalid, return fallback data directly.
  if (!isValidProjectId) {
    console.log("NOMORSPACE: Using fallback local portfolio data (Sanity Project ID not set or invalid).");
    return fallbackPortfolio;
  }

  try {
    const data = await client.fetch(allPortfolioQuery);

    if (!data) {
      return fallbackPortfolio;
    }

    // Smart Merge with Fallbacks if Sanity records are empty
    const merged = {
      hero: { ...fallbackPortfolio.hero, ...(data.hero || {}) },
      about: { ...fallbackPortfolio.about, ...(data.about || {}) },
      skills: data.skills && data.skills.length > 0 ? data.skills : fallbackPortfolio.skills,
      projects: data.projects && data.projects.length > 0 ? data.projects : fallbackPortfolio.projects,
      contact: { ...fallbackPortfolio.contact, ...(data.contact || {}) },
      metrics: data.metrics || {
        codingStreak: 124,
        activeProjectsCount: 12,
        techRadarData: [
          { subject: "Flutter", A: 120, fullMark: 150 },
          { subject: "React", A: 140, fullMark: 150 },
          { subject: "Next.js", A: 135, fullMark: 150 },
          { subject: "Node.js", A: 95, fullMark: 150 },
          { subject: "Typescript", A: 110, fullMark: 150 }
        ]
      }
    };

    return merged;
  } catch (error) {
    console.error("NOMORSPACE: Sanity fetch failed. Falling back to local data.", error);
    return fallbackPortfolio;
  }
}
