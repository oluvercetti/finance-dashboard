import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/plaid.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const isPrimary = variant === 'primary';
    const isGhost = variant === 'ghost';
    const [token, setToken] = useState('');
    const router = useRouter();
    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        }
        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({ publicToken: public_token, user });
        router.push('/');
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    }

    const { open, ready } = usePlaidLink(config);

    return (
        <>
            {isPrimary && (
                <Button onClick={() => open()} disabled={!ready} className='plaidlink-primary'>Connect bank</Button>
            )}
            {isGhost && (
                <Button onClick={() => open()} disabled={!ready} className='plaidlink-ghost'>
                    <Image src="/icons/connect-bank.svg" alt="Connect bank" width={24} height={24} />
                    <p className="hiddenl text-[16px] font-semibold text-black-2 xl:block">
                        Connect bank
                    </p>
                    Connect bank
                </Button>
            )}
            {!isPrimary && !isGhost && (
                <Button onClick={() => open()} disabled={!ready} className='plaidlink-default'>
                    <Image src="/icons/connect-bank.svg" alt="Connect bank" width={24} height={24} />
                    <p className="text-[16px] font-semibold text-black-2">
                        Connect bank
                    </p>
                </Button>
            )}
        </>
    )
}

export default PlaidLink