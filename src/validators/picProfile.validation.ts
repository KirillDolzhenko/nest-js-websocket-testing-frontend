import { z } from "zod";

export const FileSchema = z.object({
    file: z.any()
    .refine((file: File) => {
        console.log(file)
        
        return file
    }, "File is required")
    // .refine(
    // //   (file: File) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
    // //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // ),
}
);


export type FileSchemaType = z.infer<typeof FileSchema>;