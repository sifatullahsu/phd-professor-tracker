/* eslint-disable no-undefined */
import {
  countries,
  emailTypes,
  priority,
  professorDesignations,
  researchInterests,
  results
} from '@/lib/data'
import { TSubmission } from '@/types'
import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import Input from './Input'

type TProps = {
  open?: boolean | TSubmission
  setOpen: Dispatch<SetStateAction<boolean | TSubmission>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitHandler: (data: any) => Promise<void>
}

const Modal = ({ open, setOpen, submitHandler }: TProps) => {
  const [data, setData] = useState<Partial<TSubmission>>(open && typeof open !== 'boolean' ? open : {})
  const animatedComponents = makeAnimated()

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
          <CreatableSelect
            placeholder="Country"
            isClearable={true}
            options={countries}
            onChange={e => setData(p => ({ ...p, country: e ? e.value : '' }))}
            defaultValue={data?.country ? { label: data.country, value: data.country } : null}
          />
          <Input
            name="university"
            placeholder="university"
            value={data.university}
            onChange={changeHandler}
          />
          <Input
            name="professorName"
            placeholder="Professor Name"
            value={data.professorName}
            onChange={changeHandler}
          />
          <CreatableSelect
            placeholder="Designation"
            isClearable={true}
            options={professorDesignations}
            onChange={e => setData(p => ({ ...p, designation: e ? e.value : '' }))}
            defaultValue={data?.designation ? { label: data.designation, value: data.designation } : null}
          />
          <Input name="email" placeholder="email" value={data.email} onChange={changeHandler} />
          <Input name="website" placeholder="website" value={data.website} onChange={changeHandler} />
          <Select
            placeholder="Research Interest"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={researchInterests}
          />
          <Input
            type="date"
            name="mailingDate"
            placeholder="mailingDate"
            value={data?.mailingDate ? new Date(data.mailingDate as string).toISOString().slice(0, 10) : ''}
            onChange={changeHandler}
          />
          <CreatableSelect
            placeholder="Email Type"
            options={emailTypes}
            isClearable={true}
            onChange={e => setData(p => ({ ...p, emailTypes: e ? e.value : '' }))}
            defaultValue={data?.emailType ? { label: data.emailType, value: data.emailType } : null}
            required={true}
          />
          <CreatableSelect
            placeholder="Priority"
            options={priority}
            isClearable={true}
            onChange={e => setData(p => ({ ...p, priority: e ? e.value : undefined }))}
            defaultValue={data?.priority ? { label: data.priority, value: data.priority } : null}
            required={true}
          />
          <CreatableSelect
            placeholder="Results"
            options={results}
            isClearable={true}
            onChange={e => setData(p => ({ ...p, status: e ? e.value : '' }))}
            defaultValue={data?.result ? { label: data.result, value: data.result } : null}
            required={true}
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
