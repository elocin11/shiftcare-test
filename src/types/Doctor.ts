export interface IDoctor {
  id?: string // not available
  specialization?: string // not available
  name: string
  timezone: string
  day_of_week: string
  available_at: string
  available_until: string
}

export interface IDoctorSchedule {
  day_of_week: string
  available_at: string
  available_until: string
}

export interface IDoctorProfile
  extends Omit<IDoctor, 'day_of_week' | 'available_at' | 'available_until'> {
  schedule: IDoctorSchedule[]
}
