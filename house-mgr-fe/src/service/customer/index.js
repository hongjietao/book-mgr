import { get, del, post } from '@/helpers/request'

export const add = (form) => {
  return post(
    '/customer/add',
    form
    )
 }

export const list = (page = 1, size = 20) => {
  return get(
    '/customer/list',
    {
      page,
      size
    },
  )
}

export const detail = (id) => {
  return get(
    `/customer/detail/${id}`
  )
}

export const remove = (id) => {
  return del(`/customer/${id}`)
}


export const update = (data) => {
  return post(`/customer/update`,
    data
  )
}

// export const login = (account, password) => {
//  return post('/auth/login',{
//    account,
//    password,
//  })
// }
