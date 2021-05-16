import { get, del, post } from '@/helpers/request'

export const list = (page=1, size=20, keyword='') => {
  return get(
    '/user/list',
    {
      page,
      size,
      keyword,
    }
  )
}

export const remove = (id) => {
  return del(
    `/user/${id}`
  )
}

export const add = (form) => {
  return post(
    `/user/add`,
    form,
  )
}

export const resetPassword = (id) => {
  return post(
    `/user/reset/password`,
    {
      id
    },
  )
}

export const editCharacter = (character, userId) => {
  return post(
    `/user/update/character`,
    {
      character,
      userId,
    },
  )
}

export const info = () => {
  return get(`/user/info`)
}

export const addMany = (key) => {
  return post(`/user/addMany`,{
    key
  })
}
