import React, { useMemo, useState } from 'react'
import { Alert, Button, CloseButton, Spinner } from 'react-bootstrap'
import Modal from 'react-modal'
import SyntaxHighlighter from 'react-syntax-highlighter'
import vs from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs'
import useSWR from 'swr'
import setting from '../setting'
import fetcher from '../src/common/fetcher'

Modal.setAppElement('#Wrapper')

const customStyles = {
  content: {
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000
  },
  overlay: {
    zIndex: 1001
  }
}

interface Props {
  title: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  codes: Codes
}

export default function CodeModal (props: Props): React.JSX.Element {
  const { title, isOpen, setIsOpen, codes } = props

  const [selectedCodeId, setSelectedCodeId] = useState<number | null>()

  const path = useMemo((): string | null => codes.find((code) => code.id === selectedCodeId)?.path ?? null, [selectedCodeId])

  const { data: code, error } = useSWR(
    path != null ? `${setting.basePath}/codes/${path}` : null,
    fetcher
  )

  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={() => { }}
        onRequestClose={() => { setIsOpen(false) }}
        style={customStyles}
        contentLabel="サンプルコードモーダル"
      >
        <CloseButton
          className='top-0 end-0 position-absolute'
          onClick={() => { setIsOpen(false) }}
        />
        <h2>{title}</h2>
        <div className='d-flex my-3'>
          {codes.map((code) => {
            return (
              <Button
                key={code.lang}
                variant={selectedCodeId === code.id ? 'primary' : 'outline-primary'}
                className='me-1'
                size='sm'
                onClick={() => { setSelectedCodeId(code.id) }}
              >
                {code.lang}
              </Button>
            )
          })}
        </div>
        {error != null
          ? (
            <Alert variant='danger'>
              サンプルコードの取得に失敗しました。
            </Alert>
            )
          : code != null
            ? (
          <SyntaxHighlighter language='typescript' style={vs} customStyle={{
            fontFamily: 'consolas monospace',
            padding: '1rem',
            border: '1px solid gray'
          }}>
            {code}
          </SyntaxHighlighter>
              )
            : selectedCodeId != null
              ? (
          <Spinner />
                )
              : (
          <p>言語を選択してください。</p>
                )}
      </Modal>
    </>
  )
}
