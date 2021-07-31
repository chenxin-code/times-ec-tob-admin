<template>
  <div style="height: 100%;">
    <!-- <div class="btns">
      <a-button
        class="item-btn"
        :loading="btnloading"
        type="primary"
        @click="addEdit()"
        >保存</a-button
      >
      <a-button class="item-btn" @click="$router.back()">返回</a-button>
    </div> -->
    <div
      class="content-main"
      style="height: calc(100% - 100px);margin-top: 12px;padding:20px 60px 20px 20px;"
    >
      <a-form-model
        :model="thisForm"
        layout="inline"
        :rules="rules"
        ref="thisForm"
        labelAlign="left"
      >
        <div class="common-title">
          <div class="common-title-content">企业基本信息</div>
        </div>
        <a-form-model-item label="是否顶级企业">
          <a-switch v-model="isTop" />
        </a-form-model-item>
        <div style="display: flex">
          <div style="flex: 1">
            <a-form-model-item label="企业名称" prop="enterpriseName">
              <a-input v-model="thisForm.enterpriseName" />
            </a-form-model-item>
          </div>
          <div style="flex: 1">
            <a-form-model-item
              label="选择父级企业"
              prop="parentName"
              v-if="!isTop"
            >
              <div
                :class="`companySelect ${showRedBorder && 'border-red'}`"
                @click="visible = true"
              >
                {{ parentName }}
              </div>
              <p v-show="showRedBorder" class="companySelectTip">
                请选择父级企业
              </p>
            </a-form-model-item>
          </div>
        </div>
        <div style="display: flex">
          <div style="flex: 1">
            <a-form-model-item label="企业编码" prop="enterpriseCode">
              <a-input v-model="thisForm.enterpriseCode" />
            </a-form-model-item>
          </div>
          <div style="flex: 1">
            <a-form-model-item label="企业人数" prop="employeeNum">
              <a-input v-model="thisForm.employeeNum" />
            </a-form-model-item>
          </div>
        </div>
        <div class="common-title">
          <div class="common-title-content">企业信息</div>
        </div>
        <div style="display: flex">
          <div style="flex: 1">
            <a-form-model-item label="经营范围" prop="businessScope">
              <a-input v-model="thisForm.businessScope" />
            </a-form-model-item>
          </div>
          <div style="flex: 1">
            <a-form-model-item label="信用等级" prop="creditLevel">
              <a-input v-model="thisForm.creditLevel" />
            </a-form-model-item>
          </div>
        </div>
        <a-form-model-item label="所在地区" class="one-line">
          <a-cascader
            :options="areaData"
            :show-search="{ filter }"
            :default-value="defaultValue"
            placeholder="选择省市区"
            :fieldNames="{
              label: 'cityName',
              value: 'cityCode',
              children: 'list',
            }"
            @change="onChange"
            v-if="showCascader"
          />
        </a-form-model-item>
        <a-form-model-item label="通讯地址" class="one-line" prop="mailAddress">
          <a-textarea v-model="thisForm.mailAddress" />
        </a-form-model-item>
        <a-form-model-item
          label="公司地址"
          class="one-line"
          prop="detailAddress"
        >
          <a-textarea v-model="thisForm.detailAddress" />
        </a-form-model-item>
        <a-form-model-item label="备注" class="one-line" prop="remark">
          <a-textarea v-model="thisForm.remark" />
        </a-form-model-item>
        <div class="common-title">
          <div class="common-title-content">联系方式</div>
        </div>
        <div style="display: flex">
          <div style="flex: 1">
            <a-form-model-item label="企业电话" prop="enterprisePhone">
              <a-input v-model="thisForm.enterprisePhone" />
            </a-form-model-item>
          </div>
          <div style="flex: 1">
            <a-form-model-item label="电子邮箱" prop="email">
              <a-input v-model="thisForm.email" />
            </a-form-model-item>
          </div>
        </div>
        <div style="display: flex">
          <div style="flex: 1">
            <a-form-model-item label="联系人" prop="concatPerson">
              <a-input v-model="thisForm.concatPerson" />
            </a-form-model-item>
          </div>
          <div style="flex: 1">
            <a-form-model-item label="联系电话" prop="concatPhone">
              <a-input v-model="thisForm.concatPhone" />
            </a-form-model-item>
          </div>
        </div>
      </a-form-model>
    </div>
    <a-modal
      title="选择父级企业"
      :visible="visible"
      @ok="handleOk"
      @cancel="visible = false"
      width="500px"
    >
      <companyTree @onSelect="onSelect" />
    </a-modal>
    <FormSubmitButton :isShow="true" @submit="addEdit" />
  </div>
