import React from 'react'

type ContainerProps = {
  title: string
  children: React.ReactNode
}

// 赤背景のボックス内にタイトルと子要素を表示
// childrenは、Reactのコンポーネントが他のコンポーネントを"親子関係"で包むことができる特殊なProps
const Container = (props: ContainerProps) => {
  const { title, children } = props
  return (
    <div style={{ background: 'red' }}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  )
}

const Parent = () => {
  return (
    <Container title="Hello">
      <p>ここの部分が展開され背景色で囲まれる</p>
    </Container>
  )
}

export default Parent
