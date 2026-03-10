const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";

const isBrowser = typeof window !== "undefined";

const getItem = (key: string): string | null => {
  if (!isBrowser) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return null;
  }
};

const setItem = (key: string, value: string): boolean => {
  if (!isBrowser) return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
};

const removeItem = (key: string): boolean => {
  if (!isBrowser) return false;
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
};

export const tokenStorage = {
  getAccessToken: (): string | null => getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: (): string | null => getItem(REFRESH_TOKEN_KEY),
  setAccessToken: (token: string): boolean => setItem(ACCESS_TOKEN_KEY, token),
  setRefreshToken: (token: string): boolean =>
    setItem(REFRESH_TOKEN_KEY, token),
  setTokens: (accessToken: string, refreshToken: string): boolean => {
    const accessSet = setItem(ACCESS_TOKEN_KEY, accessToken);
    const refreshSet = setItem(REFRESH_TOKEN_KEY, refreshToken);
    return accessSet && refreshSet;
  },
  removeAccessToken: (): boolean => removeItem(ACCESS_TOKEN_KEY),
  removeRefreshToken: (): boolean => removeItem(REFRESH_TOKEN_KEY),
  clearTokens: (): boolean => {
    const accessRemoved = removeItem(ACCESS_TOKEN_KEY);
    const refreshRemoved = removeItem(REFRESH_TOKEN_KEY);
    return accessRemoved && refreshRemoved;
  },
  isAuthenticated: (): boolean => !!getItem(ACCESS_TOKEN_KEY),
};
