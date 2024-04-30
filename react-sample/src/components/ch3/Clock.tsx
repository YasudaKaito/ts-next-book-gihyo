import { useState, useEffect, useLayoutEffect } from 'react'

// 1秒
const UPDATE_CYCLE = 1000

const KEY_LOCALE = 'KEY_LOCALE'

// enumは非推奨のため使わない
const Locale = {
  Us: 'en-US',
  Jp: 'ja-JP'
} as const

type Locale = (typeof Locale)[keyof typeof Locale]

// 実質的に型変換のための関数
const getLocaleFromString = (text: string): Locale => {
  switch (text) {
    case Locale.Us:
      return Locale.Us
    case Locale.Jp:
      return Locale.Jp
    default:
      return Locale.Us
  }
}

export const Clock = () => {
  const [timestamp, setTimestamp] = useState(new Date())
  const [locale, setLocale] = useState<Locale>(Locale.Us)

  // タイマーセット用の副作用
  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date())
    }, UPDATE_CYCLE)
    // 次のuseEffectが実行される直前、またはアンマウント時にタイマー解除
    // 依存配列が空なので、アンマウント時のみ実行される
    return () => {
      clearInterval(timer)
    }
    // 初回のレンダリング時にのみ実行される
  }, [])

  // localstorageから値を読み込むための副作用
  // <React.StrictMode>をオフにしないと、2回呼び出しされてしまう
  // https://qiita.com/toy4you/items/fd4e051e3965277070cb
  // useEffect(() => {
  //   const savedLocale = localStorage.getItem(KEY_LOCALE)
  //   console.log('savedLocale', savedLocale)
  //   if (savedLocale !== null) {
  //     const value = getLocaleFromString(savedLocale)
  //     console.log('value', value)
  //     setLocale(value)
  //   }
  //   // 初回のレンダリング時にのみ実行される
  // }, [])

  useLayoutEffect(() => {
    const savedLocale = localStorage.getItem(KEY_LOCALE)
    if (savedLocale !== null) {
      setLocale(getLocaleFromString(savedLocale))
    }
  }, [])

  // locale変化時に、localstorageに保存する
  useEffect(() => {
    localStorage.setItem(KEY_LOCALE, locale)
  }, [locale])

  return (
    <div>
      <p>
        <span id="current-time-label">現在時刻</span>
        <span>:{timestamp.toLocaleString(locale)}</span>
        <select
          value={locale}
          onChange={(e) => setLocale(getLocaleFromString(e.target.value))}
        >
          <option value="en-US">en-US</option>
          <option value="ja-JP">ja-JP</option>
        </select>
      </p>
    </div>
  )
}
