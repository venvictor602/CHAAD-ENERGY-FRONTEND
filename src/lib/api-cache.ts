/**
 * In-memory cache for GET requests to prevent duplicate API calls
 * (e.g. from React Strict Mode or multiple components requesting same data)
 */
const CACHE_TTL_MS = 10_000; // 10 seconds

type CacheEntry = {
  promise: Promise<unknown>;
  timestamp: number;
};

const cache = new Map<string, CacheEntry>();

function cacheKey(
  service: string,
  endpoint: string,
  params?: Record<string, unknown>,
): string {
  const sorted =
    params && Object.keys(params).length > 0
      ? JSON.stringify(
          Object.keys(params)
            .sort()
            .reduce((acc, k) => ({ ...acc, [k]: params[k] }), {}),
        )
      : "";
  return `${service}:${endpoint}:${sorted}`;
}

function isExpired(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp > CACHE_TTL_MS;
}

export function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<T> {
  const entry = cache.get(key) as CacheEntry | undefined;
  if (entry && !isExpired(entry)) {
    return entry.promise as Promise<T>;
  }
  const promise = fetcher();
  cache.set(key, { promise, timestamp: Date.now() });
  return promise;
}

export function buildGetCacheKey(
  service: string,
  endpoint: string,
  params?: Record<string, unknown>,
): string {
  return cacheKey(service, endpoint, params);
}
