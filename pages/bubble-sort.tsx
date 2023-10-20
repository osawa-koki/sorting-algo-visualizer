import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function BubbleSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    for (let i = 0; i < sticks.length - 1; i++) {
      for (let j = sticks.length - 1; i < j; j--) {
        if (setting.stopping) return // 中断用
        if (sticks[j] < sticks[j - 1]) {
          [sticks[j], sticks[j - 1]] = [sticks[j - 1], sticks[j]]
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...sticks])
        }
      }
    }
  }

  return (
    <>
      <DemoCanvas
        title='Bubble Sort'
        sort={sort}
        content={{
          summary: [
            'バブルソートは一つとなりと比べては入れ替える、という処理を繰り返していく方法です。',
            '隣同士のうち、大きい方が前に並ぶように入れ替えていくと、結果的に全体が降順で並びます。',
            '逆に小さいほうが前に並ぶようにすると昇順となります。'
          ],
          computationalComplexity: 'O(n^2)',
          features: [
            'アルゴリズムがシンプル。',
            '計算量が大きい。'
          ]
        }}
        codes={[
          {
            id: 0,
            lang: 'TypeScript',
            path: 'bubble-sort.ts',
            langKey: 'typescript'
          },
          {
            id: 1,
            lang: 'Python',
            path: 'bubble-sort.py',
            langKey: 'python'
          },
          {
            id: 2,
            lang: 'Go',
            path: 'bubble-sort.go',
            langKey: 'go'
          },
          {
            id: 3,
            lang: 'C#',
            path: 'bubble-sort.cs',
            langKey: 'csharp'
          }
        ]}
      />
    </>
  )
}
