import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

type SSRProps = {
  message: string
}

const SSR: NextPage<SSRProps> = ({ message }) => {
  return (
    <div>
      <Head>
        <title>Server Side Rendering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>
          このページはサーバーサイドレンダリングでアクセス時に描画されたページ
        </p>
        <p>{message}</p>
      </main>
    </div>
  )
}

// ページへのリクエストのたびに実行される
export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context
) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp}にgetServerSidePropsが実行されました`
  console.log(message)
  return {
    props: {
      message
    }
  }
}

export default SSR
