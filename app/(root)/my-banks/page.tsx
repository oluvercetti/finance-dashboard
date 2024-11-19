"use client";
import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/providers/AuthContext';
import FullPageLoader from '@/components/FullPageLoader';

const MyBanks = () => {
  const { loggedInUser, bankAccounts } = useAuthContext();
  const [loggedIn, setLoggedIn] = useState<User>(loggedInUser);
  const [accounts, setAccounts] = useState<AccountResponse>(bankAccounts);
  useEffect(() => {
    const fetchData = async () => {
      const loggedInResponse = loggedIn ?? await getLoggedInUser();
      const accountsResponse = bankAccounts ?? await getAccounts({ userId: loggedInResponse?.$id });
      loggedIn ?? setLoggedIn(loggedInResponse);
      bankAccounts ?? setAccounts(accountsResponse);
    };

    fetchData().catch((error) => {
      console.error(error);
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
            {!accounts?.data?.length && <FullPageLoader text='Loading' type='Spinner'/>}
            {accounts && accounts.data.map((account: Account) => (
              <BankCard
                key={account.id}
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