import request from '@/utils/request'

export function getFossils(params) {
  return request({
    url: 'admin/fossil',
    method: 'get',
    params,
  })
}

export function getFossil(id) {
  return request({
    url: 'admin/fossil/' + id,
    method: 'get',
  })
}
