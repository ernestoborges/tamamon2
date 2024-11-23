interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  onclick?: () => void
}
export default function Button({ children, disabled, onclick }: ButtonProps) {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className='rounded-lg bg-green-600 p-2 hover:bg-green-500'
    >
      {children}
    </button>
  )
}
