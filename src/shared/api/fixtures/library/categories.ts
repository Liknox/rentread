// cSpell: disable
import type { Category } from "@shared/api/types"

// FIXME: Later, instead of icons, use links to images.
// FIXME: Add more specific works.

export const IMAGINATIVE: Category = {
  id: 1,
  name: "Fiction literature",
  slug: "fiction-literature",
  description: "classic, fantasy, detective stories, screen adaptations",
  cover: { style: { color: "#b0a894" } },
}

export const NOT_IMAGINATIVE: Category = {
  id: 2,
  name: "Non-fiction literature",
  slug: "non-fiction-literature",
  description: "art, self-improvement, health, psychology",
  cover: { style: { color: "#94b0a3" } },
}

export const BUSINESS: Category = {
  id: 3,
  name: "Business literature",
  slug: "business-literature",
  description: "biographies, management, investments, marketing",
  cover: { style: { color: "#94a7b0" } },
}

export const getAll = () => [IMAGINATIVE, NOT_IMAGINATIVE, BUSINESS]
