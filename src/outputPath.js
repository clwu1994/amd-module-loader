// 完整路径
const fullPathRegExp = /^[(https?\:\/\/)|(file\:\/\/)]/;
// 绝对路径
const absoPathRegExp = /^\//;
// 相对路径
const relaPathRegExp = /^\.\//;
const relaPathBackRegExp = /^\.\.\//;
export function outputPath(baseUrl, path) {
  if (relaPathRegExp.test(path)) {
    const pathArr = baseUrl.split('/');
    const backPath = path.match(/\.\.\//g);
    const joinPath = path.replace(/[(^\./)|(\.\.\/)]+/g, '');
    const num = pathArr.length - backPath.length;
  } else if (fullPathRegExp.test(path)) {
    return path;
  } else if (absoPathRegExp.test(path)) {
    return baseUrl.replace(/\/$/g, '') + path;
  } else {
    return baseUrl.replace(/\/$/g, '') + '/' + path;
  }
}
