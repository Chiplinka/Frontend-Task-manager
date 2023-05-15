import { useState } from 'react'
import {signIn, db} from '@/utils/firebase-setup'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setEmail('')
    setPassword('')
    const res = await signIn(email, password)
    if (typeof res !== 'boolean' && res?.error) {
      setError(res.error.toString().slice(10))
    } else {
      // await router.replace('/languages')
      setError("You are logged in")
    }
  }

  return (
    <>
      <div>{error}</div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
      <div className="m-3">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="m-3">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        <button type="submit">Log in</button>
      </form>
    </>
  )
}

export default SignIn
