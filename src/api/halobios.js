import request from '@/utils/request'

export function getHalobiosList(params) {
  return request({
    url: 'admin/halobios',
    method: 'get',
    params,
  })
}

export function getHalobios(id) {
  return request({
    url: 'admin/halobios/' + id,
    method: 'get',
  })
}
