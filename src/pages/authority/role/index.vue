<template>
  <div class="container-module column" style="height:100%;">
    <baseModule class="search-form">
      <baseForm
        ref="form"
        rowCol="3"
        :formList="formList"
        :onSubmit="onSearch"
        :addbutton="true"
        @onAdd="onAdd"
        @onReset="onSearch"
        addText="新增"
      ></baseForm>
    </baseModule>
    <div class="flex content-box">
      <baseTable
        :columns="columns"
        :tableData="dataList"
        :pageSize="pageData.pageSize"
        :current="pageData.current"
        :loading="tableLoading"
        :scrollY="scrollY"
        :total="pageData.total"
        @onShowSizeChange="onShowSizeChange"
      >
        <template slot="state" slot-scope="{ props }">
          {{ props.state == 1 ? '已禁用' : '已启用' }}
        </template>
        <template slot="operation" slot-scope="{ props }">
          <div class="editable-row-operations">
            <a-button
              class="a-buttom-reset-link"
              @click="edit(props)"
              type="link"
              >编辑</a-button
            >
            <template>
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="del(props, '删除')"
                type="link"
                >删除</a-button
              >
            </template>
            <template v-if="props.state == 0">
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="UpdateStatus(props, 1, '启用')"
                type="link"
                >启用</a-button
              >
            </template>
            <template v-if="props.state == 1">
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="UpdateStatus(props, 0, '禁用')"
                type="link"
                >禁用</a-button
              >
            </template>
            <template>
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="assignAuthority(props)"
                type="link"
                >分配权限</a-button
              >
            </template>
            <template>
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="assignUsers(props)"
                type="link"
                >分配用户</a-button
              >
            </template>
          </div>
        </template>
      </baseTable>
    </div>
    <a-modal
      v-model="modelVisibleAdd"
      :title="`${title}角色`"
      @ok="handleAdd"
      @cancel="handleCancelAdd"
    >
      <template>
        <a-form :form="modelForm" @submit="handleAdd">
          <a-form-item
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            label="角色名称"
          >
            <a-input
              v-decorator="[
                'roleName',
                {
                  rules: rules,
                  initialValue: selectRoleData.roleName,
                },
              ]"
              placeholder="请输入角色名称"
            />
          </a-form-item>
        </a-form>
      </template>
    </a-modal>
  </div>
