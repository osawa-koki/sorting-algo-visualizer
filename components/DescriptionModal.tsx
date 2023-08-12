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
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  content: React.JSX.Element
}

export default function DescriptionModal (props: Props): React.JSX.Element {
  const { isOpen, setIsOpen, content } = props

  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={() => { }}
        onRequestClose={() => { setIsOpen(false) }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CloseButton
          className='top-0 end-0 position-absolute'
          onClick={() => { setIsOpen(false) }}
        />
        {content}
      </Modal>
    </>
  )
}
