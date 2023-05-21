import { logOut } from '@/utils/firebase-setup'
import { useState } from 'react'

const Logout = ({ isLoggedIn, setIsLoggedIn }: any) => {
  const handleLogout = async () => {
    if (isLoggedIn) {
      await logOut()
      setIsLoggedIn(false)
      console.log('logged out')
    } else {
      console.log('You are not logged')
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Welcome, User!</h2>
      <button
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Log out
      </button>
    </>
  )
}

export default Logout
