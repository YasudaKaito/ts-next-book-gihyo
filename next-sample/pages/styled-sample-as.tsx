import { NextPage } from 'next'
import styled from 'styled-components'

const Text = styled.p`
  color: #1e90ff;
  font-size: 2em;
`

const Page: NextPage = () => {
  return (
    <div>
      <Text>Hello</Text>
      <Text as="a" href="/">
        Go to index
      </Text>
    </div>
  )
}

export default Page
