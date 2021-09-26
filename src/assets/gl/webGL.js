import three from './common'

export default class webGL {
  constructor(props) {
    this.props = props
    this.init()
  }

  init() {
    three.init(this.props.$canvas)
    window.addEventListener('resize', this.resize.bind(this))
    this.loop()
  }

  resize() {
    three.resize()
  }

  loop() {
    this.render()
    requestAnimationFrame(this.loop.bind(this))
  }

  render() {
    three.render()
  }
}
