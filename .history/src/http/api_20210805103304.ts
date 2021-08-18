import http from "./"

export default {
  login({username, password}: {username: string, password: string}) {
    return http.post('/login', {
      username,
      password
    })
  }
}