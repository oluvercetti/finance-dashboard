import Link from 'next/link'
import React from 'react'
import AppLogo from './AppLogo'

const AuthForm = ({ type }: { type: string }) => {
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <AppLogo />
        </Link>
      </header>
    </section>
  )
}

export default AuthForm