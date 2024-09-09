import { EnumDBUserColor } from '@/types/redux/auth';
import { z } from 'zod';

export const ChangeProfileSchema = z.object({
    username: z
        .string()
        .min(1), 
    email: z
        .string()
        .min(1)
        .email(),
    picUrl: z.string().url().or(z.literal('')).optional(),
    picColor: z
        .nativeEnum(EnumDBUserColor)
        .optional()
});

export type ChangeProfileSchemaType = z.infer<typeof ChangeProfileSchema>;