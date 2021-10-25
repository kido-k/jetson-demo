import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import EventBus from '~/utils/event-bus'

const fps = 60

const cameraSetting = {
  rotation: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 10000,
  position: { x: 0, y: 400, z: 800 },
}

const lightSetting = { position: { x: 300, y: 300, z: 400 } }
const lightSetting2 = { position: { x: -300, y: 300, z: 400 } }

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.light = null
    this.renderer = null
    this.controls = null
    // this.mtlLoader = null
    // this.objLoader = null
    this.colladaLoader = null
    this.gtfLoader = null
    this.mixer = null

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
    this.rotation = null
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

    const light2 = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(
      lightSetting2.position.x,
      lightSetting2.position.y,
      lightSetting2.position.z
    )
    this.scene.add(light2)

    // レンダラーの設定
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xeaf2f5)
    this.renderer.setSize(this.size.width, this.size.height)

    this.colladaLoader = new ColladaLoader()
    this.colladaLoader.load('/models/eventos-booth.dae', (collada) => {
      const model = collada.scene
      model.scale.set(50, 50, 50)
      model.position.set(0, 10, 0)
      model.rotation.z = Math.PI / 2
      this.scene.add(model)
    })

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
    const childrenLength = children.length - 4

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
    // // 球のパーツ
    // const sphereGeometry = new THREE.SphereGeometry(10)
    // const sphereMaterial = new THREE.MeshPhongMaterial()
    // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    // sphere.name = name
    // sphere.position.set(position.x, position.y, position.z)
    // this.scene.add(sphere)

    this.gltfLoader = new GLTFLoader()
    this.gltfLoader.load('/models/robot_animation.glb', (data) => {
      const gltf = data
      const model = gltf.scene
      const animations = gltf.animations
      if (animations && animations.length) {
        this.mixer = new THREE.AnimationMixer(model)
        animations.forEach((animation) => {
          this.mixer.clipAction(animation).play()
        })
      }
      model.name = name
      model.scale.set(15, 15, 15)
      model.rotation.y = Math.PI
      model.position.set(position.x, position.y, position.z)
      this.scene.add(model)
    })
  }

  moveSphere(position, name) {
    const sphere = this.scene.getObjectByName(name)
    const diffX = position.x - sphere.position.x
    const diffZ = position.z - sphere.position.z
    const diff = {
      x: diffX / fps,
      y: 0,
      z: diffZ / fps,
    }
    this.diffs.push({ name, diff })
    this.rotation = calcAngleDegrees(diffX, diffZ)
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta())
    }
    this.diffs.forEach((diff, index) => {
      const model = this.scene.getObjectByName(diff.name)
      model.position.set(
        model.position.x + diff.diff.x,
        model.position.y,
        model.position.z + diff.diff.z
      )
      model.rotation.y = this.rotation
    })
  }

  removeSphere(name) {
    this.scene.remove(name)
  }
}

function calcAngleDegrees(x, y) {
  return Math.atan2(x, y) + Math.PI
}

export default new Common()
