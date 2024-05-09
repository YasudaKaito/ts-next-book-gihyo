import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { CloudUploadIcon } from 'components/atoms/IconButton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDragEvt = (value: any): value is React.DragEvent => {
  return !!value.dataTransfer
}

const isInput = (value: EventTarget | null): value is HTMLInputElement =>
  value !== null

const getFilesFromEvent = (e: React.DragEvent | React.ChangeEvent) => {
  if (isDragEvt(e)) {
    return Array.from(e.dataTransfer?.files)
  } else if (isInput(e.target) && e.target.files) {
    return Array.from(e.target.files)
  }
  return []
}

type FileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/gif'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/pdf'

interface DropzoneProps {
  /**入力ファイル*/
  value?: File[]
  /**<input />のname属性*/
  name?: string
  acceptedFileTypes?: FileType[]
  width?: number | string
  height?: number | string
  /**バリデーションエラーフラグ*/
  hasError?: boolean
  /**ファイルがドロップ入力されたときのハンドラ*/
  onDrop?: (files: File[]) => void
  /**ファイルが入力されたときのハンドラ*/
  onChange?: (files: File[]) => void
}

type DropzoneRootProps = {
  isFocused?: boolean
  hasError?: boolean
  width?: string | number
  height?: string | number
}

// ドロップゾーンの外側の外観
const DropzoneRoot = styled.div<DropzoneRootProps>`
  border: 1px dashed
    ${({ theme, isFocused, hasError }) => {
      if (hasError) {
        return theme.colors.danger
      } else if (isFocused) {
        return theme.colors.primary
      } else {
        return theme.colors.border
      }
    }};
  border-radius: 8px;
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`

// ドロップゾーンの中身
const DropzoneContent = styled.div<{
  width: string | number
  height: string | number
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  /**中央寄せ*/
  justify-content: center;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`

const DropzoneInputFile = styled.input`
  display: none;
`

const Dropzone = (props: DropzoneProps) => {
  const {
    value = [],
    name,
    acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
    width = '100%',
    height = '200px',
    hasError,
    onDrop,
    onChange,
  } = props

  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // 選択された値の変化が起こった際の（ファイルが選択された場合の）挙動
  // ファイルがドロップされた場合、ダイアログから呼ばれた場合両方で発火
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false)
    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType),
      ),
    )
    // 渡されたハンドラがあれば実行
    onDrop && onDrop(files)
    onChange && onChange(files)
  }

  // ドラッグ状態のマウスポインタが範囲内でドロップされた時
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(false)

    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType),
      ),
    )
    if (files.length === 0)
      return window.alert(
        `次のファイルフォーマット以外は指定できません${acceptedFileTypes.join(',')}`,
      )

    onDrop && onDrop(files)
    onChange && onChange(files)
  }

  // ドラッグ状態のマウスポインタが範囲内入っている時
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  // ドラッグ状態のマウスポインタが範囲外に消えた時
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(false)
  }, [])

  // ドラッグ状態のマウスポインタが範囲内に来た時にフォーカスを当てる
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFocused(true)
  }, [])

  // ファイル選択ダイアログ表示
  const handleClick = () => {
    inputRef.current?.click()
  }

  useEffect(() => {
    if (inputRef.current && value && value.length == 0) {
      inputRef.current.value = ''
    }
  }, [value])

  return (
    <>
      {/* ドラックアンドドロップイベントを管理 */}
      <DropzoneRoot
        ref={rootRef}
        isFocused={isFocused}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onClick={handleClick}
        hasError={hasError}
        width={width}
        height={height}
        data-testid="dropzone"
      >
        {/* ダミーインプット */}
        <DropzoneInputFile
          ref={inputRef}
          type="file"
          name={name}
          accept={acceptedFileTypes.join(',')}
          onChange={handleChange}
          multiple
        />
        <DropzoneContent width={width} height={height}>
          <CloudUploadIcon size={24} />
          <span style={{ textAlign: 'center' }}>デバイスからアップロード</span>
        </DropzoneContent>
      </DropzoneRoot>
    </>
  )
}

Dropzone.defaultProps = {
  acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
  hasError: false,
}

export default Dropzone
