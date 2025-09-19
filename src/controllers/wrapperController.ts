import { MemberService } from "#services/wcsService.js";
import { Request, Response } from "express";

const memberService = new MemberService();

export const getMemberAttributeValue = async (req: Request, res: Response) => {
  const { attributeName, storeId, userId} = req.params;


  try {
    const data = await memberService.getMemberAttributeValue(storeId, userId, attributeName);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Orchestrator Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve member attribute' });
  }
};

