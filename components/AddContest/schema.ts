import {z} from 'zod'

export const addContestSchema = z.object({
    name: z.string().nonempty(),
    year: z.string().nonempty(),
    logo: z.string().url(),
});