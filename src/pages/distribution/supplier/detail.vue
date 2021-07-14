<template>
  <div id="distributorAudit">
    <div class="content-header">
      分销员审核
      <span class="fallback" @click="FALLBACK" style="cursor:pointer">返回</span>
    </div>
    <div class="content-main" style="overflow-y: auto;height: calc(100% - 91px);">
      <div style="width:100%;display: flex;align-items:center;padding: 20px 20px;">
        <div style="width:3px;height:16px;background: #4B7AFB;"></div>
        <span style="color:#666666;margin-left:5px;">分销员基础信息</span>
      </div>
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" style="padding:0 10px;">
        <a-form-model-item label="分销员名称">
          <span class="info">{{data.name}}</span>
        </a-form-model-item>
        <a-form-model-item label="分销员手机">
          <span class="info">{{data.phone}}</span>
        </a-form-model-item>
        <a-form-model-item label="分销员微信号">
          <span class="info">{{data.wechatNo}}</span>
        </a-form-model-item>
        <a-form-model-item label="上级分销员" v-if="data.parent">
          <span class="info">{{data.parent.name}}</span>
        </a-form-model-item>
      </a-form-model>
      <div style="width:100%;display: flex;align-items:center;padding: 20px 20px;">
        <div style="width:3px;height:16px;background: #4B7AFB;"></div>
        <span style="color:#666666;margin-left:5px;">分销员身份信息</span>
      </div>
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" style="padding:0 10px;">
        <a-form-model-item label="分销员身份证号">
          <span class="info">{{data.cardNo}}</span>
        </a-form-model-item>
        <a-form-model-item label="上传分销员身份证">
          <span class="info">
            <img :src="data.cardPros" style="width: 200px"/>
            <img :src="data.cardCons" style="width: 200px;margin-left: 30px;"/>
          </span>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="content-footer">
      <a-button type="primary" size="large" style="width: 120px; margin-right: 10px;" :loading="passBtnLoading" :disabled="passBtnDisabled" @click="onAudit(1)">通过</a-button>
      <a-button type="primary" ghost size="large" style="width: 120px; margin-right: 10px;" :loading="noPassBtnLoading" :disabled="noPassBtnDisabled" @click="onAudit(0)">不通过</a-button>
<!--      <a-button type="primary" size="large" style="width: 120px; margin-right: 10px;" @click="FALLBACK">返回</a-button>-->
    </div>
  </div>
</template>

<script>
  import api from "@/api"
  import { mapActions } from "vuex"
  import { debounce } from "@/utils/util"
  export default {
    name: "detail",
    data() {
      return {
        data: [],
        passBtnLoading: false,
        passBtnDisabled: false,
        noPassBtnLoading: false,
        noPassBtnDisabled: false,
      }
    },
    props: {
      id: {
        type: String,
        default: () => ({})
      },
    },
    components: {},
    created() {
      this.getDistributorInfo()
    },
    methods: {
      ...mapActions(["FALLBACK"]),
      // 获取分销员信息
      getDistributorInfo() {
        const para = {
          distributorId: this.id,
        };
        api.distributorInfo(para).then(res => {
          if (res.code === 200) {
            this.data = res.data
          }
        }).finally(() => {

        });
      },
      onAudit(status) {
        debounce(()=>{
          if(status === 1) {
            this.passBtnLoading = true;
            this.noPassBtnDisabled = true
          } else {
            this.noPassBtnLoading = true;
            this.passBtnDisabled = true
          }
          const para = {
            examineResult: status,
            id: this.id,
          };
          api.distributorAudit(para).then(res => {
            if (res.code === 200) {
              this.$router.push({name: "distributor"})
            }
          }).finally(() => {
            this.passBtnLoading = false;
            this.passBtnDisabled = false;
            this.noPassBtnLoading = false;
            this.noPassBtnDisabled = false;
          });
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  #distributorAudit {
    height: 100%;
    overflow: hidden;
    .content-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .info {
      color: #666666;
    }
    .active {
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
      width: 300px;
      height: 28px;
      display: block;
    }
    .span-flag {
      cursor: pointer;
      color: #4b7afb;
    }
  }
</style>
