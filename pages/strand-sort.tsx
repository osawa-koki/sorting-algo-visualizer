import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function StrandSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const strandSort = async (array: number[]): Promise<number[]> => {
      const sorted: number[] = []
      while (array.length > 0) {
        let min = array[0]
        let minIndex = 0
        for (let i = 1; i < array.length; i++) {
          if (setting.stopping) return sorted.concat(array) // 中断用
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          if (array[i] < min) {
            min = array[i]
            minIndex = i
          }
        }
        sorted.push(min)
        array.splice(minIndex, 1)
        setSticks([...sorted])
      }
      return sorted
    }
    setSticks([...await strandSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Strand Sort'
        sort={sort}
        content={{
          summary: [
            'ストランドソートは、リストの項目を昇順に並べ替える再帰的な並べ替えアルゴリズムです。',
            '入力リストが逆ソートされたときに発生する最悪の時間複雑度はO(n^2)です。',
            '',
            '入力が既にソートされているリストである場合に発生するO(n)の最良のケースの時間計算量があります。'
          ],
          computationalComplexity: 'O(n^2)',
          features: [
            'パフォーマンスが不安定。',
            'アルゴリズムが複雑。'
          ]
        }}
      />
    </>
  )
}
