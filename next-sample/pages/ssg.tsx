import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'

type SSGProps = {
  message: string
}

const SSG: NextPage<SSGProps> = (props) => {
  const { message } = props

  return (
    <div>
      {/* Headで囲むと、<head>に配置される */}
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成でビルド時に生成されたページ</p>
        <p>{message}</p>
      </main>
    </div>
  )
}

// ビルド時に実行される
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp}にgetStaticPropsが実行されました`
  console.log(message)
  // ここで返したpropsをもとにページコンポーネントを描画する
  return {
    props: {
      message
    }
  }
}

export default SSG
