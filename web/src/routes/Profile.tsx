import Layout from '../components/Layout'

import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useSession } from '../lib/hooks/useSession'
import { logOut } from '../lib/services/auth'

function Profile() {
  const { data } = useSession({ required: true })
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()

      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout title='Profile'>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='mb-4'>
            <p>UserID: {data?.user?.user_id}</p>
            <p>Email: {data?.user?.email}</p>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </Layout>
  )
}

export default Profile
