import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import EventBus from '~/utils/event-bus'

const fps = 60

// const orthographicCameraSetting= {
//   left: -500,
//   right: 700,
//   top: 200,
//   bottom: -800,
//   near: 1,
//   far: 2000,
//   position: { x: 1000, y: 800, z: 800 },
// }

const perspectiveCameraSetting = {
  fov: 60,
  aspect: window.innerWidth / window.innerHeight,
  near: 500,
  far: 3000,
  position: { x: 1300, y: 500, z: 800 },
  lookAt: { x: 100, y: 0, z: 100 },
}

const lightSetting = { position: { x: 300, y: 300, z: 200 } }

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.light = null
    this.renderer = null
    this.controls = null
    this.mixer = null
    this.gltfLoader = null

    this.size = {
      width: null,
      height: null,
    }

    this.interval = null
    this.clock = null

    this.time = {
      total: null,
      delta: null,
    }

    this.diffs = []
    this.character = null
    this.rotation = null
  }

  init({ $canvas, settings, character }) {
    this.setSize()
    // EventBus.$on('setCoordinate', this.setCoordinate.bind(this))
    EventBus.$on('stop', this.stop.bind(this))

    // シーンの設定
    this.scene = new THREE.Scene()

    // カメラの設定
    // this.camera = new THREE.OrthographicCamera(
    //   orthographicCameraSetting.left,
    //   orthographicCameraSetting.right,
    //   orthographicCameraSetting.top,
    //   orthographicCameraSetting.bottom,
    //   orthographicCameraSetting.near,
    //   orthographicCameraSetting.far
    // )
    // this.camera.position.set(
    //   orthographicCameraSetting.position.x,
    //   orthographicCameraSetting.position.y,
    //   orthographicCameraSetting.position.z
    // )

    this.camera = new THREE.PerspectiveCamera(
      perspectiveCameraSetting.fov,
      perspectiveCameraSetting.aspect,
      perspectiveCameraSetting.near,
      perspectiveCameraSetting.far
    )
    this.camera.position.set(
      perspectiveCameraSetting.position.x,
      perspectiveCameraSetting.position.y,
      perspectiveCameraSetting.position.z
    )
    this.camera.lookAt(
      perspectiveCameraSetting.lookAt.x,
      perspectiveCameraSetting.lookAt.y,
      perspectiveCameraSetting.lookAt.z
    )

    // カメラ操作用のコントローラーを追加
    this.controls = new OrbitControls(this.camera, $canvas)

    // ライトの設定
    const light = new THREE.AmbientLight(0xffffff, 1)
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

    // 土台のパーツをセット
    this.setBase(settings.base)

    // カスタムパーツをセット
    this.setParts(settings.parts)

    // キャラクターを追加
    const names = this.setCharacter(character)

    // キャラクターを移動
    this.interval = setInterval(() => {
      names.forEach((name) => {
        this.moveCharacter(name, character)
      })
    }, 1000)

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

  setBase(baseSettings) {
    const baseGeometry = new THREE.BoxGeometry(
      baseSettings.width,
      baseSettings.height,
      baseSettings.width
    )
    const baseMaterial = new THREE.MeshLambertMaterial({
      color: baseSettings.color.hex,
    })
    const box = new THREE.Mesh(baseGeometry, baseMaterial)
    box.position.set(0, -10, 0)
    this.scene.add(box)
  }

  setParts(partsSettings) {
    Object.keys(partsSettings).forEach((key) => {
      const setting = partsSettings[key]
      const baseGeometry = new THREE.BoxGeometry(
        setting.width,
        setting.height,
        setting.width
      )
      const baseMaterial = new THREE.MeshLambertMaterial({
        color: setting.color.hex,
      })
      const box = new THREE.Mesh(baseGeometry, baseMaterial)
      box.position.set(setting.x, setting.height / 2, setting.z)
      this.scene.add(box)
    })
  }

  setCharacter(character) {
    this.character = character
    const names = []
    ;[...Array(character.number)].map((_, i) => {
      const x = randomIntMinMax(character.minX, character.maxX)
      const y = 10
      const z = randomIntMinMax(character.minZ, character.maxZ)
      const position = { x, y, z }
      this.addCharacter(position, `person-${i}`)
      names.push(`person-${i}`)
      return position
    })
    return names
  }

  addCharacter(position, name) {
    this.gltfLoader = new GLTFLoader()
    this.gltfLoader.load('/models/human.glb', (data) => {
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
      model.scale.set(0.7, 0.7, 0.7)
      model.rotation.y = Math.PI
      model.position.set(position.x, position.y, position.z)
      this.scene.add(model)
    })
  }

  moveCharacter(name, character) {
    const velocityX = randomIntMinMax(character.minV, character.maxV)
    const velocityZ = randomIntMinMax(character.minV, character.maxV)
    const diff = {
      x: velocityX / fps,
      y: 0,
      z: velocityZ / fps,
    }
    this.diffs.push({ name, diff })
    this.rotation = calcAngleDegrees(velocityX, velocityZ)
  }

  // moveCharacter(position, name) {
  //   const character = this.scene.getObjectByName(name)
  //   const diffX = position.x - character.position.x
  //   const diffZ = position.z - character.position.z
  //   const diff = {
  //     x: diffX / fps,
  //     y: 0,
  //     z: diffZ / fps,
  //   }
  //   this.diffs.push({ name, diff })
  //   this.rotation = calcAngleDegrees(diffX, diffZ)
  // }

  update() {
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta())
    }
    this.diffs.forEach((diff) => {
      const model = this.scene.getObjectByName(diff.name)
      let x = model.position.x + diff.diff.x
      if (x > this.character.maxX) x = this.character.maxX
      if (x < this.character.minX) x = this.character.minX
      const y = model.position.y
      let z = model.position.z + diff.diff.z
      if (z > this.character.maxZ) z = this.character.maxZ
      if (z < this.character.minZ) z = this.character.minZ
      model.position.set(x, y, z)
      model.rotation.y = this.rotation
    })
  }

  stop() {
    clearInterval(this.interval)
  }

  // removeCharacter(name) {
  //   this.scene.remove(name)
  // }

  // setCoordinate(positions) {
  //   this.diffs = []
  //   const children = this.scene.children
  //   const childrenLength = children.length - 14

  //   if (positions.length < childrenLength) {
  //     const length = positions.length - childrenLength
  //     for (let i = childrenLength; i > length; i -= 1) {
  //       this.removeRobot(`person-${i}`)
  //     }
  //   }

  //   positions.forEach((position, index) => {
  //     if (index >= childrenLength) {
  //       this.addCharacter(position, `person-${index}`)
  //     } else {
  //       this.moveCharacter(position, `person-${index}`)
  //     }
  //   })
  // }
}

function calcAngleDegrees(x, y) {
  return Math.atan2(x, y) + Math.PI
}

function randomIntMinMax(min, max) {
  const rand = Math.floor(Math.random() * (max + 1 - min)) + min
  return rand
}

export default new Common()
