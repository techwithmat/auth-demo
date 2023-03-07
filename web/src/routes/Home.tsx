import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import LINKS from '../lib/links'

function Home() {
  return (
    <Layout title='🔐 AuthDemo'>
      <div className='flex flex-col justify-center gap-2'>
        {LINKS?.map(({ href, text }, index) => (
          <LinkButton to={href} key={index}>
            {text}
          </LinkButton>
        ))}
      </div>
    </Layout>
  )
}

export default Home
