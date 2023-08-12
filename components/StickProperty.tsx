import React from 'react'
import { Form, Table } from 'react-bootstrap'
import setting from '../setting'

interface Props {
  stickCount: number
  setStickCount: (stickCount: number) => void
  intervalTime: number
  setIntervalTime: (waitingTime: number) => void
}

export default function StickProperty (props: Props): React.JSX.Element {
  const {
    stickCount,
    setStickCount,
    intervalTime,
    setIntervalTime
  } = props

  const putStickCount = (stickCount: number): void => {
    // 以下の2つの処理は必ずセットで行う！
    setStickCount(stickCount)
    setting.stickCount = stickCount
  }

  const putIntervalTime = (waitingTime: number): void => {
    // 以下の2つの処理は必ずセットで行う！
    setIntervalTime(waitingTime)
    setting.intervalTime = waitingTime
  }

  return (
    <>
      <Table className='mt-5' striped bordered>
        <tbody>
          <tr>
            <th>stickCount</th>
            <td className='d-flex align-items-center'>
              <Form.Control
                type='range'
                className='me-3'
                min='10'
                max='300'
                value={stickCount}
                onChange={e => { putStickCount(Number(e.target.value)) }}
              />
              {stickCount}
            </td>
          </tr>
          <tr>
            <th>intervalTime (ms)</th>
            <td className='d-flex align-items-center'>
              <Form.Control
                type='range'
                className='me-3'
                min='5'
                max='100'
                value={intervalTime}
                onChange={e => { putIntervalTime(Number(e.target.value)) }}
              />
              {intervalTime}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}
