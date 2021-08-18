import http from "./"

export default {
  login({ username, password }: { username: string, password: string }) {//登录
    return http.post('/login', {
      username,
      password
    })
  }
}