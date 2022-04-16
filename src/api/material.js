import request from '@/utils/request'

export function getMaterials(params) {
  return request({
    url: 'admin/material',
    method: 'get',
    params,
  })
}

export function getMaterial(id) {
  return request({
    url: 'admin/material/' + id,
    method: 'get',
  })
}
