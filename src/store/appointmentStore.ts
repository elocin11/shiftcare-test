import type { IAppointment } from '@/types/Appointment'
import type { ActionContext } from 'vuex/types/index.js'
import { type IRootState } from '@/store/index'
import moment from 'moment'

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
    error: null,
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
        // added here a simple custom validation for the selected date and slot,
        // to ensure validation if html5 required property failed to work
        // TODO: improve validation, per field, per type
        if (!data.schedule.date || !data.schedule.slot) {
          throw new Error('The date and slot fields are required')
        }

        // simulate loading for 1sec
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const currentAppointments = JSON.parse(
          localStorage.getItem('shiftcare-appointments') || '[]',
        )
        const newAppointments = JSON.stringify([...currentAppointments, data])
        // console.log(newAppointments, 'newAppointments')
        localStorage.setItem('shiftcare-appointments', newAppointments)

        // clear error
        commit('setError', null)
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit('setError', 'Error encountered: ' + error.message)
        }
      } finally {
        commit('setLoading', false)
      }
    },
    async removeAppointment(
      { commit, dispatch }: ActionContext<IAppointmentState, IRootState>,
      data: IAppointment,
    ) {
      commit('setLoading', true)
      // console.log(data, 'data appointment param')
      try {
        // simulate loading for 500 ms
        await new Promise((resolve) => setTimeout(resolve, 500))

        const currentAppointments = JSON.parse(
          localStorage.getItem('shiftcare-appointments') || '[]',
        )

        const filteredAppointments = currentAppointments?.filter(
          (i: IAppointment) =>
            i?.doctor !== data?.doctor &&
            i?.schedule?.date !== data?.schedule?.date &&
            i?.schedule?.slot !== data?.schedule?.slot,
        )

        // console.log(filteredAppointments, 'filteredAppointments')

        const newAppointments = JSON.stringify([...filteredAppointments])

        // console.log(newAppointments, 'newAppointments')
        localStorage.setItem('shiftcare-appointments', newAppointments)

        await dispatch('fetchAppointments')

        // clear error
        commit('setError', null)
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit('setError', 'Error encountered: ' + error.message)
        }
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchAppointments({ commit }: ActionContext<IAppointmentState, IRootState>) {
      commit('setLoading', true)
      try {
        // simulate loading for 1 sec

        const appointments = JSON.parse(localStorage.getItem('shiftcare-appointments') || '[]')

        appointments.sort((a: IAppointment, b: IAppointment) => {
          const dateA = moment(a.schedule.date)
          const dateB = moment(b.schedule.date)

          if (dateA.isBefore(dateB)) {
            return -1
          }
          if (dateA.isAfter(dateB)) {
            return 1
          }
          if (dateA.isSame(dateB)) {
            // console.log('same', a.schedule.slot.localeCompare(b.schedule.slot))
            return a.schedule.slot.localeCompare(b.schedule.slot)
          }
        })

        commit('setAppointments', appointments)
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit('setError', 'Error encountered: ' + error.message)
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
