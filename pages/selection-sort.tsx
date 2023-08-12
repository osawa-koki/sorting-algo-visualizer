import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function SelectionSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    for (let i = 0; i < sticks.length - 1; i++) {
      if (setting.stopping) return // 中断用
      let min = i
      for (let j = i + 1; j < sticks.length; j++) {
        await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
        if (sticks[j] < sticks[min]) {
          min = j
        }
      }
      if (min !== i) {
        [sticks[i], sticks[min]] = [sticks[min], sticks[i]]
        setSticks([...sticks])
      }
    }
  }

  return (
    <>
      <DemoCanvas
        title='Selection Sort'
        sort={sort}
        content={{
          summary: [
            '選択ソートは、最小値の要素を選択して、先頭の要素と置き換える整列アルゴリズムで、基本選択法ともいいます。'
          ],
          computationalComplexity: 'O(n^2)',
          features: [
            'アルゴリズムがシンプル。',
            '計算量が大きい。'
          ]
        }}
      />
    </>
  )
}
