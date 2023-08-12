import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function CocktailSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const cocktailSort = async (array: number[]): Promise<number[]> => {
      let swapped = true
      let start = 0
      let end = array.length
      while (swapped) {
        swapped = false
        for (let i = start; i < end - 1; ++i) {
          if (setting.stopping) return array // 中断用
          if (array[i] > array[i + 1]) {
            [array[i], array[i + 1]] = [array[i + 1], array[i]]
            swapped = true
            await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
            setSticks([...array])
          }
        }
        if (!swapped) {
          break
        }
        swapped = false
        end--
        for (let i = end - 1; i >= start; i--) {
          if (setting.stopping) return array // 中断用
          if (array[i] > array[i + 1]) {
            [array[i], array[i + 1]] = [array[i + 1], array[i]]
            swapped = true
            await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
            setSticks([...array])
          }
        }
        start++
      }
      return array
    }
    setSticks([...await cocktailSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Cocktail Sort'
        sort={sort}
        content={{
          summary: [
            'カクテルソート(シェーカーソート)は、ソートのアルゴリズムの一つ。',
            'バブルソートを、効率がよくなるように改良したもの。',
            '',
            'バブルソートではスキャンを一方向にしか行わないのに対し、シェーカーソートでは交互に二方向に行う。',
            'バブルソートと同じく安定な内部ソートで、最悪の場合の時間計算量はO(n2)である。'
          ],
          computationalComplexity: 'O(n2)',
          features: [
            'パフォーマンスが不安定。',
            'アルゴリズムが複雑。'
          ]
        }}
      />
    </>
  )
}
