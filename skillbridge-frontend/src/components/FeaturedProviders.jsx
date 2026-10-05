import { useNavigate } from 'react-router-dom'

function FeaturedProviders() {

  const navigate = useNavigate()

  const providers = [
    {
      initials: 'GM',
      name: 'Geetha M K',
      skill: 'Java',
      description: 'Core Java, OOP, Collections and problem solving.'
    },
    {
      initials: 'AS',
      name: 'ashihta',
      skill: 'Java',
      description: 'Java programming and backend development.'
    },
    {
      initials: 'RS',
      name: 'Rahul',
      skill: 'Python',
      description: 'Python programming and coding fundamentals.'
    }
  ]

  return (
    <section className="featured-providers-section">

      <div className="featured-providers-heading">

        <span className="section-badge">
          ⭐ LEARN FROM PEERS
        </span>

        <h2>
          Featured Skill <span>Providers</span>
        </h2>

        <p>
          Connect with students who are ready to share their
          knowledge and help you grow.
        </p>

      </div>


      <div className="providers-grid">

        {providers.map((provider) => (

          <article
            className="provider-card"
            key={provider.name}
          >

            <div className="provider-avatar">
              {provider.initials}
            </div>

            <h3>
              {provider.name}
            </h3>

            <span className="provider-skill">
              {provider.skill}
            </span>

            <p>
              {provider.description}
            </p>

            <button
              type="button"
              onClick={() => navigate('/teachers')}
            >
              View Teachers →
            </button>

          </article>

        ))}

      </div>


      <button
        className="view-all-providers-btn"
        onClick={() => navigate('/teachers')}
      >
        Find More Teachers
        <span>→</span>
      </button>

    </section>
  )
}

export default FeaturedProviders