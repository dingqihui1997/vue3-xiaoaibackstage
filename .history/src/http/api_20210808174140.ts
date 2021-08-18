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
  getAddusers({ username, password, email, mobile }: { username: string, password: string, email: string, mobile: number }) {//添加用户
    return http.post('/users', {
      username, password, email, mobile
    })
  },
  //编辑用户提交
  getEditusers({ id, email, mobile }: { id: number, email: string, mobile: number }) {
    return http.put(`/users/${id}`, {
      email, mobile
    })
  },
  // 删除单个用户
  deleteUsers({ id }: { id: number }) {
    return http.delete(`/users/${id}`)
  },
  // 分配用户角色
  distributionUsers({ id, rid }: { id: number, rid: number }) {
    return http.put(`users/${id}/role`, {
      rid
    })
  },
  // 修改用户状态
  stateUsers({ uId, type }: { uId: number, type: boolean }) {
    return http.put(`users/${uId}/state/${type}`)
  },
  // 角色列表
  roleslist() {
    return http.get('/roles')
  },
  // 添加角色
  addroles({ roleName, roleDesc }: { roleName: string, roleDesc: string }) {
    return http.post('roles', {
      roleName, roleDesc
    })
  },
  //  编辑提交角色
  Editroles({ id, roleName, roleDesc }: { id: number, roleName: string, roleDesc: string }) {
    return http.put(`roles/${id}`, { roleName, roleDesc })
  },
  // 删除角色
  delroles({ id }: { id: number }) {
    return http.delete(`roles/${id}`)
  },
  // 删除角色指定权限
  deloneroles({ roleId, rightId }: { roleId: number, rightId: number }) {
    return http.delete(`roles/${roleId}/rights/${rightId}`)
  }
}