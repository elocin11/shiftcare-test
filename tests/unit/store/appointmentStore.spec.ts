import { describe, expect, it, vi, beforeEach } from 'vitest'
import store from '../../../src/store/index'
import appointmentStore, { IAppointmentState } from '../../../src/store/appointmentStore'
import type { IAppointment } from '../../../src/types/Appointment'

// mutations
describe('Appointment Store Mutations', () => {
  const appointmentState:IAppointmentState = {
    loading: false,
    error: null,
    formData: null,
    appointments: [],
  }
  
  beforeEach(() => {
    appointmentState.loading = false;
    appointmentState.error = null;
    appointmentState.formData = null;
    appointmentState.appointments = [];
  });

  it('should set the appointments state correctly', () => {
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

    appointmentStore.mutations.setAppointments(appointmentState, payload)

    expect(appointmentState.appointments.length).toBe(2)
    expect(appointmentState.appointments[0].doctor).toBe('Christy Schumm')
    expect(appointmentState.appointments[1].doctor).toBe('Ramy Malik')
  })

  it('should set the loading state correctly', () => {
    appointmentStore.mutations.setLoading(appointmentState, true)

    expect(appointmentState.loading).toBeTruthy()
  })

  it('should set the error state correctly', () => {
    // store.commit('appointmentStore/setError', 'An error occured')
    appointmentStore.mutations.setError(appointmentState, 'An error occured')
    expect(store.state.appointmentState.error).toBe('An error occured')
    expect(appointmentState.error).toBe('An error occured')
  })
})

// actions
describe('Appointment Store Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('shiftcare-appointments', JSON.stringify([]));
  })
  // WIP: additional unit tests
  it('should save appointment data to localStorage successfully', async () => {
    const mockCommit = vi.fn();
    const mockDispatch = vi.fn();
    const mockAppointment =       {
        firstName: "Nicole",
        lastName: "Alday",
        emailAddress: "nicole.alday1111@gmail.com",
        mobileNumber: "09161848618",
        chiefComplaint: "Backpain",
        doctor: "Christy Schumm",
        schedule: {
          date: "2025-02-24",
          slot: "9:00am - 9:30am"
        }
      }

    await appointmentStore.actions.saveFormData({ commit: mockCommit, dispatch: mockDispatch }, mockAppointment);
  
    // Check loading state
    expect(mockCommit).toHaveBeenCalledWith('setLoading', true);
    expect(mockCommit).toHaveBeenCalledWith('setLoading', false);
    expect(mockCommit).toHaveBeenCalledWith('setError', null);
    expect(JSON.parse(localStorage.getItem('shiftcare-appointments') || '[]')).toContainEqual({
        firstName: "Nicole",
        lastName: "Alday",
        emailAddress: "nicole.alday1111@gmail.com",
        mobileNumber: "09161848618",
        chiefComplaint: "Backpain",
        doctor: "Christy Schumm",
        schedule: {
          date: "2025-02-24",
          slot: "9:00am - 9:30am"
        }
      })
  });

  it('should handle error when form data is invalid', async () => {
    const mockCommit = vi.fn();
    const mockAppointment = {
      firstName: "Nicole",
      lastName: "Alday",
      emailAddress: "nicole.alday1111@gmail.com",
      mobileNumber: "09161848618",
      chiefComplaint: "Backpain",
      doctor: "Christy Schumm",
      schedule: {
        date: "",
        slot: ""
      }
    };
  
    await appointmentStore.actions.saveFormData({ commit: mockCommit }, mockAppointment);
  
    expect(mockCommit).toHaveBeenCalledWith('setLoading', true);
    expect(mockCommit).toHaveBeenCalledWith('setLoading', false);
    expect(mockCommit).toHaveBeenCalledWith('setError', 'Error encountered: The date and slot fields are required');
  });

  it('should remove an appointment correctly', async () => {
    const mockCommit = vi.fn();
    const mockDispatch = vi.fn();
    const mockAppointment = {
        firstName: "Nicole",
        lastName: "Alday",
        emailAddress: "nicole.alday1111@gmail.com",
        mobileNumber: "09161848618",
        chiefComplaint: "Backpain",
        doctor: "Christy Schumm",
        schedule: {
          date: "2025-02-24",
          slot: "9:00am - 9:30am"
        }
      };

    await appointmentStore.actions.saveFormData({ commit: mockCommit, dispatch: mockDispatch }, mockAppointment);
    await appointmentStore.actions.removeAppointment({ commit: mockCommit, dispatch: mockDispatch }, mockAppointment);
  
    expect(mockCommit).toHaveBeenCalledWith('setLoading', true);
    expect(mockCommit).toHaveBeenCalledWith('setLoading', false);
    expect(localStorage.getItem('shiftcare-appointments')).toBe('[]');
    expect(mockDispatch).toHaveBeenCalledWith('fetchAppointments');
  });

  it('should handle error when removing an appointment', async () => {
    const mockCommit = vi.fn();
    const mockDispatch = vi.fn();
    const mockAppointment =       {
        firstName: "Nicole",
        lastName: "Alday",
        emailAddress: "nicole.alday1111@gmail.com",
        mobileNumber: "09161848618",
        chiefComplaint: "Backpain",
        doctor: "Christy Schumm",
        schedule: {
          date: "2025-02-24",
          slot: "9:00am - 9:30am"
        }
      };
  
    await appointmentStore.actions.removeAppointment({ commit: mockCommit, dispatch: mockDispatch }, mockAppointment);
  
    expect(mockCommit).toHaveBeenCalledWith('setLoading', true);
    expect(mockCommit).toHaveBeenCalledWith('setLoading', false);
    expect(mockCommit).toHaveBeenCalledWith('setError', 'Error encountered: Cannot read property of undefined');
  });

  it('should fetch appointments correctly and sort them', async () => {
    const mockCommit = vi.fn();
    const mockData = [
      {
        firstName: "Nicole",
        lastName: "Alday",
        emailAddress: "nicole.alday1111@gmail.com",
        mobileNumber: "09161848618",
        chiefComplaint: "Backpain",
        doctor: "Christy Schumm",
        schedule: {
          date: "2025-02-24",
          slot: "9:00am - 9:30am"
        }
      },
      {
        firstName: "Nicole",
        lastName: "Alday",
        emailAddress: "nicole.alday1111@gmail.com",
        mobileNumber: "09161848618",
        chiefComplaint: "Backpain",
        doctor: "Natalia Stanton Jr.",
        schedule: {
          date: "2025-02-22",
          slot: "1:00pm - 1:30pm"
        }
      }
    ];

    localStorage.setItem('shiftcare-appointments', JSON.stringify(mockData)); // Mock localStorage
  
    await appointmentStore.actions.fetchAppointments({ commit: mockCommit });
  
    expect(mockCommit).toHaveBeenCalledWith('setLoading', true);
    expect(mockCommit).toHaveBeenCalledWith('setLoading', false);
    expect(mockCommit).toHaveBeenCalledWith('setAppointments', expect.arrayContaining(mockData));
  });

  // WIP: additional unit tests for edge cases
  // test when the localstorage is empty or shiftcare-appointments key doesn't exist
  // test when the fetched appointments is not sorted correctly (same date, different slots)
})

