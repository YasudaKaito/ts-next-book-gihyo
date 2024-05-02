import { render, screen, RenderResult, fireEvent } from '@testing-library/react'
import { Input } from './index'
import { describe } from 'node:test'

describe('Input', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(<Input id="username" label="Username" />)
  })

  afterEach(() => {
    renderResult.unmount()
  })

  // 初期描画時にinput要素が空であることを確認
  it('should empty in input on initial render', () => {
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    expect(inputNode).toHaveValue('')
  })

  // 入力文字が表示されるかテスト
  it('should show input text', () => {
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'test' } })
    expect(inputNode).toHaveValue('test')
  })

  // リセットボタンで入力がクリアされるかテスト
  it('should reset when user clicks button', () => {
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'test' } })

    const buttonNode = screen.getByRole('button', {
      name: 'リセット'
    }) as HTMLButtonElement
    fireEvent.click(buttonNode)

    expect(inputNode).toHaveValue('')
  })
})
