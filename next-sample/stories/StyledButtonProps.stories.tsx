import { Meta, StoryFn } from '@storybook/react'
import { StyledButton } from '../components/StyledButton'

export default {
  title: 'StyledButtonProps',
  component: StyledButton,
  argTypes: {
    // propsに渡すvariant
    variant: {
      control: {
        type: 'radio'
      },
      options: ['primary', 'success', 'transparent']
    },
    // propsに渡すchildren
    children: {
      control: {
        type: 'text'
      }
    }
  }
} as Meta<typeof StyledButton>

const Template: StoryFn<typeof StyledButton> = (args) => (
  <StyledButton {...args} />
)

export const TemplateTest = Template.bind({})

TemplateTest.args = {
  variant: 'primary',
  children: 'Primary'
}
