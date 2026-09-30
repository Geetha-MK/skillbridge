import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">

      {/* Left Content */}
      <div className="hero-content">

        <div className="hero-badge">
          👥 PEER-TO-PEER LEARNING PLATFORM
        </div>

        <h1>
          Learn. Teach.
          <br />
          <span>Connect.</span>
        </h1>

        <p>
          Discover people who can help you learn new skills
          and share your knowledge with others.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            🔍 Explore Skills
            <span>→</span>
          </button>

          <button className="secondary-btn">
            👥 Find a Teacher
          </button>
        </div>

        <div className="hero-benefits">
          <div>
            <span>✓</span>
            Learn from peers
          </div>

          <div>
            <span>✓</span>
            Share your skills
          </div>

          <div>
            <span>✓</span>
            Build connections
          </div>
        </div>

      </div>


      {/* Right Visual */}
      <div className="hero-visual">

        <div className="floating-card learn-card">
          <div className="floating-icon">📖</div>
          <div>
            <strong>Learn</strong>
            <small>New Skills</small>
          </div>
        </div>

        <div className="floating-card teach-card">
          <div className="floating-icon">🎓</div>
          <div>
            <strong>Teach</strong>
            <small>What You Know</small>
          </div>
        </div>

        <div className="floating-card connect-card">
          <div className="floating-icon">👥</div>
          <div>
            <strong>Connect</strong>
            <small>Build Connections</small>
          </div>
        </div>

        {/* Main illustration area */}
        <div className="hero-person">

          <div className="person-circle">
            👩🏻‍💻
          </div>

          <div className="laptop">
            <div className="laptop-screen">
              <div className="screen-content">
                <div className="screen-line"></div>
                <div className="screen-line short"></div>
                <div className="screen-box"></div>
              </div>
            </div>

            <div className="laptop-base"></div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;