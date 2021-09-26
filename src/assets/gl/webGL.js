import common from './common'

export default class webGL {
  constructor(props) {
    this.props = props
    this.init()
  }

  init() {
    common.init(this.props)
    window.addEventListener('resize', this.resize.bind(this))
    this.loop()
  }

  resize() {
    common.resize()
  }

  loop() {
    this.render()
    requestAnimationFrame(this.loop.bind(this))
  }

  render() {
    common.update()
    common.render()
  }
}
