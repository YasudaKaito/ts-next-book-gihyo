import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

type PostProps = {
  id: string
}

// getStaticPropsで返された値を受け取る
const Post: NextPage<PostProps> = ({ id }) => {
  const router = useRouter()
  if (router.isFallback) return <div>Loading...</div>

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成でビルド時に生成された</p>
        <p>{`/posts/${id}に対応するページ`}</p>
      </main>
      <h1>Post {id}</h1>
    </div>
  )
}

// getStaticPathsは生成したいページのパスパラメタの組み合わせを返す
// このファイルは[id].tsxなのでidを返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    // pathsで定義されたの以外は404
    fallback: false
  }
}

interface PostParams extends ParsedUrlQuery {
  id: string
}

// getStaticPaths 実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (
  context
) => {
  return {
    props: {
      // params にgetStaticPathsで定義したidが入る
      id: context.params!['id']
    }
  }
}

export default Post
