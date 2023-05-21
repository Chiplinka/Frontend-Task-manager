import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db, auth } from '@/utils/firebase-setup'
import checkUserDate from '@/components/checkUserDate'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import InputMask from 'react-input-mask'

function NewCardPage({ params }: any) {
  const { push } = useRouter()
  const [name, setName] = useState('')
  const [deadlineDate, setDeadlineDate] = useState('')
  const [status, setStatus] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log(params)
    getCurrentCard(params.task)
  }, [])

  async function getCurrentCard(id: string) {
    const uid = auth.currentUser?.uid
    if (uid) {
      const docRef = doc(db, `users/${uid}/tickets`, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        setName(docSnap.data().name)
        setDeadlineDate(docSnap.data().dueDate)
        setStatus(docSnap.data().status)
      } else {
        console.log('No such document!')
      }
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const uid = auth.currentUser?.uid
    console.log(uid)
    setError('')
    if (uid) {
      console.log(checkUserDate(deadlineDate), deadlineDate)
      console.log('Db', db)

      if (checkUserDate(deadlineDate) && name) {
        console.log(db)
        const itemRef = doc(db, `/users/${uid}/tickets`, params.task)
        console.log(itemRef)

        await updateDoc(itemRef, {
          name: name,
          status: status,
          dueDate: deadlineDate,
        })

        console.log('Updated document')
        push('/tasks')
      } else {
        console.log(
          '/tasks/new The string dont match the pattern/Name cannot be empty'
        )
        setError('Write valid date')
      }
    } else {
      setError('You are not logged in')
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Modify Card</h1>
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
              {/* <input
              type="text"
              id="deadlineDate"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
            /> */}
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
