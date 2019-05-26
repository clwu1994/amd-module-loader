import { moduleMap } from "./moduleMap";
import { execComplete } from "./execComplete";
export function execMod(name, callback, params) {
  const exp = moduleMap[name].callback(...params)
  moduleMap[name].exports = exp
  callback(exp)
  execComplete(name)
}