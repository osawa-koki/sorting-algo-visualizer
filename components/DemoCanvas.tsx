import React, { useEffect, useState } from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'
import { BsFillBookFill } from 'react-icons/bs'
import setting from '../setting'
import StickProperty from './StickProperty'
import DescriptionModal from './DescriptionModal'

interface Props {
  title: string
  sort: (sticks: number[], setSticks: (sticks: number[]) => void) => Promise<void>
  content: Description
  implemented?: boolean
  activeCondition?: ActiveCondition
}

export default function DemoCanvas (
  props: Props
): React.JSX.Element {
  const {
    title,
    sort,
    content,
    implemented = true,
    activeCondition
  } = props

  const [sorting, setSorting] = useState<boolean>(false)

  const [stickCount, setStickCount] = useState<number>(setting.stickCount)
  const [sticks, setSticks] = useState<number[]>()
  const [waitingTime, setWaitingTime] = useState<number>(setting.intervalTime)

  const [descriptionModalIsOpen, setDescriptionModalIsOpen] = useState<boolean>(false)

  const { active, disabledReason } =
  activeCondition?.({ stickCount: setting.stickCount }) ??
  { active: true, disabledReason: null }

  useEffect(() => {
    const sticks: number[] = []
    for (let i = 1; i <= stickCount; i++) {
      sticks.push(i)
    }
    setSticks(sticks)
  }, [stickCount])

  const shuffle = (): void => {
    if (sticks == null) {
      return
    }
    const _sticks = [...sticks]
    setSticks(_sticks.sort(() => Math.random() - 0.5))
  }

  const startSorting = async (): Promise<void> => {
    if (sticks == null) return
    if (sorting) return
    setSorting(true)
    await sort(sticks, setSticks)
    putSortingState(false)
  }

  const putSortingState = (sorting: boolean): void => {
    // 以下の2つの処理は必ずセットで行う！
    setSorting(sorting)
    setting.stopping = sorting
  }

  if (sticks == null) {
    return <Spinner />
  }

  if (!implemented) {
    return (
      <>
        <h1>{title}</h1>
        <Alert variant='danger' className='mt-3'>
          このアルゴリズムは実装されていません。
        </Alert>
      </>
    )
  }

  return (
    <>
      <h1 className='d-flex justify-content-between align-items-center'>
        {title}
        <div>
          <BsFillBookFill
            type='button'
            id='DescriptionButton'
            className='text-primary'
            style={{ transition: 'transform 0.3s ease 0s', transform: descriptionModalIsOpen ? 'rotate(390deg)' : '' }}
            onClick={() => { setDescriptionModalIsOpen(true) }}
          />
        </div>
      </h1>
      <div id='DemoCanvas'>
        {
          sticks.map((stick, index) => {
            return <div key={index} className="Stick" style={{ height: `calc(100% / ${stickCount} * ${stick})`, backgroundColor: `hsl(${(stick * 360 / stickCount).toString()}deg, 100%, 50%)`, width: `calc(100% / ${stickCount})` }}></div>
          })
        }
      </div>
      <div className='mt-5 d-flex'>
        <Button
          variant='outline-warning'
          className='me-3'
          onClick={shuffle}
          disabled={sorting}
        >
          Shuffle
        </Button>
        <Button
          variant='outline-primary'
          className='me-3'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => { await startSorting() } }
          disabled={sorting || !active}
        >
          Sort
        </Button>
        {
          sorting &&
          <Button
            variant='outline-danger'
            className='me-3'
            onClick={() => { putSortingState(true) }}
          >
            Stop
          </Button>
        }
      </div>
      {!active && (
        <Alert variant='danger' className='mt-3'>
          {disabledReason}
        </Alert>
      )}
      <StickProperty
        stickCount={stickCount}
        setStickCount={setStickCount}
        intervalTime={waitingTime}
        setIntervalTime={setWaitingTime}
      />
      <DescriptionModal
        title={title}
        isOpen={descriptionModalIsOpen}
        setIsOpen={setDescriptionModalIsOpen}
        content={content}
      />
    </>
  )
}
