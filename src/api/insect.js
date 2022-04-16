import request from '@/utils/request'

export function getInsects(params) {
  return request({
    url: 'admin/insect',
    method: 'get',
    params,
  })
}

export function getInsect(id) {
  return request({
    url: 'admin/insect/' + id,
    method: 'get',
  })
}
