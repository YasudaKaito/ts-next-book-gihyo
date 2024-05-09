import React, { useRef, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import {
  CheckBoxOutlineBlankIcon,
  CheckBoxIcon,
} from 'components/atoms/IconButton'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'
// MUIのアイコン

// https://stackoverflow.com/questions/73827055/checked-doesnt-exist-on-htmlattributeshtmlinputelement
export interface CheckboxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'defaultValue'
  > {
  label: string
}

// 非表示のチェックボックス
const CheckBoxElement = styled.input`
  display: none;
`

// チェックボックスのラベル
const Label = styled.label`
  cursor: pointer;
  margin-left: 6px;
  user-select: none;
`
const CheckBox = (props: CheckboxProps) => {
  // checkedはページロード時に既定でチェックされているかどうかを示す
  // 現在チェックされているかどうかを示すものではない
  const { id, label, onChange, checked, ...rest } = props
  const [isChecked, setIsChecked] = useState(checked)
  const ref = useRef<HTMLInputElement>(null)

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      // チェックボックスを強制的にチェック
      ref.current?.click()
      setIsChecked((isChecked) => !isChecked)
    },
    [ref, setIsChecked],
  )

  useEffect(() => {
    // （主に）ページロード時に、パラメータからの設定を受け付ける
    setIsChecked(checked ?? false)
  }, [checked])

  return (
    <>
      <CheckBoxElement
        {...rest}
        ref={ref}
        type="checkbox"
        checked={isChecked}
        // readOnly={onChange}
        onChange={onChange}
      />
      <Flex alignItems="center">
        {/* チェックボックスのON/OFF */}
        {checked ?? isChecked ? (
          <CheckBoxIcon size={20} onClick={onClick} />
        ) : (
          <CheckBoxOutlineBlankIcon size={20} onClick={onClick} />
        )}
        {/* チェックボックスのラベル */}
        {label && label.length > 0 && (
          <Label htmlFor={id} onClick={onClick}>
            <Text>{label}</Text>
          </Label>
        )}
      </Flex>
    </>
  )
}

export default CheckBox
