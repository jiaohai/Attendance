import { get } from '@/utils/request-api'

export function ifAttendance (employeeId) {
  console.log(employeeId)
  return get('/rule/attendance', {employeeId})
}
