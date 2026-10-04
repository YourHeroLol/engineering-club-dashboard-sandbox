import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      const found = await onLogin(email)
      if (!found) setError('No member with that email was found in the sheet.')
    } catch {
      setError('Could not reach the member sheet. Check your connection.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="login-card" onSubmit={handleSubmit}>
      <p className="eyebrow">Sign in</p>
      <label>
        <span>Portal email</span>
        <input
          type="email"
          required
          placeholder="haruhi.fujioka@example.edu"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError('')
          }}
        />
      </label>
      {error && (
        <div className="login-error" role="alert">
          <strong>Login failed</strong>
          <p>{error}</p>
        </div>
      )}
      <button type="submit" disabled={pending}>
        {pending ? 'Signing in…' : error ? 'Retry' : 'Sign in'}
      </button>
      <p className="sidebar-note">
        Use any email from the fictional member sheet, such as
        mina.ashiro@example.edu.
      </p>
    </form>
  )
}
