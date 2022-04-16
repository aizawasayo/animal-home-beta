import request from '@/utils/request'

export function getTools(params) {
  return request({
    url: 'admin/tool',
    method: 'get',
    params,
  })
}

export function getTool(id) {
  return request({
    url: 'admin/tool/' + id,
    method: 'get',
  })
}
