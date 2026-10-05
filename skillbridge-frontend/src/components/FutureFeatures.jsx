function FutureFeatures() {

  const features = [
    {
      icon: '🤖',
      title: 'AI Learning Path',
      description:
        'Get a personalized learning roadmap based on your career goal, current skills and learning interests.'
    },
    {
      icon: '💬',
      title: 'Community',
      description:
        'Join discussions, ask questions, share knowledge and connect with learners from different backgrounds.'
    },
    {
      icon: '🎮',
      title: 'Gamification',
      description:
        'Earn points, badges and achievements as you learn, teach and actively participate in SkillBridge.'
    },
    {
      icon: '🎥',
      title: 'Video Sessions',
      description:
        'Learn directly from peers through interactive video-based learning sessions.'
    },
    {
      icon: '🏆',
      title: 'Certificates',
      description:
        'Earn certificates and showcase your learning achievements as you complete learning journeys.'
    },
    {
      icon: '👨‍🏫',
      title: 'Mentorship',
      description:
        'Connect with experienced learners and mentors who can guide you throughout your learning journey.'
    },
    {
      icon: '🚀',
      title: 'Project Collaboration',
      description:
        'Find peers with similar interests and collaborate on real-world projects to build practical experience.'
    },
    {
      icon: '🌐',
      title: 'Portfolio Showcase',
      description:
        'Create and showcase your projects, skills and achievements through a professional SkillBridge portfolio.'
    }
  ]

  return (
    <div className="future-features-page">

      {/* Header */}

      <section className="future-features-header">

        <span className="future-features-label">
          🚀 THE FUTURE OF SKILLBRIDGE
        </span>

        <h1>
          What's Coming <span>Next?</span>
        </h1>

        <p>
          We're continuously improving SkillBridge to make
          student learning, collaboration and career development better.
        </p>

      </section>


      {/* Features */}

      <section className="future-features-content">

        <div className="future-features-grid">

          {features.map((feature) => (

            <article
              className="future-feature-card"
              key={feature.title}
            >

              <div className="future-feature-icon">
                {feature.icon}
              </div>

              <div className="future-feature-content">

                <h2>
                  {feature.title}
                </h2>

                <p>
                  {feature.description}
                </p>

              </div>

              <span className="coming-soon-badge">
                🔒 Coming Soon
              </span>

            </article>

          ))}

        </div>

      </section>

    </div>
  )
}

export default FutureFeatures