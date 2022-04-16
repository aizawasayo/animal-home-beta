import { login, logout, getUser } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  setUserId,
  removeUserId,
} from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    username: '',
    avatar: '',
    userId: getUserId(),
    roles: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.userId = id
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
      })
        .then(response => {
          const { data } = response

          if (!data) {
            reject('验证失败，请重新登陆')
          }
          const { user, token } = data
          commit('SET_TOKEN', token)
          commit('SET_ID', user._id)
          setToken(token)
          setUserId(user._id)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let id = getUserId()
      getUser(id)
        .then(response => {
          const { data } = response

          if (!data) {
            reject('用户信息获取失败')
          }

          const { roles, username, avatar } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('用户角色必须是一个非空数组!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken() // must remove  token  first
          removeUserId()
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUserId()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
