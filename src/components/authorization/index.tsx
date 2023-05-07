import { useState } from 'react'
import SignUp from '../SignUp'
import SignIn from '../SignIn'

const AccountManagment = () => {
  const [isToSignUp, setSignIn] = useState(false)

  return (
    <>
      {' '}
      <div>
        {isToSignUp ? (
          <div>
            <SignUp />
          </div>
        ) : (
          <div>
            <SignIn />
          </div>
        )}
      </div>
      <button onClick={() => setSignIn(true)} className="">
        Sign in
      </button>
      <button onClick={() => setSignIn(false)} className="">
        Sign up
      </button>
    </>
  )
}

export default AccountManagment
