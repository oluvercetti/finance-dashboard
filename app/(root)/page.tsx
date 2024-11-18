import HeaderBox from "@/components/HeaderBox"
import RecentTransactions from "@/components/RecentTransactions"
import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { getAccount, getAccounts } from "@/lib/actions/bank.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser()

  const accounts = await getAccounts({ userId: loggedIn?.$id })

  if (!accounts) return;
  const accountsData = accounts?.data;
  
  const currentPage = Number(page as string) || 1;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const singleAccount = await getAccount({ appwriteItemId });

  return (
    <section className='home'>
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
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={singleAccount?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={singleAccount?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home