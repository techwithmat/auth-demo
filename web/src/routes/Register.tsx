// Components
import Layout from '../components/Layout'
import Button from '../components/Button'
import Input from '../components/Input'
import ErrorMessage from '../components/ErrorMessage'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import type { RegisterForm } from '../lib/types'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../lib/services/auth'
import { useSession } from '../lib/hooks/useSession'

function Register() {
  const navigate = useNavigate()
  const [isSending, setIsSending] = useState<boolean>(false)
  const { data, status } = useSession({ required: true })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    defaultValues: {
      email: 'jggenfhpdpgzkiynkq@bbitj.com',
      password: 'CoPcx4NTWvyc9',
      password_confirmation: 'CoPcx4NTWvyc9'
    }
  })

  useEffect(() => {
    if (data) navigate('/profile')
  }, [status])

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    if (data.password !== data.password_confirmation) return
    setIsSending(true)

    try {
      await signIn(data)

      setIsSending(false)
      navigate('/login')
    } catch (error) {
      setIsSending(false)
      console.error(error)
    }
  }

  return (
    <Layout title='Register'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          labeltext='Email'
          type='email'
          placeholder='Enter your email'
          {...register('email', {
            required: true,
            pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
          })}
        />
        <ErrorMessage>
          {errors.email?.type === 'required' && 'Email is required.'}
          {errors.email?.type === 'pattern' && 'Invalid email address.'}
        </ErrorMessage>

        <Input
          labeltext='Password'
          placeholder='Enter your password'
          {...register('password', { required: true, minLength: 8, maxLength: 28 })}
        />
        <ErrorMessage>
          {errors.password?.type === 'required' && 'Password is required.'}
          {errors.password?.type === 'minLength' && 'Password must be at least 8 characters.'}
          {errors.password?.type === 'maxLength' && 'Password cannot be more than 20 characters.'}
        </ErrorMessage>

        <Input
          labeltext='Password confirmation'
          placeholder='Enter your password'
          {...register('password_confirmation', { required: true, minLength: 8, maxLength: 28 })}
        />
        <ErrorMessage>
          {errors.password?.type === 'required' && 'Password is required.'}
          {errors.password?.type === 'minLength' && 'Password must be at least 8 characters.'}
          {errors.password?.type === 'maxLength' && 'Password cannot be more than 20 characters.'}
        </ErrorMessage>

        <Button type='submit' isLoading={isSending}>
          Submit
        </Button>
      </form>
    </Layout>
  )
}

export default Register
