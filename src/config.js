export const moduleMap = {};
export const cfg = {
  baseUrl: location.href.replace(/(\/)[^\/]+$/g, (s, s1) => s1)
}
export function config(obj) {
  Object.assign(cfg, obj);
}