import type { Preview } from '@storybook/react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from '../src/themes'
import React from 'react'
// import * as NextImage from 'next/image'

const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    transition: .25s;
    color: #000000;
  }
`

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (story) => {
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {story()}
        </ThemeProvider>
      )
    }
  ]
}

// 参考: https://github.com/storybookjs/storybook/issues/23684
// next/imageの差し替え
// const OriginalNextImage = NextImage.default

// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: (props) =>
//     typeof props.src === 'string'
//       ? React.createElement(OriginalNextImage, {
//           ...props,
//           unoptimized: true,
//           blurDataURL: props.src
//         })
//       : React.createElement(OriginalNextImage, { ...props, unoptimized: true })
// })

// Object.defineProperty(NextImage, '__esModule', {
//   configurable: true,
//   value: true
// })

export default preview
