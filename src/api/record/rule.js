import { get } from '@/utils/request-api'

export function findRuleInfoByRuleId (ruleId) {
  return get('/api/rule/findRuleInfo/' + ruleId, {ruleId})
}
