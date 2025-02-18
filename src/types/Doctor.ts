export interface IDoctor {
  id?: number // not available
  name: string
  timezone: string
  day_of_week: string
  available_at: string
  available_until: string
  specialization?: string // not available
  avatar?: string // not available
}
