import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function GnomeSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const gnomeSort = async (array: number[]): Promise<number[]> => {
      let i = 1
      while (i < array.length) {
        if (setting.stopping) return array // 中断用
        if (i === 0 || array[i - 1] <= array[i]) {
          i++
        } else {
          [array[i], array[i - 1]] = [array[i - 1], array[i]]
          i--
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...array])
        }
      }
      return array
    }
    setSticks([...await gnomeSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Gnome Sort'
        sort={sort}
        content={{
          summary: [
            'ノームソートはソートアルゴリズムの一種で、挿入ソートに似ているが、要素の移動は挿入ではなくバブルソートのような一連の交換で行う。',
            'その名称の由来は、オランダのノームが一列に並んだ鉢植えの花をソートする話である。'
          ],
          computationalComplexity: 'O(n2)',
          features: [
            'アルゴリズムがシンプル。',
            '一階層のループので実装できる。',
            'パフォーマンスが不安定。'
          ]
        }}
      />
    </>
  )
}
