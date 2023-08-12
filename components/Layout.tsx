import React, { useState, type ReactNode, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

import setting from '../setting'
import Menu from './Menu'

const HomeLink = (props: {
  setCurrentPage: React.Dispatch<React.SetStateAction<string | null>>
}): JSX.Element => {
  return (
    <>
      <hr className='my-5' />
      <Link href='/'>
        <Button size='sm' variant='light' onClick={() => { props.setCurrentPage('/') }}>Home</Button>
      </Link>
    </>
  )
}

interface Props {
  children?: ReactNode
  title?: string
  menu?: boolean
  footer?: boolean
}

const Layout = ({
  children,
  title = setting.title,
  menu = true,
  footer = true
}: Props): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<string | null>(null)

  useEffect(() => {
    const path = window.location.pathname.replace(setting.basePath, '')
    setCurrentPage(path)
  }, [])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='shortcut icon'
          href={`${setting.basePath}favicon.ico`}
          type='image/x-icon'
        />
      </Head>
      <div id='Wrapper'>
        {menu
          ? (
          <>
            <main>
              {children}
              <HomeLink setCurrentPage={setCurrentPage} />
            </main>
            <Menu currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </>
            )
          : (
              <>
                {children}
                <HomeLink setCurrentPage={setCurrentPage} />
              </>
            )}
      </div>
      {footer && (
        <footer>
          <a
            href='https://github.com/osawa-koki'
            target='_blank'
            rel='noreferrer'
          >
            @osawa-koki
          </a>
        </footer>
      )}
    </div>
  )
}

export default Layout
