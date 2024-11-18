'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "./uiComponents"
import AppLogo from './AppLogo'
import { AuthCustomInput } from './forms';
import { Loader2 } from 'lucide-react';
import { authFormSchema } from '@/lib/models';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isSignUp = type === 'sign-up';
  const isSignIn = type === 'sign-in';
  const headerTitle = isSignIn ? 'Sign In' : 'Sign Up';
  const footerTitle = isSignIn ? "Don't have an account?" : 'Already have an account?';
  const footerLink = isSignIn ? '/sign-up' : '/sign-in';
  const footerText = isSignIn ? 'Sign Up' : 'Sign In';
  const formSchema = authFormSchema(isSignIn);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (isSignIn) {
        const response = await signIn({ email: data.email, password: data.password });
        if (response) {
          router.push('/');
        }
      }

      if (isSignUp) {
        const userData = {
          email: data.email,
          password: data.password,
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
        }
        const newUser = await signUp(userData);
        setUser(newUser);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <AppLogo />
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account' : headerTitle}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user ? 'Link your account to get started' : 'Please enter your details'}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {isSignUp && (
                <>
                  <div className='flex gap-4'>
                    <AuthCustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name' type='text' formId='auth-form-firstname' />
                    <AuthCustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your last name' type='text' formId='auth-form-lastname' />
                  </div>
                  <AuthCustomInput control={form.control} name='address1' label='Address' placeholder='Enter your specific address' type='text' formId='auth-form-address' />
                  <AuthCustomInput control={form.control} name='city' label='City' placeholder='Enter your specific city' type='text' formId='auth-form-city' />
                  <div className="flex gap-4">
                    <AuthCustomInput control={form.control} name='state' label='State' placeholder='Example: Lagos' type='text' formId='auth-form-state' />
                    <AuthCustomInput control={form.control} name='postalCode' label='Postal Code' placeholder='Ex: 105102' type='text' formId='auth-form-postalcode' />
                  </div>
                  <div className="flex gap-4">
                    <AuthCustomInput control={form.control} name='dateOfBirth' label='Date of Birth' placeholder='YYYY-MM-DD' type='text' formId='auth-form-dateofbirth' />
                    <AuthCustomInput control={form.control} name='ssn' label='SSN' placeholder='22209392832' type='text' formId='auth-form-ssn' />
                  </div>
                </>
              )}
              <AuthCustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' type='email' formId='auth-form-email' />
              <AuthCustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' type='password' formId='auth-form-password' />
              <div className='flex flex-col gap-4'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                    </>
                  ) : headerTitle}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className='text-14 font-normal text-gray-600'>{footerTitle}</p>
            <Link href={footerLink} className='form-link'>
              {footerText}
            </Link>
          </footer>
        </>

      )}
    </section>
  )
}

export default AuthForm