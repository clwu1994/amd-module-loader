import { use } from "./use";
import { execMod } from "./execMod";
import { loadScript } from "./loadScript"
import { moduleMap } from "./moduleMap";
/**
 * 说明一下loadMoudle方法为加载依赖的方法，其中因为主模块加载了这些模块之后是需要作为callback的参数来
 * 使用这些模块的，因此我们既需要判断是否加载完毕，也需要将这些模块作为参数传递给主模块的callback。
 * 接下来我们来实现这个loadMoudle方法，为了一步一步实现功能，我们假设这里所有的模块都没有依赖其他模
 * 块，只有主模块依赖，因此这个时候loadMoudle方法做的事情就是创建script并将相应的文件加载进来，这里我
 * 们再次假设所有模块名和文件名一致，并且所有的js文件路径与页面文件路径一致。
 * 这个过程中我们需要知道这个script的确是加载了才执行callback，因此需要使用事件进行监听，所以有以下代码
 */
export function loadMoudle(name, callback) {
  if (!moduleMap[name]) {
    moduleMap[name] = {
      status: 'loading',
      oncomplete: []
    }
    loadScript(name, function() {
      use(moduleMap[name].deps, function(...params) {
        execMod(name, callback, params)
      })
    })
  } else if (moduleMap[name].status === 'loading') {
    moduleMap[name].push(callback)
  } else if (!moduleMap[name].exports) {
    use(moduleMap[name], function(...params) {
      execMod(name, callback, params)
    })
  } else {
    callback(moduleMap[name].exports)
  }
}