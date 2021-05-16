import { get, del, post } from '@/helpers/request'

export const list = () => {
  return get(
    '/character/list'
  )
}
