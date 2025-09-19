import {  MemberAttributeResponse } from '#models/memberAttributeValueResponse.js';
import { validateMemberAttributeResponse } from '#schemas/memberAttributeResponseSchema.js';
import axios from 'axios';

export class MemberService {

  public async getMemberAttributeValue(storeId: string, userId: string, attributeName: string): Promise<MemberAttributeResponse> {
    const baseUrl =  process.env.WCS_BASE_URL ?? "http://localhost:8000";
    const url = `${baseUrl}/stores/${storeId}/users/${userId}/attributes/${attributeName}`;
    console.log(baseUrl);
    
    console.log(url);
    

    try {
      const response = await axios.get<unknown>(url, {
        headers: { 'Content-Type': 'application/json' }
      });
      return validateMemberAttributeResponse(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch attribute: ${error.message}`);
      }
      if (error instanceof Error) {
        throw new Error(`Unexpected error: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
    }
  }
}