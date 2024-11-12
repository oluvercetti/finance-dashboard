import { z } from "zod";


export const authFormSchema = (isSignIn: boolean) => z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    firstName: isSignIn ? z.string().optional() : z.string(),
    lastName: isSignIn ? z.string().optional() : z.string(),
    address: isSignIn ? z.string().optional() : z.string(),
    city: isSignIn ? z.string().optional() : z.string(),
    state: isSignIn ? z.string().optional() : z.string(),
    postalCode: isSignIn ? z.string().optional() : z.string(),
    dateOfBirth: isSignIn ? z.string().optional() : z.string(),
    bvn: isSignIn ? z.string().optional() : z.string().min(11, 'BVN must be 11 digits'),
  })