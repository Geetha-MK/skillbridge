import FeatureCard from './FeatureCard'

function FeatureSection() {

  const features = [
    {
      title: 'Learn',
      description:
        'Discover people who can help you learn new skills through personalized peer-to-peer learning.'
    },
    {
      title: 'Teach',
      description:
        'Share your knowledge and help others grow by becoming a teacher in the skills you know.'
    },
    {
      title: 'Connect',
      description:
        'Build meaningful connections with learners and teachers who share your interests.'
    }
  ]

  return (
    <section className="features-section">

      <h2>What can you do with SkillBridge?</h2>

      <div className="feature-container">

        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}

      </div>

    </section>
  )
}

export default FeatureSection