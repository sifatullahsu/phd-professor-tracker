import { ChangeEventHandler } from 'react'

type Props = {
  type?: 'text' | 'date'
  title: string
  name: string
  placeholder?: string
  value?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = ({ type = 'text', title, name, value, placeholder, onChange }: Props) => {
  return (
    <div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
        <input
          type={type}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={onChange}
          className="input input-bordered input-sm w-full"
        />
      </label>
    </div>
  )
}

export default Input
