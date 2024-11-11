'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "./uiComponents"
import AppLogo from './AppLogo'
import { CustomInput, authFormSchema } from './forms';
import { Loader2 } from 'lucide-react';


const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const headerTitle = type === 'sign-in' ? 'Sign In' : 'Sign Up';
  const footerTitle = type === 'sign-in' ? "Don't have an account?" : 'Already have an account?';
  const footerLink = type === 'sign-in' ? '/sign-up' : '/sign-in';
  const footerText = type === 'sign-in' ? 'Sign Up' : 'Sign In';
  const isSignUp = type === 'sign-up';

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      bvn: "",
    },
  })

  function onSubmit(values: z.infer<typeof authFormSchema>) {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5">
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
          {/* PlaidLink */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {isSignUp && (
                <>
                  <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name' type='text' formId='auth-form-firstname' />
                  <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your last name' type='text' formId='auth-form-lastname' />
                  <CustomInput control={form.control} name='address' label='Address' placeholder='Enter your specific address' type='text' formId='auth-form-address' />
                  <CustomInput control={form.control} name='state' label='State' placeholder='Example: Lagos' type='text' formId='auth-form-state' />
                  <CustomInput control={form.control} name='postalCode' label='Postal Code' placeholder='Ex: 105102' type='text' formId='auth-form-postalcode' />
                  <CustomInput control={form.control} name='dateOfBirth' label='Date of Birth' placeholder='YYYY-MM-DD' type='date' formId='auth-form-dateofbirth' />
                  <CustomInput control={form.control} name='bvn' label='BVN' placeholder='22209392832' type='text' formId='auth-form-bvn' />
                </>
              )}
              <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' type='email' formId='auth-form-email' />
              <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' type='password' formId='auth-form-password' />
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