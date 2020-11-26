import { get } from '@/utils/request-api'

export function findRuleInfoByRuleId (ruleId) {
  return get('/rule/findRuleInfo/' + ruleId, {ruleId})
}
