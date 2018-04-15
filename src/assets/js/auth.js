// 将需要token令牌的所有操作都封装在这个模块中

// 将存储到本地的key保存在常量中
const userInfoKey = 'user-info'

// 登陆成功 将服务器返回的token保存到本地
export function saveUserInfo (userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

// 从本地获取用户信息中
export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}

// 从本地获取用户信息中的token
export function getToken () {
  return JSON.parse(getUserInfo()).token
}

// 删除本地的用户的token
export function removeToken () {
  window.localStorage.removeItem(userInfoKey)
}
