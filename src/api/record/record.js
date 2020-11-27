import { get } from '../../utils/request-api'

export function getRecordByDate (recordDate) {
  return get('/wxkq/record/getRecordByDate', {recordDate})
}

export function getRecordOutByTime (recordTime, employeeId) {
  return get('/wxkq/recordOut/getRecordOutByTime', {recordTime, employeeId})
}

export function getRecordCountByTimeForECharts (recordTime) {
  return get('/wxkq/record/getRecordCountByTimeForECharts', {recordTime})
}

export function getRecordCountByTime (recordTime) {
  return get('/wxkq/record/getRecordCountByTime', {recordTime})
}
