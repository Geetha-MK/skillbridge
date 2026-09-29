import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Dashboard() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {

    const storedUser = sessionStorage.getItem('loggedInUser')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])


  return (
    <div className="dashboard-page">

      <section className="dashboard-welcome">

        <div>

          <span className="dashboard-label">
            SKILLBRIDGE DASHBOARD
          </span>

          <h1>
            Welcome back, {user ? user.name : 'User'} 👋
          </h1>

          <p>
            Continue learning, share your knowledge,
            and build meaningful connections.
          </p>

        </div>

      </section>


      <section className="dashboard-section">

        <h2>
          What would you like to do today?
        </h2>

        <div className="dashboard-actions">

          <div className="dashboard-card">

            <div className="dashboard-card-icon">
              L
            </div>

            <h3>
              Learn
            </h3>

            <p>
              Discover skills and find people who can
              help you learn through peer-to-peer
              knowledge sharing.
            </p>

            <button onClick={() => navigate('/skills')}>
  Explore Skills
</button>

          </div>


          <div className="dashboard-card">

            <div className="dashboard-card-icon">
              T
            </div>

            <h3>
              Teach
            </h3>

            <p>
              Share your knowledge and help others grow
              by becoming a teacher.
            </p>

            <button onClick={() => navigate('/teachers')}>
  Start Teaching
</button>

          </div>


          <div className="dashboard-card">

            <div className="dashboard-card-icon">
              C
            </div>

            <h3>
              Connect
            </h3>

            <p>
              Build meaningful connections with learners
              and teachers who share your interests.
            </p>

            <button onClick={() => navigate('/connections')}>
  Find People
</button>

          </div>

        </div>

      </section>


      <section className="dashboard-section activity-section">

        <h2>
          Your Activity
        </h2>

        <div className="activity-container">

          <div className="activity-card">
            <span>
              Learning Requests
            </span>
            <strong>
              3
            </strong>
          </div>

          <div className="activity-card">
            <span>
              Teaching Requests
            </span>
            <strong>
              5
            </strong>
          </div>

          <div className="activity-card">
            <span>
              Connections
            </span>
            <strong>
              4
            </strong>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Dashboard