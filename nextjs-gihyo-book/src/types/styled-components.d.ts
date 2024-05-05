import 'styled-components'
import { theme } from '../themes'

type Theme = typeof theme

// 参考 https://www.to-r.net/media/styled-components-theme/
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
