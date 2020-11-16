import { get, post } from '@/utils/request-api'

export function getRecordByDate (recordDate) {
  return get('/record/getRecordByDate', {recordDate})
}

export function getRecordOutByTime (recordTime) {
  return get('/recordOut/getRecordOutByTime', {recordTime})
}

export function getRecordCountByTimeForECharts (recordTime) {
  return get('/record/getRecordCountByTimeForECharts', {recordTime})
}

export function getRecordCountByTime (recordTime) {
  return get('/record/getRecordCountByTime', {recordTime})
}

export function checkRecordOut (recordOut) {
  debugger
  return post('/recordOut/add', recordOut)
}
