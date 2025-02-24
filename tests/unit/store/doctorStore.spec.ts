import { describe, expect, it, vi, beforeEach } from 'vitest'
import store from '../../../src/store/index'
import doctorStore, { IDoctorState } from '../../../src/store/doctorStore'
import type { IDoctor, IDoctorProfile } from '../../../src/types/Doctor'

// mutations
describe('Doctor Store Mutations', () => {
  const doctorState:IDoctorState = {
    doctors: [],
    doctorProfile: null,
    loading: false,
    error: null,
  } 

  it('should set the doctors state correctly', () => {
    const payload: IDoctorProfile[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        schedule: [{ day_of_week: 'Monday', available_at: ' 9:00AM', available_until: ' 5:30PM' }],
      },
    ]

    doctorStore.mutations.setDoctors(doctorState, payload)

    expect(doctorState.doctors.length).toBe(1)
    expect(doctorState.doctors[0].name).toBe('Christy Schumm')
    expect(doctorState.doctors[0].timezone).toBe('Australia/Sydney')
    expect(doctorState.doctors[0].schedule.length).toBe(1)
    expect(doctorState.doctors).toEqual(payload)
  })

  it('should set doctor profile state correctly', () => {
    const payload: IDoctorProfile = {
      name: 'Christy Schumm',
      timezone: 'Australia/Sydney',
      schedule: [{ day_of_week: 'Monday', available_at: ' 9:00AM', available_until: ' 5:30PM' }],
    }

    doctorStore.mutations.setDoctorProfile(doctorState, payload)

    expect(doctorState.doctorProfile.name).toBe('Christy Schumm')
    expect(doctorState.doctorProfile.timezone).toBe('Australia/Sydney')
    expect(doctorState.doctorProfile.schedule.length).toBe(1)
    expect(doctorState.doctorProfile).toEqual(payload)
  })

  it('should set loading state correctly', () => {
    doctorStore.mutations.setLoading(doctorState, true)

    expect(doctorState.loading).toBeTruthy()
  })

  it('should set error state correctly', () => {
    doctorStore.mutations.setError(doctorState, 'An error occured')

    expect(doctorState.error).toBe('An error occured')
  })
})

// actions
describe('Doctor Store Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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

    const mockCommit = vi.fn()
    global.fetch = vi.fn()
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    doctorStore.actions.fetchDoctors({ commit: mockCommit })

    expect(mockCommit).toHaveBeenCalledWith('setLoading', true);
    expect(mockCommit).toHaveBeenCalledWith('setLoading', false);
    expect(mockCommit).toHaveBeenCalledWith('seDoctors', expect.arrayContaining(mockResponse));
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

// getters
describe('Doctor Store Getters', () => {
  it('should return the correct loading state', () => {
    const state = { loading: true, error: null, doctorProfile: null, doctors: [] };
    expect(doctorStore.getters.loading(state)).toBe(true);
  });

  it('should return the correct error state', () => {
    const state = { loading: false, error: 'Error occured: undefined', doctorProfile: null, doctors: [] };
    expect(doctorStore.getters.error(state)).toBe('Error occured: undefined');
  });

  it('should return the correct doctors state', () => {
    const doctorsState: IDoctorProfile[] = [
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        schedule: [{ day_of_week: 'Monday', available_at: ' 9:00AM', available_until: ' 5:30PM' }],
      },
    ]

    const state = { loading: false, error: null, doctorProfile: null, doctors: doctorsState };
    
    expect(doctorStore.getters.doctors(state).length).toBe(1);
    expect(doctorStore.getters.doctors(state)[0].name).toBe('Christy Schumm');
    expect(doctorStore.getters.doctors(state)[0].schedule.length).toBe(1);
  });

  it('should return the correct doctor profile state', () => {
    const doctorProfileState: IDoctorProfile = 
      {
        name: 'Christy Schumm',
        timezone: 'Australia/Sydney',
        schedule: [{ day_of_week: 'Monday', available_at: ' 9:00AM', available_until: ' 5:30PM' }],
      }
  
    const state = { loading: false, error: null, doctorProfile: doctorProfileState, doctors: [] };
    
    expect(doctorStore.getters.doctorProfile(state).name).toBe('Christy Schumm');
    expect(doctorStore.getters.doctorProfile(state).schedule.length).toBe(1);
  });
})
