import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"

const Home = () => {
  const loggedIn = { $id:"", firstName: 'John', lastName: 'Doe', email: 'test@gmail.com', userId: '', dwollaCustomerUrl: '', dwollaCustomerId: '', address1: '', city: '', state: '', postalCode: '', dateOfBirth: '', ssn: '' }
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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1230.54}
          />
        </header>

        RECENT TRANSACTIONS
      </div>
      <RightSidebar 
      user={loggedIn}
      transactions={[]}
      banks={[{ currentBalance: 2312.30 }, { currentBalance: 432.30 }]}
      />
    </section>
  )
}

export default Home