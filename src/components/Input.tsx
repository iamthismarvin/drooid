import { type ChangeEventHandler, type FC } from 'react'

interface InputProps {
  label: string
  type: string
  value: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Input: FC<InputProps> = ({ label, type, value, onChange }) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type={type}
        placeholder={label}
        value={value}
        className="w-full"
        onChange={onChange}
      />
    </div>
  )
}

export default Input
