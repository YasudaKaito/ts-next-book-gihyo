import { NextPage } from 'next'
import styled from 'styled-components'

// 青いボールド文字
const Text = styled.p`
  color: blue;
  font-weight: bold;
`

// ボーダーのスタイルを加える
const BorderedText = styled(Text)`
  padding: 8px 16px;
  border: 3px solid blue;
  border-radius: 8px;
`

const Page: NextPage = () => {
  return (
    <div>
      <Text>Hello</Text>
      <BorderedText>World</BorderedText>
    </div>
  )
}

export default Page
