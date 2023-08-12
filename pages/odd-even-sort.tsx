import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function OddEvenSortSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const oddEvenSort = async (array: number[]): Promise<number[]> => {
      let sorted = false
      while (!sorted) {
        sorted = true
        for (let i = 1; i < array.length - 1; i += 2) {
          if (setting.stopping) return array // 中断用
          if (array[i] > array[i + 1]) {
            [array[i], array[i + 1]] = [array[i + 1], array[i]]
            sorted = false
            await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
            setSticks([...array])
          }
        }
        for (let i = 0; i < array.length - 1; i += 2) {
          if (setting.stopping) return array // 中断用
          if (array[i] > array[i + 1]) {
            [array[i], array[i + 1]] = [array[i + 1], array[i]]
            sorted = false
            await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
            setSticks([...array])
          }
        }
      }
      return array
    }
    setSticks([...await oddEvenSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Odd Even Sort'
        sort={sort}
        content={{
          summary: [
            '奇偶転置ソートは、ソートのアルゴリズムの一つで、バブルソートを改良したもの。',
            'バブルソートではスキャンを一方向に順次行うのに対し、奇偶転置ソートでは組ごとに行う。',
            '',
            'バブルソートと同じく安定な内部ソートで、最悪の場合で時間計算量はO(n2)である。',
            '',
            '組の比較は互いに独立であるため、バブルソートとは異なり、並列動作が可能である。',
            'そのため、ハードウェアで隣り合う組の比較を同時に処理すれば、常に (n-1) ステップで処理が完了する。',
            'ただし、ソートの対象が多いと必要とするリソースが大きくなり、実用的ではない。'
          ],
          computationalComplexity: 'O(n2)',
          features: [
            '並列化による高速化が容易。',
            'アルゴリズムが複雑。',
            'パフォーマンスが不安定。'
          ]
        }}
      />
    </>
  )
}
