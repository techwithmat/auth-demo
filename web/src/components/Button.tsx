import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

function Button(props: ButtonProps) {
  const { isLoading, disabled, children, ...rest } = props

  return (
    <button
      className='w-full flex items-center justify-center border border-violet-500 h-10 px-4 rounded bg-violet-700 hover:bg-violet-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-violet-700'
      {...rest}
      disabled={isLoading || disabled}
    >
      {isLoading ? 'Sending...' : children}
    </button>
  )
}

export default Button
