enum STATUS {
  pending = 'pending',
  cancelled = 'cancelled',
  confirmed = 'confirmed',
}
export interface StatisticsPatient {
  day: number;
  week: number;
  month: number;
  year: number;
  total: number;
}
export interface StatisticAppointmentsByMonth {
  month: string;
  total: string;
}
export interface StatisticAppointmentsByStatus {
  status: `${STATUS}`;
  total: number;
}
