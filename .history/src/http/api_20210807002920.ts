import http from "./"

export default {
  login({ username, password }: { username: string, password: string }) {//登录
    return http.post('/login', {
      username,
      password
    })
  },
  // 用户数据列表
  Getusers({ query, pagenum, pagesize }: { query: string, pagenum: number, pagesize: number }) {
    return http.get(`/users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
  },
  getmenus() {//左侧菜单栏
    return http.get('/menus')
  },
  // 添加用户
  getusers({ username, password, email, mobile }: { username: string, password: string, email: string, mobile: string }) {//添加用户
    return http.post('/users', {
      username, password, email, mobile
    })
  }
}