export interface IAppointmentSchedule {
  date: string
  slot: string
}

export interface IAppointment {
  firstName: string
  lastName: string
  mobileNumber: string
  emailAddress: string
  chiefComplaint: string
  doctor: string
  schedule: IAppointmentSchedule
}
