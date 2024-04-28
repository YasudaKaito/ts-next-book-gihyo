import React from 'react'

// 赤背景のボックス内にタイトルと子要素を表示
// childrenは、Reactのコンポーネントが他のコンポーネントを"親子関係"で包むことができる特殊なProps
const Container = (props: { title: string; children: React.ReactElement }) => {
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
