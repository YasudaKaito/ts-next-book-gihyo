import React, { useState, useMemo } from 'react'

export const UseMemoSample = () => {
  const [text, setText] = useState('')
  const [items, setItems] = useState<string[]>([])

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onClickButton = () => {
    setItems((prevItems) => [...prevItems, text])
    // テキストボックスを空に
    setText('')
  }

  const numOfChar1 = items.reduce((acc, cur) => acc + cur.length, 0)
  // itemsが新しくなった時だけ、関数を実行してメモを更新
  const numOfChar2 = useMemo(
    () => items.reduce((acc, cur) => acc + cur.length, 0),
    [items]
  )

  return (
    <div>
      <p>UseMemoSample</p>
      <div>
        <input value={text} onChange={onChangeInput} />
        <button onClick={onClickButton}>追加</button>
      </div>
      <div>
        {items.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div>
        <p>文字数1: {numOfChar1}</p>
        <p>文字数2: {numOfChar2}</p>
      </div>
    </div>
  )
}
