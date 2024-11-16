import { z } from "zod";


export const authFormSchema = (isSignIn: boolean) => z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    firstName: isSignIn ? z.string().optional() : z.string(),
    lastName: isSignIn ? z.string().optional() : z.string(),
    address1: isSignIn ? z.string().optional() : z.string(),
    city: isSignIn ? z.string().optional() : z.string(),
    state: isSignIn ? z.string().optional() : z.string(),
    postalCode: isSignIn ? z.string().optional() : z.string(),
    dateOfBirth: isSignIn ? z.string().optional() : z.string(),
    ssn: isSignIn ? z.string().optional() : z.string(),
  })

export const paymentFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});