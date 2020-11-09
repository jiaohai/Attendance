// 获取cookie、
export function getCookie (name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (document.cookie.match(reg)) {
    arr = document.cookie.match(reg)
    return (arr[2])
  } else {
    return null
  }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (name, value, expireDays) {
  let exDate = new Date()
  exDate.setDate(exDate.getDate() + expireDays)
  document.cookie = name + '=' + escape(value) + ((expireDays == null) ? '' : ';expires=' + exDate.toGMTString())
}

// 删除cookie
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let val = getCookie(name)
  if (val != null) {
    document.cookie = name + '=' + val + ';expires=' + exp.toGMTString()
  }
}
