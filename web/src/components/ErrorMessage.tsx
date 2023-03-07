import type { ReactNode } from 'react'

function ErrorMessage({ children }: { children: ReactNode }) {
  return <span className='text-red-400 font-semibold mb-2 block'>{children}</span>
}

export default ErrorMessage
