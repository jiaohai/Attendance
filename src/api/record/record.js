import { get } from '@/utils/request-api'

export function getRecordByDate (recordDate) {
  return get('/record/getRecordByDate', {recordDate})
}
