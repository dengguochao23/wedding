const MY_KEY = 'FeqvpG1MkYWIeafWqpZg7rSRWs5GV7Yt'
export function loadScript () {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?v=2.0&ak=${MY_KEY}&callback=_init`
    document.head.appendChild(script)
    window.onload = function () {
      let BMap = window.BMap
      resolve(BMap)
    }
  })
}
