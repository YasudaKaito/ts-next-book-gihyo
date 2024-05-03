import {
  render,
  screen,
  RenderResult,
  fireEvent,
  act
} from '@testing-library/react'
import { DelayInput } from './index'

describe('DelayInput', () => {
  let renderResult: RenderResult
  let handleChange: jest.Mock

  beforeEach(() => {
    jest.useFakeTimers()
    handleChange = jest.fn()
    renderResult = render(<DelayInput onChange={handleChange} />)
  })

  afterEach(() => {
    renderResult.unmount()
    // テスト中に使用したjestのタイマーをリセット
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should display empty in span on initial render', () => {
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
    expect(spanNode).toHaveTextContent('入力したテキスト')
  })

  it('should display 「入力中...」 in span after typing', () => {
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'test' } })
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
    expect(spanNode).toHaveTextContent('入力中...')
  })

  it('should display input value 1second after typing', () => {
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'test' } })

    // act内で実行することにより、タイマーのコールバック中で起きる状態変更が反映されることを保証
    act(() => {
      // タイマーにセットされたtimeoutをすべて実行
      jest.runAllTimers()
    })

    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
    expect(spanNode).toHaveTextContent('入力したテキスト test')
  })

  it('should call onChange 1second after typing', () => {
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'test' } })
    act(() => {
      jest.runAllTimers()
    })

    expect(handleChange).toHaveBeenCalled()
  })
})
