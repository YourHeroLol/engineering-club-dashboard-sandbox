import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const found = await onLogin(email)
    if (!found) setError('No member with that email was found in the sheet.')
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
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Sign in</button>
      <p className="sidebar-note">
        Use any email from the fictional member sheet, such as
        mina.ashiro@example.edu.
      </p>
    </form>
  )
}
