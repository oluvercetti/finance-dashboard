import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({ user, type = "full" }: SidebarProps) => {
    const isFull = type === "full"
    const router = useRouter()
    const handleLogout = async () => {
        const loggedOut = await logoutAccount().catch((error) => {
            console.error("An error occurred while logging out");
          });
        if (loggedOut) router.push('/sign-in')
    }
    return (
        <footer className='footer'>
            <div className={isFull ? "footer_name" : "footer_name-mobile"}>
                <p className="text-xl font-bold text-gray-700">
                    {user?.name[0]}
                </p>
            </div>
            <div className={isFull ? "footer_email" : "footer_email-mobile"}>
                <h1 className='text-14 truncate text-gray-700 font-semibold'>
                    {user?.name}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user?.email}
                </p>
            </div>
            <div className="footer_image" onClick={handleLogout}>
                <Image src="icons/logout.svg" fill alt='logout'/>
            </div>
        </footer>
    )
}

export default Footer