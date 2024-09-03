import { ChangeEventHandler } from 'react'

type Props = {
  type?: 'text'
  title: string
  name: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = ({ type = 'text', title, name, placeholder, onChange }: Props) => {
  return (
    <div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="input input-bordered input-sm w-full"
        />
      </label>
    </div>
  )
}

export default Input
