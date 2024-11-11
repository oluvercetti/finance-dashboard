import CustomInput from "./CustomInput";
import { z } from "zod";

export const authFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    state: z.string(),
    postalCode: z.string(),
    dateOfBirth: z.string(),
    bvn: z.string().min(11, 'BVN must be 11 digits'),
  })
export { CustomInput };