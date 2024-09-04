import { TSubmission } from '@/types'
import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import Input from './Input'

type TProps = {
  open?: boolean | TSubmission
  setOpen: Dispatch<SetStateAction<boolean | TSubmission>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitHandler: (data: any) => Promise<void>
}

const Modal = ({ open, setOpen, submitHandler }: TProps) => {
  const [data, setData] = useState<Partial<TSubmission>>(open && typeof open !== 'boolean' ? open : {})

  const changeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    const key = e.target.name
    const value = e.target.value

    setData(prev => ({ ...prev, [key]: value }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitHandler(data)
  }

  return (
    <dialog id="submission_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Submission</h3>

        <form onSubmit={onSubmit} className="space-y-3">
          <Input name="name" placeholder="name" title="Name" value={data.name} onChange={changeHandler} />
          <Input
            name="university"
            placeholder="university"
            title="University"
            value={data.university}
            onChange={changeHandler}
          />

          <div className="space-x-3 text-end pt-10">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
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
