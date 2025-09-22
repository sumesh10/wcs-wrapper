import { Response } from "express";

export function setResponse(
    res: Response, 
    statusCode: number, payload:{
        data: unknown ;
        message: string;
        // eslint-disable-next-line perfectionist/sort-union-types
        status: "success" | "error";
    } 
){
  return res.status(statusCode).json(payload);
}