import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

type ISRProps = {
  message: string
}

const ISR: NextPage<ISRProps> = ({ message }) => {
  const router = useRouter()
  if (router.isFallback) return <div>Loading...</div>

  return (
    <div>
      <Head>
        <title>ISR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページはISRでビルド時に生成されました</p>
        <p>{message}</p>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ISRProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp}にISRページのgetStaticPropsが実行されました`
  console.log(message)

  return {
    props: {
      message
    },
    // 30秒
    revalidate: 30
  }
}

export default ISR
