import { useCallback, useEffect, useState } from 'react'
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
    const response = await fetch('logo.svg')

    const blob = await response.blob()

    const filesArray: File[] = [
      new File([blob], 'logo.jpg', {
        type: 'image/jpeg',
        lastModified: new Date().getTime()
      })
    ]

    const content = {
      files: filesArray
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

  return (
    <S.Wrapper>
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
