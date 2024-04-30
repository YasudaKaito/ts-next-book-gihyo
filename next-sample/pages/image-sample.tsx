import { NextPage } from 'next'
import Image from 'next/image'
import SuzumeImage from '../public/images/suzume.jpg'

const ImageSample: NextPage<void> = (props) => {
  return (
    <div>
      <p>imgタグで表示した場合</p>
      <img src="/images/suzume.jpg" alt="suzume" />
      <p>Imageコンポーネントで表示した場合</p>
      <Image src={SuzumeImage} alt="suzume" />
      <p>Imageで表示した場合は事前に描画エリアが確保</p>
    </div>
  )
}

export default ImageSample
