"use client";
import FullPageLoader from "@/components/FullPageLoader";
import HeaderBox from "@/components/HeaderBox"
import RecentTransactions from "@/components/RecentTransactions"
import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { getAccount, getAccounts } from "@/lib/actions/bank.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { useAuthContext } from "@/providers/AuthContext";
import { useEffect, useState } from "react";

const Home = ({ searchParams: { id, page } }: SearchParamProps) => {
  const { loggedInUser, setBankAccounts } = useAuthContext();

  const [loggedIn, setLoggedIn] = useState<User>(loggedInUser);

  const [accounts, setAccounts] = useState<AccountResponse>();

  const [singleAccount, setSingleAccount] = useState<RecentTransactionsProps>();

  const [appwriteItemId, setAppwriteItemId] = useState<string>(id as string);

  const accountsData = accounts?.data ?? [];

  const currentPage = Number(page as string) || 1;
  const [transactionLoading, setTransactionLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const loggedInResponse = loggedIn ?? await getLoggedInUser();
      const accountsResponse = await getAccounts({ userId: loggedInResponse?.$id });
      loggedIn ?? setLoggedIn(loggedInResponse);
      setAccounts(accountsResponse);
      setBankAccounts(accountsResponse);
      setAppwriteItemId(accountsResponse?.data[0]?.appwriteItemId);
    };

    fetchData().catch((error) => {
      console.error(error)
    })
  }, []);

  useEffect(() => {
    const fetchSingleAccountData = async () => {
      setTransactionLoading(true);
      id && setSingleAccount({} as RecentTransactionsProps);
      const resolvedAppwriteItemId = id as string ?? appwriteItemId;
      setAppwriteItemId(resolvedAppwriteItemId);
      const singleAccountResponse = await getAccount({ appwriteItemId: resolvedAppwriteItemId });
      setSingleAccount(singleAccountResponse);
    };

    fetchSingleAccountData().catch((error) => {
      console.error(error)
      setTransactionLoading(false);
    }).finally(() => setTransactionLoading(false));


  }, [appwriteItemId, id])


  return (
    <section className='home'>
      {!singleAccount && <FullPageLoader text="Loading..." />}
      {singleAccount &&
        <>
          <div className="home-content">
            <header className="home-header">
              <HeaderBox
                type='greeting'
                title='Welcome'
                user={loggedIn?.firstName || 'Guest'}
                subtext='Horizon is a modern banking platform for the future.'
              />

              <TotalBalanceBox
                accounts={accountsData}
                totalBanks={accounts?.totalBanks ?? 0}
                totalCurrentBalance={accounts?.totalCurrentBalance ?? 0}
              />
            </header>

            <RecentTransactions
              accounts={accountsData}
              transactions={singleAccount?.transactions ?? []}
              appwriteItemId={appwriteItemId}
              page={currentPage}
              isBusy={transactionLoading}
            />
          </div>
          <RightSidebar
            user={loggedIn}
            transactions={singleAccount?.transactions ?? []}
            banks={accounts?.data?.slice(0, 2) as RightSidebarProps['banks']}
          />
        </>
      }
    </section>
  )
}

export default Home