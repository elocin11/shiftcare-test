import { type IDoctor, type IDoctorProfile } from '@/types/Doctor'
import type { ActionContext } from 'vuex/types/index.js'
import { type IRootState } from '@/store/index'
// import { uniqBy } from 'lodash'

const API_URL = import.meta.env.VITE_API_URL

export interface IDoctorState {
  doctors: IDoctor[]
  doctorProfile: IDoctorProfile | null
  loading: boolean
  error: string | null
}

const doctorStore = {
  namespaced: true,
  state: (): IDoctorState => ({
    doctors: [],
    doctorProfile: null,
    loading: false,
    error: null,
  }),
  mutations: {
    setDoctors(state: IDoctorState, payload: IDoctor[]) {
      state.doctors = payload
    },
    setDoctorProfile(state: IDoctorState, payload: IDoctorProfile) {
      state.doctorProfile = payload
    },
    setLoading(state: IDoctorState, payload: boolean) {
      state.loading = payload
    },
    setError(state: IDoctorState, payload: string | null) {
      state.error = payload
    },
  },
  actions: {
    // TODO: improvement - pagination, search, filtering
    async fetchDoctors({ commit }: ActionContext<IDoctorState, IRootState>) {
      commit('setLoading', true)

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Unable to fetch doctors')
        }

        const data = await response.json()

        // distinct doctors
        // const doctors = uniqBy(data, 'name')
        const doctors = data.reduce((a: IDoctorProfile[], i: IDoctor) => {
          const exist = a.find((d: IDoctorProfile) => d.name === i.name)
          // exist in accumulator update schedule instead
          if (exist) {
            exist.schedule?.push({
              day_of_week: i.day_of_week,
              available_at: i.available_at,
              available_until: i.available_until,
            })
          } else {
            a.push({
              name: i.name,
              timezone: i.timezone,
              schedule: [
                {
                  day_of_week: i.day_of_week,
                  available_at: i.available_at,
                  available_until: i.available_until,
                },
              ],
            })
          }

          return a
        }, [])

        console.log(doctors, 'doctors')

        commit('setDoctors', doctors)
        // console.log(data, 'data')
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit('setError', error.message)
        }
        // console.log(error, 'error')
      } finally {
        commit('setLoading', false)
      }
    },
    // TODO: improvement - a separate endpoint for fetching doctor's profile w/ eager loaded schedule
    async fetchDoctorProfile({ commit }: ActionContext<IDoctorState, IRootState>, name: string) {
      commit('setLoading', true)

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Unable to fetch doctor profile')
        }

        const data = await response.json()

        // find doctor by name
        const filteredList = data?.filter((d: IDoctor) => d.name === name)
        // console.log(name, 'name')
        // console.log(filteredList, 'filteredList')

        // aggregate day_of_week, available_at, available_until to schedule collection
        const doctor = filteredList.reduce((a: IDoctorProfile, i: IDoctor) => {
          if (!a.name) {
            a.name = i.name
            a.timezone = i.timezone
            a.schedule = []
          }

          a.schedule?.push({
            day_of_week: i.day_of_week,
            available_at: i.available_at,
            available_until: i.available_until,
          })

          return a
        }, {})

        // console.log(doctor, 'doctor')

        commit('setDoctorProfile', doctor)
      } catch (error: unknown) {
        if (error instanceof Error) {
          commit('setError', error.message)
        }
        // console.log(error, 'error')
      } finally {
        commit('setLoading', false)
      }
    },
  },
  getters: {
    doctors: (state: IDoctorState): IDoctor[] => state.doctors,
    doctorProfile: (state: IDoctorState): IDoctorProfile | null => state.doctorProfile,
    loading: (state: IDoctorState): boolean => state.loading,
    error: (state: IDoctorState): string | null => state.error,
  },
}

export default doctorStore
