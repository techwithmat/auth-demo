import { forwardRef, type InputHTMLAttributes, type Ref } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labeltext: string
}

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { labeltext, type = 'text' } = props

  return (
    <label className='block my-3 text-sm text-neutral-300 font-medium'>
      {labeltext}
      <input
        {...props}
        ref={ref}
        type={type}
        className='w-full bg-neutral-700 rounded h-10 px-4 mt-2 outline-none focus:ring focus:ring-violet-500 caret-violet-500'
      />
    </label>
  )
})

export default Input
