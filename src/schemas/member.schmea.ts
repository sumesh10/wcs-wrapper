import { z } from "zod";

export const getMemberAttributeValueSchema = z.object({
    params:z.object({

        attributeName: z.string().min(1, "AttriuteName is required"),

        storeId: z.coerce
        .number("storeId should be a number")
        .int("store Id should be an Integer")
        .positive("store Id cannot be negative"),

        // storeId: z
        // .transform(Number)
        // .refine((val)=>Number.isInteger(val),)
        // .refine((val)=>val>=0, "Store Id cannot be negative"),

        userId: z.coerce
        .bigint("Member ID should be Long value")
        .refine((val)=>val>=0n,"Member ID cannot be negative")


        // userId: z
        // .string()
        // .refine((val)=> /^[+-]?\d+$/.test(val||""),"Member ID should be Long value")
        // .transform(BigInt)
        // .refine((val)=>val>=0n,"Member ID cannot be negative")


    })
});

export type GetMemberAttributeParams = z.infer<typeof getMemberAttributeValueSchema>["params"];