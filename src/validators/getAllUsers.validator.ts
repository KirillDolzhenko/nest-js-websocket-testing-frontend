import { z } from 'zod';

export const CreateGroupSchema = z.object({
    title: z.string().min(2),
    members: z
        .string()
        .array()
        .min(1)
});

export type CreateGroupSchemaType = z.infer<typeof CreateGroupSchema>;