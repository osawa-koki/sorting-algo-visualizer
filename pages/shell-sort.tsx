import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function ShellSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const shellSort = async (array: number[]): Promise<number[]> => {
      let gap = Math.floor(array.length / 2)
      while (gap > 0) {
        for (let i = gap; i < array.length; i++) {
          let j = i
          const temp = array[i]
          while (j >= gap && array[j - gap] > temp) {
            if (setting.stopping) return array // 中断用
            array[j] = array[j - gap]
            j -= gap
            await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
            setSticks([...array])
          }
          array[j] = temp
        }
        gap = Math.floor(gap / 2)
      }
      return array
    }
    setSticks([...await shellSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Shell Sort'
        sort={sort}
        content={{
          summary: [
            'シェルソートは、シェル氏によって考案された挿入ソートの改良版の整列アルゴリズムです。',
            '',
            '1. 適当な間隔を決めて、等間隔の飛び飛びの要素で作った部分的な並びに対して挿入ソートを適用する。',
            '2. 間隔を狭めながら、間隔が1になるまで1を繰り返す。'
          ],
          computationalComplexity: 'O(n1.2)～O(n2)程度',
          features: [
            'パフォーマンスが初期状態に依存する。'
          ]
        }}
      />
    </>
  )
}
