import { moduleMap } from './config'
function execComplete(name) {
  moduleMap[name].oncomplete.forEach(fn => fn(moduleMap[name].exports))
}
export function execMod(name, callback, params) {
  const exp = moduleMap[name].callback(...params)
  moduleMap[name].exports = exp
  callback(exp)
  execComplete(name)
}
