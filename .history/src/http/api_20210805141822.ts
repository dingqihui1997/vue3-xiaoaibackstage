import http from "./"

export default {
  login({ username, password }: { username: string, password: string }) {//登录
    return http.post('/login', {
      username,
      password
    })
  },
  users({ query, pagenum, pagesize }: { query: string, pagenum: number, pagesize: number }) {//登录
    return http.post('/login', {
      query,
      pagenum,
      pagesize
    })
  }
}