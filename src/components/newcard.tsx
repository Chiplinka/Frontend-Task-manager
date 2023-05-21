'use client'
import { useRouter } from 'next/navigation'
import { auth } from '@/utils/firebase-setup'
import ticketIF from '../utils/ticketIF'

const ticket: ticketIF = {
  name: 'Create fronted prj',
  status: true,
  creationDate: '',
  dueDate: '',
}

const NewCard = () => {
  const { push } = useRouter()

  const handleRedirect = () => {
    push('/tasks/new')
  }

  const handle = async () => {
    const uid = auth.currentUser?.uid

    if (uid) {
      handleRedirect()
    }
  }
  return (
    <>
      <div className="w-70 h-48 shadow-md rounded-lg p-4 mt-2 border-dotted border-4 border-blue-500 bg-blue-200">
        <button onClick={handle}>Add new card</button>
      </div>
    </>
  )
}

export default NewCard
