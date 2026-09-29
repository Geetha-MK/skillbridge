import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Teachers() {

  const navigate = useNavigate()
  const location = useLocation()

  // Skill information received from Skills page
  const skillId = location.state?.skillId
  const skillName = location.state?.skillName

  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // ==========================================
  // FETCH TEACHERS
  // ==========================================

  useEffect(() => {

    async function fetchTeachers() {

      try {

        setLoading(true)
        setError('')

        // If page is opened directly,
        // use Java as the default skill.
        const selectedSkillId = skillId || 1

        console.log(
          'Fetching teachers for skill ID:',
          selectedSkillId
        )

        const response = await fetch(
          `http://localhost:8080/user-skills/teachers/${selectedSkillId}`
        )

        if (!response.ok) {

          throw new Error(
            `Failed to fetch teachers: ${response.status}`
          )

        }

        const data = await response.json()

        console.log(
          'Teachers received:',
          data
        )


        // ==========================================
        // REMOVE DUPLICATE USERS
        // ==========================================

        const uniqueTeachers = Array.from(
          new Map(
            data.map((teacher) => [
              teacher.userId,
              teacher
            ])
          ).values()
        )


        setTeachers(uniqueTeachers)

      } catch (error) {

        console.error(
          'Error fetching teachers:',
          error
        )

        setError(
          'Unable to load teachers from the server.'
        )

      } finally {

        setLoading(false)

      }

    }

    fetchTeachers()

  }, [skillId])


  // ==========================================
  // VIEW TEACHER PROFILE
  // ==========================================

  function handleViewProfile(teacher) {

    console.log(
      'Opening teacher profile:',
      teacher
    )

    navigate(
      `/teacher-profile/${teacher.userId}`,
      {
        state: {
          teacher: teacher
        }
      }
    )

  }


  // ==========================================
  // CREATE INITIALS
  // ==========================================

  function getInitials(name) {

    if (!name) {
      return '?'
    }

    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="teachers-page">


      {/* ======================================
          HEADER
      ====================================== */}

      <section className="teachers-header">

        <span className="teachers-label">
          SKILLBRIDGE
        </span>

        <h1>
          Find Teachers
        </h1>

        <p>
          {skillName
            ? `Find people who can teach ${skillName}.`
            : 'Connect with people who can help you learn new skills.'
          }
        </p>

      </section>


      {/* ======================================
          CONTENT
      ====================================== */}

      <main className="teachers-content">


        {/* ====================================
            SELECTED SKILL
        ==================================== */}

        <div className="teachers-title">

          <span className="teachers-skill-label">
            SELECTED SKILL
          </span>

          <h2>
            {skillName || 'Java'}
          </h2>

        </div>


        {/* ====================================
            LOADING
        ==================================== */}

        {loading && (

          <div className="skills-message">

            <p>
              Loading teachers...
            </p>

          </div>

        )}


        {/* ====================================
            ERROR
        ==================================== */}

        {!loading && error && (

          <div className="skills-message skills-error">

            <h3>
              Something went wrong
            </h3>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* ====================================
            NO TEACHERS
        ==================================== */}

        {!loading &&
          !error &&
          teachers.length === 0 && (

            <div className="no-skills">

              <h3>
                No teachers found
              </h3>

              <p>
                There are currently no teachers
                available for this skill.
              </p>

            </div>

          )}


        {/* ====================================
            TEACHER CARDS
        ==================================== */}

        {!loading &&
          !error &&
          teachers.length > 0 && (

            <div className="teachers-grid">

              {teachers.map((teacher) => (

                <article
                  className="teacher-card"
                  key={teacher.userId}
                >

                  {/* AVATAR */}

                  <div className="teacher-avatar">

                    {getInitials(teacher.name)}

                  </div>


                  {/* NAME */}

                  <h3>
                    {teacher.name}
                  </h3>


                  {/* SKILL */}

                  <span className="teacher-skill">

                    {teacher.skillName}

                  </span>


                  {/* EMAIL */}

                  <p>
                    {teacher.email}
                  </p>


                  {/* VIEW PROFILE */}

                  <button
                    type="button"
                    className="teacher-button"
                    onClick={() =>
                      handleViewProfile(teacher)
                    }
                  >
                    View Profile
                  </button>

                </article>

              ))}

            </div>

          )}

      </main>

    </div>

  )

}

export default Teachers