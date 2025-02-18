import { createStore } from 'vuex'
import doctorStore, { type IDoctorState } from './doctorStore'

export interface IRootState {
  doctorStore: IDoctorState
}

const store = createStore<IRootState>({
  modules: {
    doctorStore: doctorStore,
  },
})

export default store
