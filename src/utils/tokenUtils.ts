import { LoginRequest } from "#schemas/cartRequestSchema.js";
import { getLoginIdentity } from "#services/userService.js";


export interface TokenCacheEntry {
  wcToken: string;
  wcTrustedToken: string;
}

export const tokenCache = new Map<string, TokenCacheEntry>();

export const cacheKey = (storeId: string, username: string) => `${storeId}:${username}`;

export const getTokens = async (storeId: string, credentials: LoginRequest): Promise<TokenCacheEntry> => {
  const key = cacheKey(storeId, credentials.logonId);
  const tokenCacheEntry = tokenCache.get(key);
  if (tokenCacheEntry != undefined) {
    return tokenCacheEntry;
  }
  return getLoginIdentity(storeId, credentials);
};