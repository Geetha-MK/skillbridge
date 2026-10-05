import { useNavigate } from 'react-router-dom'

function FeatureSection() {

  const navigate = useNavigate()

  const skills = [
    {
      icon: '☕',
      name: 'Java',
      description: 'Learn Core Java, OOP, Collections and more.'
    },
    {
      icon: '🐍',
      name: 'Python',
      description: 'Build your programming and problem-solving skills.'
    },
    {
      icon: '⚛️',
      name: 'React',
      description: 'Create modern and interactive web applications.'
    },
    {
      icon: '🗄️',
      name: 'SQL',
      description: 'Master databases, queries and data management.'
    },
    {
      icon: '🌱',
      name: 'Spring Boot',
      description: 'Build powerful Java backend applications.'
    },
    {
      icon: '💻',
      name: 'Data Structures',
      description: 'Improve your DSA and coding skills.'
    }
  ]

  return (
    <section className="popular-skills-section">

      <div className="popular-skills-heading">

        <span className="section-badge">
          🚀 LEARN SOMETHING NEW
        </span>

        <h2>
          Explore Popular <span>Skills</span>
        </h2>

        <p>
          Discover skills you want to learn and connect with
          students who can help you grow.
        </p>

      </div>

      <div className="skills-grid">

        {skills.map((skill) => (

          <div
            className="popular-skill-card"
            key={skill.name}
            onClick={() => navigate('/skills')}
          >

            <div className="popular-skill-icon">
              {skill.icon}
            </div>

            <h3>{skill.name}</h3>

            <p>{skill.description}</p>

            <span className="popular-skill-link">
              Explore skill →
            </span>

          </div>

        ))}

      </div>

      <button
        className="explore-all-btn"
        onClick={() => navigate('/skills')}
      >
        Explore All Skills
        <span>→</span>
      </button>

    </section>
  )
}

export default FeatureSection