</template>

<script>
import api from './../../api'
import companyTree from './../../components/companyTree'

export default {
  components: { companyTree },
  data() {
    let checkEmailFormat = (rule, value, callback) => {
        if (
          value &&
          !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
        ) {
          callback(new Error('电子邮箱格式不正确'))
        } else {
          callback()
        }
      },
      checkMobileFormat = (rule, value, callback) => {
        if (value && !/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('手机号码格式不正确'))
        } else {
          callback()
        }
      },
      onlyForRedStar = (rule, value, callback) => {
        callback()
      }
    return {
      showRedBorder: false,
      selectParentId: null,
      selectParentName: null,
      parentId: null,
      parentName: null,
      visible: false,
      isTop: true,
      thisForm: {
        enterpriseName: null,
        enterpriseCode: null,
        employeeNum: null,
        businessScope: null,
        creditLevel: null,
        mailAddress: null,
        detailAddress: null,
        remark: null,
        enterprisePhone: null,
        email: null,
        concatPerson: null,
        concatPhone: null,
        provinceCode: null, //省
        cityCode: null, //市
        districtCode: null, //区
      },
      rules: {
        parentName: [
          { required: true, validator: onlyForRedStar, trigger: 'blur' },
        ],
        enterpriseName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
        ],
        enterprisePhone: [
          { required: true, message: '请输入企业电话', trigger: 'blur' },
          { validator: checkMobileFormat, trigger: 'blur' },
        ],
        concatPerson: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        concatPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: checkMobileFormat, trigger: 'blur' },
        ],
        email: [{ validator: checkEmailFormat, trigger: 'blur' }],
      },
      btnloading: false,
      areaData: [],
      defaultValue: [],
      showCascader: false,
    }
  },
  mounted() {
    let tob_areaData = sessionStorage.getItem('tob_areaData')
    if (tob_areaData) {
      this.areaData = JSON.parse(tob_areaData)
      this.afterGetAreaData()
    } else {
      api.getAreaData({ level: 3 }).then(response => {
        if (response.code === 200) {
          this.areaData = response.data[0].list //去掉中国
          sessionStorage.setItem('tob_areaData', JSON.stringify(this.areaData))
          this.afterGetAreaData()
        }
      })
    }
  },
  computed: {},
  methods: {
    afterGetAreaData() {
      if (this.$route.path === '/company/edit') {
        api
          .getProjectDetail({
            id: this.$route.query.id,
          })
          .then(resp => {
            if (resp.code === 200) {
              this.isTop = resp.data.parentId === '-1'
              this.parentId = resp.data.parentId
              this.parentName = resp.data.parentName
              this.thisForm.enterpriseName = resp.data.enterpriseName
              this.thisForm.enterpriseCode = resp.data.enterpriseCode
              this.thisForm.employeeNum = resp.data.employeeNum
              this.thisForm.businessScope = resp.data.businessScope
              this.thisForm.creditLevel = resp.data.creditLevel
              this.thisForm.mailAddress = resp.data.mailAddress
              this.thisForm.detailAddress = resp.data.detailAddress
              this.thisForm.remark = resp.data.remark
              this.thisForm.enterprisePhone = resp.data.enterprisePhone
              this.thisForm.email = resp.data.email
              this.thisForm.concatPerson = resp.data.concatPerson
              this.thisForm.concatPhone = resp.data.concatPhone
              this.thisForm.provinceCode = resp.data.provinceCode //省
              this.thisForm.cityCode = resp.data.cityCode //市
              this.thisForm.districtCode = resp.data.districtCode //区
              this.defaultValue = [
                resp.data.provinceCode,
                resp.data.cityCode,
                resp.data.districtCode,
              ]
              this.showCascader = true //取到defaultValue再加载组件
            }
          })
      } else if (this.$route.path === '/company/add') {
        this.showCascader = true
      }
    },
    findTree(areaData, districtCode, respData) {
      for (let index = 0; index < areaData.length; index++) {
        if (areaData[index].list) {
          if (this.findTree(areaData[index].list, districtCode, respData)) {
            return true
          }
        }
        if (areaData[index].cityCode === districtCode) {
          areaData[index].list = respData
          return true
        }
      }
    },
    filter(inputValue, path) {
      return path.some(
        option =>
          option.cityName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    },
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
      this.thisForm.provinceCode = value[0] //省
      this.thisForm.cityCode = value[1] //市
      this.thisForm.districtCode = value[2] //区
      //获取街道
      // api.getAreaChildData({parentCode: this.thisForm.districtCode}).then(resp => {
      //   this.findTree(this.areaData, this.thisForm.districtCode, resp.data);
      // });
    },
    onSelect(id, enterpriseName) {
      console.log(id, enterpriseName)
      this.selectParentId = id
      this.selectParentName = enterpriseName
    },
    handleOk() {
      if (this.selectParentId && this.selectParentName) {
        this.parentId = this.selectParentId
        this.parentName = this.selectParentName
        this.visible = false
        this.showRedBorder = false
      } else {
        this.$message.error('没有选择父级企业')
      }
    },
    addEdit() {
      if (this.$route.path === '/company/add') {
        if (!this.isTop && !this.parentId) {
          this.showRedBorder = true
        }
        this.$refs.thisForm.validate(valid => {
          if (valid && !this.showRedBorder) {
            if (this.isTop) {
              this.thisForm = Object.assign(this.thisForm, {
                parentId: '-1',
                parentName: null,
              })
            } else {
              this.thisForm = Object.assign(this.thisForm, {
                parentId: this.parentId,
                parentName: this.parentName,
              })
            }
            this.btnloading = true
            api
              .addProject(this.thisForm)
              .then(resp => {
                if (resp.code === 200) {
                  this.$message.success('添加成功')
                  this.$router.back()
                }
              })
              .finally(() => {
                this.btnloading = false
              })
          }
        })
      } else if (this.$route.path === '/company/edit') {
        if (!this.isTop && !this.parentId) {
          this.showRedBorder = true
        }
        this.$refs.thisForm.validate(valid => {
          if (valid && !this.showRedBorder) {
            this.thisForm = Object.assign(this.thisForm, {
              id: this.$route.query.id,
              updateType: 0,
            })
            if (this.isTop) {
              this.thisForm = Object.assign(this.thisForm, {
                parentId: '-1',
                parentName: null,
              })
            } else {
              this.thisForm = Object.assign(this.thisForm, {
                parentId: this.parentId,
                parentName: this.parentName,
              })
            }
            this.btnloading = true
            api
              .updateProject(this.thisForm)
              .then(resp => {
                if (resp.code === 200) {
                  this.$message.success('保存成功')
                  this.$router.back()
                }
              })
              .finally(() => {
                this.btnloading = false
              })
          }
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.ant-form {
  //padding: 20px;

  .ant-form-item {
    width: 350px;
    display: flex;
    margin: 10px 0 10px 50px;
  }

  /deep/ .ant-calendar-picker-input {
    min-width: 200px;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: 300px;
  }

  /deep/ .ant-form-item-label {
    width: 150px;
    text-align: right;
  }

  /deep/ .item-btns {
    width: 800px !important;
  }

  /deep/ .item-btns .item-btn {
    margin-right: 20px;
  }
}

.common-title {
  color: #666;
  padding: 20px 0 20px 30px;

  .common-title-content {
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    padding-left: 8px;
    border-left: 3px solid rgba(33, 33, 206, 0.5);
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0 0;

  button {
    margin-left: 20px;
  }
}

.companySelect {
  width: 100%;
  line-height: 32px;
  height: 32px;
  border: 1px solid #bfbfbf;
  color: #bfbfbf;
  background-color: rgba(0, 0, 0, 0.02);
  padding-left: 10px;
  border-radius: 3px;
  cursor: pointer;
}

.companySelectTip {
  color: #f5222d;
  margin: 0;
  line-height: 1.5;
  padding-top: 3px;
}

.border-red {
  border-color: #f5222d;
}

.one-line.ant-form-item {
  width: 500px;
}
.one-line /deep/ .ant-form-item-control-wrapper {
  width: 500px;
}
</style>