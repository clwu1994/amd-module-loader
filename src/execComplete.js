export function execComplete(name) {
  moduleMap[name].oncomplete.forEach(fn => fn(moduleMap[name].exports))
}