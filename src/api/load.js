import request from '@/utils/request'
import { MODEL_LOAD } from './APIPATH'

export const getModelLoad = () => {
  return request.get(MODEL_LOAD)
}
