import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function QuickSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const quickSort = async (array: number[], left: number, right: number): Promise<number[]> => {
      if (setting.stopping) return array // 中断用
      let index: number
      if (array.length > 1) {
        index = await partition(array, left, right)
        if (left < index - 1) {
          await quickSort(array, left, index - 1)
        }
        if (index < right) {
          await quickSort(array, index, right)
        }
      }
      return array
    }
    const partition = async (array: number[], left: number, right: number): Promise<number> => {
      const pivot = array[Math.floor((right + left) / 2)]
      let i = left
      let j = right
      while (i <= j) {
        while (array[i] < pivot) {
          i++
        }
        while (array[j] > pivot) {
          j--
        }
        if (i <= j) {
          [array[i], array[j]] = [array[j], array[i]]
          i++
          j--
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...array])
        }
      }
      return i
    }
    setSticks([...await quickSort(sticks, 0, sticks.length - 1)])
  }

  return (
    <>
      <DemoCanvas
        title='Quick Sort'
        sort={sort}
        content={{
          summary: [
            'クイックソートはその名の通り、特に高速な整列アルゴリズムです。',
            '1. 適当な基準値を定めて、その値より小さい要素を前の方に移し、その値以上の要素を後の方へ移す。',
            '2. 分割したそれぞれのグループへ、1の処理を反復して、全てのグループに属する要素数が1になるまで繰り返す。'
          ],
          computationalComplexity: 'O(n^2)',
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
