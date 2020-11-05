import { get } from '@/utils/request-api'

export function recordDate (recordDate, employeeId) {
  return get('/record/recordDate', {recordDate, employeeId})
}

export function count (yearMonth, employeeId) {
  return get('/record/count', {yearMonth, employeeId})
}

export function findById (id) {
  return get('/rule/findById', {id})
}
