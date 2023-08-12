import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function MergeSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const merge = async (left: number[], right: number[]): Promise<number[]> => {
      let i = 0
      let j = 0
      const result: number[] = []
      while (i < left.length && j < right.length) {
        if (setting.stopping) return result.concat(left.slice(i)).concat(right.slice(j)) // 中断用
        if (left[i] < right[j]) {
          result.push(left[i])
          i++
        } else {
          result.push(right[j])
          j++
        }
        await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
        setSticks([...result])
      }
      return result.concat(left.slice(i)).concat(right.slice(j))
    }
    const mergeSort = async (array: number[]): Promise<number[]> => {
      if (array.length <= 1) {
        return array
      }
      const middle = Math.floor(array.length / 2)
      const left = array.slice(0, middle)
      const right = array.slice(middle)
      return await merge(await mergeSort(left), await mergeSort(right))
    }
    setSticks([...await mergeSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Merge Sort'
        sort={sort}
        content={{
          summary: [
            'マージソートは、並びを2等分しながら、分割された部分同士を併合（マージ）することによって、全体を整列させるアルゴリズムです。'
          ],
          computationalComplexity: 'O(n log n)',
          features: [
            'アルゴリズムが少し複雑。',
            '再帰関数を使用する。',
            '非常に高速。'
          ]
        }}
      />
    </>
  )
}
