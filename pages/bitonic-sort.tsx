import React from 'react'
import DemoCanvas from '../components/DemoCanvas'

export default function BitonicSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    // 実装中、、、
  }

  return (
    <>
      <DemoCanvas
        title='Bitonic Sort'
        sort={sort}
        content={{
          summary: [
            'バイトニック列を生成しながら並べ替えを実行する。',
            'このバイトニック列は、単調非増加の後に単調非減少となるかその逆である列のことである。'
          ],
          computationalComplexity: 'O(nlog2n)',
          features: [
            '並列化が可能。',
            'アルゴリズムが非常に複雑。'
          ]
        }}
        implemented={false}
      />
    </>
  )
}
