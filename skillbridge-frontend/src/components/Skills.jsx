import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Skills() {

  const navigate = useNavigate()

  const [skills, setSkills] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // ==========================================
  // FETCH SKILLS FROM SPRING BOOT
  // ==========================================

  useEffect(() => {

    async function fetchSkills() {

      try {

        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:8080/skills'
        )

        if (!response.ok) {
          throw new Error(
            `Failed to fetch skills: ${response.status}`
          )
        }

        const data = await response.json()

        console.log('Skills received from backend:', data)

        setSkills(data)

      } catch (error) {

        console.error(
          'Error fetching skills:',
          error
        )

        setError(
          'Unable to load skills from the server.'
        )

      } finally {

        setLoading(false)

      }
    }

    fetchSkills()

  }, [])


  // ==========================================
  // SEARCH SKILLS
  // ==========================================

  const filteredSkills = skills.filter((skill) => {

    const name =
      skill.name?.toLowerCase() || ''

    const description =
      skill.description?.toLowerCase() || ''

    const search =
      searchTerm.toLowerCase()

    return (
      name.includes(search) ||
      description.includes(search)
    )

  })


  // ==========================================
  // FIND TEACHERS
  // ==========================================

  function handleFindTeachers(skill) {

    console.log(
      'Selected skill:',
      skill
    )

    navigate('/teachers', {

      state: {
        skillId: skill.id,
        skillName: skill.name
      }

    })

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="skills-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <section className="skills-header">

        <div className="skills-header-content">

          <span className="skills-label">
            SKILLBRIDGE
          </span>

          <h1>
            Explore Skills
          </h1>

          <p>
            Discover skills you want to learn and
            find people who can help you grow.
          </p>

        </div>

      </section>


      {/* =====================================
          CONTENT
      ===================================== */}

      <main className="skills-content">


        {/* ===================================
            SEARCH
        =================================== */}

        <div className="skills-search">

          <input
            type="text"
            placeholder="Search for a skill..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>


        {/* ===================================
            LOADING
        =================================== */}

        {loading && (

          <div className="skills-message">

            <p>
              Loading skills...
            </p>

          </div>

        )}


        {/* ===================================
            ERROR
        =================================== */}

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


        {/* ===================================
            SKILLS
        =================================== */}

        {!loading && !error && (

          <>

            <div className="skills-count">

              <span>
                {filteredSkills.length} skills available
              </span>

            </div>


            <div className="skills-grid">

              {filteredSkills.length > 0 ? (

                filteredSkills.map((skill) => (

                  <article
                    className="skill-card"
                    key={skill.id}
                  >

                    <span className="skill-category">
                      SKILL
                    </span>


                    <h2>
                      {skill.name}
                    </h2>


                    <p>
                      {skill.description}
                    </p>


                    <button
                      type="button"
                      className="skill-button"
                      onClick={() =>
                        handleFindTeachers(skill)
                      }
                    >
                      Find Teachers
                    </button>

                  </article>

                ))

              ) : (

                <div className="no-skills">

                  <h3>
                    No skills found
                  </h3>

                  <p>
                    Try searching for another skill.
                  </p>

                </div>

              )}

            </div>

          </>

        )}

      </main>

    </div>

  )
}

export default Skills