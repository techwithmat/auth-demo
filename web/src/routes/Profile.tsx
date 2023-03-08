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
        <p>UserID: {data?.user?.user_id}</p>
        <p>Email: {data?.user?.email}</p>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </Layout>
  )
}

export default Profile
