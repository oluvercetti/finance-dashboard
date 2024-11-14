import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken } from '@/lib/actions/plaid.actions';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const isPrimary = variant === 'primary';
    const isGhost = variant === 'ghost';
    const [token, setToken] = useState('');
    const router = useRouter();
    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.link_token);
        }
    }, [user]);
    const onSuccess = useCallback<PlaidLinkOnSuccess>((public_token: string) => {
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
                <Button onClick={open()} disabled={!ready} className='plaidlink-primary'>Connect bank</Button>
            )}
            {isGhost && (
                <Button className='plaidlink-ghost'>Connect bank</Button>
            )}
            {!isPrimary && !isGhost && (
                <Button className='plaidlink'>Connect bank</Button>
            )}
        </>
    )
}

export default PlaidLink