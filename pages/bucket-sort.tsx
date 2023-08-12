import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function BucketSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const bucketSort = async (array: number[]): Promise<number[]> => {
      const buckets: number[][] = new Array(10).fill(0).map(() => [])
      const max = Math.max(...array)
      const min = Math.min(...array)
      const bucketSize = (max - min) / 10 + 1
      for (let i = 0; i < array.length; i++) {
        if (setting.stopping) return array // 中断用
        buckets[Math.floor((array[i] - min) / bucketSize)].push(array[i])
      }
      let j = 0
      for (let i = 0; i < buckets.length; i++) {
        await insertionSort(buckets[i])
        for (let k = 0; k < buckets[i].length; k++) {
          if (setting.stopping) return array // 中断用
          array[j] = buckets[i][k]
          j++
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...array])
        }
      }
      return array
    }
    const insertionSort = async (array: number[]): Promise<number[]> => {
      for (let i = 1; i < array.length; i++) {
        let j = i - 1
        const temp = array[i]
        while (j >= 0 && array[j] > temp) {
          if (setting.stopping) return array // 中断用
          array[j + 1] = array[j]
          j--
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...array])
        }
        array[j + 1] = temp
      }
      return array
    }
    setSticks([...await bucketSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Bucket Sort'
        sort={sort}
        content={{
          summary: [
            'バケツソートはあらかじめデータがとりうる値すべての容器(バケット)を順番どおりに並べて用意しておき、値を対応する容器に移すことでソートを行う整列アルゴリズムです。'
          ],
          computationalComplexity: 'O(m + n)',
          features: [
            'アルゴリズムが珍しい。',
            'パフォーマンスが不安定。'
          ]
        }}
      />
    </>
  )
}
