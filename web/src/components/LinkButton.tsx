import { HTMLAttributes } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface LinkButtonProps extends HTMLAttributes<HTMLAnchorElement>, LinkProps {}

function LinkButton(props: LinkButtonProps) {
  return (
    <Link
      {...props}
      className='flex items-center justify-center border border-violet-500 px-6 h-12 rounded bg-violet-700 hover:bg-violet-600 transition-colors'
    />
  )
}

export default LinkButton
