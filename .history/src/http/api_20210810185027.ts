import http from "./"
import qs from "qs"

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
  },
  // 权限列表 值 list 或 tree , list 列表显示权限, tree 树状显示权限
  rightslist({ type }: { type: string }) {
    return http.get(`rights/${type}`)
  },
  // 角色授权,权限 ID 列表（字符串）
  roleId({ roleId, rids }: { roleId: number, rids: any }) {
    return http.post(`roles/${roleId}/rights`, qs.stringify({ rids }))
  },
  // 获取商品列表
  goodslist({ query, pagenum, pagesize }: { query: string, pagenum: number, pagesize: number }) {
    return http.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
  },
  // 删除商品
  delgoods({ id }: { id: number }) {
    return http.delete(`goods/${id}`)
  },
  // 商品分类数据列表
  getcategories() {
    return http.get(`categories`)
  },
  // 订单数据列表
  orders({ query, pagenum, pagesize }: { query: string, pagenum: number, pagesize: number }) {
    return http.get(`/orders?/query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
  },
  // 参数列表
  categories({ id, sel }: { id: number, sel: any }) {
    return http.get(`categories/${id}/attributes?sel=${sel}`)
  },
  // 添加动态参数或者静态属性
  addcategories({ id, attr_name, attr_sel, attr_vals }: { id: number, attr_name: string, attr_sel: string, attr_vals: string }) {
    return http.post(`categories/${id}/attributes`, { attr_name, attr_sel, attr_vals })
  },
  //编辑提交参数
  editcategories({ id, attrId, attr_name, attr_sel, attr_vals }: { id: number, attrId: number, attr_name: string, attr_sel: string, attr_vals: string }) {
    return http.put(`categories/${id}/attributes/${attrId}`, { attr_name, attr_sel, attr_vals })
  },
  // 删除参数
  delete({ id, attrid }: { id: number, attrid: number }) {
    return http.delete(`categories/${id}/attributes/${attrid}`)
  }
}