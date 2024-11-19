"use client";
import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useAuthContext } from '@/providers/AuthContext';

const Footer = ({ user, type = "full" }: SidebarProps) => {
    const isFull = type === "full"
    const router = useRouter()
    const { setLoggedInUser, setBankAccounts } = useAuthContext();
    const handleLogout = async () => {
        try {
            await logoutAccount();
            setLoggedInUser(null);
            setBankAccounts(null);
            router.push('/');
        } catch (error) {
            console.error("An error occurred while logging out", error);
        }
    };
    return (
        <footer className='footer'>
            <div className={isFull ? "footer_name" : "footer_name-mobile"}>
                <p className="text-xl font-bold text-gray-700">
                    {user?.firstName[0]}
                </p>
            </div>
            <div className={isFull ? "footer_email" : "footer_email-mobile"}>
                <h1 className='text-14 truncate text-gray-700 font-semibold'>
                    {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user?.email}
                </p>
            </div>
            <div className="footer_image" onClick={handleLogout}>
                <Image src="icons/logout.svg" fill alt='logout' />
            </div>
        </footer>
    )
}

export default Footer