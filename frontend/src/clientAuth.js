import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'

const clientAuth = {

  setTokenHeader: () => {
    const token = localStorage.getItem('token')
    if(token) {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    }
  },

  signUp: (userInfo) => {
    return axios({
      url: '/api/users',
      method: 'post',
      data: userInfo
    })
  },

  logIn: (credentials) => {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data: credentials
    })
    .then(res => {
      if(res.data.token) {
        //this code hasent run unless we log in, we need to setToken above
        localStorage.setItem('token', res.data.token)
        //cut and pasted the above code from here
        //now we can run the fnx
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },

  logOut: () => {
    return new Promise((resolve) => {
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
      resolve("bye.")
    })
  },


  //the middleman between the front and the back
  getTodos: () => {
    return axios({
      url: '/api/todos',
      method: 'get'
    })
  },

  addTodo: (newTodo) => {
    return axios({
      url: '/api/todos',
      method: 'post',
      data: newTodo
    })
  },

  deleteTodo: (id) => {
    return axios({
      //fancy way of concating a string
      url: `/api/todos/${id}`,
      method: 'delete'
    })
  },

  toggleCompleted: (id) => {
    return axios({
      url: `/api/todos/${id}`,
      method: 'patch'
    })
  }
}

clientAuth.setTokenHeader()
export default clientAuth
