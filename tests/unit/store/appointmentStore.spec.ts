import { describe, expect, it } from 'vitest'
import store from '../../../src/store/index'
import type { IAppointment } from '../../../src/types/Appointment'

// mutations
describe('Appointment Store Mutations', () => {
  it('should commit a mutation to set appointments state correctly', () => {
    const payload: IAppointment[] = [
      {
        firstName: 'Nicole',
        lastName: 'Alday',
        mobileNumber: '09161848618',
        emailAddress: 'nicole.alday1111@gmail.com',
        chiefComplaint: 'Backpain',
        doctor: 'Christy Schumm',
        schedule: {
          date: '2025-02-20',
          slot: '9:00AM - 9:30AM',
        },
      },
      {
        firstName: 'Nicole',
        lastName: 'Alday',
        mobileNumber: '09161848618',
        emailAddress: 'nicole.alday1111@gmail.com',
        chiefComplaint: 'Headache',
        doctor: 'Ramy Malik',
        schedule: {
          date: '2025-02-28',
          slot: '11:30PM - 12:00PM',
        },
      },
    ]

    store.commit('appointmentStore/setAppointments', payload)

    expect(store.state.appointmentStore.appointments.length).toBe(2)
    expect(store.state.appointmentStore.appointments[0].doctor).toBe('Christy Schumm')
    expect(store.state.appointmentStore.appointments[0].schedule.date).toBe('2025-02-20')
    expect(store.state.appointmentStore.appointments[1].doctor).toBe('Ramy Malik')
    expect(store.state.appointmentStore.appointments[1].schedule.date).toBe('2025-02-28')
    expect(store.state.appointmentStore.appointments).toEqual(payload)
  })

  it('should commit a mutation to set loading state correctly', () => {
    store.commit('appointmentStore/setLoading', true)

    expect(store.state.appointmentStore.loading).toBeTruthy()
  })

  it('should commit a mutation to set error state correctly', () => {
    store.commit('appointmentStore/setError', 'An error occured')

    expect(store.state.appointmentStore.error).toBe('An error occured')
  })
})

// actions
describe('Appointment Store Actions', () => {
  // WIP
})
