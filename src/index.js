const moduleMap = {}
/**
 * 首先我们需要明白我们需要有一个所有模块的入口也就是主模块，主模块的依赖加载的过程中迭代加
 * 载相应的依赖，我们使用use方法来加载使用主模块。同时我们需要明白加载依赖之后需要执行模块的
 * 方法，这显然应该使用callback，同时为了多个模块依赖同一个模块的时候，不会多次执行这个模块
 * 我们应该判断这个模块是否已经加载过，因此我们可以使用一个对象来描述一个模块。而所有的模块我
 * 们可以一个对象来存储，使用模块名作为属性名来区分不同模块。首先我们先来实现use方法，这个方法
 * 就是主模块方法，使用这个模块的方法就是加载依赖之后，执行主模块的方法
 */
function use(deps, callback) {
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
        callback.apply(null, params)
      }
    })
  }
}

/**
 * 说明一下loadMoudle方法为加载依赖的方法，其中因为主模块加载了这些模块之后是需要作为callback的参数来
 * 使用这些模块的，因此我们既需要判断是否加载完毕，也需要将这些模块作为参数传递给主模块的callback。
 * 接下来我们来实现这个loadMoudle方法，为了一步一步实现功能，我们假设这里所有的模块都没有依赖其他模
 * 块，只有主模块依赖，因此这个时候loadMoudle方法做的事情就是创建script并将相应的文件加载进来，这里我
 * 们再次假设所有模块名和文件名一致，并且所有的js文件路径与页面文件路径一致。
 * 这个过程中我们需要知道这个script的确是加载了才执行callback，因此需要使用事件进行监听，所以有以下代码
 */
function loadMoudle(name, callback) {
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
  }
}

function execMod(name, callback, params) {
  var exp = moduleMap[name].callback(...params)
  callback(exp)
}

function loadScript(name, callback) {
  const doc = document
  const script = doc.createElement('script')
  script.charset = 'utf-8'
  script.src = `${name}.js`
  script.id = `loadjs-js-${(Math.random() * 100).toFixed(3)}`
  script.onload = callback
  doc.body.appendChild(script)
}

/**
 * 接着我们需要来实现最为核心的define函数，这个函数的目的是定义模块，为了简便避免做类型判断，我们
 * 暂时规定所有的模块都必须定义模块名，不允许匿名模块的使用，并且我们先暂且假设这里没有模块依赖。
 */

function define(name, deps, callback) {
  moduleMap[name] = moduleMap[name] || {}
  moduleMap[name].deps = deps
  moduleMap[name].status = 'loaded'
  moduleMap[name].callback = callback
  moduleMap[name].oncomplete = moduleMap[name].oncomplete || []
}

window.define = define;
export default loadjs = { define, use };