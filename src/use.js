import { moduleMap } from "./moduleMap";
/**
 * 首先我们需要明白我们需要有一个所有模块的入口也就是主模块，主模块的依赖加载的过程中迭代加
 * 载相应的依赖，我们使用use方法来加载使用主模块。同时我们需要明白加载依赖之后需要执行模块的
 * 方法，这显然应该使用callback，同时为了多个模块依赖同一个模块的时候，不会多次执行这个模块
 * 我们应该判断这个模块是否已经加载过，因此我们可以使用一个对象来描述一个模块。而所有的模块我
 * 们可以一个对象来存储，使用模块名作为属性名来区分不同模块。首先我们先来实现use方法，这个方法
 * 就是主模块方法，使用这个模块的方法就是加载依赖之后，执行主模块的方法
 */
export function use(deps, callback) {
  let depsLength = deps.length
  if (depsLength === 0) {
    callback()
  }
  const params = []
  for (let i = 0; i < depsLength; i++) {
    loadMoudle(deps[i], function(param) {
      depsLength--
      params[i] = param
      if (depsLength === 0) {
        callback(...params)
      }
    })
  }
}