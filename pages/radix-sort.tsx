import React from 'react'
import DemoCanvas from '../components/DemoCanvas'

export default function RadixSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    // 実装中、、、
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
        implemented={false}
      />
    </>
  )
}
