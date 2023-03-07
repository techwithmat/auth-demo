import { HTMLAttributes } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface LinkButtonProps extends HTMLAttributes<HTMLAnchorElement>, LinkProps {}

function LinkButton(props: LinkButtonProps) {
  return (
    <Link
      {...props}
      className='border border-neutral-500 px-6 py-2.5 rounded bg-neutral-700 hover:bg-neutral-600 transition-colors'
    />
  )
}

export default LinkButton
