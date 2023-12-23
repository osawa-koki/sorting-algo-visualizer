import Env from './next.config.js'
const isProd = process.env.NODE_ENV === 'production'

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8000',
  title: '💦 Sorting Algo Visualizer 💦',
  intervalTime: 10,
  stopping: false,
  stickCount: 64,
  copyIntervalTime: 1000,
  overlayTriggerShow: 100,
  overlayTriggerHide: 200
}

export default setting
