import React, { useState, useRef, useImperativeHandle } from 'react'

// Lets your component expose a DOM node to a parent component using a ref.
const Child = React.forwardRef((_, ref) => {
  const [message, setMessage] = useState<string | null>(null)

  // useImperativeHandleで親のrefから参照できる値を指定
  useImperativeHandle(ref, () => ({
    showMessage: () => {
      const date = new Date()
      const message = `Helllo, it's ${date.toLocaleString()} now`
      setMessage(message)
    }
  }))

  return <div>{message !== null ? <p>{message}</p> : null}</div>
})

export const Parent = () => {
  const childRef = useRef<{ showMessage: () => void }>(null)

  // 親側で子コンポーントのメソッドを呼び出す
  const onClick = () => {
    if (childRef.current !== null) {
      // 子のuseImperativeHandleで指定したオブジェクトの値を参照
      childRef.current.showMessage()
    }
  }

  return (
    <div>
      <button onClick={onClick}>show Message</button>
      <Child ref={childRef} />
    </div>
  )
}
