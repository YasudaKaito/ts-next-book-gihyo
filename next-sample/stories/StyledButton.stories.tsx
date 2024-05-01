import { Meta, StoryFn } from '@storybook/react'
import { StyledButton, StyledButtonProps } from '../components/StyledButton'

// storyの設定
export default {
  title: 'StyledButton',
  component: StyledButton
} as Meta<typeof StyledButton>

export const Primary: StoryFn<StyledButtonProps> = (props) => {
  return (
    <StyledButton {...props} variant="primary">
      Primary
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
