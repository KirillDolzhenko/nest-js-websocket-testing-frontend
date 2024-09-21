import { z } from 'zod';

export const LogInSchema = z.object({
    email: z
        .string()
        .min(1)
        .email(),
    password: z
        .string()
        .min(6)
        .max(100)
});

export type LogInSchemaType = z.infer<typeof LogInSchema>;