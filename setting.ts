import Env from './next.config.js'
const isProd = process.env.NODE_ENV === 'production'

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8000',
  title: '💦 Sorting Algo Visualizer 💦',
  intervalTime: 10,
  stopping: false,
  stickCount: 100
}

export default setting
