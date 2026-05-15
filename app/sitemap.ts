import { MetadataRoute } from "next";

const BASE_URL = "https://www.plagueatlas.com";

const EVENT_SLUGS = [
  "plague-of-justinian",
  "black-death",
  "smallpox",
  "spanish-flu",
  "hiv-aids",
  "covid-19",
  "malaria",
  "ebola",
  "hantavirus",
  "cholera",
  "wwi",
  "wwii",
  "mongol-conquests",
  "taiping-rebellion",
  "hiroshima-nagasaki",
  "chernobyl",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/statistics`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const eventPages: MetadataRoute.Sitemap = EVENT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/pandemic/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...eventPages];
}