// getters
describe('Appointment Store Getters', () => {
  it('should return the correct loading state', () => {
const state = { loading: true, error: null, appointments: [], formData: [] };
    expect(appointmentStore.getters.loading(state)).toBe(true);
  });

  it('should return the correct error state', () => {
    const state = { loading: true, error: 'Error occured: undefined', appointments: [], formData: [] };
    expect(appointmentStore.getters.error(state)).toBe('Error occured: undefined');
  });

  it('should return the correct appointments state', () => {
    const appointmentsState: IAppointment[] = [
      {
        firstName: "Nicole",
        lastName: "Alday",
        emailAddress: "nicole.alday1111@gmail.com",
        mobileNumber: "09161848618",
        chiefComplaint: "Backpain",
        doctor: "Christy Schumm",
        schedule: {
          date: "2025-02-24",
          slot: "9:00am - 9:30am"
        }
      },
      {
        firstName: "Nicole",
        lastName: "Alday",
        emailAddress: "nicole.alday1111@gmail.com",
        mobileNumber: "09161848618",
        chiefComplaint: "Backpain",
        doctor: "Natalia Stanton Jr.",
        schedule: {
          date: "2025-02-22",
          slot: "1:00pm - 1:30pm"
        }
      }
    ]

    const state = { loading: true, error: 'Error occured: undefined', appointments: appointmentsState, formData: [] };
    
    expect(appointmentStore.getters.appointments(state).length).toBe(2);
    expect(appointmentStore.getters.appointments(state)[0].doctor).toBe('Christy Schumm');
    expect(appointmentStore.getters.appointments(state)[1].doctor).toBe('Natalia Stanton Jr.');
  });
})
