//登录接口需要携带参数ts类型
export interface loginForm {
  username: string
  password: string
}

export interface loginResponseData {
  code: number
  data: string
  message: string
  ok: boolean
}

interface user {
  avatar: string
  name: string
  roles: string[]
  buttons: string[]
  routes: Array<string>
}

export interface userInfoResponseData {
  code: number
  data: user
  message: string
  ok: boolean
}
