<template>
  <div class="container-module">
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
    <div>
      <baseTable
        :columns="columns"
        :tableData="dataList"
        :total="pageData.total"
        :pageSize="pageData.pageSize"
        :current="pageData.current"
        :loading="tableLoading"
        @onShowSizeChange="onShowSizeChange"
      >
        <template slot="operation" slot-scope="{ props }">
          <div class="editable-row-operations">
            <template v-if="props.userState == 'DISABLED'">
              <a-button
                class="a-buttom-reset-link"
                @click="showModal('启用', props)"
                type="link"
                >启用</a-button
              >
              <a-divider type="vertical" />
            </template>
            <template v-if="props.userState == 'NORMAL'">
              <a-button
                class="a-buttom-reset-link"
                @click="showModal('禁用', props)"
                type="link"
                >禁用</a-button
              >
              <a-divider type="vertical" />
            </template>
            <template>
              <a-button
                class="a-buttom-reset-link"
                @click="showModal('删除', props)"
                type="link"
                >删除</a-button
              >
              <a-divider type="vertical" />
            </template>
            <template>
              <a-button
                class="a-buttom-reset-link"
                @click="assignUsers(props)"
                type="link"
                >关联角色</a-button
              >
              <a-divider type="vertical" />
            </template>
          </div>
        </template>
      </baseTable>
    </div>
    <a-modal
      v-model="modelVisibleAdd"
      title="添加用户"
      @ok="handleAdd"
      @cancel="handleCancelAdd"
      :destroyOnClose="true"
    >
      <template>
        <a-form :form="modelForm" @submit="handleAdd">
          <a-row>
            <a-col span="19">
              <a-form-item
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 20 }"
                label="手机号"
              >
                <a-input
                  v-decorator="[
                    'phone',
                    {
                      rules: [
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3456789]\d{9}$/, message: '格式不对' },
                      ],
                      initialValue: modelForm.phone,
                    },
                  ]"
                  placeholder="请输入手机号"
                />
              </a-form-item>
            </a-col>
            <a-col span="2" offset="1">
              <a-form-item>
                <a-button
                  type="primary"
                  @click="searchPhone"
                  :loading="searchPhoneLoading"
                >
                  查询
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            label="用户信息"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [
                    {
                      required: true,
                      message: '必填',
                    },
                  ],
                  initialValue: modelForm.name,
                },
              ]"
              placeholder="请查找用户信息"
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
        label: '用户姓名',
        type: 'input',
        name: 'name',
        placeholder: '请输入角色名称',
        // labelCol: { span: 3 },
        wrapperCol: { span: 18 },
      },
      {
        label: '手机号码',
        type: 'input',
        name: 'phone',
        placeholder: '请输入手机号',
        // labelCol: { span: 3 },
        wrapperCol: { span: 18 },
        rules: [
          { required: false, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '格式不对' },
        ],
      },
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
        title: '用户名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        ellipsis: true,
      },
      {
        title: '公司',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 200,
        ellipsis: false,
      },
      {
        title: '部门',
        dataIndex: 'departName',
        key: 'departName',
        width: 200,
        ellipsis: false,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 200,
        ellipsis: false,
      },
      {
        title: '操作',
        fixed: 'right',
        width: 280,
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
      searchData: {},
      tableLoading: false,
      modalVisible: false, // 弹窗显示隐藏
      modalVisibleAuthority: false, // 分配权限弹窗显示隐藏
      modelVisibleAdd: false,
      type: '', // 操作类型 删除 启用 禁用
      row: {},
      checkedKeys: [],
      selectedRow: [],
      treeData: [],
      form: this.$form.createForm(this, { name: 'form' }),
      modelForm: this.$form.createForm(this, { name: 'form' }),
      formItemLayout,
      searchPhoneLoading: false,
      toAssignRole: {},
    }
  },
  mounted() {
    let params = {
      pageNum: this.pageData.pageNum, // 第几页
      pageSize: this.pageData.pageSize, // 每页多少条
      ...this.searchData, // 角色名称,手机号
    }
    // 角色列表
    this.getData(params)
    // 权限列表
    // this.getPermissionList()
  },
  methods: {
    // 查询
    onSearch(searchData) {
      this.searchData = searchData // 角色名称
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        ...searchData,
      }
      console.log(params, 'onSearch')
      this.getData(params)
    },
    // 获取账户列表数据
    async getData(params) {
      this.tableLoading = true
      if (!params) {
        params = {
          pageNum: this.pageData.pageNum, // 第几页
          pageSize: this.pageData.pageSize, // 每页多少条
        }
      }
      try {
        let res = await api.getAccountListData(params)
        let { code, data } = res
        if (code == 200) {
          this.dataList = data.records
          this.pageData.total = Number(data.total)
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
        ...this.searchData, // 角色名称,手机号
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
      this.modelVisibleAdd = true
    },
    // 编辑
    edit(row) {
      this.$router.push({
        name: 'accountRoleEdit',
        params: {
          type: '编辑',
          id: row.id,
          roleName: row.roleName,
          roleCode: row.roleCode,
        },
      })
    },
    // 弹窗确定
    handleOk() {
      switch (this.type) {
        case '删除':
          this.del(this.row)
          break
        case '启用':
          this.enable(this.row)
          break
        case '禁用':
          this.disable(this.row)
          break
      }
    },
    // 删除
    del(row) {
      try {
        let params = {
            id: row.id,
          },
          that = this
        this.$confirm({
          title: `您确认要删除"${row.menuName}"的信息吗?`,
          content: '',
          centered: true,
          onOk() {
            api.setdelAccount(params).then(res => {
              if (res.code == 200) {
                that.$message.info(`删除成功`)
                let params = {
                  pageNum: that.pageData.pageNum, // 第几页
                  pageSize: that.pageData.pageSize, // 每页多少条
                  ...this.searchData,
                }
                that.getData(params)
              } else {
                that.$message.error(`删除失败`)
              }
            })
          },
          onCancel() {},
        })
      } finally {
        this.loadingSubmit = false
      }
    },
    // 启用
    enable(row) {
      try {
        let params = {
          id: row.id,
          state: 1,
        }
        this.$confirm({
          title: `您确认要启用"${row.menuName}"账号吗?`,
          centered: true,
          onOk() {
            api
              .setAccountUpdateStatus(params)
              .then(res => {
                if (res.code == 200) {
                  that.$message.info(`启用成功`)
                  let params = {
                    pageNum: that.pageData.pageNum, // 第几页
                    pageSize: that.pageData.pageSize, // 每页多少条
                    ...this.searchData,
                  }
                  that.getData(params)
                } else {
                  that.$message.error(`启用失败`)
                }
              })
              .finally(err => {
                this.loadingSubmit = false
              })
          },
          onCancel() {},
        })
      } finally {
        this.loadingSubmit = false
      }
    },
    // 禁用
    async disable(row) {
      try {
        let params = {
          id: row.id,
          state: 0,
        }
        this.$confirm({
          title: `您确认要禁用"${row.menuName}"账号吗?`,
          centered: true,
          onOk() {
            api
              .setAccountUpdateStatus(params)
              .then(res => {
                if (res.code == 200) {
                  that.$message.info(`禁用成功`)
                  let params = {
                    pageNum: that.pageData.pageNum, // 第几页
                    pageSize: that.pageData.pageSize, // 每页多少条
                    ...this.searchData,
                  }
                  that.getData(params)
                } else {
                  that.$message.error(`禁用失败`)
                }
              })
              .finally(err => {
                this.loadingSubmit = false
              })
          },
          onCancel() {},
        })
      } finally {
        this.loadingSubmit = false
      }
    },
    // 弹窗取消
    handleCancel() {
      this.modalVisible = false
    },
    // 显示弹窗
    showModal(type, row) {
      this.type = type
      this.row = row
      this.modalVisible = true
    },
    // 打开权限窗口
    showAuthorityModal(row) {
      this.modalVisibleAuthority = true
      this.row = row
      let params = {
        roleId: row.id,
      }
      api.getPermListByRole(params).then(res => {
        res.data.permList.map(item => {
          this.checkedKeys.push(item.id)
        })
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
            roleName: this.searchData.roleName, // 角色名称
          }
          this.getData(params)
        }
      } finally {
      }
    },
    // 分配权限窗口关闭
    handleCancelAuthority() {
      this.modalVisibleAuthority = false
    },
    // 分配用户
    assignUsers(row) {
      this.$router.push({
        name: 'assignUsers',
        params: {
          id: row.id,
        },
      })
    },
    //新增用户-查询一体化的员工手机号
    searchPhone() {
      let userPhone = this.modelForm.getFieldsValue().phone
      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(userPhone)) {
        return (this.searchPhoneLoading = false)
      }
      this.searchPhoneLoading = true
      api
        .setAddAccountByPhone({ phone: userPhone })
        .then(res => {
          if (res.code == 200) {
            this.modelForm.name = res.data.empName
            let employeeOrganizationVOs = res.data.employeeOrganizationVOs[0]
            this.toAssignRole = { ...employeeOrganizationVOs }
            console.log(this.toAssignRole, 'this.toAssignRole ')
          }
        })
        .finally(err => {
          this.searchPhoneLoading = false
        })
    },
    //添加保存用户
    handleAdd(e) {
      let that = this
      this.modelForm.validateFields((err, values) => {
        if (!err) {
          that.toAssignRole = Object.assign(values, that.toAssignRole)
          return new Promise((resolve, reject) => {
            api
              .setAddAccountSave(this.toAssignRole)
              .then(res => {
                console.log(res, 'name')
                if (res.code == 200) {
                  that.modelVisibleAdd = false
                }
              })
              .catch(error => {
                this.onSearch()
              })
          })
        }
      })
    },
    //添加用户关闭弹窗
    handleCancelAdd() {
      //   this.modelForm = { name: '', phone: '' }
      this.toAssignRole = {}
    },
  },
}
</script>
<style lang="less" scoped>
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
