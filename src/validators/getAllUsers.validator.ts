import { z } from 'zod';

export const GetAllUsersSchema = z.object({
    title: z.string(),
    arrId: z
        .string()
        .array()
});

export type GetAllUsersSchemaType = z.infer<typeof GetAllUsersSchema>;