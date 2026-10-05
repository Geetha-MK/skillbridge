function SelfImprovement() {

  const resources = [
    {
      icon: '📄',
      title: 'Resume Building',
      description:
        'Learn how to create a strong and professional resume for your career.',
      link: 'https://www.youtube.com/watch?v=kRW_GZPEa-k'
    },
    {
      icon: '🔗',
      title: 'LinkedIn',
      description:
        'Learn how to build and improve your professional LinkedIn profile.',
      link: 'https://www.youtube.com/watch?v=l7j-5ALqOTQ'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      description:
        'Learn how to build a strong GitHub profile and showcase your projects.',
      link: 'https://www.youtube.com/watch?v=8JJ101D3knE'
    },
    {
      icon: '🌐',
      title: 'Portfolio',
      description:
        'Learn how to create a professional portfolio to showcase your skills and projects.',
      link: 'https://www.youtube.com/watch?v=qW0NH2AiN2g'
    }
  ]

  function openResource(link) {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="self-improvement-section">

      <div className="self-improvement-heading">

        <span className="section-badge">
          💼 CAREER DEVELOPMENT
        </span>

        <h2>
          Self Improvement <span>Hub</span>
        </h2>

        <p>
          Build your professional presence and prepare yourself
          for your career journey.
        </p>

      </div>


      <div className="self-improvement-grid">

        {resources.map((resource) => (

          <article
            className="self-improvement-card"
            key={resource.title}
          >

            <div className="self-improvement-icon">
              {resource.icon}
            </div>

            <h3>
              {resource.title}
            </h3>

            <p>
              {resource.description}
            </p>

            <button
              type="button"
              onClick={() => openResource(resource.link)}
            >
              Watch Guide
              <span>→</span>
            </button>

          </article>

        ))}

      </div>

    </section>
  )
}

export default SelfImprovement