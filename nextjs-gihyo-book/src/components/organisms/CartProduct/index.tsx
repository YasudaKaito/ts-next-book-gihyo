import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import Button from 'components/atoms/Button'
import Text from 'components/atoms/Text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import type { Product } from 'types'

const RemoveText = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

interface CardProductProps
  extends Pick<Product, 'id' | 'imageUrl' | 'title' | 'price'> {
  onBuyButtonClick?: (id: number) => void
  onRemoveButtonClick?: (id: number) => void
}

const CardProduct = ({
  id,
  imageUrl,
  title,
  price,
  onBuyButtonClick,
  onRemoveButtonClick,
}: CardProductProps) => {
  return (
    <Flex justifyContent="space-between">
      <Flex>
        <Box width="120px" height="120px">
          <Link href={`/products/${id}`} passHref legacyBehavior>
            <a>
              <Image
                quality="85"
                src={imageUrl}
                alt={title}
                width={120}
                height={120}
                objectFit="cover"
              />
            </a>
          </Link>
        </Box>
        <Box padding={1}>
          <Flex
            height="100%"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Text
                fontWeight="bold"
                variant="mediumLarge"
                marginTop={0}
                marginBottom={1}
                as="p"
              >
                {title}
              </Text>
              <Text margin={0} as="p">
                {price}円
              </Text>
            </Box>
            <Flex marginTop={{ base: 2, md: 0 }}>
              {/* 購入ボタン */}
              <Button
                width={{ base: '100px', md: '200px' }}
                onClick={() => onBuyButtonClick && onBuyButtonClick(id)}
              >
                購入
              </Button>
              {/* 削除ボタン モバイルのみ */}
              <Button
                marginLeft={1}
                width={{ base: '100px', md: '200px' }}
                display={{ base: 'block', md: 'none' }}
                variant="danger"
                onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
              >
                削除
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {/* 削除ボタン デスクトップのみ */}
      <Box display={{ base: 'none', md: 'block' }}>
        <RemoveText
          color="danger"
          onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}
        >
          カートから削除
        </RemoveText>
      </Box>
    </Flex>
  )
}

export default CardProduct
