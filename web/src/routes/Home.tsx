import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'

function Home() {
  return (
    <Layout title='🔐 AuthDemo'>
      <div className='flex flex-col justify-center gap-2'>
        <LinkButton to='/profile'>Profile</LinkButton>
        <LinkButton to='/register'>Register</LinkButton>
        <LinkButton to='/login'>Login</LinkButton>
      </div>
    </Layout>
  )
}

export default Home
