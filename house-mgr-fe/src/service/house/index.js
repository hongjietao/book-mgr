import { get, del, post } from '@/helpers/request'

export const add = (form) => {
  return post(
    '/house/add',
    form
    )
 }

export const list = (page = 1, size = 20, keyword = '') => {
  return get(
    '/house/list',
    {
      page,
      size,
      keyword,
    },
  )
}

export const detail = (id) => {
  return get(
    `/house/detail/${id}`
  )
}

export const remove = (id) => {
  return del(`/house/${id}`)
}


export const update = (data) => {
  return post(`/house/update`,
    data
  )
}

// export const login = (account, password) => {
//  return post('/auth/login',{
//    account,
//    password,
//  })
// }
