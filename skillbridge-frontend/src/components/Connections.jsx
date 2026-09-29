import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Connections() {

  const navigate = useNavigate()

  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  /*
   * =========================
   * CURRENT LOGGED-IN USER
   * =========================
   */

  const storedUser =
    sessionStorage.getItem('loggedInUser')

  const currentUser = storedUser
    ? JSON.parse(storedUser)
    : null


  /*
   * =========================
   * AUTHENTICATION HEADER
   * =========================
   *
   * Login.jsx already stores:
   *
   * authHeader
   *
   * in sessionStorage.
   */

  const authHeader =
    sessionStorage.getItem('authHeader')


  /*
   * =========================
   * LOAD CONNECTIONS
   * =========================
   */

  useEffect(() => {

    async function loadConnections() {

      try {

        /*
         * Check login information
         */

        if (!currentUser) {

          setError(
            'You are not logged in. Please login again.'
          )

          setLoading(false)

          return
        }


        /*
         * Check authentication header
         */

        if (!authHeader) {

          setError(
            'Authentication information is missing. Please login again.'
          )

          setLoading(false)

          return
        }


        console.log(
          'Loading connections for:',
          currentUser
        )


        /*
         * Call Spring Boot backend
         */

        const response = await fetch(
          'http://localhost:8080/connections',
          {
            method: 'GET',

            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json'
            }
          }
        )


        console.log(
          'Connections API status:',
          response.status
        )


        /*
         * Unauthorized
         */

        if (response.status === 401) {

          setError(
            'Your login session is not valid. Please login again.'
          )

          setLoading(false)

          return
        }


        /*
         * Other errors
         */

        if (!response.ok) {

          const errorText =
            await response.text()

          console.error(
            'Backend error:',
            errorText
          )

          throw new Error(
            `Failed to load connections: ${response.status}`
          )
        }


        /*
         * Convert response to JSON
         */

        const data =
          await response.json()


        console.log(
          'Connections from backend:',
          data
        )


        /*
         * Store real backend data
         */

        setConnections(data)

        setLoading(false)

      } catch (error) {

        console.error(
          'Connection error:',
          error
        )

        setError(
          'Unable to load connections.'
        )

        setLoading(false)

      }

    }


    loadConnections()

  }, [])


  /*
   * =========================
   * FIND OTHER USER
   * =========================
   *
   * Backend connection contains:
   *
   * requester
   * receiver
   *
   * If current user is requester:
   *     other user = receiver
   *
   * Otherwise:
   *     other user = requester
   */

  const getOtherUser = (connection) => {

    if (!connection) {
      return null
    }


    const requester =
      connection.requester

    const receiver =
      connection.receiver


    if (!requester || !receiver) {

      console.log(
        'Requester or receiver missing:',
        connection
      )

      return null
    }


    /*
     * Current user is requester
     */

    if (
      currentUser &&
      Number(requester.id) ===
        Number(currentUser.id)
    ) {

      return receiver

    }


    /*
     * Current user is receiver
     */

    return requester

  }


  /*
   * =========================
   * VIEW PROFILE
   * =========================
   */

  const handleViewProfile = (connection) => {

    console.log(
      'Selected connection:',
      connection
    )


    const otherUser =
      getOtherUser(connection)


    console.log(
      'Other user:',
      otherUser
    )


    if (!otherUser) {

      alert(
        'Teacher profile information is not available.'
      )

      return
    }


    /*
     * Create object compatible with
     * TeacherProfile.jsx
     */

    const teacher = {

      userId: otherUser.id,

      name: otherUser.name,

      email: otherUser.email,

      skillId:
        connection.skill?.id ||
        connection.skillId ||
        null,

      skillName:
        connection.skill?.name ||
        connection.skillName ||
        'Skill'

    }


    console.log(
      'Teacher profile data:',
      teacher
    )


    /*
     * Navigate to the correct user's profile
     */

    navigate(
      `/teacher-profile/${otherUser.id}`,
      {
        state: {
          teacher: teacher
        }
      }
    )

  }


  /*
   * =========================
   * UPDATE CONNECTION STATUS
   * =========================
   */

  const updateConnectionStatus = async (
    connectionId,
    newStatus
  ) => {

    try {

      /*
       * Get authentication header again.
       *
       * This makes sure we use the
       * current login credentials.
       */

      const currentAuthHeader =
        sessionStorage.getItem('authHeader')


      if (!currentAuthHeader) {

        alert(
          'Authentication information is missing. Please login again.'
        )

        navigate('/login')

        return
      }


      console.log(
        'Updating connection:',
        connectionId,
        newStatus
      )


      /*
       * PUT request to Spring Boot
       */

      const response = await fetch(
        `http://localhost:8080/connections/${connectionId}/status?status=${newStatus}`,
        {
          method: 'PUT',

          headers: {
            'Authorization': currentAuthHeader,
            'Content-Type': 'application/json'
          }
        }
      )


      console.log(
        'Update status:',
        response.status
      )


      /*
       * Unauthorized
       */

      if (response.status === 401) {

        alert(
          'Your login session is not valid. Please login again.'
        )

        return
      }


      /*
       * Other backend errors
       */

      if (!response.ok) {

        const errorText =
          await response.text()

        console.error(
          'Status update failed:',
          errorText
        )

        alert(
          'Unable to update connection.'
        )

        return
      }


      /*
       * Update React state immediately.
       *
       * No page refresh required.
       */

      setConnections(
        (previousConnections) =>

          previousConnections.map(
            (connection) => {

              if (
                Number(connection.id) ===
                Number(connectionId)
              ) {

                return {
                  ...connection,
                  status: newStatus
                }

              }

              return connection

            }
          )
      )


    } catch (error) {

      console.error(
        'Connection status error:',
        error
      )

      alert(
        'Unable to connect to the backend.'
      )

    }

  }


  /*
   * =========================
   * INITIALS
   * =========================
   */

  const getInitials = (name) => {

    if (!name) {
      return '?'
    }


    return name
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()

  }


  /*
   * =========================
   * LOADING
   * =========================
   */

  if (loading) {

    return (

      <div className="connections-page">

        <section className="connections-header">

          <span className="connections-label">
            YOUR NETWORK
          </span>

          <h1>
            My Connections
          </h1>

          <p>
            Manage your learning and teaching connections.
          </p>

        </section>


        <main className="connections-content">

          <div className="connection-card">

            <p>
              Loading connections...
            </p>

          </div>

        </main>

      </div>

    )

  }


  /*
   * =========================
   * ERROR
   * =========================
   */

  if (error) {

    return (

      <div className="connections-page">

        <section className="connections-header">

          <span className="connections-label">
            YOUR NETWORK
          </span>

          <h1>
            My Connections
          </h1>

          <p>
            Manage your learning and teaching connections.
          </p>

        </section>


        <main className="connections-content">

          <div className="connection-card">

            <p>
              {error}
            </p>

          </div>

        </main>

      </div>

    )

  }


  /*
   * =========================
   * MAIN PAGE
   * =========================
   */

  return (

    <div className="connections-page">


      {/* =========================
          HEADER
      ========================= */}

      <section className="connections-header">

        <span className="connections-label">
          YOUR NETWORK
        </span>


        <h1>
          My Connections
        </h1>


        <p>
          Manage your learning and teaching connections.
        </p>

      </section>


      {/* =========================
          CONTENT
      ========================= */}

      <main className="connections-content">


        {/* TITLE */}

        <div className="connections-title">

          <div>

            <span className="connections-section-label">
              CONNECTIONS
            </span>


            <h2>
              People in your network
            </h2>

          </div>


          <span className="connection-count">

            {connections.length} Connections

          </span>

        </div>


        {/* =========================
            NO CONNECTIONS
        ========================= */}

        {connections.length === 0 ? (

          <div className="connection-card">

            <div>

              <h3>
                No connections yet
              </h3>


              <p>
                Connect with teachers and learners
                to build your SkillBridge network.
              </p>

            </div>

          </div>

        ) : (


          /* =========================
             CONNECTION LIST
          ========================= */

          <div className="connections-list">

            {connections.map((connection) => {

              const otherUser =
                getOtherUser(connection)


              const status =
                connection.status?.toUpperCase()


              /*
               * Is this an incoming connection?
               */

              const isIncoming =
                currentUser &&
                connection.receiver &&
                Number(connection.receiver.id) ===
                  Number(currentUser.id)


              /*
               * Is this an outgoing connection?
               */

              const isOutgoing =
                currentUser &&
                connection.requester &&
                Number(connection.requester.id) ===
                  Number(currentUser.id)


              return (

                <div
                  className="connection-card"
                  key={connection.id}
                >


                  {/* =========================
                      PERSON
                  ========================= */}

                  <div className="connection-person">


                    <div className="connection-avatar">

                      {getInitials(
                        otherUser?.name
                      )}

                    </div>


                    <div className="connection-info">

                      <h3>
                        {otherUser?.name ||
                          'Unknown User'}
                      </h3>


                      <span className="connection-skill">

                        {connection.skill?.name ||
                          connection.skillName ||
                          'SkillBridge Connection'}

                      </span>


                      <p>

                        {otherUser?.email ||
                          'No email available'}

                      </p>

                    </div>

                  </div>


                  {/* =========================
                      SIDE
                  ========================= */}

                  <div className="connection-side">


                    {/* TYPE */}

                    {isIncoming && (

                      <span className="connection-type incoming">

                        Incoming

                      </span>

                    )}


                    {isOutgoing && (

                      <span className="connection-type outgoing">

                        Outgoing

                      </span>

                    )}


                    {/* STATUS */}

                    <span
                      className={`connection-status ${
                        status?.toLowerCase()
                      }`}
                    >

                      {status}

                    </span>


                    {/* =====================
                        PENDING INCOMING
                    ===================== */}

                    {isIncoming &&
                      status === 'PENDING' && (

                        <div className="connection-actions">


                          <button
                            className="accept-button"
                            onClick={() =>
                              updateConnectionStatus(
                                connection.id,
                                'ACCEPTED'
                              )
                            }
                          >

                            Accept

                          </button>


                          <button
                            className="reject-button"
                            onClick={() =>
                              updateConnectionStatus(
                                connection.id,
                                'REJECTED'
                              )
                            }
                          >

                            Reject

                          </button>

                        </div>

                    )}


                    {/* =====================
                        PENDING OUTGOING
                    ===================== */}

                    {isOutgoing &&
                      status === 'PENDING' && (

                        <button
                          className="cancel-button"
                          onClick={() =>
                            updateConnectionStatus(
                              connection.id,
                              'REJECTED'
                            )
                          }
                        >

                          Cancel

                        </button>

                    )}


                    {/* =====================
                        ACCEPTED
                    ===================== */}

                    {status === 'ACCEPTED' && (

                      <button
                        className="profile-button"
                        onClick={() =>
                          handleViewProfile(
                            connection
                          )
                        }
                      >

                        View Profile

                      </button>

                    )}

                  </div>

                </div>

              )

            })}

          </div>

        )}

      </main>

    </div>

  )

}


export default Connections