import { DelayInput } from '@/components/DelayInput'
import { NextPage } from 'next'

const DelayInputSample: NextPage = (props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onChange called. value: ', e.target.value)
  }
  return <DelayInput onChange={onChange} />
}

export default DelayInputSample
