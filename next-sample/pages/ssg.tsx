import { NextPage } from 'next'
import Head from 'next/head'

type SSGProps = {}

const SSG: NextPage<SSGProps> = () => {
  return (
    <div>
      {/* Headで囲むと、<head>に配置される */}
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成でビルド時に生成されたページ</p>
      </main>
    </div>
  )
}

export default SSG
