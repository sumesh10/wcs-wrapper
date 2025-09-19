import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType  } from "zod";

const validate = <T>(schema: ZodType<T>)=>(req:Request,res:Response, next:NextFunction)=>{
    try {
        schema.parse({
        params: req.params,
      })
      
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          // eslint-disable-next-line perfectionist/sort-objects
          errors: err.issues
        });
      }
       return res.status(500).json({
        status: "error",
        // eslint-disable-next-line perfectionist/sort-objects
        message: "Internal server error",
      });
    }

};

export default validate;

