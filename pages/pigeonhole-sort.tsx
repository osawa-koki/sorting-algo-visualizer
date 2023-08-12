import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function PigeonholeSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const pigeonholeSort = async (array: number[]): Promise<number[]> => {
      const min = Math.min(...array)
      const max = Math.max(...array)
      const size = max - min + 1
      const holes = Array(size).fill(0)
      for (let i = 0; i < array.length; i++) {
        holes[array[i] - min]++
      }
      let i = 0
      for (let count = 0; count < size; count++) {
        while (holes[count]-- > 0) {
          if (setting.stopping) return array // 中断用
          array[i++] = count + min
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...array])
        }
      }
      return array
    }
    setSticks([...await pigeonholeSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Pigeonhole Sort'
        sort={sort}
        content={{
          summary: [
            '鳩の巣ソートはソートアルゴリズムの一種であり、要素数(n)とソートキーの値の個数(N)がほぼ同じ場合に適した手法である。'
          ],
          computationalComplexity: 'O(n + N)',
          features: [
            '用途が特殊。',
            'アルゴリズムが複雑。',
            'パフォーマンスが安定。'
          ]
        }}
      />
    </>
  )
}
