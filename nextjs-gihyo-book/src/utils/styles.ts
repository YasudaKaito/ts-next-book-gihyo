import { theme } from 'themes'
import type { ResponsiveProp, Responsive } from 'types'

// Themeの型
export type AppTheme = typeof theme

type SpaceThemeKeys = keyof typeof theme.space
type ColorThemeKeys = keyof typeof theme.colors
type FontSizeThemeKeys = keyof typeof theme.fontSizes
type LetterSpacingThemeKeys = keyof typeof theme.letterSpacings
type LineHeightThemeKeys = keyof typeof theme.lineHeights

// 各themeのキーの型
// 配列の場合は整数または整数の文字列を想定
export type Space = SpaceThemeKeys | (string & {})
export type Color = ColorThemeKeys | (string & {})
export type FontSize = FontSizeThemeKeys | (string & {})
export type LetterSpacing = LetterSpacingThemeKeys | (string & {})
export type LineHeight = LineHeightThemeKeys | (string & {})

// 各themeの値の型
export type SpaceThemeValues = (typeof theme.space)[number]
export type ColorThemeValues = (typeof theme.colors)[keyof typeof theme.colors]
export type FontSizeThemeValues =
  (typeof theme.fontSizes)[keyof typeof theme.fontSizes]
export type LetterSpacingThemeValues = (typeof theme.letterSpacings)[number]
export type LineHeightThemeValues = (typeof theme.lineHeights)[number]

const BREAKPOINTS = {
  // npx以上を意味する
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
} as const

/**
 * Responsive型をCSSプロパティとその値に変換
 * @param propKey CSSプロパティ
 * @returns CSSプロパティとその値(ex. background-color: white;)
 */
export function toPropValue<T>(
  propKey: string,
  prop?: Responsive<T>,
  theme?: AppTheme
) {
  if (prop === undefined) return undefined
  // プリミティブ値の場合
  if (!isResponsivePropType(prop))
    return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`
  // オブジェクトの場合
  const result = []
  for (const responsiveKey in prop) {
    if (responsiveKey === 'base') {
      result.push(
        `${propKey}: ${toThemeValueIfNeeded(
          propKey,
          prop[responsiveKey],
          theme
        )};`
      )
    } else if (
      responsiveKey === 'sm' ||
      responsiveKey === 'md' ||
      responsiveKey === 'lg' ||
      responsiveKey === 'xl'
    ) {
      // メディアクエリでのスタイル
      const breakpoint = BREAKPOINTS[responsiveKey]
      const style = `${propKey}: ${toThemeValueIfNeeded(
        propKey,
        prop[responsiveKey],
        theme
      )};`
      result.push(`@media screen and (min-width: ${breakpoint}) {${style}}`)
    }
  }
  return result.join('\n')
}

const SPACE_KEYS = new Set([
  'margin',
  'margin-top',
  'margin-left',
  'margin-bottom',
  'margin-right',
  'padding',
  'padding-top',
  'padding-left',
  'padding-bottom',
  'padding-right'
])
const COLOR_KEYS = new Set(['color', 'background-color'])
const FONT_SIZE_KEYS = new Set(['font-size'])
const LETTER_SPACING_KEYS = new Set(['letter-spacing'])
const LINE_HEIGHT_KEYS = new Set(['line-height'])

/**
 * Themeに指定されたCSSプロパティの値に変換
 * @param propKey CSSプロパティ
 * @param value CSSプロパティの値
 *
 */
function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
  if (
    theme &&
    theme.space &&
    SPACE_KEYS.has(propKey) &&
    isSpaceThemeKeys(value, theme)
  ) {
    return theme.space[value] as SpaceThemeValues
  } else if (
    theme &&
    theme.space &&
    COLOR_KEYS.has(propKey) &&
    isColorThemeKeys(value, theme)
  ) {
    return theme.colors[value] as ColorThemeValues
  } else if (
    theme &&
    theme.fontSizes &&
    FONT_SIZE_KEYS.has(propKey) &&
    isFontSizeThemeKeys(value, theme)
  ) {
    return theme.fontSizes[value] as FontSizeThemeValues
  } else if (
    theme &&
    theme.letterSpacings &&
    LETTER_SPACING_KEYS.has(propKey) &&
    isLetterSpacingThemeKeys(value, theme)
  ) {
    return theme.letterSpacings[value] as LetterSpacingThemeValues
  } else if (
    theme &&
    theme.lineHeights &&
    LINE_HEIGHT_KEYS.has(propKey) &&
    isLineHeightThemeKeys(value, theme)
  ) {
    return theme.lineHeights[value] as LineHeightThemeValues
  }

  return value
}

function isResponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
  return (
    prop &&
    (prop.base !== undefined ||
      prop.sm !== undefined ||
      prop.md !== undefined ||
      prop.lg !== undefined ||
      prop.xl !== undefined)
  )
}

/** propsが、theme.spaceの配列にインデクスアクセス可能な値かどうか判定 */
function isSpaceThemeKeys(prop: any, theme: AppTheme): prop is SpaceThemeKeys {
  // themeの配列値を参照する際、
  // 配列に対するインデックスアクセス可能な値かを判定する
  // 整数値または整数値の文字列を想定
  //
  // 例: const space: string[] = ['0px', '8px', '16px', '32px', '64px']
  // const len = Object.keys(space).filter((key) => key == '0').length
  // または const len = Object.keys(space).filter((key) => key == 0).length
  // console.log(len) // 1

  // keyには'0' | '1' | , ... のような文字列が入る
  return Object.keys(theme.space).filter((key) => key == prop).length > 0
}

function isColorThemeKeys(prop: any, theme: AppTheme): prop is ColorThemeKeys {
  return Object.keys(theme.colors).filter((key) => key == prop).length > 0
}

function isFontSizeThemeKeys(
  prop: any,
  theme: AppTheme
): prop is FontSizeThemeKeys {
  return Object.keys(theme.fontSizes).filter((key) => key == prop).length > 0
}

function isLetterSpacingThemeKeys(
  prop: any,
  theme: AppTheme
): prop is LetterSpacingThemeKeys {
  return (
    Object.keys(theme.letterSpacings).filter((key) => key == prop).length > 0
  )
}

function isLineHeightThemeKeys(
  prop: any,
  theme: AppTheme
): prop is LineHeightThemeKeys {
  return Object.keys(theme.lineHeights).filter((key) => key == prop).length > 0
}
