import { describe, expect, it, vi, beforeEach } from 'vitest'
import store from '../../../src/store/index'
import type { IDoctor, IDoctorProfile } from '../../../src/types/Doctor'

global.fetch = vi.fn()

// mutations
describe('Doctor Store Mutations', () => {
  it('should commit a mutation to set doctors state correctly', () => {
    const payload: IDoctorProfile[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        schedule: [{ day_of_week: 'Monday', available_at: ' 9:00AM', available_until: ' 5:30PM' }],
      },
    ]

    store.commit('doctorStore/setDoctors', payload)

    expect(store.state.doctorStore.doctors).toEqual(payload)
    expect(store.state.doctorStore.doctors.length).toBe(1)
    expect(store.state.doctorStore.doctors[0].name).toBe('Christy Schumm')
    expect(store.state.doctorStore.doctors[0].timezone).toBe('Australia/Sydney')
    expect(store.state.doctorStore.doctors[0].schedule.length).toBe(1)
  })

  it('should commit a mutation to set doctor profile state correctly', () => {
    const payload: IDoctorProfile = {
      name: 'Christy Schumm',
      timezone: 'Australia/Sydney',
      schedule: [{ day_of_week: 'Monday', available_at: ' 9:00AM', available_until: ' 5:30PM' }],
    }

    store.commit('doctorStore/setDoctorProfile', payload)

    expect(store.state.doctorStore.doctorProfile).toEqual(payload)
    expect(store.state.doctorStore.doctorProfile.name).toBe('Christy Schumm')
    expect(store.state.doctorStore.doctorProfile.timezone).toBe('Australia/Sydney')
    expect(store.state.doctorStore.doctorProfile.schedule.length).toBe(1)
  })

  it('should commit a mutation to set loading state correctly', () => {
    store.commit('doctorStore/setLoading', true)

    expect(store.state.doctorStore.loading).toBeTruthy()
  })

  it('should commit a mutation to set error state correctly', () => {
    store.commit('doctorStore/setError', 'An error occured')

    expect(store.state.doctorStore.error).toBe('An error occured')
  })
})

describe('Doctor Store Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    store.commit('doctorStore/setError', null)
    store.commit('doctorStore/setLoading', false)
    store.commit('doctorStore/setDoctors', [])
    store.commit('doctorStore/setDoctorProfile', null)
  })

  it('should fetch doctors and commit them to the doctors state', async () => {
    const mockResponse: IDoctor[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 5:30PM',
      },
      {
        name: 'Natalia Stanton Jr.',
        timezone: 'Australia/Perth',
        day_of_week: 'Tuesday',
        available_at: ' 8:00AM',
        available_until: '10:00AM',
      },
    ]
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    await store.dispatch('doctorStore/fetchDoctors')

    expect(store.state.doctorStore.doctors.length).toBe(2)
    expect(store.state.doctorStore.loading).toBe(false)
    expect(store.state.doctorStore.error).toBeNull()
  })

  it('should handle error during fetching doctors', async () => {
    global.fetch.mockResolvedValue({ ok: false, json: () => Promise.reject('Error') })

    await store.dispatch('doctorStore/fetchDoctors')

    // Check that error mutation was called
    expect(store.state.doctorStore.loading).toBe(false)
    expect(store.state.doctorStore.error).toBe('Error encountered: Unable to fetch doctors')
  })

  it('should fetch doctors and commit the reduced doctor profile to the doctorProfile state', async () => {
    const mockResponse: IDoctor[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 5:30PM',
      },
      {
        name: 'Natalia Stanton Jr.',
        timezone: 'Australia/Perth',
        day_of_week: 'Tuesday',
        available_at: ' 8:00AM',
        available_until: '10:00AM',
      },
    ]
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    await store.dispatch('doctorStore/fetchDoctorProfile', 'Christy Schumm')

    expect(store.state.doctorStore.loading).toBe(false)
    expect(store.state.doctorStore.error).toBeNull()
    expect(store.state.doctorStore.doctorProfile?.name).toBe('Christy Schumm')
  })

  it('should handle error during fetching doctors to be reduced as doctor profile', async () => {
    global.fetch.mockResolvedValue({ ok: false, json: () => Promise.reject('Error') })

    await store.dispatch('doctorStore/fetchDoctorProfile', 'Christy Schumm')

    // Check that error mutation was called
    expect(store.state.doctorStore.loading).toBe(false)
    expect(store.state.doctorStore.error).toBe('Error encountered: Unable to fetch doctor profile')
  })

  it('should handle error if no doctor profile is found', async () => {
    const mockResponse: IDoctor[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        day_of_week: 'Monday',
        available_at: ' 9:00AM',
        available_until: ' 5:30PM',
      },
      {
        name: 'Natalia Stanton Jr.',
        timezone: 'Australia/Perth',
        day_of_week: 'Tuesday',
        available_at: ' 8:00AM',
        available_until: '10:00AM',
      },
    ]
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    await store.dispatch('doctorStore/fetchDoctorProfile', 'Nicole Alday')

    expect(store.state.doctorStore.loading).toBe(false)
    expect(store.state.doctorStore.error).toBe('Error encountered: Doctor profile not found')
  })
})