</template>
<script>
import api from '@/api'
export default {
  data() {
    let formList = [
      {
        label: '角色姓名',
        type: 'input',
        name: 'roleName',
        placeholder: '请输入角色名称',
        wrapperCol: { span: 18 },
        labelAlign: 'left',
      },
      //   {
      //     label: '手机号码',
      //     type: 'input',
      //     name: 'rolePhone',
      //     placeholder: '请输入手机号',
      //     wrapperCol: { span: 18 },
      //     labelAlign: 'left',
      //     rules: [
      //       { required: false, message: '请输入手机号' },
      //       { pattern: /^1[3456789]\d{9}$/, message: '格式不对' },
      //     ],
      //   },
      {
        type: 'button',
        buttonName: '查询',
        htmlType: 'submit',
        align: 'left',
        class: 'a-buttom-reset',
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      },
    ]
    let columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 1,
        width: 200,
        ellipsis: true,
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 2,
        width: 100,
        ellipsis: false,
        scopedSlots: { customRender: 'state' },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 3,
        width: 200,
        ellipsis: false,
      },
      {
        title: '操作',
        fixed: 'right',
        // width: 300,
        key: 4,
        scopedSlots: { customRender: 'operation' },
      },
    ]
    let pageData = {
      total: 0,
      current: 1,
      pageNum: 1,
      pageSize: 10,
    }
    let formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    return {
      formList,
      columns,
      pageData,
      dataList: [],
      tableLoading: false,
      modalVisible: false, // 弹窗显示隐藏
      modalVisibleAuthority: false, // 分配权限弹窗显示隐藏
      modelVisibleAdd: false,
      type: '', // 操作类型 删除 启用 禁用
      row: {},
      checkedKeys: [],
      selectedRow: [],
      treeData: [],
      formItemLayout,
      form: this.$form.createForm(this, { name: 'form' }),
      modelForm: this.$form.createForm(this, { name: 'modelForm' }),
      rules: [{ required: true, message: '请输入角色名称' }],
      roleName: '',
      title: '新增',
      scrollY: 100,
      searchData: {},
      selectRoleData: {
        roleName: '',
        state: 0,
      },
    }
  },
  mounted() {
    let params = {
      pageNum: this.pageData.pageNum, // 第几页
      pageSize: this.pageData.pageSize, // 每页多少条
      ...this.searchData, // 角色名称跟手机号
    }
    setTimeout(() => {
      this.scrollY = document.body.clientHeight - 230
    }, 0)
    // 角色列表
    this.getData(params)
    // 权限列表
    // this.getPermissionList()
  },
  methods: {
    // 查询
    onSearch(searchData) {
      this.searchData = searchData
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        ...this.searchData, // 角色名称跟手机号
      }
      this.getData(params)
    },
    // 获取角色列表数据
    async getData(params) {
      this.tableLoading = true
      if (!params) {
        params = {
          pageNum: this.pageData.pageNum, // 第几页
          pageSize: this.pageData.pageSize, // 每页多少条
        }
      }
      try {
        let res = await api.getRoleListData(params)
        if (res.code == 200) {
          this.dataList = res.data.records
          this.pageData.total = Number(res.data.total)
        }
      } finally {
        this.tableLoading = false
      }
    },
    // 分页
    onShowSizeChange(current, pageSize) {
      this.pageData.current = current
      this.pageData.pageNum = current
      this.pageData.pageSize = pageSize
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        ...this.searchData, // 角色名称
      }
      this.getData(params)
    },
    // 分布查询权限列表
    async getPermissionList() {
      let params = {
        pageNum: 1,
        pageSize: 50,
      }
      try {
        let res = await api.roleGetPermissionList(params)
        if (res.code === 200) {
          this.treeData = res.data.records
          this.treeData.forEach(item => {
            ;(item.title = item.permName), (item.key = item.id)
          })
        }
      } finally {
      }
    },
    // 添加用户弹窗
    onAdd() {
      this.title = '新增'
      this.modelVisibleAdd = true
      this.selectRoleData = {
        roleName: '',
        state: 0,
      }
    },
    // 编辑
    edit(row) {
      this.title = '编辑'
      this.modelVisibleAdd = true
      this.selectRoleData = row
    },
    // 删除
    del(row, type) {
      try {
        let params = {
            id: row.id,
          },
          that = this
        this.$confirm({
          title: `您确认要${type}"${row.roleName}"的信息吗?`,
          content: '',
          centered: true,
          onOk() {
            api.setRoleDelete(params).then(res => {
              if (res.code == 200) {
                that.$message.info(`${type}成功`)
                let params = {
                  pageNum: that.pageData.pageNum, // 第几页
                  pageSize: that.pageData.pageSize, // 每页多少条
                  ...that.searchData,
                }
                that.getData(params)
              } else {
                that.$message.error(`${type}失败`)
              }
            })
          },
          onCancel() {},
        })
      } finally {
        this.loadingSubmit = false
      }
    },
    //添加,编辑角色信息
    handleAdd(e) {
      e.preventDefault()
      let _this = this,
        { title } = this
      this.modelForm.validateFields((err, values) => {
        if (!err) {
          return new Promise((resolve, reject) => {
            let param = Object.assign(values, { state: 0 })
            if (title == '编辑') {
              param = Object.assign(values, {
                state: _this.selectRoleData.state,
                id: _this.selectRoleData.id,
                roleCode: _this.selectRoleData.roleCode,
              })
            }
            api[title == '编辑' ? 'setRoleUpate' : 'setRoleSave'](param).then(
              res => {
                if (res.code == 200) {
                  _this.$message.info(`${title}成功`)
                  _this.handleCancelAdd()
                  let params = {
                    pageNum: _this.pageData.pageNum, // 第几页
                    pageSize: _this.pageData.pageSize, // 每页多少条
                    ..._this.searchData,
                  }
                  _this.getData(params)
                }
              }
            )
            this.modelVisibleAdd = false
          })
        }
      })
    },
    //添加用户取消
    handleCancelAdd() {
      this.modelVisibleAdd = false
      this.modelForm.resetFields()
    },
    //启用/禁用用户的的账号
    UpdateStatus(row, state, type) {
      let that = this
      try {
        let params = {
          id: row.id,
          roleCode: row.roleCode,
          roleName: row.roleName,
          state: state,
        }
        this.$confirm({
          title: `您确认要${type}"${row.roleName}"的账号吗?`,
          centered: true,
          onOk() {
            api
              .setRoleUpate(params)
              .then(res => {
                if (res.code == 200) {
                  that.$message.info(`${type}成功`)
                  let params = {
                    pageNum: that.pageData.pageNum, // 第几页
                    pageSize: that.pageData.pageSize, // 每页多少条
                    ...that.searchData,
                  }
                  that.getData(params)
                } else {
                  that.$message.error(`${type}失败`)
                }
              })
              .finally(err => {})
          },
          onCancel() {},
        })
      } finally {
        this.loadingSubmit = false
      }
    },
    //分配权限
    assignAuthority(row) {
      this.$router.push({
        path: '/authority/assignAuthority',
        query: {
          id: row.id,
        },
      })
    },
    // 权限确认
    async handleOkAuthority() {
      try {
        let params = {
          roleId: this.row.id,
          permIdList: this.checkedKeys,
        }
        let res = await api.roleSaveRolePermRel(params)
        if (res.code == 200) {
          this.$message.success('分配成功')
          this.handleCancelAuthority()
          let params = {
            pageNum: this.pageData.pageNum, // 第几页
            pageSize: this.pageData.pageSize, // 每页多少条
            ...this.searchData,
          }
          this.getData(params)
        }
      } finally {
      }
    },
    // 选中权限
    onCheck(checkedKeys, e) {
      this.checkedKeys = checkedKeys
    },
    // 分配用户
    assignUsers(row) {
      this.$router.push({
        name: 'assignRole',
        params: {
          id: row.id,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.flex {
  flex: 1;
}
.container-module {
  width: 100%;
}
.search-form {
  margin-bottom: 10px;
}
.content-box {
  background: #fff;
  width: 100%;
  height: 100%;
}
.basetable {
  height: 100%;
}
.tree-box {
  height: 300px;
  overflow: auto;
}
/deep/ .ant-transfer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/deep/ .ant-transfer-list {
  width: 45%;
}
</style>
