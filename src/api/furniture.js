import request from '@/utils/request'

export function getFurnitureList(params) {
  return request({
    url: 'admin/furniture',
    method: 'get',
    params,
  })
}

export function getFurniture(id) {
  return request({
    url: 'admin/furniture/' + id,
    method: 'get',
  })
}
