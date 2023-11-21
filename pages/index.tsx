import React from 'react'
import setting from '../setting'
import HomeDemo from '../components/HomeDemo'
import Image from 'next/image'

export default function Home (): JSX.Element {
  return (
    <>
      <div id='Index' className='d-flex flex-column align-items-center'>
        <h1>{setting.title}</h1>
        <Image id='Logo' className='mt-3 mw-100 border rounded-circle' width={100} height={100} src={`${setting.basePath}/tako.png`} alt='Logo' />
        <HomeDemo />
      </div>
    </>
  )
}
