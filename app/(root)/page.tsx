import HeaderBox from "@/components/HeaderBox"

const Home = () => {
  const loggedIn = { firstName: 'John', lastName: 'Doe' }
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
        </header>
      </div>
    </section>
  )
}

export default Home