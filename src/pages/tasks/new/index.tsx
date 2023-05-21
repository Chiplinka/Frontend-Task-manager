import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, addDoc } from 'firebase/firestore'
import { db, auth } from '@/utils/firebase-setup' // Assuming you have already set up Firebase in your project
import formatDate from '@/utils/formatDate'
import ticketIF from '@/utils/ticketIF'
import checkUserDate from '@/components/checkUserDate'
import InputMask from 'react-input-mask'

function NewCardPage() {
  const { push } = useRouter()
  const [name, setName] = useState('')
  const [deadlineDate, setDeadlineDate] = useState('')
  const [status, setStatus] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const uid = auth.currentUser?.uid
    console.log(uid)
    setError('')
    if (uid) {
      console.log(checkUserDate(deadlineDate), deadlineDate)

      if (checkUserDate(deadlineDate) && name) {
        let ticket: ticketIF = {
          name: name,
          status: status,
          creationDate: '',
          dueDate: deadlineDate,
        }
        const currentDate = new Date()
        ticket.creationDate = formatDate(currentDate)
        addDoc(collection(db, `users/${uid}/tickets`), {
          ...ticket,
        })
        console.log('/tasks/new The card is added: ', ticket)
        push('/tasks')
      } else {
        console.log(
          '/tasks/new The string dont match the pattern/Name cannot be empty'
        )
        setError('The string dont match the pattern/Name cannot be empty')
      }
    } else {
      setError('You are not logged in')
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Add New Card</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-1">
                Name
              </label>
              <input
                required={true}
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deadlineDate" className="block font-bold mb-1">
                Deadline Date (Ex. &quot;20/05/23 15:51&quot;)
              </label>
              <InputMask
                required={true}
                type="text"
                id="deadlineDate"
                mask="99/99/99 99:99"
                maskChar=" "
                placeholder="DD/MM/YY HH:MM"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block font-bold mb-1">
                Status
              </label>
              <label htmlFor="status" className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="status"
                  className="form-checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
                <span className="ml-2">Complete</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewCardPage
