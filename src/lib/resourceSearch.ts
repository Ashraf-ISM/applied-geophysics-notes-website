export type ResourceSortKey = "relevance" | "title-asc" | "date-desc" | "popularity-desc";

interface FilterAndSortOptions<T> {
  items: T[];
  query?: string;
  sortBy?: ResourceSortKey;
  searchableText: (item: T) => string[];
  predicates?: Array<(item: T) => boolean>;
  getTitle?: (item: T) => string;
  getDate?: (item: T) => string;
  getPopularity?: (item: T) => number;
}

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function includesQuery(texts: string[], query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  return texts.some((text) => normalize(text).includes(q));
}

function relevanceScore(texts: string[], query: string): number {
  const q = normalize(query);
  if (!q) return 0;

  return texts.reduce((score, text) => {
    const value = normalize(text);
    if (value === q) return score + 5;
    if (value.startsWith(q)) return score + 3;
    if (value.includes(q)) return score + 1;
    return score;
  }, 0);
}

export function filterAndSortResources<T>(options: FilterAndSortOptions<T>): T[] {
  const {
    items,
    query = "",
    sortBy = "relevance",
    searchableText,
    predicates = [],
    getTitle,
    getDate,
    getPopularity,
  } = options;

  const filtered = items.filter((item) => {
    const matchesQuery = includesQuery(searchableText(item), query);
    const matchesPredicates = predicates.every((predicate) => predicate(item));
    return matchesQuery && matchesPredicates;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "title-asc" && getTitle) {
      return getTitle(a).localeCompare(getTitle(b));
    }

    if (sortBy === "date-desc" && getDate) {
      return new Date(getDate(b)).getTime() - new Date(getDate(a)).getTime();
    }

    if (sortBy === "popularity-desc" && getPopularity) {
      return getPopularity(b) - getPopularity(a);
    }

    const bScore = relevanceScore(searchableText(b), query);
    const aScore = relevanceScore(searchableText(a), query);
    return bScore - aScore;
  });

  return sorted;
}
