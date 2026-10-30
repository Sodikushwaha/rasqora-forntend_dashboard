import welcomeRestaurant from '../../assets/welcome-restaurant.png'

function Welcome() {
  return (
    <main className="welcomeSection">
      <img
        className="welcomeImage"
        src={welcomeRestaurant}
        alt="A restaurant team serving a customer"
      />
      <div className="welcomeMessage">
        <h1>Welcome to RasQora</h1>
        <p>Your restaurant journey starts here.</p>
      </div>
    </main>
  )
}

export default Welcome