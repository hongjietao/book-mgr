import axios from 'axios'

export const add = (form) => {
  return axios.post(
    'http://localhost:3000/house/add',
    form
    )
 }

 export const list = (data) => {
   return axios.get(
     'http://localhost:3000/house/list',
     {
      params: data
     },
   )
 }
// export const login = (account, password) => {
//  return axios.post('http://localhost:3000/auth/login',{
//    account,
//    password,
//  })
// }
