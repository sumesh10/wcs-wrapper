import { LoginRequest } from "#schemas/cartRequestSchema.js";
import { httpError } from "#types/errors.js";
import { getTokens } from "#utils/tokenUtils.js";
import axios from "axios";



export class CartService {
    public async getCart(storeId: string, credentials: LoginRequest, retried?: boolean): Promise<unknown> {

        const baseUrl =  process.env.WCS_BASE_URL ?? "http://localhost:8000";
        const url = `${baseUrl}/stores/${storeId}/cart/@self`;

        const retriedOnce = retried ?? false;
        try {
            const tokens = await getTokens(storeId, credentials);

            const resp = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                WCToken: tokens.wcToken,
                WCTrustedToken: tokens.wcTrustedToken,
            },
            });
            return resp.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const statusCode = error.response.status;
                    const upstream: unknown = error.response.data as unknown;
                    console.error("WCS responded with error:", statusCode, upstream);
                    if ((error.response.status === 401 || statusCode === 403) && !retriedOnce) {
                        console.log("Retrying after 401 Unauthorized");
                        return this.getCart(storeId, credentials, true);
                    }
                    const e:httpError = new Error(`WCS service error: ${error.message}`);
                    e.statusCode = statusCode;
                    e.upstream = upstream;
                    throw e;
                    
                }
                if (error.request) {
                    const e: Error & { statusCode?: number } = new Error("Bad Gateway - no response from WCS");
                    e.statusCode = 502;
                    throw e;
                }
                const e: httpError = new Error(error.message);
                e.statusCode = 500;
                throw e;
            }
            throw new Error(`Unexpected error: ${String(error)}`);
        }

        
    }   
}