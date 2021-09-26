import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import EventBus from '~/utils/event-bus'

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null

    this.size = {
      width: null,
      height: null,
    }

    this.clock = null

    this.time = {
      total: null,
      delta: null,
    }
  }

  init($canvas) {
    this.setSize()
    // EventBus.$on('MOUSEMOVE', this.onMouseMove.bind(this))

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.width / this.size.height,
      1,
      10000
    )
    this.camera.position.set(0, 10, -10)
    this.camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.renderer.setClearColor(0xeaf2f5)
    this.renderer.setSize(this.size.width, this.size.height)

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.width / this.size.height
    )
    this.camera.position.set(0, 0, 1000)

    this.controls = new OrbitControls(this.camera, $canvas)

    const geometry = new THREE.BoxGeometry(400, 400, 400)
    const material = new THREE.MeshNormalMaterial()
    const box = new THREE.Mesh(geometry, material)
    this.scene.add(box)

    this.clock = new THREE.Clock()
    this.clock.start()
  }

  setSize() {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  resize() {
    this.setSize()
    this.camera.aspect = this.size.width / this.size.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.size.width, this.size.height)
  }

  render() {
    this.time.delta = this.clock.getDelta()
    this.time.total += this.delta

    this.renderer.render(this.scene, this.camera)
  }
}

export default new Common()
