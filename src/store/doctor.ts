import { type IDoctor } from '@/types/Doctor'
// import { ActionContext } from 'vuex'

const API_URL = import.meta.env.VITE_API_URL

interface DoctorState {
  doctorList: IDoctor[]
  doctorProfile: IDoctor | null
  loading: boolean
  error: string | null
}

const doctor = {
  namespaced: true,
  state: (): DoctorState => ({
    doctorList: [],
    doctorProfile: null,
    loading: false,
    error: null,
  }),
  mutations: {
    setDoctorList(state: DoctorState, payload: IDoctor[]) {
      state.doctorList = payload
    },
    setDoctorProfile(state: DoctorState, payload: IDoctor) {
      state.doctorProfile = payload
    },
    setLoading(state: DoctorState, payload: boolean) {
      state.loading = payload
    },
    setError(state: DoctorState, payload: string | null) {
      state.error = payload
    },
  },
  actions: {
    async fetchDoctorList({ commit }: unknown) {
      commit('setLoading', true)

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Unable to fetch doctors')
        }

        const data = await response.json()

        commit('setDoctorList', data)

        console.log(data, 'data')
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit('setError', error.message)
        }

        console.log(error, 'error')
      } finally {
        commit('setLoading', false)
      }
    },
  },
  getters: {
    doctorList: (state: DoctorState): IDoctor[] => state.doctorList,
    doctorProfile: (state: DoctorState): IDoctor | null => state.doctorProfile,
    loading: (state: DoctorState): boolean => state.loading,
    error: (state: DoctorState): string | null => state.error,
  },
}

export default doctor
