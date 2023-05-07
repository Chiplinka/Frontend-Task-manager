import { useState } from 'react'
import {signUp} from '@/firebase/firebase-setup'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: any) {
    //don't forget to remove "any"  🤡  🤡  🤡
    e.preventDefault()
    console.log('Button clicked with ' + email + ' ' + password)
    //try to understand how firebase is working
    const res = await signUp(email, password)
    console.log('Res = ' + res.toString)
  }

  return (
    <>
      <h2>Sign Up</h2>
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
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default SignUp
