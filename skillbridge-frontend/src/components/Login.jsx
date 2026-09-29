import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  async function handleSubmit(event) {

    event.preventDefault()

    // Clear previous error
    setError('')

    setLoading(true)


    try {

      /*
       * STEP 1
       * Send login details to Spring Boot
       */

      const response = await fetch(
        'http://localhost:8080/auth/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      )


      /*
       * STEP 2
       * Handle incorrect credentials
       */

      if (!response.ok) {

        if (response.status === 401) {

          setError(
            'Invalid email or password.'
          )

        } else {

          setError(
            'Login failed. Please try again.'
          )

        }

        return
      }


      /*
       * STEP 3
       * Login successful
       */

      const user = await response.json()

      console.log(
        'Login successful:',
        user
      )


      /*
       * STEP 4
       * Create Basic Authentication header
       *
       * Spring Security currently uses
       * HTTP Basic Authentication.
       */

      const authHeader =
        'Basic ' +
        btoa(`${email}:${password}`)


      /*
       * STEP 5
       * Store logged-in user
       */

      sessionStorage.setItem(
        'loggedInUser',
        JSON.stringify(user)
      )


      /*
       * STEP 6
       * Store authentication header
       *
       * Other protected API calls will use this.
       */

      sessionStorage.setItem(
        'authHeader',
        authHeader
      )


      /*
       * STEP 7
       * Go to dashboard
       */

      navigate('/dashboard')


    } catch (error) {

      console.error(
        'Login error:',
        error
      )

      setError(
        'Unable to connect to the server.'
      )

    } finally {

      setLoading(false)

    }

  }


  return (

    <div className="page">


      {/* =========================
          LEFT SIDE
      ========================= */}

      <section className="promo">

        <div>

          <h1>
            Learn skills.
            <br />
            Share knowledge.
            <br />
            Build connections.
          </h1>


          <p>
            Connect with people who can help you learn
            new skills and share what you already know.
          </p>


          <div className="icon">
            <span>✦</span>
          </div>

        </div>

      </section>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <section className="form-side">

        <div className="card">


          <span className="eyebrow">
            WELCOME BACK
          </span>


          <h2>
            Sign in to SkillBridge
          </h2>


          <form onSubmit={handleSubmit}>


            {/* EMAIL */}

            <input
              className="field"
              type="email"
              placeholder="E-mail address"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />


            {/* PASSWORD */}

            <input
              className="field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />


            {/* ERROR */}

            {error && (

              <div className="login-error">
                {error}
              </div>

            )}


            {/* TERMS */}

            <div className="terms">

              <input
                type="checkbox"
                id="terms"
                required
              />


              <label htmlFor="terms">

                By signing in, you agree to our{' '}

                <a
                  href="#"
                  onClick={(event) =>
                    event.preventDefault()
                  }
                >
                  Terms
                </a>

                {', '}

                <a
                  href="#"
                  onClick={(event) =>
                    event.preventDefault()
                  }
                >
                  Data Policy
                </a>

                {' '}and{' '}

                <a
                  href="#"
                  onClick={(event) =>
                    event.preventDefault()
                  }
                >
                  Cookies Policy
                </a>

                .

              </label>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="submit"
              disabled={loading}
            >

              {loading
                ? 'Logging in...'
                : 'Login'
              }


              {!loading && (
                <span>›</span>
              )}

            </button>


            {/* REGISTER */}

            <p className="register-text">

              Don't have an account?{' '}

              <Link to="/register">
                Create an account
              </Link>

            </p>


          </form>

        </div>

      </section>

    </div>

  )

}

export default Login