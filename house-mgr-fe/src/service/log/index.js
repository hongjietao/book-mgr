import { get, del, post } from '@/helpers/request'

export const list = (page = 1, size = 20) => {
  return get(
    '/log/list',
    {
      page,
      size
    },
  )
}

export const remove = (id) => {
  return post(
    `/log/delete`,
    {
      id,
    }
  )
}
