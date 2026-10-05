function SkillBridgeInsights() {

  const insights = [
    {
      icon: '📈',
      title: 'Skill Demand',
      description:
        'Discover which skills learners are most interested in developing.'
    },
    {
      icon: '👥',
      title: 'Learner Activity',
      description:
        'Understand learning activity and participation across SkillBridge.'
    },
    {
      icon: '🎓',
      title: 'Teacher Availability',
      description:
        'Explore the availability of peers who can share their knowledge.'
    },
    {
      icon: '📊',
      title: 'Learning Trends',
      description:
        'Analyze learning requests and identify patterns over time.'
    }
  ]

  return (
    <section className="insights-section">

      <div className="insights-heading">

        <span className="section-badge">
          📊 DATA-DRIVEN LEARNING
        </span>

        <h2>
          SkillBridge <span>Insights</span>
        </h2>

        <p>
          Discover meaningful insights about learner interests,
          skill demand, peer teaching and learning activity.
        </p>

      </div>


      <div className="insights-content">

        {/* LEFT SIDE */}

        <div className="insights-text">

          <h3>
            Understand how students learn
          </h3>

          <p>
            SkillBridge uses learner and platform data to identify
            popular skills, learning patterns and peer-learning
            opportunities.
          </p>

          <div className="insights-list">

            {insights.map((insight) => (

              <div
                className="insight-item"
                key={insight.title}
              >

                <div className="insight-icon">
                  {insight.icon}
                </div>

                <div>
                  <h4>{insight.title}</h4>

                  <p>
                    {insight.description}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* RIGHT SIDE — ANALYTICS PREVIEW */}

        <div className="analytics-preview">

          <div className="analytics-header">

            <div>
              <span>SKILLBRIDGE ANALYTICS</span>
              <h3>Learning Overview</h3>
            </div>

            <div className="analytics-icon">
              📊
            </div>

          </div>


          <div className="chart-area">

            <div className="chart-label">
              Skill Demand
            </div>

            <div className="chart-bars">

              <div className="chart-bar bar-one">
                <span>Java</span>
              </div>

              <div className="chart-bar bar-two">
                <span>Python</span>
              </div>

              <div className="chart-bar bar-three">
                <span>React</span>
              </div>

              <div className="chart-bar bar-four">
                <span>SQL</span>
              </div>

              <div className="chart-bar bar-five">
                <span>Spring Boot</span>
              </div>

            </div>

          </div>


          <div className="analytics-footer">

            <span>
              📌 Tableau dashboard
            </span>

            <span>
              Coming soon
            </span>

          </div>

        </div>

      </div>

    </section>
  )
}

export default SkillBridgeInsights