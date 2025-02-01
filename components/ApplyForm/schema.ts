import { z } from "zod";

const now = new Date();
export const applySchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    nickanme: z.string().optional(),
    birthday: z.date(),
    email: z.string().email(),
    city: z.string().nonempty(),
    bio: z.string().nonempty(),
    motivation: z.string().nonempty(),
    plans: z.string().nonempty(),
    performance: z.string().nonempty(),
    instagram: z.string().optional(),
    mainPhoto: z.string().url(),
    photo1: z.string().url(),
    photo2: z.string().url(),
});

export type ApplyFormType = z.infer<typeof applySchema>;