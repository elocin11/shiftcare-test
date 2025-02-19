import { createStore } from 'vuex'
import doctorStore, { type IDoctorState } from './doctorStore'
import appointmentStore, { type IAppointmentState } from './appointmentStore'

export interface IRootState {
  doctorStore: IDoctorState
  appointmentStore: IAppointmentState
}

const store = createStore<IRootState>({
  modules: {
    doctorStore: doctorStore,
    appointmentStore: appointmentStore,
  },
})

export default store
