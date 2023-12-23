import React, { useMemo, useState } from 'react'
import { Alert, Button, CloseButton, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import Modal from 'react-modal'
import { FaCopy } from 'react-icons/fa'
import SyntaxHighlighter from 'react-syntax-highlighter'
import useSWR from 'swr'
import vs from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs'
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
  const [copied, setCopied] = useState(false)

  const copy = (code: string): void => {
    setCopied(true)
    void navigator.clipboard.writeText(code)
    setTimeout(() => { setCopied(false) }, setting.copyIntervalTime)
  }

  const {
    path,
    langKey
  } = useMemo(() => {
    const path = codes.find((code) => code.id === selectedCodeId)?.path
    const langKey = codes.find((code) => code.id === selectedCodeId)?.langKey
    return { path, langKey }
  }, [selectedCodeId])

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
        {((): React.JSX.Element => {
          switch (true) {
            case error != null:
              return (
                <Alert variant='danger'>
                  サンプルコードの取得に失敗しました。
                </Alert>
              )
            case selectedCodeId == null:
              return (
                <p>言語を選択してください。</p>
              )
            case code == null:
              return (
                <Spinner />
              )
            default:
              return (
                <div className='position-relative h-75'>
                  <SyntaxHighlighter language={langKey} style={vs} customStyle={{
                    fontFamily: 'consolas monospace',
                    padding: '1rem',
                    border: '1px solid gray',
                    position: 'absolute',
                    inset: 0
                  }}>
                    {code ?? '<NULL>'}
                  </SyntaxHighlighter>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: setting.overlayTriggerHide, hide: setting.overlayTriggerHide }}
                    overlay={(props) => (
                      <Tooltip {...props}>
                        {copied ? 'Copied!' : 'Copy'}
                      </Tooltip>
                    )}
                  >
                    <div>
                      <FaCopy role='button' className={`position-absolute top-0 end-0 m-1 ${copied ? 'text-secondary' : 'text-primary'}`} onClick={() => { copy(code) }} />
                    </div>
                  </OverlayTrigger>
                </div>
              )
          }
        })()}
      </Modal>
    </>
  )
}
