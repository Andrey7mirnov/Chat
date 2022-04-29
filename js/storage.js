export const STORAGE = {
  SET_USER(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },
  GET_USER() {
    return JSON.parse(localStorage.getItem('user'));
  }
}