import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  async function handleSubmit(event) {

    event.preventDefault()

    setError('')
    setSuccess('')


    // Check passwords

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }


    setLoading(true)


    try {

      const response = await fetch(
        'http://localhost:8080/users',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: 'USER'
          })
        }
      )


      const data = await response.json()


      if (!response.ok) {
        throw new Error(
          data.message || 'Registration failed.'
        )
      }


      console.log('Registration successful:', data)

      setSuccess('Account created successfully!')

      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')


      // Go to Login after a short delay

      setTimeout(() => {
        navigate('/login')
      }, 1000)


    } catch (error) {

      console.error('Registration error:', error)

      setError(error.message)

    } finally {

      setLoading(false)

    }
  }


  return (

    <div className="page">

      {/* Left promotional section */}

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


      {/* Register section */}

      <section className="form-side">

        <div className="card">

          <span className="register-eyebrow">
            GET STARTED
          </span>

          <h2>
            Create your SkillBridge account
          </h2>


          <form onSubmit={handleSubmit}>

            {/* Name */}

            <input
              className="field"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />


            {/* Email */}

            <input
              className="field"
              type="email"
              placeholder="E-mail address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />


            {/* Password */}

            <input
              className="field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />


            {/* Confirm password */}

            <input
              className="field"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />


            {/* Terms */}

            <div className="terms">

              <input
                type="checkbox"
                id="register-terms"
                required
              />

              <label htmlFor="register-terms">

                By creating an account, you agree to our{' '}

                <a href="#">
                  Terms
                </a>

                ,{' '}

                <a href="#">
                  Data Policy
                </a>

                {' '}and{' '}

                <a href="#">
                  Cookies Policy
                </a>

                .

              </label>

            </div>


            {/* Error */}

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}


            {/* Success */}

            {success && (
              <p className="form-success">
                {success}
              </p>
            )}


            {/* Submit */}

            <button
              type="submit"
              className="submit"
              disabled={loading}
            >

              {loading ? 'Creating Account...' : 'Create Account'}

              {!loading && <span>›</span>}

            </button>

          </form>


          {/* Login link */}

          <p className="register-text">

            Already have an account?{' '}

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </section>

    </div>
  )
}

export default Register