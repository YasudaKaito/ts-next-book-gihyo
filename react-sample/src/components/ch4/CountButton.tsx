import { useState, useCallback } from 'react'
import { Button } from './Button'

const usePopup = () => {
  const cb = useCallback((text: string) => {
    prompt(text)
  }, [])
  return cb
}

type CountButtonProps = {
  label: string
  maximum: number
}

export const CountButton = (props: CountButtonProps) => {
  const { label, maximum } = props
  const [count, setCount] = useState(0)
  const popup = usePopup()

  const onClick = useCallback(() => {
    const newCount = count + 1
    setCount(newCount)
    if (newCount >= maximum) {
      popup(`You've clicked ${newCount} times`)
    }
  }, [count, maximum])

  const disabled = count >= maximum
  const text = disabled
    ? "Can't click anymore"
    : `You've clicked ${count} times`

  return (
    <Button label={label} text={text} disabled={disabled} onClick={onClick} />
  )
}
