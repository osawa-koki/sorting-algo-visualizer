import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function InsertionSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    for (let i = 1; i < sticks.length; i++) {
      const v = sticks[i]
      let j = i - 1
      while (j >= 0 && sticks[j] > v) {
        if (setting.stopping) return // 中断用
        sticks[j + 1] = sticks[j]
        j--
        await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
        setSticks([...sticks])
      }
      sticks[j + 1] = v
    }
  }

  return (
    <>
      <DemoCanvas
        title='Selection Sort'
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
