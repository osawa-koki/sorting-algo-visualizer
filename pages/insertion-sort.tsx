import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function InsertionSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const len = sticks.length
    for (let i = 1; i < len; i++) {
      const key = sticks[i]
      let j = i - 1
      while (j >= 0 && sticks[j] > key) {
        if (setting.stopping) break
        sticks[j + 1] = sticks[j]
        j--
        setSticks([...sticks])
        await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
      }
      if (setting.stopping) break
      sticks[j + 1] = key
      setSticks([...sticks])
      await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
    }
  }

  return (
    <>
      <DemoCanvas
        title='Insertion Sort'
        sort={sort}
        content={{
          summary: [
            '挿入ソートは、前の方の整列済みの並びの途中へ、直後の要素を挿入する整列アルゴリズムで、基本挿入法ともいいます。'
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
