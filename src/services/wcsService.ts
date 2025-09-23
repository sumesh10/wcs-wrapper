import {  MemberAttributeResponse } from '#models/memberAttributeValueResponse.js';
import { validateMemberAttributeResponse } from '#schemas/memberAttributeResponseSchema.js';
import { httpError } from '#types/errors.js';
import axios from 'axios';
import { ZodError } from 'zod';

export class MemberService {

  public async getMemberAttributeValue(storeId: string, userId: string, attributeName: string): Promise<MemberAttributeResponse> {
    const baseUrl =  process.env.WCS_BASE_URL ?? "http://localhost:8000";
    const url = `${baseUrl}/stores/${storeId}/users/${userId}/attributes/${attributeName}`;
    
    

    try {
      const response = await axios.get<unknown>(url, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data)
      return validateMemberAttributeResponse(response.data);
    } catch (error: unknown) {
       if(axios.isAxiosError(error)) {
        if(error.response){
          console.log("axios error");
          
          const statusCode = error.response.status;
          const upstreamData = error.response.data as unknown;

          const e:httpError = new Error(`WCS service error: ${error.message}`);
          e.statusCode = statusCode;
          e.upstream = upstreamData;
          throw e;
        }
        if (error.request) {
          console.log()
          const e: httpError = new Error("Bad Gateway - no response from WCS");
          e.statusCode = 502;
          throw e;
        }
        const e: httpError = new Error(error.message);
        e.statusCode = 500;
        throw e;
      }
      if(error instanceof ZodError) {
        throw error;
      }
      throw new Error(`Unexpected error: ${String(error)}`);
    }
  }
}