import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function BubbleSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    for (let i = 0; i < sticks.length - 1; i++) {
      for (let j = sticks.length - 1; i < j; j--) {
        if (setting.stopping) return // 中断用
        if (sticks[j] < sticks[j - 1]) {
          [sticks[j], sticks[j - 1]] = [sticks[j - 1], sticks[j]]
          await new Promise(resolve => setTimeout(resolve, setting.waitingTime))
          setSticks([...sticks])
        }
      }
    }
  }

  return (
    <>
      <DemoCanvas
        title='Bubble Sort'
        sort={sort}
        content={
          <>
          </>
        }
      />
    </>
  )
}
