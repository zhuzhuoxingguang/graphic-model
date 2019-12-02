import request from '@/utils/request'
import { SUBSTATIONS_LIST } from './APIPATH'

export const getSubstationsFeeders = (substationName = '', page = 1, pageSize = 10) => {
  return request.post(SUBSTATIONS_LIST, { substationName, page, pageSize })
}
