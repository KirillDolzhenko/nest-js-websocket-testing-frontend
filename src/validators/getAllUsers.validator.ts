import { z } from 'zod';

export const CreateGroupSchema = z.object({
    title: z.string().min(2),
    members: z
        .string()
        .array()
        .min(1, "You must select at least 1 member")
});

export type CreateGroupSchemaType = z.infer<typeof CreateGroupSchema>;