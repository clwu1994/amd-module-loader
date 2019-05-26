export function loadScript(name, callback) {
  const doc = document
  const script = doc.createElement('script')
  script.charset = 'utf-8'
  script.src = `${name}.js`
  script.id = `loadjs-js-${(Math.random() * 100).toFixed(3)}`
  script.onload = callback
  doc.body.appendChild(script)
}