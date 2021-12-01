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

const webCamera = {
  width: 800,
  height: 600,
}

const perspectiveCameraSetting = {
  fov: 60,
  aspect: window.innerWidth / window.innerHeight,
  near: 500,
  far: 3000,
  position: { x: 0, y: 1000, z: 400 },
  lookAt: { x: 1, y: 0, z: 0 },
}

const lightSetting = { position: { x: 300, y: 300, z: 200 } }

let _settings = null

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.light = null
    this.renderer = null
    this.controls = null
    this.mixer = null
    this.gltfLoader = null
    this.names = []

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
    this.positions = []
    this.rotation = null
    this.aspect = { width: null, height: null }
  }

  init({ $canvas, settings }) {
    _settings = settings
    this.setSize()
    this.setAspect()
    EventBus.$on('setCoordinate', this.setCoordinate.bind(this))
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
    this.setBase(_settings.base)

    // カスタムパーツをセット
    this.setParts(_settings.parts)

    this.clock = new THREE.Clock()
    this.clock.start()
  }

  setSize() {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  setAspect() {
    if (!_settings.camera) return
    this.aspect = {
      width: _settings.camera.width / webCamera.width,
      height: _settings.camera.height / webCamera.height,
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
      10,
      baseSettings.height
    )
    let baseMaterial = null

    if (baseSettings.image) {
      const loader = new THREE.TextureLoader()
      loader.load(baseSettings.image.url, (texture) => {
        baseMaterial = new THREE.MeshLambertMaterial({
          map: texture,
        })
        const box = new THREE.Mesh(baseGeometry, baseMaterial)
        box.position.set(
          baseSettings.width / 2 - this.size.width / 2,
          -10,
          baseSettings.height / 2 - this.size.height / 2
        )
        this.scene.add(box)
      })
    } else {
      baseMaterial = new THREE.MeshLambertMaterial({
        color: baseSettings.color.hex,
      })
      const box = new THREE.Mesh(baseGeometry, baseMaterial)
      box.position.set(
        baseSettings.width / 2 - this.size.width / 2,
        -10,
        baseSettings.height / 2 - -this.size.height / 2
      )
      this.scene.add(box)
    }
  }

  setParts(partsSettings) {
    if (!partsSettings) return
    Object.keys(partsSettings).forEach((key) => {
      const setting = partsSettings[key]
      const baseGeometry = new THREE.BoxGeometry(
        setting.width,
        setting.height,
        setting.depth
      )
      if (setting.frontImage) {
        const loadManager = new THREE.LoadingManager()
        const loader = new THREE.TextureLoader(loadManager)

        const front = setting.frontImage
          ? { map: loader.load(setting.frontImage.url) }
          : { color: setting.color.hex }
        const back = setting.backImage
          ? { map: loader.load(setting.backImage.url) }
          : { color: setting.color.hex }
        const right = setting.rightImage
          ? { map: loader.load(setting.rightImage.url) }
          : { color: setting.color.hex }
        const left = setting.leftImage
          ? { map: loader.load(setting.leftImage.url) }
          : { color: setting.color.hex }
        const top = setting.topImage
          ? { map: loader.load(setting.topImage.url) }
          : { color: setting.color.hex }
        const bottom = { color: setting.color.hex }
        const materials = [
          new THREE.MeshBasicMaterial(right),
          new THREE.MeshBasicMaterial(left),
          new THREE.MeshBasicMaterial(top),
          new THREE.MeshBasicMaterial(bottom),
          new THREE.MeshBasicMaterial(front),
          new THREE.MeshBasicMaterial(back),
        ]
        loadManager.onLoad = () => {
          const box = new THREE.Mesh(baseGeometry, materials)
          box.position.set(
            setting.x + setting.width / 2 - this.size.width / 2,
            setting.height / 2,
            setting.z + setting.depth / 2 - 70 - this.size.height / 2
          )
          this.scene.add(box)
        }
      } else {
        const baseMaterial = new THREE.MeshLambertMaterial({
          color: setting.color.hex,
        })
        const box = new THREE.Mesh(baseGeometry, baseMaterial)
        box.position.set(
          setting.x + setting.width / 2 - this.size.width / 2,
          setting.height / 2,
          setting.z + setting.depth / 2 - 70 - this.size.height / 2
        )
        this.scene.add(box)
      }
    })
  }

  addCharacter(pos) {
    this.gltfLoader = new GLTFLoader()
    const modelSetting = {
      path: '',
      scale: 1,
    }
    if (_settings.character === 'human') {
      modelSetting.path = '/models/human.glb'
      modelSetting.scale = 0.7
    } else if (_settings.character === 'robot') {
      modelSetting.path = '/models/robot_animation.glb'
      modelSetting.scale = 10
    }
    this.gltfLoader.load(modelSetting.path, (data) => {
      const gltf = data
      const model = gltf.scene
      const animations = gltf.animations
      if (animations && animations.length) {
        this.mixer = new THREE.AnimationMixer(model)
        animations.forEach((animation) => {
          this.mixer.clipAction(animation).play()
        })
      }
      model.name = pos.track_id
      model.scale.set(
        modelSetting.scale,
        modelSetting.scale,
        modelSetting.scale
      )
      model.rotation.y = Math.PI
      model.position.set(
        pos.coodX - this.size.width / 2,
        10,
        pos.coodZ - this.size.height / 2
      )
      this.scene.add(model)
    })
  }

  setCharacter(number) {
    const currentNumber = this.names.length
    const diff = currentNumber - Number(number)
    if (!diff) return
    if (diff > 0) {
      ;[...Array(diff)].map((_, i) => {
        const x = randomIntMinMax(
          Number(_settings.camera.left),
          Number(_settings.camera.left) + Number(_settings.camera.width)
        )
        const y = 10
        const z = randomIntMinMax(
          Number(_settings.camera.top),
          Number(_settings.camera.top) + Number(_settings.camera.height)
        )
        const position = { x, y, z }
        this.addCharacter(position, `person-${i}`)
        this.names.push(`person-${i}`)
        return position
      })
    } else {
      ;[...Array(Math.abs(diff))].map((_, i) => {
        const name = String(this.names[0])
        this.removeCharacter(name)
        this.names.shift()
        return name
      })
    }
  }

  moveCharacter(pos, bfPos) {
    const difX = bfPos.coodX - pos.coodX
    const difZ = bfPos.coodZ - pos.coodZ
    const diff = {
      x: difX / fps,
      y: 0,
      z: difZ / fps,
    }
    this.diffs.push({ name: pos.track_id, diff })
    this.rotation = calcAngleDegrees(difX, difZ)
  }

  randomMoveCharacter(name) {
    const velocityX = randomIntMinMax(0, 5)
    const velocityZ = randomIntMinMax(0, 5)
    const diff = {
      x: velocityX / fps,
      y: 0,
      z: velocityZ / fps,
    }
    this.diffs.push({ name, diff })
    this.rotation = calcAngleDegrees(velocityX, velocityZ)
  }

  removeCharacter(id) {
    const selectedObject = this.scene.getObjectByName(id)
    if (!selectedObject) return
    if (selectedObject.geometry) this.selectedObject.geometry.dispose()
    if (selectedObject.material) this.selectedObject.material.dispose()
    this.scene.remove(selectedObject)
  }

  setCoordinate(newPositions) {
    if (!_settings.camera) return
    this.diffs = []

    this.positions.forEach((pos) => {
      if (!newPositions.some((newPos) => newPos.track_id === pos.track_id)) {
        this.removeCharacter(pos.track_id)
      }
    })
    newPositions.forEach((newPos) => {
      newPos.coodX =
        (parseInt(newPos.x) + parseInt(newPos.width) / 2) * this.aspect.width +
        _settings.camera.left
      newPos.coodZ =
        (parseInt(newPos.y) - parseInt(newPos.height)) * this.aspect.height +
        _settings.camera.top
      const bfPos = this.positions.find(
        (pos) => pos.track_id === newPos.track_id
      )
      if (bfPos) {
        this.moveCharacter(newPos, bfPos)
      } else {
        this.addCharacter(newPos)
      }
    })
    this.positions = newPositions
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta())
    }
    this.diffs.forEach((diff) => {
      const model = this.scene.getObjectByName(diff.name)
      const x = model.position.x + diff.diff.x
      const y = model.position.y
      const z = model.position.z + diff.diff.z
      model.position.set(x, y, z)
      model.rotation.y = this.rotation
    })
  }

  stop() {
    clearInterval(this.interval)
  }
}

function calcAngleDegrees(x, y) {
  return Math.atan2(x, y) + Math.PI
}

function randomIntMinMax(min, max) {
  const rand = Math.floor(Math.random() * (max + 1 - min)) + min
  return rand
}

export default new Common()
