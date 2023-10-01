import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function RadixSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const digit = Math.max(...sticks).toString().length
    for (let i = 0; i < digit; i++) {
      const bucket: number[][] = Array.from(Array(10), () => [])
      for (let j = 0; j < sticks.length; j++) {
        if (setting.stopping) return // 中断用
        const num = Math.floor(sticks[j] / Math.pow(10, i)) % 10
        bucket[num].push(sticks[j])
      }
      let index = 0
      for (let j = 0; j < bucket.length; j++) {
        for (let k = 0; k < bucket[j].length; k++) {
          if (setting.stopping) return // 中断用
          sticks[index++] = bucket[j][k]
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...sticks])
        }
      }
    }
  }

  return (
    <>
      <DemoCanvas
        title='Radix Sort'
        sort={sort}
        content={{
          summary: [
            '基数ソートは、各桁の値を比較して整列する整列アルゴリズムです。'
          ],
          computationalComplexity: 'O(kn)',
          features: [
            '珍しい整列アルゴリズム。',
            'パフォーマンスに安定性がない。'
          ]
        }}
      />
    </>
  )
}
