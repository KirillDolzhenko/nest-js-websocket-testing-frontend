import { z } from 'zod';

export const SignUpSchema = z.object({
    username: z
        .string()
        .min(1), 
    email: z
        .string()
        .min(1)
        .email(),
    password: z
        .string()
        .min(7)
        .max(100)
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;