import { NextPage } from 'next'
import styled, { css } from 'styled-components'

// 赤色のボーダー
const redBox = css`
  padding: 0.25em 1em;
  border: 3px solid #ff0000;
  border-radius: 10px;
`

// 青色文字
const font = css`
  color: #1e90ff;
  font-size: 2em;
`

// 上記2つを適用し、背景が透明なボタン
const Button = styled.button`
  background: transparent;
  margin: 1em;
  cursor: pointer;

  ${redBox}
  ${font}
`

// 青色文字で、ボールド
const Text = styled.p`
  font-weight: bold;

  ${font}
`

const Page: NextPage = () => {
  return (
    <div>
      <Button>Hello</Button>
      <Text>World</Text>
    </div>
  )
}

export default Page
