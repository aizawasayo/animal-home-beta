const getters = {
  preset: state => state.settings.preset,
  menu: state => state.app.menu,
  token: state => state.user.token,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  roles: state => state.user.roles
}
export default getters
