import request from "@/utils/request"
import { MODEL_LOAD } from "./APIPATH"

export const getModels = () => {
  return request.get(MODEL_LOAD)
}