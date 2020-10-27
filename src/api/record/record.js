import { get } from '@/utils/request-api'

export function getRecordByDate (recordDate) {
  return get('/record/getRecordByDate', {recordDate})
}

export function getRecordOutByTime (recordTime) {
  return get('/recordOut/getRecordOutByTime', {recordTime})
}

export function getRecordCountByTime (recordTime) {
  return get('/record/getRecordCountByTime', {recordTime})
}
