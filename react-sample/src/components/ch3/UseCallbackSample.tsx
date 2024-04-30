import React, { useState, useCallback } from 'react'

type ButtonProps = {
  onClick: () => void
}

// 通常の関数コンポーネント
const DecrementButton = (props: ButtonProps) => {
  const { onClick } = props
  console.log(`DecrementButtonが再描画されました`)
  return <button onClick={onClick}>-</button>
}

// メモ化した関数コンポーネント
const IncrementButton = React.memo<ButtonProps>((props) => {
  const { onClick } = props
  console.log(`IncrementButtonが再描画されました`)
  return <button onClick={onClick}>+</button>
})

// メモ化した関数コンポーネント
const DoubleButton = React.memo<ButtonProps>((props) => {
  const { onClick } = props
  console.log(`DoubleButtonが再描画されました`)
  return <button onClick={onClick}>x2</button>
})

export const Parent = () => {
  const [count, setCount] = useState(0)

  const decrement = () => {
    setCount((c) => c - 1)
  }

  const increment = () => {
    setCount((c) => c + 1)
  }

  const double = useCallback(() => {
    setCount((c) => c * 2)
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <DecrementButton onClick={decrement} />
      <IncrementButton onClick={increment} />
      <DoubleButton onClick={double} />
    </div>
  )
}
