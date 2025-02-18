import { createStore } from 'vuex'
import doctor from './doctor'

const store = createStore({
  modules: {
    doctor: doctor,
  },
})

export default store
