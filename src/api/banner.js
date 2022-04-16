import request from '@/utils/request'

export function getBanners(params) {
  return request({
    url: 'admin/banner',
    method: 'get',
    params,
  })
}

export function getBannerList(params) {
  return request({
    url: 'admin/banner/list',
    method: 'get',
    params,
  })
}
