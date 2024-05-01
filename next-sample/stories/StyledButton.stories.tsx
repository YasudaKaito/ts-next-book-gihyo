import { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { StyledButton, StyledButtonProps } from '../components/StyledButton'
import { action } from '@storybook/addon-actions'

// storyの設定
export default {
  title: 'StyledButton',
  component: StyledButton
  // argTypes: {
  //   onClick: { action: 'clicked' }
  // }
} as Meta<typeof StyledButton>

const incrementAction = action('increment')

export const Primary: StoryFn<StyledButtonProps> = (props) => {
  const [count, setCount] = useState(0)
  const onClick = (e: React.MouseEvent) => {
    incrementAction(e, count)
    setCount((c) => c + 1)
  }

  return (
    <StyledButton {...props} variant="primary" onClick={onClick}>
      Count: {count}
    </StyledButton>
  )
}

export const Success: StoryFn<StyledButtonProps> = (props) => {
  return (
    <StyledButton {...props} variant="success">
      Success
    </StyledButton>
  )
}

export const Transparent: StoryFn<StyledButtonProps> = (props) => {
  return (
    <StyledButton {...props} variant="transparent">
      Transparent
    </StyledButton>
  )
}
