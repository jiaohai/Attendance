import { get } from '../../utils/request-api'

export function getRecordByDate (recordDate) {
  return get('/record/getRecordByDate', {recordDate})
}

export function getRecordOutByTime (recordTime, employeeId) {
  return get('/recordOut/getRecordOutByTime', {recordTime, employeeId})
}

export function getRecordCountByTimeForECharts (recordTime) {
  return get('/record/getRecordCountByTimeForECharts', {recordTime})
}

export function getRecordCountByTime (recordTime) {
  return get('/record/getRecordCountByTime', {recordTime})
}
