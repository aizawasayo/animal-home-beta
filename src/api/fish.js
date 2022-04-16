import request from '@/utils/request'

export function getFishes(params) {
  return request({
    url: 'admin/fish',
    method: 'get',
    params,
  })
}

export function getFish(id) {
  return request({
    url: 'admin/fish/' + id,
    method: 'get',
  })
}
