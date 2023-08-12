import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import setting from '../setting'

interface Props {
  title: string
  sort: (sticks: number[], setSticks: (sticks: number[]) => void) => Promise<void>
}

export default function DemoCanvas (
  props: Props
): React.JSX.Element {
  const {
    title,
    sort
  } = props

  const [sorting, setSorting] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stickCount, setStickCount] = useState<number>(100)
  const [sticks, setSticks] = useState<number[]>()

  useEffect(() => {
    const sticks: number[] = []
    for (let i = 0; i < stickCount; i++) {
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
    setting.stopping = false
    setSorting(false)
  }

  if (sticks == null) {
    return <Spinner />
  }

  return (
    <>
      <h1>{title}</h1>
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
          disabled={sorting}
        >
          Sort
        </Button>
        {
          sorting &&
          <Button
            variant='outline-danger'
            className='me-3'
            onClick={() => { setting.stopping = true; setSorting(false) }}
          >
            Stop
          </Button>
        }
      </div>
    </>
  )
}
