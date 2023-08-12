import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function HeapSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const heapSort = async (array: number[]): Promise<number[]> => {
      let size = array.length
      buildMaxHeap(array)
      while (size > 1) {
        if (setting.stopping) return array // 中断用
        size--;
        [array[0], array[size]] = [array[size], array[0]]
        await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
        setSticks([...array])
        heapify(array, size, 0)
      }
      return array
    }
    const buildMaxHeap = (array: number[]): void => {
      const size = array.length
      const middle = Math.floor(size / 2)
      for (let i = middle; i >= 0; i--) {
        heapify(array, size, i)
      }
    }
    const heapify = (array: number[], size: number, i: number): void => {
      const left = 2 * i + 1
      const right = 2 * i + 2
      let largest = i
      if (left < size && array[left] > array[largest]) {
        largest = left
      }
      if (right < size && array[right] > array[largest]) {
        largest = right
      }
      if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]]
        heapify(array, size, largest)
      }
    }
    setSticks([...await heapSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Heap Sort'
        sort={sort}
        content={{
          summary: [
            'ヒープソートは、ヒープを経由する整列アルゴリズムです。',
            'ヒープは「小さい山」という意味の言葉であり、親の値が必ず子の値以上であることを保つ二分木です。',
            '1. 要素の並びを元にして、ヒープを構築します。子の処理には、木構造アルゴリズムの一種である、ヒープ構築アルゴリズムを用います。',
            '',
            '2. 根に当たる要素を取り出して、並びの端へ移します。',
            '3. ヒープに残った要素に対して、ヒープ再構築アルゴリズムを適用します。',
            '4. 2と3をヒープの要素がなくなるまで繰り返します。'
          ],
          computationalComplexity: 'O(n log n)',
          features: [
            'アルゴリズムが少し複雑。',
            'ヒープ木の理解が必要。',
            '非常に高速。'
          ]
        }}
      />
    </>
  )
}
