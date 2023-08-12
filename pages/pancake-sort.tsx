import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function PancakeSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const pancakeSort = async (array: number[]): Promise<number[]> => {
      for (let i = array.length - 1; i >= 1; i--) {
        let maxIndex = 0
        for (let j = 0; j <= i; j++) {
          if (array[j] > array[maxIndex]) {
            maxIndex = j
          }
        }
        if (maxIndex !== i) {
          await flip(array, maxIndex)
          await flip(array, i)
        }
      }
      return array
    }
    const flip = async (array: number[], k: number): Promise<void> => {
      let i = 0
      while (i < k) {
        if (setting.stopping) return; // 中断用
        [array[i], array[k]] = [array[k], array[i]]
        i++
        k--
        await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
        setSticks([...array])
      }
    }
    setSticks([...await pancakeSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Pancake Sort'
        sort={sort}
        content={{
          summary: [
            'パンケーキソート(Pancake sorting)は、ある数列を大きさ順に並べる際に先頭から何番目かまでをひっくり返す最小の手数を求める問題である。',
            '先頭から途中までを一気にひっくり返さなくてはならないのがポイント。',
            '',
            'Microsoftの創始者であるビル・ゲイツが書いた「パンケーキ論文」という学術論文で発表された。'
          ],
          computationalComplexity: '不明',
          features: [
            'アルゴリズムが非常に複雑。',
            'パフォーマンスが不安定。'
          ]
        }}
      />
    </>
  )
}
