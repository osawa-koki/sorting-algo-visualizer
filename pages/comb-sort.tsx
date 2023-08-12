import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function CombSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const combSort = async (array: number[]): Promise<number[]> => {
      let gap = array.length
      const shrink = 1.3
      let swapped = true
      while (gap > 1 || swapped) {
        if (gap > 1) {
          gap = Math.floor(gap / shrink)
        }
        let i = 0
        swapped = false
        while (i + gap < array.length) {
          if (setting.stopping) return array // 中断用
          if (array[i] > array[i + gap]) {
            [array[i], array[i + gap]] = [array[i + gap], array[i]]
            swapped = true
            await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
            setSticks([...array])
          }
          i++
        }
      }
      return array
    }
    setSticks([...await combSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Comb Sort'
        sort={sort}
        content={{
          summary: [
            '挿入ソートをシェルソートに改良したときと同様の改良を施す。',
            '適当な間隔で整列後、間隔を少しずつ狭めて整列していく。'
          ],
          computationalComplexity: 'O(n*log(n))',
          features: [
            'メモリの使用率が低い。',
            'パフォーマンスに安定性がない。'
          ]
        }}
      />
    </>
  )
}
