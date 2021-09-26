import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import EventBus from '~/utils/event-bus'

const fps = 60

const cameraSetting = {
  rotation: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 10000,
  position: { x: 0, y: 500, z: 1000 },
}

const lightSetting = { position: { x: 0, y: 500, z: 1000 } }

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.light = null
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

    this.diffs = []
  }

  init({ $canvas, base }) {
    this.setSize()
    EventBus.$on('setCoordinate', this.setCoordinate.bind(this))

    // シーンの設定
    this.scene = new THREE.Scene()

    // カメラの設定
    this.camera = new THREE.PerspectiveCamera(
      cameraSetting.rotation,
      cameraSetting.aspect,
      cameraSetting.near,
      cameraSetting.far
    )
    this.camera.position.set(
      cameraSetting.position.x,
      cameraSetting.position.y,
      cameraSetting.position.z
    )
    // this.camera.lookAt(this.scene.position)
    // カメラ操作用のコントローラーを追加
    this.controls = new OrbitControls(this.camera, $canvas)

    // ライトの設定
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(
      lightSetting.position.x,
      lightSetting.position.y,
      lightSetting.position.z
    )
    this.scene.add(light)

    // レンダラーの設定
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xeaf2f5)
    this.renderer.setSize(this.size.width, this.size.height)

    // 土台のパーツ
    const baseGeometry = new THREE.BoxGeometry(
      base.size.x,
      base.size.y,
      base.size.z
    )
    const baseMaterial = new THREE.MeshLambertMaterial({ color: base.color })
    const box = new THREE.Mesh(baseGeometry, baseMaterial)
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

  setCoordinate(positions) {
    this.diffs = []
    const children = this.scene.children
    const childrenLength = children.length - 2

    if (positions.length < childrenLength) {
      const length = positions.length - childrenLength
      for (let i = childrenLength; i > length; i -= 1) {
        this.removeSphere(`person-${i}`)
      }
    }

    positions.forEach((position, index) => {
      if (index >= childrenLength) {
        this.addSphere(position, `person-${index}`)
      } else {
        this.moveSphere(position, `person-${index}`)
      }
    })
  }

  addSphere(position, name) {
    // 球のパーツ
    const sphereGeometry = new THREE.SphereGeometry(10)
    const sphereMaterial = new THREE.MeshPhongMaterial()
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.name = name
    sphere.position.set(position.x, position.y, position.z)
    this.scene.add(sphere)
  }

  moveSphere(position, name) {
    console.log(position)
    const sphere = this.scene.getObjectByName(name)
    const diff = {
      x: (position.x - sphere.position.x) / fps,
      y: 0,
      z: (position.z - sphere.position.z) / fps,
    }
    this.diffs.push({ name, diff })
    // sphere.position.set(position.x, position.y, position.z)
  }

  update() {
    this.diffs.forEach((diff) => {
      const sphere = this.scene.getObjectByName(diff.name)
      sphere.position.set(
        sphere.position.x + diff.diff.x,
        sphere.position.y,
        sphere.position.z + diff.diff.z
      )
    })
  }

  removeSphere(name) {
    this.scene.remove(name)
  }
}

export default new Common()
