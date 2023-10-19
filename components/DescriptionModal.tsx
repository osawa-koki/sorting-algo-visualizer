import React from 'react'
import { CloseButton } from 'react-bootstrap'
import Modal from 'react-modal'

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
  content: Description
}

export default function DescriptionModal (props: Props): React.JSX.Element {
  const { title, isOpen, setIsOpen, content } = props

  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={() => { }}
        onRequestClose={() => { setIsOpen(false) }}
        style={customStyles}
        contentLabel="説明モーダル"
      >
        <CloseButton
          className='top-0 end-0 position-absolute'
          onClick={() => { setIsOpen(false) }}
        />
        <h2 className='mt-3'>{title}</h2>
        <p className='mt-3'>
          {
            content.summary.map((text, index) => (
              <span key={index}>{text}<br /></span>
            ))
          }
          {
            content.computationalComplexity != null && (
              <>
                <hr />
                <h2 className='mt-3'>計算量</h2>
                <p className='mt-3'>{content.computationalComplexity}</p>
              </>
            )
          }
          {
            content.features != null && content.features.length > 0 && (
              <>
                <hr />
                <h2 className='mt-3'>特徴</h2>
                <ul className='mt-3'>
                  {
                    content.features.map((text, index) => (
                      <li key={index}>{text}</li>
                    ))
                  }
                </ul>
              </>
            )
          }
        </p>
      </Modal>
    </>
  )
}
