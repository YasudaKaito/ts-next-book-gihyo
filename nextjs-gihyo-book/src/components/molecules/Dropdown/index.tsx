import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'

// 「position: relative;」で下にある要素が詰まることはないようにする
const DropdownRoot = styled.div`
  position: relative;
  height: 38px;
`

// ドロップダウン外観
const DropdownControl = styled.div<{ hasError?: boolean }>`
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border: ${({ theme, hasError }) =>
    hasError
      ? `1px solid ${theme.colors.danger}`
      : `1px solid ${theme.colors.border}`};
  border-radius: 5px;
  box-sizing: border-box;
  cursor: default;
  outline: none;
  padding: 8px 52px 8px 12px;
`

const DropdownValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
`

const DropdownPlaceholder = styled.div`
  color: #757575;
  font-size: ${({ theme }) => theme.fontSizes.small};
  min-height: 20px;
  line-height: 20px;
`

const DropdownArrow = styled.div<{ isOpen?: boolean }>`
  border-color: ${({ isOpen }) =>
    isOpen
      ? 'transparent transparent #222222;'
      : '#222222 transparent transparent'};
  border-width: ${({ isOpen }) => (isOpen ? '0 5px 5px' : '5px 5px 0;')};
  border-style: solid;
  content: ' ';
  display: block;
  height: 0;
  margin-top: -ceil(2.5);
  position: absolute;
  right: 10px;
  top: 16px;
  width: 0;
`

const DropdownMenu = styled.div`
  background-color: #ffffff;
  border: ${({ theme }) => theme.colors.border};
  box-shadow:
    0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 10%),
    0px 3px 14px 2px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
`

const DropdownOption = styled.div`
  padding: 8px 12px 8px 12px;
  &:hover {
    background-color: #f9f9f9;
  }
`

export interface DropdownItem {
  value: string | number | null
  label?: string
}

interface DropdownItemProps {
  item: DropdownItem
}

const DropdownItem = (props: DropdownItemProps) => {
  const { item } = props

  return (
    <Flex alignItems="center">
      <Text margin={0} variant="small">
        {item.label ?? item.value}
      </Text>
    </Flex>
  )
}

interface DropdownProps {
  /**選択肢*/
  options: DropdownItem[]
  value?: string | number
  /**<input />のname*/
  name?: string
  placeholder?: string
  hasError?: boolean
  onChange?: (selected?: DropdownItem) => void
}

const Dropdown = (props: DropdownProps) => {
  const { options, value, name, hasError, onChange } = props
  const initialItem = options.find((item) => item.value === value)
  const [isOpen, setIsOpenValue] = useState(false)
  const [selectedItem, setSelectedItem] = useState(initialItem)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleDocumentClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // 自分自身をクリックした場合は何もしない
      if (dropdownRef.current) {
        const elems = dropdownRef.current.querySelectorAll('*')
        for (let i = 0; i < elems.length; i++) {
          if (elems[i] === e.target) {
            return
          }
        }
      }
      setIsOpenValue(false)
    },
    [dropdownRef]
  )

  // マウスダウンしたときにトグルする
  // click との違いは、ボタンが最初に押された時点で発行されること
  const handleMouseDown = (e: React.SyntheticEvent) => {
    setIsOpenValue((isOpen) => !isOpen)
    e.stopPropagation()
  }

  // ドロップダウンで選択時
  const handleSelectValue = (e: React.MouseEvent, item: DropdownItem) => {
    e.stopPropagation()
    setSelectedItem(item)
    // ドロップダウン選択肢を閉じる
    setIsOpenValue(false)
    onChange && onChange(item)
  }

  // 最初だけ呼び出す
  useEffect(() => {
    // ドロップダウンコンポーネント以外のクリックとタッチ時のイベント設定
    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('touchend', handleDocumentClick)
    return function cleanup() {
      document.removeEventListener('click', handleDocumentClick)
      document.removeEventListener('touchend', handleDocumentClick)
    }
  }, [])

  return (
    <DropdownRoot ref={dropdownRef}>
      <DropdownControl
        hasError={hasError}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        data-testid="dropdown-control"
      >
        {selectedItem && (
          <DropdownValue>
            <DropdownItem item={selectedItem} />
          </DropdownValue>
        )}
        {/* 何も選択されてない時はプレースホルダーを表示 */}
        {!selectedItem && (
          <DropdownPlaceholder>{props?.placeholder}</DropdownPlaceholder>
        )}
        {/* ダミーinput */}
        <input
          type="hidden"
          name={name}
          value={selectedItem?.value ?? ''}
          onChange={() => onChange && onChange(selectedItem)}
        />
        <DropdownArrow isOpen={isOpen} />
      </DropdownControl>
      {/* ドロップダウンを表示 */}
      {isOpen && (
        <DropdownMenu>
          {props.options.map((item, idx) => (
            <DropdownOption
              key={idx}
              onMouseDown={(e) => handleSelectValue(e, item)}
              onClick={(e) => handleSelectValue(e, item)}
              data-testid="dropdown-option"
            >
              <DropdownItem item={item} />
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownRoot>
  )
}

export default Dropdown
