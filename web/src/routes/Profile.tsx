import Layout from '../components/Layout'

import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useSession } from '../lib/useSession'
import { logOut } from '../lib/authServices'

function Profile() {
  const { data } = useSession({ required: true })
  const navigator = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await logOut()

      console.log(response)

      navigator('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout title='Profile'>
      <div className='mb-4'>
        <p>
          <span className='font-bold text-lg text-violet-400'>UserID:</span> {data?.user?.user_id}
        </p>
        <p>
          <span className='font-bold text-lg text-violet-400'>Username:</span>
          {data?.user?.username}
        </p>
        <p>
          <span className='font-bold text-lg text-violet-400'>Email:</span> {data?.user?.email}
        </p>
        <p>
          <span className='font-bold text-lg text-violet-400'>AvatarURL:</span>
          {data?.user?.avatar_url ?? 'No avatar set'}
        </p>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </Layout>
  )
}

export default Profile
