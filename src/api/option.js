import request from '@/utils/request'

export function getOption(id) {
  return request({
    url: 'admin/option/' + id,
    method: 'get',
  })
}

export function getOptionList(params) {
  //非分页获查询
  return request({
    url: 'admin/option/list',
    method: 'get',
    params,
  })
}
