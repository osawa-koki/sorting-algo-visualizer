import React, { useState, type ReactNode, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

import setting from '../setting'
import Menu from './Menu'

const HomeLink = (): JSX.Element => {
  return (
    <>
      <hr className='my-5' />
      <Link href='/'>
        <Button size='sm' variant='light'>Home</Button>
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
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState<string | null>(null)

  useEffect(() => {
    const path = window.location.pathname.replace(setting.basePath, '')
    setCurrentPage(path)
  }, [router.pathname])

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
              <HomeLink />
            </main>
            <Menu currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </>
            )
          : (
              <>
                {children}
                <HomeLink />
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
