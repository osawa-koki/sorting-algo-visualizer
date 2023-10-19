import React from 'react'
import DemoCanvas from '../components/DemoCanvas'
import setting from '../setting'

export default function BitonicSortPage (): React.JSX.Element {
  const sort = async (sticks: number[], setSticks: (sticks: number[]) => void): Promise<void> => {
    async function _bitonicSort (array: number[], start: number, size: number, ascending: boolean): Promise<void> {
      if (size <= 1) {
        return
      }
      const half = size >> 1
      await _bitonicSort(array, start, half, true)
      await _bitonicSort(array, start + half, half, false)
      await _bitonicMerge(array, start, size, ascending)
    }

    async function _bitonicMerge (array: number[], start: number, size: number, ascending: boolean): Promise<void> {
      if (size <= 1) {
        return
      }
      const half = size >> 1
      for (let i = start; i < start + half; i++) {
        if ((array[i] > array[i + half]) === ascending) {
          [array[i], array[i + half]] = [array[i + half], array[i]]
          await new Promise(resolve => setTimeout(resolve, setting.intervalTime))
          setSticks([...sticks])
        }
      }
      await _bitonicMerge(array, start, half, ascending)
      await _bitonicMerge(array, start + half, half, ascending)
    }

    if ((sticks.length & (sticks.length - 1)) !== 0) {
      throw new Error('The length of the array must be a power of 2.')
    }
    await _bitonicSort(sticks, 0, sticks.length, true)
  }

  const activeCondition: ActiveCondition = (activeConditionProps: ActiveConditionArg): ActiveConditionReturn => {
    const { stickCount } = activeConditionProps
    if ((stickCount & (stickCount - 1)) !== 0) {
      return {
        active: false,
        disabledReason: 'The number of sticks must be a power of 2.'
      }
    }
    return {
      active: true,
      disabledReason: null
    }
  }

  return (
    <>
      <DemoCanvas
        title='Bitonic Sort'
        sort={sort}
        content={{
          summary: [
            'バイトニック列を生成しながら並べ替えを実行する。',
            'このバイトニック列は、単調非増加の後に単調非減少となるかその逆である列のことである。'
          ],
          computationalComplexity: 'O(nlog2n)',
          features: [
            '並列化が可能。',
            'アルゴリズムが非常に複雑。'
          ]
        }}
        activeCondition={activeCondition}
      />
    </>
  )
}
