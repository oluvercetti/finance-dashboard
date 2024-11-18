"use client";
import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { Suspense, useEffect, useState } from 'react'
import { useAuthContext } from '@/providers/AuthContext';

const MyBanks = () => {
  const { loggedInUser } = useAuthContext();
  const [loggedIn, setLoggedIn] = useState<User>(loggedInUser);
  const [accounts, setAccounts] = useState<AccountResponse>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const loggedInResponse = loggedIn ?? await getLoggedInUser();
      const accountsResponse = await getAccounts({ userId: loggedInResponse?.$id });
      loggedIn ?? setLoggedIn(loggedInResponse);
      setAccounts(accountsResponse);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox title='My Bank Accounts' subtext='Effortlessly manage your banking.' />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {isLoading && <div className="animate-pulse w-full h-36 bg-gray-100 rounded-lg">
              Loading...
            </div>}
            {accounts && accounts.data.map((account: Account) => (
              <BankCard
                key={accounts.id}
                account={account}
                userName={loggedIn!?.firstName} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks