import { moduleMap } from "./moduleMap";
/**
* 接着我们需要来实现最为核心的define函数，这个函数的目的是定义模块，为了简便避免做类型判断，我们
* 暂时规定所有的模块都必须定义模块名，不允许匿名模块的使用，并且我们先暂且假设这里没有模块依赖。
*/
export function define(name, deps, callback) {
 moduleMap[name] = moduleMap[name] || {}
 moduleMap[name].deps = deps
 moduleMap[name].status = 'loaded'
 moduleMap[name].callback = callback
 moduleMap[name].oncomplete = moduleMap[name].oncomplete || []
}