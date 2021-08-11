import { fetchApi } from '@/utils/ajax'
import URL from '@/api/urlConfig'
import Quill from 'quill'

import { container, ImageExtend, QuillWatch } from './quill-image-module'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
  placeholder: '',
  theme: 'snow', // 主题
  modules: {
    ImageExtend: {
      // // 可选参数 是否显示上传进度和提示语
      // // Optional parameters. Whether to display upload progress and prompt
      // loading: true,
      // // 图片参数名
      // // Picture parameter name
      // name: 'file',
      // // 可选参数 图片大小，单位为M，1M = 1024kb
      // // Optional parameters. Image size, Unit is M
      // size: 1,
      // // 服务器地址, 如果action为空，则采用base64插入图片
      // // Server address, if action is empty, use base64 to insert picture
      // action: URL.ADMINOPERATOR.upload,
      // // 可选 可上传的图片格式
      // // Optional, uploadable image format
      // accept:
      //   'image/jpg, image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
      // // response 为一个函数用来获取服务器返回的具体图片地址
      // // response is a function to get the specific image address returned by the server
      // // 例如服务器返回 {code: 200; data:{ url: 'baidu.com'}}
      // // For example, the server returns {code: 200; data:{ url: 'baidu.com'}}
      // // 则 return res.data.url
      // response: res => {
      //   return res.data.url
      // },
      // // 可选参数 设置请求头部
      // // Optional parameter. Set request header
      // headers: xhr => {
      //   // 比如添加 csrf-token
      //   // For example, add csrf-token
      //   // let tokenStr = 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN')
      //   // config.headers.Authorization = tokenStr
      //   //xhr.setRequestHeader('X-CSRFToken', 'TestToken')
      //   //access_channel: 'mgmt',
      //   xhr.setRequestHeader('access_channel', 'mgmt')
      //   xhr.setRequestHeader(
      //     'authorization',
      //     localStorage.getItem('SD_ACCESS_TOKEN')
      //   )
      //   xhr.setRequestHeader('access_token', store.state.Case_Access_Token)
      // },
      // // 图片超过大小的回调
      // // Callback when the image exceeds the size
      // sizeError: () => {
      //   alert('图片大小超过 1 M')
      // },
      // // 可选参数 自定义开始上传触发事件
      // // Optional parameters. Custom start upload trigger event
      // start: () => {},
      // // 可选参数 自定义上传结束触发的事件，无论成功或者失败
      // // Optional parameters. Customize the event triggered by the end of upload, regardless of success or failure
      // end: () => {},
      // // 可选参数 上传失败触发的事件
      // // Optional parameter. The event triggered by upload failure
      // error: () => {},
      // // 可选参数  上传成功触发的事件
      // // Optional parameter. The event triggered by a successful upload
      // success: () => {},
      // // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
      // // Optional parameters. Select the picture to trigger. It can also be used to set the header, but there is one more parameter than headers, which can be set formData
      // change: (xhr, formData) => {
      //   formData.append('example', 'test')
      // },
      action: URL.ADMINOPERATOR.upload,
      //新增的回调函数
      upload: function(self) {
        let formData = new FormData()
        formData.append('file', self.file)
        fetchApi(URL.ADMINOPERATOR.upload, formData, 'POST').then(res => {
          console.log(res)
          if (res.code == 200) {
            let imgUrl = res.data
            let length = self.quill.getSelection(true).index
            //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
            self.quill.insertEmbed(length, 'image', imgUrl)
            self.quill.setSelection(length + 1)          
          }
        })
      },
    },
    toolbar: {
      // container为工具栏，此次引入了全部工具栏，也可自行配置
      // container is a toolbar, all toolbars are introduced this time, and they can also be configured by themselves
      container: container,
      handlers: {
        image: function() {
          // 劫持原来的图片点击按钮事件
          // Hijack the original picture click button event
          QuillWatch.emit(this.quill.id)
        },
      },
    },    
  },
}
