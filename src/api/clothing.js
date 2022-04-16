import request from '@/utils/request'

export function getClothingList(params) {
  return request({
    url: 'admin/clothing',
    method: 'get',
    params,
  })
}

export function getClothing(id) {
  return request({
    url: 'admin/clothing/' + id,
    method: 'get',
  })
}
