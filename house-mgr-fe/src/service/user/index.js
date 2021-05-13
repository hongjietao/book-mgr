import axios from 'axios'

export const list = (page, size) => {
  return axios.get(
    'http://localhost:3000/user/list',
    {
      params: {
        page,
        size,
      }
    }
  )
}

export const remove = (id) => {
  return axios.delete(
    `http://localhost:3000/user/${id}`
  )
}

export const add = (form) => {
  return axios.post(
    `http://localhost:3000/user/add`,
    form,
  )
}
