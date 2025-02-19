import type { IAppointment } from '@/types/Appointment'
import type { ActionContext } from 'vuex/types/index.js'
import type { IRootState } from '.'

export interface IAppointmentState {
  loading: boolean
  error: string | null
  formData: IAppointment
  appointments: IAppointment[]
}

const appointmentStore = {
  namespaced: true,
  state: () => ({
    loading: false,
    error: false,
    formData: null,
    appointments: [],
  }),
  mutations: {
    setLoading(state: IAppointmentState, payload: boolean) {
      state.loading = payload
    },
    setError(state: IAppointmentState, payload: string | null) {
      state.error = payload
    },
    setAppointments(state: IAppointmentState, payload: IAppointment[]) {
      state.appointments = payload
    },
  },
  actions: {
    async saveFormData(
      { commit }: ActionContext<IAppointmentState, IRootState>,
      data: IAppointment,
    ) {
      commit('setLoading', true)
      try {
        // simulate loading for 2seconds
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const currentAppointments = JSON.parse(
          localStorage.getItem('shiftcare-appointments') || '[]',
        )
        const newAppointments = JSON.stringify([...currentAppointments, data])
        // console.log(newAppointments, 'newAppointments')
        localStorage.setItem('shiftcare-appointments', newAppointments)
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit('setError', error?.message)
        }
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchAppointments({ commit }: ActionContext<IAppointmentState, IRootState>) {
      commit('setLoading', true)
      try {
        const appointments = JSON.parse(localStorage.getItem('shiftcare-appointments') || '[]')

        commit('setAppointments', appointments)
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit('setError', error?.message)
        }
      } finally {
        commit('setLoading', false)
      }
    },
  },
  getters: {
    loading: (state: IAppointmentState): boolean => state.loading,
    error: (state: IAppointmentState): string | null => state.error,
    appointments: (state: IAppointmentState): IAppointment[] => state.appointments,
  },
}

export default appointmentStore
