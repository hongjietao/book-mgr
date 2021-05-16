import { get, del, post } from '@/helpers/request'
import { getToken } from '@/helpers/token'

// defaults.headers['Authorization'] = `Bearer ${getToken()}`

export const add = (form) => {
 return post(
   '/book/add',
   form
   )
}

export const list = (data) => {
  return get(
    '/book/list',
    data
  )
}

export const remove = (id) => {
  return del(`/book/${id}`)
}

export const updateCount = (data = {}) => {
  return post(
   `/book/update/count`,
    data,
  )
}

export const update = (data = {}) => {
  return post(
    `/book/update`,
    data,
  )
}

export const detail = (id) => {
  return get(
    `/book/details/${id}`
  )
}
