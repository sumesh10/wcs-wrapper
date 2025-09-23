import * as z from "zod";

export const storeParamSchema = z.object({
  storeId: z.coerce.number("storeId should be a number")
  .int("storeId should be integer")
  .positive("storId should be postive value"),
});


export const loginRequestSchema = z.object({   
    logonId: z.string().min(1, "logonId is required"),
    logonPassword: z.string().min(1, "logonPassword is required"),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;