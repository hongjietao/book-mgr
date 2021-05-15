import axios from 'axios'

export const add = (form) => {
  return axios.post(
    'http://localhost:3000/house/add',
    form
    )
 }

export const list = (page = 1, size = 20) => {
  return axios.get(
    'http://localhost:3000/house/list',
    {
      params: {
        page,
        size
      }
    },
  )
}

export const detail = (id) => {
  return axios.get(
    `http://localhost:3000/house/detail/${id}`
  )
}

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/house/${id}`)
}


export const update = (data) => {
  return axios.post(`http://localhost:3000/house/update`,
    data
  )
}

// export const login = (account, password) => {
//  return axios.post('http://localhost:3000/auth/login',{
//    account,
//    password,
//  })
// }
