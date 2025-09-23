import { LoginRequest } from "#schemas/cartRequestSchema.js";
import { CartService } from "#services/cartService.js";
import { Request, Response } from "express";


const cartService = new CartService();
export const getCart = async (req: Request, res: Response) => { 
    const { storeId } = req.params;
    const credentials: LoginRequest = req.body as LoginRequest;
    const data = await cartService.getCart(storeId,credentials);
    return res.status(200).json(data);

}