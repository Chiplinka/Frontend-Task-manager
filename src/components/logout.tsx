import { logOut } from '@/utils/firebase-setup'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Profile = () => {
//   const router = useRouter()
  const [error, setError] = useState('')

  const handleLogout = async () => {
    await logOut()
    setError("You are logged out")
  }

  return (
    <>
        <div>{error}</div>
      <button
        className="mx-2 rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  )
}

export default Profile
