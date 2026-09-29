import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function LearningRequests() {

  const navigate = useNavigate()
  const location = useLocation()

  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(null)


  // =====================================================
  // OPTIONAL REQUEST DATA FROM TEACHER PROFILE
  // =====================================================

  const teacherId = location.state?.teacherId
  const teacherName = location.state?.teacherName
  const skillId = location.state?.skillId
  const skillName = location.state?.skillName


  // =====================================================
  // GET LOGGED-IN USER
  // =====================================================

  const storedUser =
    sessionStorage.getItem('loggedInUser')

  const authHeader =
    sessionStorage.getItem('authHeader')

  const loggedInUser =
    storedUser
      ? JSON.parse(storedUser)
      : null


  // =====================================================
  // FETCH LEARNING REQUESTS
  // =====================================================

  useEffect(() => {

    async function fetchRequests() {

      try {

        setLoading(true)
        setError('')

        if (!authHeader || !loggedInUser) {
          navigate('/login')
          return
        }


        const response = await fetch(
          'http://localhost:8080/learning-requests',
          {
            method: 'GET',

            headers: {
              'Authorization': authHeader
            }
          }
        )


        if (!response.ok) {

          throw new Error(
            `Failed to fetch learning requests: ${response.status}`
          )

        }


        const data = await response.json()

        console.log(
          'Learning requests received:',
          data
        )


        setRequests(data)

      } catch (error) {

        console.error(
          'Error fetching learning requests:',
          error
        )

        setError(
          'Unable to load learning requests from the server.'
        )

      } finally {

        setLoading(false)

      }

    }

    fetchRequests()

  }, [authHeader, navigate])


  // =====================================================
  // SEND NEW LEARNING REQUEST
  // =====================================================

  async function handleSendRequest() {

    if (!teacherId || !skillId) {

      alert(
        'Teacher or skill information is missing.'
      )

      return

    }


    if (
      loggedInUser &&
      Number(loggedInUser.id) === Number(teacherId)
    ) {

      alert(
        'You cannot send a learning request to yourself.'
      )

      return

    }


    try {

      setActionLoading('send')


      const response = await fetch(
        'http://localhost:8080/learning-requests',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },

          body: JSON.stringify({

            user: {
              id: loggedInUser.id
            },

            teacher: {
              id: teacherId
            },

            skill: {
              id: skillId
            },

            status: 'PENDING'

          })
        }
      )


      if (!response.ok) {

        const errorText =
          await response.text()

        console.error(
          'Learning request failed:',
          errorText
        )

        alert(
          'Unable to send learning request.'
        )

        return

      }


      const newRequest =
        await response.json()

      console.log(
        'Learning request created:',
        newRequest
      )


      alert(
        'Learning request sent successfully!'
      )


      // Add the new request using the DTO structure
      // expected by this page.

      const newRequestForDisplay = {

        id: newRequest.id,

        status: newRequest.status || 'PENDING',

        userId: loggedInUser.id,
        userName: loggedInUser.name,
        userEmail: loggedInUser.email,

        teacherId: teacherId,
        teacherName: teacherName,

        skillId: skillId,
        skillName: skillName

      }


      setRequests((previous) => [
        ...previous,
        newRequestForDisplay
      ])


    } catch (error) {

      console.error(
        'Learning request error:',
        error
      )

      alert(
        'Unable to connect to the server.'
      )

    } finally {

      setActionLoading(null)

    }

  }


  // =====================================================
  // UPDATE REQUEST STATUS
  // =====================================================

  async function handleStatusChange(
    requestId,
    status
  ) {

    try {

      setActionLoading(requestId)


      const response = await fetch(
        `http://localhost:8080/learning-requests/${requestId}/status?status=${status}`,
        {
          method: 'PUT',

          headers: {
            'Authorization': authHeader
          }
        }
      )


      if (!response.ok) {

        const errorText =
          await response.text()

        console.error(
          'Status update failed:',
          errorText
        )

        alert(
          'Unable to update learning request.'
        )

        return

      }


      const updatedRequest =
        await response.json()


      console.log(
        'Learning request updated:',
        updatedRequest
      )


      setRequests((previous) =>
        previous.map((request) =>
          request.id === requestId
            ? updatedRequest
            : request
        )
      )


    } catch (error) {

      console.error(
        'Status update error:',
        error
      )

      alert(
        'Unable to update learning request.'
      )

    } finally {

      setActionLoading(null)

    }

  }


  // =====================================================
  // REQUEST TYPE
  // =====================================================

  function isReceivedRequest(request) {

    return (
      Number(request.teacherId) ===
      Number(loggedInUser?.id)
    )

  }


  function isSentRequest(request) {

    return (
      Number(request.userId) ===
      Number(loggedInUser?.id)
    )

  }


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="learning-requests-page">


      {/* ================================================
          HEADER
      ================================================= */}

      <section className="learning-requests-header">

        <span className="learning-requests-label">
          SKILLBRIDGE
        </span>

        <h1>
          Learning Requests
        </h1>

        <p>
          Track requests you have sent and
          manage requests from learners.
        </p>

      </section>


      {/* ================================================
          CONTENT
      ================================================= */}

      <section className="learning-requests-content">


        {/* ==============================================
            SEND REQUEST FROM TEACHER PROFILE
        =============================================== */}

        {teacherId && skillId && (

          <div className="request-card">

            <div className="request-main">

              <span className="request-skill">
                {skillName}
              </span>

              <h3>
                Learn from {teacherName}
              </h3>

              <p>
                Send a request to {teacherName}
                to learn {skillName}.
              </p>

            </div>


            <div className="request-side">

              <button
                className="request-button"
                onClick={handleSendRequest}
                disabled={actionLoading === 'send'}
              >
                {actionLoading === 'send'
                  ? 'Sending...'
                  : 'Send Request'
                }
              </button>

            </div>

          </div>

        )}


        {/* ==============================================
            TITLE
        =============================================== */}

        <div className="learning-requests-title">

          <div>

            <span className="requests-section-label">
              YOUR ACTIVITY
            </span>

            <h2>
              Learning Requests
            </h2>

          </div>

          <span className="request-count">
            {requests.length} Requests
          </span>

        </div>


        {/* ==============================================
            LOADING
        =============================================== */}

        {loading && (

          <div className="skills-message">

            <p>
              Loading learning requests...
            </p>

          </div>

        )}


        {/* ==============================================
            ERROR
        =============================================== */}

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


        {/* ==============================================
            REQUEST LIST
        =============================================== */}

        {!loading &&
          !error && (

            <div className="requests-list">

              {requests.length === 0 ? (

                <div className="no-skills">

                  <h3>
                    No learning requests
                  </h3>

                  <p>
                    You currently have no learning requests.
                  </p>

                </div>

              ) : (

                requests.map((request) => {

                  const received =
                    isReceivedRequest(request)

                  const sent =
                    isSentRequest(request)


                  const learnerName =
                    request.userName ||
                    'Unknown learner'


                  const teacherNameFromRequest =
                    request.teacherName ||
                    'Unknown teacher'


                  const currentSkill =
                    request.skillName ||
                    'Unknown skill'


                  const currentStatus =
                    request.status ||
                    'PENDING'


                  return (

                    <div
                      className="request-card"
                      key={request.id}
                    >

                      <div className="request-main">

                        <span className="request-skill">
                          {currentSkill}
                        </span>


                        <h3>

                          {received

                            ? `Learning request from ${learnerName}`

                            : `Learning from ${teacherNameFromRequest}`

                          }

                        </h3>


                        <p>

                          {received

                            ? `${learnerName} wants to learn ${currentSkill} from you.`

                            : `You requested to learn ${currentSkill} from ${teacherNameFromRequest}.`

                          }

                        </p>

                      </div>


                      <div className="request-side">


                        <span
                          className={`request-status ${currentStatus.toLowerCase()}`}
                        >
                          {currentStatus}
                        </span>


                        {/* =================================
                            TEACHER ACTIONS
                        ================================= */}

                        {received &&
                          currentStatus === 'PENDING' && (

                            <div className="request-actions">

                              <button
                                className="request-button"
                                disabled={
                                  actionLoading === request.id
                                }
                                onClick={() =>
                                  handleStatusChange(
                                    request.id,
                                    'ACCEPTED'
                                  )
                                }
                              >
                                Accept
                              </button>


                              <button
                                className="connect-button"
                                disabled={
                                  actionLoading === request.id
                                }
                                onClick={() =>
                                  handleStatusChange(
                                    request.id,
                                    'REJECTED'
                                  )
                                }
                              >
                                Reject
                              </button>

                            </div>

                          )}


                        {/* =================================
                            SENT REQUEST
                        ================================= */}

                        {sent && (
                          <span className="request-type">
                            Sent request
                          </span>
                        )}


                      </div>

                    </div>

                  )

                })

              )}

            </div>

          )}

      </section>

    </div>

  )

}

export default LearningRequests