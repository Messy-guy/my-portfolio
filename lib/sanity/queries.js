export const heroQuery = `*[_type == "hero"][0] {
  title1,
  title1Hover,
  title2,
  title2Hover,
  resumeLink,
  tagline
}`;

export const aboutQuery = `*[_type == "about"][0] {
  bio,
  "profileImage": profileImage.asset->url
}`;

export const skillsQuery = `*[_type == "skill"] | order(name asc) {
  name,
  code,
  "logoSrc": logo.asset->url,
  logoClass,
  colorHex,
  color
}`;

export const projectsQuery = `*[_type == "project"] | order(id asc) {
  id,
  category,
  title,
  desc,
  tech,
  link,
  projectUrl,
  "img": img.asset->url,
  "video": video.asset->url,
  color
}`;

export const contactQuery = `*[_type == "contact"][0] {
  location,
  phone,
  email,
  github,
  instagram,
  facebook
}`;

export const systemMetricsQuery = `*[_type == "systemMetrics"][0] {
  codingStreak,
  activeProjectsCount,
  techRadarData[] {
    subject,
    A,
    fullMark
  }
}`;

export const allPortfolioQuery = `{
  "hero": ${heroQuery},
  "about": ${aboutQuery},
  "skills": ${skillsQuery},
  "projects": ${projectsQuery},
  "contact": ${contactQuery},
  "metrics": ${systemMetricsQuery}
}`;
