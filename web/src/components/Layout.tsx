import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title: string
}

function Layout({ children, title }: LayoutProps) {
  return (
    <div className='h-screen grid place-content-center'>
      <h1 className='text-3xl font-bold text-center mb-8'>{title}</h1>
      <div className='w-80 max-w-xs mx-auto px-4 sm:px-0'>{children}</div>
    </div>
  )
}

export default Layout
