import React, { useState, useRef } from 'react'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const UPLOAD_DELAY = 5000

export const ImageUploader = () => {
  // 隠されたinput要素のref
  const inputImageRef = useRef<HTMLInputElement | null>(null)
  // ファイルを保持するref
  const fileRef = useRef<File | null>(null)
  const [message, setMessage] = useState<string | null>('')

  // 「画像をアップロード」クリック時、隠し要素をクリックしてダイアログ表示
  const onClickText = () => {
    if (inputImageRef.current !== null) {
      inputImageRef.current.click()
    }
  }

  // ファイル選択後に呼ばれる
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files !== null && files.length > 0) {
      // fileRefが変化しても再描画は発生しない
      fileRef.current = files[0]
    }
  }

  // アップロードボタンクリック時
  const onClickUpload = async () => {
    if (fileRef.current !== null) {
      // 擬似的に待つ
      await sleep(UPLOAD_DELAY)
      setMessage(`${fileRef.current.name} アップロード完了`)
    }
  }

  return (
    <div>
      <p style={{ textDecoration: 'underline' }} onClick={onClickText}>
        画像をアップロード
      </p>
      <input
        ref={inputImageRef}
        type="file"
        accept="image/*"
        onChange={onChangeImage}
        style={{ visibility: 'hidden' }}
      />
      <br />
      <button onClick={onClickUpload}>アップロード</button>
      {message !== null && <p>{message}</p>}
    </div>
  )
}
