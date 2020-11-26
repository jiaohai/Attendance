import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    coords:null
  },
  mutations:{
    setPosition (state, lat, lng){
      state.coords = `${lat}%2C${lng}`
    }
  }
})

export default store
