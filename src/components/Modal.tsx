import { TSubmission } from '@/types'
import { ChangeEventHandler, useState } from 'react'
import Input from './Input'

type TProps = {
  edit?: TSubmission | null
  submitHandler: (data: Partial<TSubmission> | TSubmission) => Promise<void>
  closeHandler: () => void
}

const Modal = ({ edit, submitHandler, closeHandler }: TProps) => {
  const [data, setData] = useState<Partial<TSubmission>>(edit || {})

  const changeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    const key = e.target.name
    const value = e.target.value

    setData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <dialog id="submission_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Submission</h3>

        <form onSubmit={() => submitHandler(data)} className="space-y-3">
          <Input name="name" placeholder="name" title="Name" onChange={changeHandler} />
          <Input name="university" placeholder="university" title="University" onChange={changeHandler} />

          <div className="space-x-3 text-end pt-10">
            <button type="button" className="btn btn-ghost btn-sm" onClick={closeHandler}>
              Cancle
            </button>

            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default Modal
