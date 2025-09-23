import { LoginRequest } from "#schemas/cartRequestSchema.js";
import { httpError } from "#types/errors.js";
import { TokenCacheEntry } from "#utils/tokenUtils.js";
import { cacheKey,tokenCache } from "#utils/tokenUtils.js";
import axios from "axios";



export const getLoginIdentity = async (storeId: string, credentials: LoginRequest): Promise<TokenCacheEntry> => {
    const baseUrl =  process.env.WCS_BASE_URL ?? "http://localhost:8000";
    const url = `${baseUrl}/stores/${storeId}/loginidentity`;
    try {
        const res = await axios.post(url, credentials, { headers: { "Content-Type": "application/json" } });
        const upstream = res.data as Record<string, unknown>;
        const wcToken = upstream.WCToken as string;
        const wcTrustedToken = upstream.WCTrustedToken as string;

        if (!wcToken && !wcTrustedToken) {
            const e: httpError = new Error("Login failed - no tokens received");
            e.statusCode = 502;
            throw e;
        }

        const entry: TokenCacheEntry = { wcToken, wcTrustedToken };
        tokenCache.set(cacheKey(storeId, credentials.logonId), entry);
        return entry;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const statusCode = error.response.status;
                const upstream = error.response.data as unknown;
                console.error("WCS responded with error:", statusCode, upstream);
                const e: httpError = new Error(`WCS service error: ${error.message}`);
                e.statusCode = statusCode;
                e.upstream = upstream;
                throw e;
            }   
            if (error.request) {
                const e: httpError = new Error("Bad Gateway - no response from WCS");
                e.statusCode = 502;
                throw e;
            }
            const e: httpError = new Error(error.message);
            e.statusCode = 500;
            throw e;
        }
        throw new Error(`Unexpected error: ${String(error)}`);
    }
};