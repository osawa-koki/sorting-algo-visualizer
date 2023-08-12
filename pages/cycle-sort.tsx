import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function CycleSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const cycleSort = async (array: number[]): Promise<number[]> => {
      for (let cycleStart = 0; cycleStart < array.length - 1; cycleStart++) {
        let item = array[cycleStart]
        let pos = cycleStart
        for (let i = cycleStart + 1; i < array.length; i++) {
          if (array[i] < item) {
            pos++
          }
        }
        if (pos === cycleStart) {
          continue
        }
        while (item === array[pos]) {
          pos++
        }
        [array[pos], item] = [item, array[pos]]
        await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
        setSticks([...array])
        while (pos !== cycleStart) {
          pos = cycleStart
          for (let i = cycleStart + 1; i < array.length; i++) {
            if (setting.stopping) return array // 中断用
            if (array[i] < item) {
              pos++
            }
          }
          while (item === array[pos]) {
            pos++
          }
          [array[pos], item] = [item, array[pos]]
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...array])
        }
      }
      return array
    }
    setSticks([...await cycleSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Cycle Sort'
        sort={sort}
        content={{
          summary: [
            'サイクルソートは、インプレースで不安定な ソートアルゴリズムであり、他のインプレースソートアルゴリズムとは異なり、元の配列への書き込みの総数に関して理論的に最適な比較ソートです。',
            'これは、並べ替えられる順列は、並べ替えられた結果を得るために個別に回転できる cycleに因数分解できるという考えに基づいています。'
          ],
          computationalComplexity: 'O(n2)',
          features: [
            'メモリ書き込み回数が少ない。',
            'パフォーマンスが不安定。'
          ]
        }}
      />
    </>
  )
}
