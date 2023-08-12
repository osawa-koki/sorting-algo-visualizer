import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function StoogeSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    const stoogeSort = async (array: number[], i = 0, j = array.length - 1): Promise<number[]> => {
      if (setting.stopping) return array // 中断用
      if (array[i] > array[j]) {
        [array[i], array[j]] = [array[j], array[i]]
        await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
        setSticks([...array])
      }
      if (j - i + 1 > 2) {
        const t = Math.floor((j - i + 1) / 3)
        await stoogeSort(array, i, j - t)
        await stoogeSort(array, i + t, j)
        await stoogeSort(array, i, j - t)
      }
      return array
    }
    setSticks([...await stoogeSort(sticks)])
  }

  return (
    <>
      <DemoCanvas
        title='Stooge Sort'
        sort={sort}
        content={{
          summary: [
            'ストゥージソートは、再帰を用いたソートアルゴリズムのひとつである。',
            '計算時間はO(nlog 3 / log 1.5 ) = O(n2.7095...)であり、これはマージソートなどの効率的なアルゴリズムよりも、それどころか非常に効率の悪い単純なソートの例としてよく挙げられるバブルソートよりも遅い。',
            '',
            '1. もし末尾の値が先頭の値より小さければ、それらを入れ替える。',
            '2. 現在処理している部分列の要素数が3以上であれば、',
            '    リストの先頭2/3[1]に対してストゥージソートを行う。',
            '    リストの末尾2/3[1]に対してストゥージソートを行う。',
            '    リストの先頭2/3[1]に対して再びストゥージソートを行う。',
            '3. そうでなければ終了。'
          ],
          computationalComplexity: 'O(n2.7095...)',
          features: [
            '計算量が多い。',
            'アルゴリズムが非常に複雑。'
          ]
        }}
      />
    </>
  )
}
