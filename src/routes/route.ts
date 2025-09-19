import {getMemberAttributeValue} from '#controllers/wrapperController.js'
import validate from '#middleware/validateParameters.js';
import { getMemberAttributeValueSchema } from '#schemas/member.schmea.js';
import { Router } from "express";


const router = Router();

router.get("/member/:storeId/:userId/attribute/:attributeName",validate(getMemberAttributeValueSchema),getMemberAttributeValue)

export default router;