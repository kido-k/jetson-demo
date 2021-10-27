export const state = () => ({
  showCamera: false,
})

export const getters = {
  showCamera: (state) => state.showCamera,
}

export const mutations = {
  switchCamera(state) {
    state.showCamera = !state.showCamera
  },
}

export const actions = {}
