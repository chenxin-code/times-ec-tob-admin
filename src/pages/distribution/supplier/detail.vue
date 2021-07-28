<template>
  <div id="distributorAudit">
    <div class="content-header">
      供应商详情
      <span class="fallback" @click="FALLBACK" style="cursor:pointer"
        >返回</span
      >
    </div>
    <div
      class="content-main"
      style="overflow-y: auto;height: calc(100% - 91px);"
    >
      <div
        style="width:100%;display: flex;align-items:center;padding: 20px 20px;"
      >
        <div style="width:3px;height:16px;background: #4B7AFB;"></div>
        <span style="color:#666666;margin-left:5px;">供应商详情基础信息</span>
      </div>
      <a-form-model
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 12 }"
        style="padding:0 10px;"
      >
        <a-form-model-item label="供应商名称">
          <span class="info">{{ dataList.supplierName }}</span>
        </a-form-model-item>
        <a-form-model-item label="供应商编码">
          <span class="info">{{ dataList.insideCode }}</span>
        </a-form-model-item>
        <a-form-model-item label="创建人">
          <span class="info">{{ dataList.createUser }}</span>
        </a-form-model-item>
        <a-form-model-item label="创建时间">
          <span class="info">{{ dataList.createTime }}</span>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { mapActions } from 'vuex'
export default {
  name: 'detail',
  data() {
    return {
      dataList: [],
    }
  },
  mounted() {
    let params = { id: this.$route.query.id }
    this.getData(params)
  },
  methods: {
    ...mapActions(['FALLBACK']),
    async getData(params) {
      let res = await api.getSupplierDetail(params)
      this.dataList = res.data
    },
  },
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
