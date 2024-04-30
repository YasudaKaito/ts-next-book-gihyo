import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'

const EnvSample: NextPage = (props) => {
  // サーバサイドではtest1, クライアントサイドではundefined
  console.log('TEST', process.env.TEST)
  // サーバ・クライアントどちらでもtest2
  console.log('NEXT_PUBLIC_TEST', process.env.NEXT_PUBLIC_TEST)

  return (
    <div>
      <Head>
        <title>EnvSample</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* サーバサイドではtest1, クライアントサイドで再描画されると何も表示されない */}
        <p>{process.env.TEST}</p>
        <p>{process.env.NEXT_PUBLIC_TEST}</p>
      </main>
    </div>
  )
}

// 常にサーバサイドで実行されるので、すべての環境変数を参照可能
export const getStaticProps: GetStaticProps = async (context) => {
  console.log('TEST', process.env.TEST)
  console.log('NEXT_PUBLIC_TEST', process.env.NEXT_PUBLIC_TEST)

  return {
    props: {}
  }
}

export default EnvSample
