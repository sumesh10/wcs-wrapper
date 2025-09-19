import { MemberAttributeResponse } from '#models/memberAttributeValueResponse.js';
import axios from 'axios';

export class MemberService {

  public async getMemberAttributeValue(storeId: string, userId: string, attributeName: string): Promise<MemberAttributeResponse> {
    const baseUrl =  process.env.WCS_BASE_URL ?? "http://localhost:8000";
    const url = `${baseUrl}/stores/${storeId}/users/${userId}/attributes/${attributeName}`;
    console.log(baseUrl);
    
    console.log(url);
    

    try {
      const response = await axios.get<MemberAttributeResponse>(url, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch attribute: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
    }
  }
}
