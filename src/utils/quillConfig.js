import { fetchApi } from '@/utils/ajax'
import URL from '@/api/urlConfig'

/*富文本编辑图片上传配置*/
const uploadConfig = {
  action: 'common.uploadfile.single', // 必填参数 图片上传地址
  methods: 'POST', // 必填参数 图片上传方式
  token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'img', // 必填参数 文件的参数名
  size: 1024, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon', // 可选 可上传的图片格式
}

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [
    {
      header: 1,
    },
    {
      header: 2,
    },
  ],
  [
    {
      list: 'ordered',
    },
    {
      list: 'bullet',
    },
  ],
  [
    {
      script: 'sub',
    },
    {
      script: 'super',
    },
  ],
  [
    {
      indent: '-1',
    },
    {
      indent: '+1',
    },
  ],
  [
    {
      direction: 'rtl',
    },
  ],
  // [
  //   {
  //     size: ['small', false, 'large', 'huge'],
  //   },
  // ],
  // [
  //   {
  //     header: [1, 2, 3, 4, 5, 6, false],
  //   },
  // ],
  [
    {
      color: [],
    },
    {
      background: [],
    },
  ],
  // [
  //   {
  //     font: [],
  //   },
  // ],
  [
    {
      align: [],
    },
  ],
  ['clean'],
  ['link', 'image', 'video'],
]
const handlers = {
  image: function image() {
    var self = this
    //捕获上传图片按钮
    var fileInput = this.container.querySelector('input.ql-image[type=file]')
    if (fileInput === null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name)
      }
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.accept)
      fileInput.classList.add('ql-image')
      // 监听选择文件
      fileInput.addEventListener('change', function() {
        // 创建formData
        let formData = new FormData()
        console.log(fileInput)
        // formData.append('file', fileInput.files[0]);
        formData.append('file', fileInput.files[0])
        // formData.append( 'token', JSON.parse(localStorage.getItem('userInfo')).token)
        fileInput.value = ''
        // console.log(http)
        //这里 请求
        fetchApi(URL.ADMINOPERATOR.upload, formData, 'POST').then(res => {
          console.log(res)
          if (res.code == 200) {
            let imgUrl = res.data
            let length = self.quill.getSelection(true).index
            //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
            self.quill.insertEmbed(length, 'image', imgUrl)
            self.quill.setSelection(length + 1)
            fileInput.value = ''
          }
        })       
      })
      console.log(fileInput)
      this.container.appendChild(fileInput)
    }
    fileInput.click()    
  },
}

export default {
  placeholder: '',
  theme: 'snow', // 主题
  modules: {
    toolbar: {
      container: toolOptions, // 工具栏选项
      handlers: handlers, // 事件重写
    },
  },
}
