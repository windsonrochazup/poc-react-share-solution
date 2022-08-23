import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import Receipt from '../../../public/img/receipt.jpeg'

import * as S from './styles'

const Main = () => {
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    if (!navigator.canShare) {
      setCanShare(false)
    } else {
      setCanShare(true)
    }
  }, [])
  const shareData = useCallback(async () => {
    const content = {
      title: 'MDN',
      text: 'Aprenda desenvolvimento web no MDN!',
      url: 'https://developer.mozilla.org'
    }

    try {
      if (navigator.canShare && navigator.canShare(content)) {
        await navigator.share(content)
        console.log('share via native share api')
      } else {
        console.log('share via email')
        return
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  const shareDataImage = useCallback(async () => {
    const response = await fetch(Receipt.src)

    console.log('response', response)

    const blob = await response.blob()

    console.log('blob', blob)

    const filesArray: File[] = [
      new File([blob], 'nininha.jpeg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime()
      })
    ]

    console.log('filesArray', filesArray)

    const content = {
      files: filesArray,
      title: 'Meu neném',
      text: '🐶 Nina linda 💟'
    }

    try {
      if (navigator.canShare && navigator.canShare({ files: content.files })) {
        await navigator.share(content)
        console.log('share via native share api')
      } else {
        console.log('share via email')
        return
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <S.Wrapper>
      <Image src={Receipt} />
      {!canShare ? (
        <S.Button onClick={() => shareData()}>share via email 📩</S.Button>
      ) : (
        <S.ButtonContent>
          <S.Button onClick={() => shareData()}>
            share text via native share api 📩
          </S.Button>

          <S.Button onClick={() => shareDataImage()}>
            share image via native share api 📩
          </S.Button>
        </S.ButtonContent>
      )}
    </S.Wrapper>
  )
}

export default Main
