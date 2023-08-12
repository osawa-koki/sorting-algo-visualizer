import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

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
      <div className='d-flex'>
        <Button
          variant='warning'
          className='me-3'
          onClick={shuffle}
        >
          Shuffle
        </Button>
        <Button
          variant='primary'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => { await sort(sticks, setSticks) } }
        >
          Sort
        </Button>
      </div>
    </>
  )
}
