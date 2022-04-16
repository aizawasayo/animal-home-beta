import { getOptionList } from '@/api/option'

export function getOption(type, callback) {
  getOptionList({
    type,
  }).then(res => {
    let optionList = res.data.map(item => {
      return {
        text: item.name,
        value: item.name,
      }
    })
    callback(optionList)
  })
}

export function getOptionsByKeys(optionKeys, target) {
  for (let item of optionKeys) {
    let requestKey = item.requestKey ? item.requestKey : item.filterKey
    getOption(requestKey, list => {
      target.selectLists[item.filterKey + 'List'] = list
    })
  }
}

export function getPageTitle(pageTitle) {
  const title = title || '动森之家'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

// 获取分页列表
export function getList(getListFun, target, refresh) {
  target.listLoading = true
  if (refresh === 'refresh') {
    target.queryInfo.page = 1
  }
  getListFun(target.queryInfo).then(response => {
    target.list = response.data.list
    target.total = response.data.total || 0
    target.listLoading = false
  })
}

// 获取详情
// export function getDetail(id, name, getDetailFun, target) {
//   getDetailFun(id)
//     .then(res => {
//       target.dialogAddVisible = true
//       target.$nextTick(function () {
//         target[`new${firstToUpper(name)}`] = res.data
//       })
//     })
//     .catch(err => Message.error(err.message))
// }

// 多图上传组件 @change 回调
// 把fileList放到页面的临时图片数组
export function fileChange(fileList, target) {}

import { compressFile } from '@/utils/compress'
import { uploadMult } from '@/api/upload'

// 压缩图片之后手动上传
export async function multiUpload(uploadList) {
  const formData = new FormData()
  for (let f of uploadList) {
    let resFile = await compressFile(f)
    formData.append('photoSrc', resFile, f.name)
  }
  try {
    const { data } = await uploadMult(formData)
    // target.$root.$dialogLoader.showSnackbar(res.message, {
    //   color: 'success',
    // })
    const photoList = []
    data.forEach(pic => {
      let src = pic.path
      const name = pic.name
      src = src.replace('/public', '')
      const newPic = { name: name, src: src }
      photoList.push(newPic)
    })
    return photoList
  } catch (err) {
    $Vue.$dialogLoader.showSnackbar(err.message, { color: 'error' })
  }
}

export function clearFiles(target, dataObj) {
  target.uploadList = []
  target[dataObj].photoSrc = []
}

export function resetForm(target) {
  target.$refs.addForm.reset()
  target.$refs.addForm.resetValidation()
}

export async function handleDelete(deleteFun, id, type, callback) {
  let params = [] // 用来处理评论 api 的特殊情况
  type ? (params = [id, type]) : (params = [id])
  if (
    await $Vue.$confirm('提示', '是否要永久删除该信息？', {
      color: 'warning',
    })
  ) {
    const res = await deleteFun(...params)
    $Vue.$dialogLoader.showSnackbar(res.message, {
      color: 'success',
    })
    callback && callback()
  } else {
    $Vue.$dialogLoader.showSnackbar('已取消删除', {
      color: 'info',
    })
  }
}
