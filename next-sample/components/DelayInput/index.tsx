import React, { useState, useCallback, useRef } from 'react'

type DelayButtonProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const DelayInput = (props: DelayButtonProps) => {
  const { onChange } = props

  // 入力中かどうか
  const [isTyping, setIsTyping] = useState(false)
  // inputに表示するテキスト
  const [inputValue, setInputValue] = useState('')
  // spanに表示するテキスト
  const [viewValue, setViewValue] = useState('')
  // タイマーを保持するRef
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 入力中フラグを立てる
      setIsTyping(true)
      // 入力中のテキストをセット
      setInputValue(e.target.value)

      // 以前のタイマーをクリア
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }

      // 1秒後に入力中フラグを下げる
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        // 入力中フラグを解除
        setIsTyping(false)
        // spanに表示するテキストをセット
        setViewValue(e.target.value)
        onChange(e)
      }, 1000)
    },
    [onChange]
  )

  const text = isTyping ? '入力中...' : `入力したテキスト ${viewValue}`

  return (
    <div>
      <input
        data-testid="input-text"
        value={inputValue}
        onChange={handleChange}
      />
      <span data-testid="display-text">{text}</span>
    </div>
  )
}
