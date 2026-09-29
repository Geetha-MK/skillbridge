import { useLocation, useNavigate, useParams } from 'react-router-dom'

function TeacherProfile() {

  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const teacher = location.state?.teacher

  console.log('Teacher profile ID:', id)
  console.log('Teacher data:', teacher)


  /*
   * If profile was opened without teacher data
   */

  if (!teacher) {

    return (

      <div className="teacher-profile-page">

        <section className="teacher-profile-header">

          <span className="teacher-profile-label">
            SKILLBRIDGE
          </span>

          <h1>
            Teacher Profile
          </h1>

          <p>
            Teacher information is not available.
          </p>

        </section>


        <main className="teacher-profile-content">

          <section className="profile-card">

            <h2>
              Teacher not found
            </h2>

            <p>
              Please go back and select the teacher again.
            </p>


            <button
              className="learning-request-button"
              onClick={() => navigate('/teachers')}
            >
              Back to Teachers
            </button>

          </section>

        </main>

      </div>

    )

  }


  /*
   * INITIALS
   */

  const initials = teacher.name
    ? teacher.name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?'


  /*
   * SKILL
   */

  const skillName =
    teacher.skillName || 'Skill'


  return (

    <div className="teacher-profile-page">


      {/* =========================
          HEADER
      ========================= */}

      <section className="teacher-profile-header">

        <span className="teacher-profile-label">
          SKILLBRIDGE
        </span>

        <h1>
          Teacher Profile
        </h1>

        <p>
          Learn more about the teacher and
          connect with them to start your
          learning journey.
        </p>

      </section>


      {/* =========================
          CONTENT
      ========================= */}

      <main className="teacher-profile-content">


        {/* PROFILE */}

        <section className="profile-card">


          {/* INTRO */}

          <div className="profile-intro">

            <div className="profile-avatar">

              {initials}

            </div>


            <div className="profile-basic">

              <h2>
                {teacher.name}
              </h2>


              <span className="profile-role">

                {skillName} Teacher

              </span>


              <span className="profile-level">

                Teacher

              </span>

            </div>

          </div>


          {/* ABOUT */}

          <div className="profile-section">

            <span className="profile-section-label">
              ABOUT
            </span>

            <h3>
              About the Teacher
            </h3>

            <p>
              {teacher.name} is available to
              help learners with {skillName}.
            </p>

          </div>


          {/* CONTACT */}

          <div className="profile-section">

            <span className="profile-section-label">
              CONTACT
            </span>

            <h3>
              Email
            </h3>

            <p>
              {teacher.email || 'Email not available'}
            </p>

          </div>


          {/* SKILLS */}

          <div className="profile-section">

            <span className="profile-section-label">
              SKILLS
            </span>

            <h3>
              Skills I Can Teach
            </h3>


            <div className="profile-skills">

              <span className="profile-skill">

                {skillName}

              </span>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="profile-actions">


            {/* LEARNING REQUEST */}

            <button
              className="learning-request-button"
              onClick={() => {

                navigate(
                  '/learning-requests',
                  {
                    state: {
                      teacherId:
                        teacher.userId,

                      teacherName:
                        teacher.name,

                      skillId:
                        teacher.skillId,

                      skillName:
                        teacher.skillName
                    }
                  }
                )

              }}
            >
              Send Learning Request
            </button>


            {/* CONNECT */}
            <button
  className="connect-button"
  onClick={async () => {

    try {

      // Get logged-in user
      const storedUser =
        sessionStorage.getItem('loggedInUser')

      const authHeader =
        sessionStorage.getItem('authHeader')

      if (!storedUser || !authHeader) {

        navigate('/login')
        return

      }

      const loggedInUser =
        JSON.parse(storedUser)


      // Prevent connecting to yourself
      if (loggedInUser.id === teacher.userId) {

        alert('You cannot connect with yourself.')
        return

      }


      // Create connection request
      const response = await fetch(
        'http://localhost:8080/connections',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },

          body: JSON.stringify({

            requester: {
              id: loggedInUser.id
            },

            receiver: {
              id: teacher.userId
            },

            status: 'PENDING'

          })
        }
      )


      if (!response.ok) {

        const errorText =
          await response.text()

        console.error(
          'Connection failed:',
          errorText
        )

        alert(
          'Unable to send connection request.'
        )

        return
      }


      const connection =
        await response.json()

      console.log(
        'Connection created:',
        connection
      )


      alert(
        'Connection request sent successfully!'
      )


      // Go to connections page
      navigate('/connections')

    }

    catch (error) {

      console.error(
        'Connection error:',
        error
      )

      alert(
        'Unable to connect to the server.'
      )

    }

  }}
>
  Connect
</button>

          </div>

        </section>


        {/* =========================
            REVIEWS
        ========================= */}

        <section className="reviews-card">

          <div className="reviews-header">

            <div>

              <span className="profile-section-label">
                REVIEWS
              </span>

              <h3>
                What learners say
              </h3>

            </div>


            <strong>
              —
            </strong>

          </div>


          <div className="review-item">

            <p>
              Reviews will appear here once
              learners submit reviews for this
              teacher.
            </p>

          </div>

        </section>


      </main>

    </div>

  )

}

export default TeacherProfile