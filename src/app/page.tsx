'use client'
import RightIcon from '@/components/icons/RightIcon'
import WarningIcon from '@/components/icons/WarningIcon'
import Modal from '@/components/Modal'
import { qString } from '@/lib/utils'
import { TFilter, TPagination, TSubmission } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdEditNote, MdOutlineDeleteSweep } from 'react-icons/md'
import Swal from 'sweetalert2'

const Home = () => {
  const [data, setData] = useState<TSubmission[]>([])
  const [pagination, setPagination] = useState<TPagination | null>(null)
  const [refetch, setRefetch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [openModal, setOpenModal] = useState<boolean | TSubmission>(false)
  const [filter, setFilter] = useState<TFilter>({
    page: 1,
    limit: 20,
    sort: '-_id',
    search: ''
  })

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)

      const res = await fetch(`/api/submissions?${qString(filter)}`)
      const result = await res.json()

      if (result.success) {
        setData(result.data)
        setPagination(result.pagination)
      }

      setIsLoading(false)
    })()
  }, [refetch, filter])

  const deleteHandler = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' })
        const result = await res.json()

        if (result?.success) {
          setRefetch(new Date().toISOString())

          Swal.fire({
            title: 'Deleted!',
            text: 'Your record has been deleted.',
            icon: 'success'
          })
        }
      }
    })
  }

  const editHandler = async (data: Partial<TSubmission>) => {
    const res = await fetch(`/api/submissions/${data._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await res.json()

    if (result?.success) {
      setRefetch(new Date().toISOString())
      setOpenModal(false)

      Swal.fire({
        title: 'Updated!',
        text: 'Your record has been updated.',
        icon: 'success'
      })
    }
  }

  const createHandler = async (data: TSubmission) => {
    const res = await fetch(`/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await res.json()

    if (result?.success) {
      setRefetch(new Date().toISOString())
      setOpenModal(false)

      Swal.fire({
        title: 'Created!',
        text: 'Your record has been created.',
        icon: 'success'
      })
    }
  }

  const openModalHandler = (data?: TSubmission) => {
    setOpenModal(data ?? true)
  }

  return (
    <div className="container py-20">
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-medium">Submissions</h1>
          <div className="flex space-x-3">
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                onChange={e => setFilter(x => ({ ...x, search: e.target.value }))}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            <button className="btn btn-accent btn-sm" onClick={() => openModalHandler()}>
              Create
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>University</th>
                <th>Email</th>
                <th>Research Interest</th>
                <th>Email Type</th>
                <th>Email Date </th>
                <th>Priority </th>
                <th>Result </th>
                <th>Email Send</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">
                          <Link href={i.website}>{i.professorName}</Link>
                        </div>
                        <div className="text-sm opacity-50">{i.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{i.university}</div>
                        <div className="text-sm opacity-50">{i.country}</div>
                      </div>
                    </div>
                  </td>
                  <td>{i.email}</td>
                  <td>
                    {i.researchInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </td>
                  <td>{i.emailType}</td>
                  <td>{new Date(i.mailingDate as string).toLocaleDateString()}</td>
                  <td>{i.priority}</td>
                  <td>{i.result}</td>
                  <td>{i.isEmailSent ? <RightIcon /> : <WarningIcon />}</td>
                  <td>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => deleteHandler(i._id as string)}
                        className="btn btn-square btn-xs btn-error"
                      >
                        <MdOutlineDeleteSweep />
                      </button>

                      <button
                        type="button"
                        onClick={() => openModalHandler(i)}
                        className="btn btn-square btn-xs"
                      >
                        <MdEditNote />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {isLoading && (
                <tr>
                  <td colSpan={7} className="p-5 text-center">
                    <span className="loading loading-dots loading-lg"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pagination && (
          <div className="flex justify-end">
            <div className="join">
              <button
                className="join-item btn btn-sm"
                disabled={pagination.prev ? false : true}
                onClick={() => setFilter(prev => ({ ...prev, page: pagination.prev! }))}
              >
                «
              </button>
              {new Array(pagination.total).fill('').map((i, index) => (
                <button
                  key={index + 1}
                  onClick={() => setFilter(prev => ({ ...prev, page: index + 1 }))}
                  className={`join-item btn btn-sm ${index + 1 === pagination.current ? 'btn-accent' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="join-item btn btn-sm"
                disabled={pagination.next ? false : true}
                onClick={() => setFilter(prev => ({ ...prev, page: pagination.next! }))}
              >
                »
              </button>
            </div>
          </div>
        )}

        {openModal && (
          <Modal
            open={openModal}
            setOpen={setOpenModal}
            submitHandler={openModal !== true ? editHandler : createHandler}
          />
        )}
      </div>
    </div>
  )
}

export default Home
