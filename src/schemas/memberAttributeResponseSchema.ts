import { z } from 'zod';

export const memberAttributeResponseSchema = z.object({
  status: z.literal('success'),
  // eslint-disable-next-line perfectionist/sort-objects
  data: z.object({
    attributeName: z.string().nonempty(),
    value: z.email().nonempty() 
  }),
}).strict();

export type MemberAttributeResponse = z.infer<typeof memberAttributeResponseSchema>;

export function validateMemberAttributeResponse(raw: unknown): MemberAttributeResponse {
  const result = memberAttributeResponseSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid response format: ${JSON.stringify(result.error.issues)}`);
  }
  return result.data ;
}