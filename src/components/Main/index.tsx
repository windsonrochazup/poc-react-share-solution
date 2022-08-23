import Image from 'next/image'
import { useCallback } from 'react'

import Receipt from '../../../public/img/receipt.jpg'

import * as S from './styles'

const Main = () => {
  const shareData = useCallback(async () => {
    const blob = await (await fetch(Receipt.src)).blob()

    const filesArray: File[] = [
      new File([blob], 'receipt.jpg', {
        type: blob.type,
        lastModified: new Date().getTime()
      })
    ]

    console.log('filesArray', filesArray)

    const content = {
      files: filesArray,
      title: 'Comprovante',
      text: 'comprovante da transação'
    }

    try {
      await navigator.share(content)
      console.log('share via native share api')
    } catch (err: any) {
      console.error('navigator share api not supported')
      try {
        console.log('trying share via email')
      } catch (error: any) {
        console.error('failed share via email')
        throw new Error(error?.message)
      }
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <S.Wrapper>
      <Image src={Receipt} />
      <S.Button onClick={() => shareData()}>📩 share</S.Button>
    </S.Wrapper>
  )
}

export default Main
