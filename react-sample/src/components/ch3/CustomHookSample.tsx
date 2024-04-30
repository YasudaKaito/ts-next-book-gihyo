import React, { useState, useCallback, useDebugValue } from 'react'

// コールバックと入力内容をまとめたフック
const useInput = () => {
  const [state, setState] = useState('')
  // onChangeが呼ばれたときにだけ内部の状態を更新するため、useCallbackで包む
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }, [])

  // 開発者ツールのcomponentsタブで表示するためにuseDebugValueを使う
  useDebugValue(`Input: ${state}`)

  return [state, onChange] as const
}

export const Input = () => {
  const [text, onChangeText] = useInput()
  return (
    <div>
      <input type="text" value={text} onChange={onChangeText} />
      <p>Input: {text}</p>
    </div>
  )
}
