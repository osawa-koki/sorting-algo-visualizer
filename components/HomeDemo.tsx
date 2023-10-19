import React, { useEffect, useState } from 'react'
import { HomeCharComponent } from '../src/styles/HomeCharComponent'
import { Alert } from 'react-bootstrap'

export default function HomeDemo (): JSX.Element {
  const [homeDemoChars, setHomeDemoChars] = useState<HomeDemoChars>([
    {
      char: <HomeCharComponent color={[255, 0, 0]} background_color={[0, 0, 255]}>S</HomeCharComponent>,
      position: 0
    },
    {
      char: <HomeCharComponent color={[0, 0, 255]} background_color={[0, 255, 0]}>o</HomeCharComponent>,
      position: 1
    },
    {
      char: <HomeCharComponent color={[0, 255, 0]} background_color={[255, 0, 0]}>r</HomeCharComponent>,
      position: 2
    },
    {
      char: <HomeCharComponent color={[255, 0, 255]} background_color={[255, 255, 0]}>t</HomeCharComponent>,
      position: 3
    },
    {
      char: <HomeCharComponent color={[255, 165, 0]} background_color={[255, 0, 255]}>i</HomeCharComponent>,
      position: 4
    },
    {
      char: <HomeCharComponent color={[0, 0, 0]} background_color={[0, 255, 255]}>n</HomeCharComponent>,
      position: 5
    },
    {
      char: <HomeCharComponent color={[0, 255, 255]} background_color={[255, 165, 0]}>g</HomeCharComponent>,
      position: 6
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const randaomNumber = Math.floor(Math.random() * (homeDemoChars.length - 1))
      const newHomeDemoChars = [...homeDemoChars]
      const tmp = newHomeDemoChars[randaomNumber]
      newHomeDemoChars[randaomNumber] = newHomeDemoChars[randaomNumber + 1]
      newHomeDemoChars[randaomNumber + 1] = tmp
      setHomeDemoChars(newHomeDemoChars)
    }, 1000)
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
      <Alert variant='info' className='w-100 text-center'>💦💦💦 整列アルゴリズムを可視化する！ 💦💦💦</Alert>
    </>
  )
}
