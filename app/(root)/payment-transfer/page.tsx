"use client";

import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { useState, useEffect } from 'react'
import { useAuthContext } from '@/providers/AuthContext';

const PaymentTransfer = () => {
  const { loggedInUser } = useAuthContext();
  const [loggedIn, setInLoggedIn] = useState<User>(loggedInUser);
  const [accounts, setAccounts] = useState<AccountResponse>();

  const accountsData = accounts?.data ?? [];
  useEffect(() => {
    const fetchData = async () => {
      const loggedInResponse = loggedIn ?? await getLoggedInUser();
      const accountsResponse = await getAccounts({ userId: loggedInResponse?.$id });
      loggedIn ?? setInLoggedIn(loggedInResponse);
      setAccounts(accountsResponse);
    };

    fetchData().catch((error) => {
      console.error(error);
    });


  }, [])

  return (
    <section className="payment-transfer">
      <HeaderBox title="Payment Transfer" subtext="Kindly provide detials to make a transfer" />
        <section className="size-full pt-5">
          <PaymentTransferForm accounts={accountsData} />
        </section>
    </section>
  )
}

export default PaymentTransfer