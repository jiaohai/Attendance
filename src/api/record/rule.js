import { get } from '@/utils/request-api'

export function findRuleInfoByRuleId (ruleId) {
  return get('/wxkq/rule/findRuleInfo/' + ruleId, {ruleId})
}
