import three from './common'
import Shape from './shape'

export default class webGL {
  constructor(props) {
    this.props = props
    this.init()
  }

  init() {
    three.init(this.props.$canvas)
    this.shape = new Shape()
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
    this.shape.update()
    three.render()
  }
}
