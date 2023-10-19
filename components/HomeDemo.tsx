import React, { useEffect, useState } from 'react'
import { HomeCharComponent } from '../src/styles/HomeCharComponent'

export default function HomeDemo (): JSX.Element {
  // 文字と背景色をカラフルに設定する。
  // sorting-algo-visualizerの文字をカラフルにする。
  const [homeDemoChars, setHomeDemoChars] = useState<HomeDemoChars>([
    {
      // 赤: 青
      char: <HomeCharComponent color={[255, 0, 0]} background_color={[0, 0, 255]}>S</HomeCharComponent>,
      position: 0
    },
    {
      // 青: 緑
      char: <HomeCharComponent color={[0, 0, 255]} background_color={[0, 255, 0]}>o</HomeCharComponent>,
      position: 1
    },
    {
      // 緑: 赤
      char: <HomeCharComponent color={[0, 255, 0]} background_color={[255, 0, 0]}>r</HomeCharComponent>,
      position: 2
    },
    {
      // 紫: 黄
      char: <HomeCharComponent color={[255, 0, 255]} background_color={[255, 255, 0]}>t</HomeCharComponent>,
      position: 3
    },
    {
      // オレンジ: 紫
      char: <HomeCharComponent color={[255, 165, 0]} background_color={[255, 0, 255]}>i</HomeCharComponent>,
      position: 4
    },
    {
      // 黒: 水色
      char: <HomeCharComponent color={[0, 0, 0]} background_color={[0, 255, 255]}>n</HomeCharComponent>,
      position: 5
    },
    {
      // 水色: オレンジ
      char: <HomeCharComponent color={[0, 255, 255]} background_color={[255, 165, 0]}>g</HomeCharComponent>,
      position: 6
    }
  ])

  useEffect(() => {
    if (typeof window !== 'undefined') return
    const interval = setInterval(() => {
      setHomeDemoChars((prevHomeDemoChars) => {
        const newHomeDemoChars = [...prevHomeDemoChars]
        for (let i = 0; i < newHomeDemoChars.length; i++) {
          if (newHomeDemoChars[i].position !== i) {
            const tmp = newHomeDemoChars[i]
            newHomeDemoChars[i] = newHomeDemoChars[i + 1]
            newHomeDemoChars[i + 1] = tmp
          }
        }
        return newHomeDemoChars
      })
    }, 100)
    return () => { clearInterval(interval) }
  }, [])

  return (
    <>
      <div className='my-5 d-flex'>
        {homeDemoChars.map((homeDemoChar) => {
          if (homeDemoChar == null) return <></>
          return (
            <div key={homeDemoChar.position}>
              {homeDemoChar.char}
            </div>
          )
        })}
      </div>
    </>
  )
}
