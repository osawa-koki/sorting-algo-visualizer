import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function CountingSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const countingSort = async (array: number[]): Promise<number[]> => {
      const max = Math.max(...array)
      const min = Math.min(...array)
      const countArray = new Array(max - min + 1).fill(0)
      for (let i = 0; i < array.length; i++) {
        countArray[array[i] - min]++
      }
      let j = 0
      for (let i = min; i <= max; i++) {
        while (countArray[i - min] > 0) {
          if (setting.stopping) return array // 中断用
          array[j] = i
          countArray[i - min]--
          j++
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...array])
        }
      }
      return array
    }
    setSticks([...await countingSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Counting Sort'
        sort={sort}
        content={{
          summary: [
            '分布数え上げソートはソート対象のデータをキーにして、キーの出現回数とその累積度数分布を計算して利用することで整列を行うアルゴリズムです。'
          ],
          computationalComplexity: 'O(n)',
          features: [
            'アルゴリズムが珍しい。'
          ]
        }}
      />
    </>
  )
}
