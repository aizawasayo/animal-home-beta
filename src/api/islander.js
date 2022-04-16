import request from '@/utils/request'

export function getIslanders(params) {
  return request({
    url: 'admin/islander',
    method: 'get',
    params,
  })
}

export function getIslander(id) {
  return request({
    url: 'admin/islander/' + id,
    method: 'get',
  })
}

export function getBirthIslander(birth) {
  return request({
    url: 'admin/islander/' + birth,
    method: 'get',
  })
}
