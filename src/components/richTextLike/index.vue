<template>
  <a-spin :spinning="picUploading">
    <div class="btn-wrapper">
      <a-button v-if="urls.previewQRCode === 'app_operate'" style="margin-right: 10px" @click="addTitle">添加标题</a-button>
      <a-button style="margin-right: 10px" @click="addText">添加文字</a-button>
      <a-upload
        name="avatar"
        accept="image/jpeg,image/jpg,image/png"
        class="avatar-uploader"
        :multiple="true"
        :file-list="picList"
        :showUploadList="false"
        :before-upload="() => false"
        @change="addPic"
      >
        <a-button style="margin-right: 10px">添加图片</a-button>
      </a-upload>
      <div class="qr-preview">
        <div class="qrcode" v-show="showQR">
          <span class="tooltip-arrow"></span>
          <div class="qrcode-content">
            <div id="qrcode" ref="qrcode"></div>
            <p>请使用邻里家APP扫一扫</p>
          </div>
        </div>
        <a-button v-if="urls.previewQRCode === 'app_notice' || urls.previewQRCode === 'app_operate' || urls.previewQRCode === 'app_activity'"
                  style="margin-left: auto" v-on:mouseover="preview" v-on:mouseout="hidePreview">预览</a-button>
      </div>
    </div>

    <span style="color: #c3c3c3">支持在内容中插入链接，填写链接结束时请以空格结尾</span>
    <div>
      <div v-for="(item, index) in list" :key="index" style="display: flex;margin-bottom: 4px;">
        <div v-if="item.type==='pic'" style="width: 70%">
          <img :src="item.content" style="width: 100%"/>
        </div>
        <div v-if="item.type==='title'" style="width: 70%">
          <a-input v-model="item.content" :auto-size="{ minRows: 6, maxRows: 12}" @change="title" :maxLength="30"/>
        </div>
        <div v-if="item.type==='text'" style="width: 70%">
          <a-textarea v-model="item.content" :auto-size="{ minRows: 6, maxRows: 12}" @change="text" :maxLength="500"/>
        </div>
        <div class="operate-wrapper" style="width: 20%; margin-left: auto; ">
          <!--          <a-button :class="{'hidden': index === 0}" type="link" @click="move(index, index - 1)">-->
          <!--            上移-->
          <!--          </a-button>-->
          <!--          <a-button :class="{'hidden': index === list.length - 1}" type="link" @click="move(index, index + 1)">-->
          <!--            下移-->
          <!--          </a-button>-->
          <a-button v-show="index !== 0" type="link" @click="move(index, index - 1)">
            上移
          </a-button>
          <a-button v-show="index !== list.length - 1" type="link" @click="move(index, index + 1)">
            下移
          </a-button>
          <a-button type="link" @click="deleteItem(index,item)">
            删除
          </a-button>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script>
  import api from '@/api';
  import { debounce } from '@/utils/util';
  import QRCode from 'qrcodejs2'

  export default {
    name: "richTextLike",
    props: ['value', 'urls'],
    data() {
      return {
        list: this.value || [],
        qrCode: '',
        showQR: false,
        qrCodeLoading: false,
        picUploading: false,
        qrId: "",
        picList: [], // 目的是再次选择文件时不保留旧数据
        addLength: this.urls.addLength || 15
      };
    },
    created() {

    },
    watch: {
      value: function (val) {
        try {
          if (typeof val === 'string') {
            this.list = JSON.parse(val);
            console.log(this.list);
          }
        } catch (e) {
          this.list = [];
          console.error('JSON序列化失败');
        }
      }
    },
    methods: {
      addPic({ fileList = [] } = {}) {
        debounce(() => {
          const pic = [];
          this.list.forEach((item)=>{
            if (item.type === "pic") {
              pic.push(item)
            }
          });
          console.log(pic.length + fileList.length);
          if ( pic.length + fileList.length > 9) {
            this.$message.error('图片最多9张');
          }else{
            const img = [];
            if (fileList.length > 3) {
              this.$message.error('每次最多能选三张');
            } else {
              fileList.forEach((item)=>{
                const imgSize = item.size / 1024 / 1024 < 5;
                const imgType = item.type === 'image/jpeg' || item.type === 'image/png';
                if (!imgSize) {
                  this.$message.error('图片过大，请重新上传');
                } else if ( imgSize && imgType){
                  img.push(item);
                }
              });
              this.picUploading = true;
              const formData = new FormData();
              img.forEach((file, index) => {
                formData.append('file' + index, file.originFileObj);
              });
              formData.append('programCode',this.urls.previewQRCode );
              api[this.urls.picUpload](formData).then(res => {
                if (res.code === 200) {
                  (res.data || []).forEach(url => {
                    this.$data.list.push({ type: 'pic', content: url });
                  });
                  this.triggerChange(this.list);
                  // 清空旧数据
                  this.picList = [];
                }
              }).finally(() => {
                this.picUploading = false;
              });
            }
          }
        });
      },
      title() {
        this.triggerChange(this.list);
      },
      text() {
        this.triggerChange(this.list);
      },
      addTitle() {
        const title = [];
        this.list.forEach((item)=>{
          if (item.type === "title") {
            title.push(item)
          }
        });
        if (title.length >= this.addLength) {
          this.$message.error('标题最多'+ this.addLength +'个');
        } else {
          this.list.push({ type: 'title', content: '' });
          this.triggerChange(this.list);
        }
      },
      addText() {
        const text = [];
        this.list.forEach((item)=>{
          if (item.type === "text") {
            text.push(item)
          }
        });
        console.log(text);
        if (text.length >= this.addLength) {
          this.$message.error('文本最多'+ this.addLength +'个');
        } else {
          this.list.push({ type: 'text', content: '' });
          this.triggerChange(this.list);
        }
      },
      move(index, oppIndex) {
        const temp = this.list[index];
        this.list[index] = this.list[oppIndex];
        this.list[oppIndex] = temp;
        this.triggerChange(this.list);
      },
      deleteItem(index,item) {
        if(item.type === "pic") {
          const para = {
            filePath: item.content,
            type: 1
          };
          this.picUploading = true;
          api.deleteImage(para).then(res => {
            if (res.code === 200) {
              this.list.splice(index, 1);
              this.triggerChange(this.list);
            }
          }).finally(() => {
            this.picUploading = false;
          });
        } else {
          this.list.splice(index, 1);
          this.triggerChange(this.list);
        }
        // console.log(item);
      },
      triggerChange(changedValue) {
        this.$emit('change', changedValue);
      },
      hidePreview() {
        this.showQR = false;
      },
      toQrcode(res) {
        const para = {
          qrCodeInfo: JSON.stringify({type:"microapp",uri:"com.times.microapp.AppbNotice",path:"/previewDetail?id=" + res})
        };
        api.qrcodeInsert(para).then(res => {
          if (res.code === 200) {
            this.qrId = "msg://" + res.data;
            this.$refs.qrcode.innerHTML = '';
            this.qrcode = new QRCode(this.$refs.qrcode, {
              width: 200,  // 设置宽度
              height: 200, // 设置高度
              text: this.qrId,
            })
          }
        }).finally(() => {
        });
      },
      toQrcodeOperation(res,title) {
        const para = {
          qrCodeInfo: JSON.stringify({type:"microapp",uri:"com.times.microapp.AppcMine",path:this.urls.url+"?isPreview=1&id=" + res + '&title=' + title})
        };
        api.operationQrcodeInsert(para).then(res => {
          if (res.code === 200) {
            this.qrId = "msg://" + res.data;
            this.$refs.qrcode.innerHTML = '';
            this.qrcode = new QRCode(this.$refs.qrcode, {
              width: 200,  // 设置宽度
              height: 200, // 设置高度
              text: this.qrId,
            })
          }
        }).finally(() => {
        });
      },
      toQrcodeActivity(res) {
        const para = {
          qrCodeInfo: JSON.stringify({type:"microapp",uri:"com.times.microapp.AppcActivity",path:"/activityDetail?isPreview=1&id=" + res })
        };
        api.activityQrcodeInsert(para).then(res => {
          if (res.code === 200) {
            this.qrId = "msg://" + res.data;
            this.$refs.qrcode.innerHTML = '';
            this.qrcode = new QRCode(this.$refs.qrcode, {
              width: 200,  // 设置宽度
              height: 200, // 设置高度
              text: this.qrId,
            })
          }
        }).finally(() => {
        });
      },
      preview() {
        this.showQR = true;
        this.qrCodeLoading = true;

        if(this.urls.previewQRCode === "app_notice") {
          // this.addPreviewNotice();
          this.$emit('addPreviewNotice', this.list);
          // this.$parent.addPreviewNotice();
          // debugger
        }
        if(this.urls.previewQRCode === "app_operate") {
          this.$emit('addPreviewOperation', this.list);
        }
        if(this.urls.previewQRCode === "app_activity") {
          this.$emit('addPreviewActivity', this.list);
        }
        //   api[this.urls.previewQRCode]().then(res => {
        //     if (res.code !== 200) {
        //       this.$message.error('预览失败');
        //     } else {
        //       this.qrCode = res.data;
        //     }
        //   }).finally(() => {
        //     this.qrCodeLoading = false;
        //   });
        // }

      },
    }
  }
</script>

<style lang="less" scoped>
  .btn-wrapper {
    display: flex;
    align-items: center;
  }
  .tooltip-arrow {
    width: 10px;
    height: 10px;
    background: #fff;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    left: -5px;
    z-index: 0;
    top: 14px;

  }
  .qr-preview{
    position: relative;
    .qrcode-content{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 99;
      background: #fff;
      left: 0;
      padding: 10px 14px;
    }
    .qrcode{
      width: 228px;
      height: 250px;

      position: absolute;
      top: 0px;
      left: 80px;
      z-index: 999;
      background: #fff;
      text-align: center;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    }
    .text{

    }
  }
  .operate-wrapper {
    margin-left: auto;
    display: flex;
    align-items: center;

    .ant-btn {
      padding: 6px;

      &.hidden {
        visibility: hidden;
        cursor: default;
      }
    }
  }

</style>
