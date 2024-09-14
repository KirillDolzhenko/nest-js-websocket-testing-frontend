import { z } from 'zod';

export const SearchUsersSchema = z.object({
    query: z
        .string()
        .min(1),
});

export type SearchUsersSchemaType = z.infer<typeof SearchUsersSchema>;