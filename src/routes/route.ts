import {getMemberAttributeValue} from '#controllers/wrapperController.js'
import validate from '#middleware/validateParameters.js';
import { storeParamSchema } from '#schemas/cartRequestSchema.js';
import { loginRequestSchema } from '#schemas/cartRequestSchema.js';
import { getMemberAttributeValueSchema } from '#schemas/memberSchema.js';
import { Router } from "express";


const router = Router();

router.get("/member/:storeId/:userId/attribute/:attributeName",validate(getMemberAttributeValueSchema,"params"),getMemberAttributeValue)
router.post("/store/:storeId/cart",validate(storeParamSchema, "params"),validate(loginRequestSchema,"body"),)


export default router;