function Profile() {

  const user = {
    initials: 'GM',
    name: 'Geetha M',
    email: 'geetha.security@gmail.com',
    role: 'Learner & Teacher',
    about:
      'I am interested in learning new technologies and sharing my knowledge with other learners through SkillBridge.',
    teachingSkills: ['Java', 'Spring Boot', 'SQL'],
    learningSkills: ['React', 'Python', 'Data Structures']
  }

  return (
    <div className="profile-page">

      {/* Header */}

      <section className="profile-header">

        <span className="profile-page-label">
          SKILLBRIDGE
        </span>

        <h1>
          My Profile
        </h1>

        <p>
          Manage your profile, skills and learning preferences.
        </p>

      </section>


      {/* Profile Content */}

      <section className="profile-content">

        {/* Main Profile Card */}

        <div className="profile-main-card">

          <div className="profile-main-top">

            <div className="profile-page-avatar">
              {user.initials}
            </div>

            <div className="profile-user-info">

              <h2>
                {user.name}
              </h2>

              <span className="profile-user-role">
                {user.role}
              </span>

              <p>
                {user.email}
              </p>

            </div>

            <button className="edit-profile-button">
              Edit Profile
            </button>

          </div>


          {/* About */}

          <div className="profile-info-section">

            <span className="profile-info-label">
              ABOUT ME
            </span>

            <h3>
              About Me
            </h3>

            <p>
              {user.about}
            </p>

          </div>


          {/* Teaching Skills */}

          <div className="profile-info-section">

            <span className="profile-info-label">
              TEACHING
            </span>

            <h3>
              Skills I Can Teach
            </h3>

            <div className="profile-skill-list">

              {user.teachingSkills.map((skill) => (

                <span
                  className="profile-skill-tag"
                  key={skill}
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>


          {/* Learning Skills */}

          <div className="profile-info-section">

            <span className="profile-info-label">
              LEARNING
            </span>

            <h3>
              Skills I Want to Learn
            </h3>

            <div className="profile-skill-list">

              {user.learningSkills.map((skill) => (

                <span
                  className="profile-learning-tag"
                  key={skill}
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

        </div>


        {/* Account Information */}

        <div className="profile-account-card">

          <span className="profile-info-label">
            ACCOUNT
          </span>

          <h2>
            Account Information
          </h2>

          <div className="account-item">

            <span>
              Name
            </span>

            <strong>
              {user.name}
            </strong>

          </div>

          <div className="account-item">

            <span>
              Email
            </span>

            <strong>
              {user.email}
            </strong>

          </div>

          <div className="account-item">

            <span>
              Role
            </span>

            <strong>
              {user.role}
            </strong>

          </div>

          <button className="logout-button">
            Logout
          </button>

        </div>

      </section>

    </div>
  )
}

export default Profile