import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import LINKS from '../lib/links'

function Home() {
  return (
    <Layout title='🔐 AuthDemo'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {LINKS?.map(({ href, text }) => (
          <LinkButton to={href}>{text}</LinkButton>
        ))}
      </div>
    </Layout>
  )
}

export default Home
