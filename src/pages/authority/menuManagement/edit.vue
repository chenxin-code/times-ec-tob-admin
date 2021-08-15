<template>
  <div class="container-edit">
    <baseLayout>
      <template slot="content">
        <baseCard background="none">
          <a-form-model
            class="menu-form"
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-row :gutter="[15, 0]" type="flex">
              <a-col :span="24">
                <a-form-model-item label="菜单名称" prop="menuName">
                  <a-input
                    v-model="form.menuName"
                    placeholder="请填写菜单名称"
                    :maxLength="16"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item label="上级菜单" prop="parentId">
                  <a-tree-select
                    v-model="form.parentId"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    :tree-data="treeData"
                    placeholder="请选择上级分类"
                    tree-default-expand-all
                    :showArrow="openType !== 'look'"
                    :replaceFields="{
                      children: 'children',
                      title: 'menuName',
                      key: 'id',
                      value: 'id',
                    }"
                  >
                  </a-tree-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item label="菜单类型" prop="menuType">
                  <a-radio-group name="radioGroup" v-model="form.menuType">
                    <a-radio :value="1">
                      菜单
                    </a-radio>
                    <a-radio :value="2">
                      页面
                    </a-radio>
                  </a-radio-group>
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item label="菜单编码" prop="perms">
                  <a-input v-model="form.perms" placeholder="请输入编码" />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item
                  v-if="form.menuType === 1"
                  label="菜单地址"
                  prop="url"
                >
                  <a-input v-model="form.url" placeholder="请输入地址" />
                </a-form-model-item>
              </a-col>
              <a-col :span="24">
                <a-form-model-item
                  v-if="form.menuType === 1"
                  label="菜单排序"
                  prop="orderNum"
                >
                  <a-input-number
                    class="input-Width"
                    v-model="form.orderNum"
                    :min="0"
                    :max="99999999"
                    placeholder="请输入排序"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </baseCard>
      </template>
      <template slot="footer" v-if="openType !== 'look'">
        <a-button
          class="a-buttom-reset"
          type="primary"
          @click="onSubmit"
          :loading="loadingSubmit"
          >提交</a-button
        >
      </template>
    </baseLayout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openType: 'add',
      loadingSubmit: false,
      form: {
        menuName: '',
        parentId: 0,
        parentName: '', // 上级菜单名称
        menuType: 1, // 菜单类型 1/菜单 2/按钮
        perms: '', // 编码
        url: '', // 地址
        orderNum: null, // 排序
      },
      rules: {
        menuName: [{ required: true, message: '菜单名称不能为空' }],
        perms: [{ required: true, message: '编码不能为空' }],
        menuType: [{ required: true, message: '类型必选' }],
        url: [{ required: true, message: '地址不能为空' }],
        orderNum: [{ required: true, message: '排序不能为空' }],
      },
      treeData: [],
      specificationValue: undefined,
      specificationData: [],
      attributesValue: undefined,
      attributesData: [],
    }
  },
  created() {
    this.openType = this.$route.params.type
    console.log(this.openType, 'this.openType')
    this.getTree()
    if (this.$route.params.type !== 'add') {
      this.initDetail()
    }
  },
  methods: {
    // 获取详情信息
    initDetail() {
      this.$api.getMenuModel({ id: this.$route.params.id }).then(res => {
        this.form = res.data
      })
    },
    // 获取类目树
    getTree() {
      this.$api.getMenuTreeData({}).then(res => {
        this.treeData = [
          {
            id: 0,
            menuName: '根目录',
            children: res.data,
          },
        ]
      })
    },
    // 规格/属性值
    handleChange(event, type) {
      if (type === 'SALE_ATTR') {
        this.specificationValue = event
      } else {
        this.attributesValue = event
      }
    },
    // 搜索规格/属性
    handleSearch(event, type) {
      let params = {
        attrName: event, // 属性名称
        attrType: type, // 属性类型
        pageNum: 1, // 第几页
        pageSize: 20, // 每页多少条
      }
      this.$api.getProductQueryList(params).then(res => {
        if (type === 'SALE_ATTR') {
          this.specificationData = res.data.records
        } else {
          this.attributesData = res.data.records
        }
      })
    },
    // 添加规格/属性
    addType(type) {
      if (type === 'SALE_ATTR') {
        _.forEach(this.specificationData, a => {
          if (
            a.id === this.specificationValue &&
            !_.includes(
              _.map(_.cloneDeep(this.form.specificationList), a => a.id),
              this.specificationValue
            )
          ) {
            this.form.specificationList.push({ id: a.id, name: a.attrName })
          }
        })
      } else {
        _.forEach(this.attributesData, a => {
          if (
            a.id === this.attributesValue &&
            !_.includes(
              _.map(_.cloneDeep(this.form.attributesList), a => a.id),
              this.attributesValue
            )
          ) {
            this.form.attributesList.push({ id: a.id, name: a.attrName })
          }
        })
      }
    },
    // 删除规格/属性
    preventDefault(id, type) {
      if (type === 'SALE_ATTR') {
        this.$set(
          this.form,
          'specificationList',
          this.form.specificationList.filter(a => a.id !== id)
        )
      } else {
        this.$set(
          this.form,
          'attributesList',
          this.form.attributesList.filter(a => a.id !== id)
        )
      }
    },
    // 添加/修改
    onSubmit() {
      this.loadingSubmit = true
      let that = this
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$api[this.openType === 'add' ? 'getMenuSave' : 'getMenuUpdata'](
            this.form
          )
            .then(res => {
              this.$router.go(-1)
              this.$message.info(`提交成功`)
              that.$store.dispatch('GET_MENU_LIST')
            })
            .finally(() => {
              this.loadingSubmit = false
            })
        } else {
          this.loadingSubmit = false
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.container-edit {
  position: relative;
  height: 100%;
  .ant-form-item {
    margin-bottom: 0;
  }
}
.category-tag {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .ant-tag {
    margin-bottom: 10px;
  }
  .ant-select {
    margin-bottom: 10px;
  }
}
.a-buttom-reset {
  margin-left: 15px;
  margin-bottom: 10px;
}
.menu-form .ant-col {
  height: 60px;
}
.input-Width {
  width: 100%;
}
</style>
