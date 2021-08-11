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
            <template>
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="showModal('删除', props)"
                type="link"
                >删除</a-button
              >
            </template>
            <template v-if="props.state == 0">
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="showModal('启用', props)"
                type="link"
                >启用</a-button
              >
            </template>
            <template v-if="props.state == 1">
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="showModal('禁用', props)"
                type="link"
                >禁用</a-button
              >
            </template>
            <template>
              <a-divider type="vertical" />
              <a-button
                class="a-buttom-reset-link"
                @click="assignUsers(props)"
                type="link"
                >关联角色</a-button
              >
            </template>
          </div>
        </template>
      </baseTable>
    </div>
    <a-modal
      :title="type"
      :visible="modalVisible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <span>您确定要“{{ type }}”吗？</span>
    </a-modal>
    <a-modal
      title="分配权限"
      :visible="modalVisibleAuthority"
      @ok="handleOkAuthority"
      @cancel="handleCancelAuthority"
    >
      <template>
        <div class="tree-box">
          <a-tree
            v-model="checkedKeys"
            checkable
            :tree-data="treeData"
            @check="onCheck"
          />
        </div>
      </template>
    </a-modal>
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
                    'userPhone',
                    {
                      rules: [
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3456789]\d{9}$/, message: '格式不对' },
                      ],
                    },
                  ]"
                  placeholder="请输入手机号"
                />
              </a-form-item>
            </a-col>
            <a-col span="2" offset="1">
              <a-form-item>
                <a-button type="primary" @click="searchPhone">
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
        name: 'roleName',
        placeholder: '请输入角色名称',
        // labelCol: { span: 3 },
        wrapperCol: { span: 18 },
      },
      {
        label: '手机号码',
        type: 'input',
        name: 'rolePhone',
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
        title: '用户名名称',
        dataIndex: 'roleName',
        key: 'roleName',
        width: 200,
        ellipsis: true,
      },
      {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
        width: 200,
        ellipsis: false,
      },
      {
        title: '部门',
        dataIndex: 'partment',
        key: 'partment',
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
        width: 250,
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
      searchData: {
        roleName: undefined,
      },
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
    }
  },
  mounted() {
    let params = {
      pageNum: this.pageData.pageNum, // 第几页
      pageSize: this.pageData.pageSize, // 每页多少条
      roleName: this.searchData.roleName, // 角色名称
    }
    // 角色列表
    // this.getData(params)
    this.dataList = [
      {
        roleName: '用户名名称',
        partment: '公司',
        phone: '13560086925',
        id: 1,
        key: 1,
      },
      {
        roleName: '用户名名称',
        partment: '公司',
        phone: '13560086925',
        id: 2,
        key: 2,
      },
      {
        roleName: '用户名名称',
        partment: '公司',
        phone: '13560086925',
        id: 3,
        key: 3,
      },
    ]
    // 权限列表
    // this.getPermissionList()
  },
  methods: {
    // 查询
    onSearch(searchData) {
      this.searchData.roleName = searchData.roleName // 角色名称
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        roleName: this.searchData.roleName, // 角色名称
      }
      console.log(searchData, 'onSearch')
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
        let res = await api.roleGetListByPager(params)
        this.dataList = res.data.records
        this.pageData.total = Number(res.data.total)
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
        roleName: this.searchData.roleName, // 角色名称
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
    async del(row) {
      try {
        let params = {
          id: row.id,
        }
        let res = await api.roleDelete(params)
        if (res.code == 200) {
          this.handleCancel()
          this.$message.success('删除成功')
          let params = {
            pageNum: this.pageData.pageNum, // 第几页
            pageSize: this.pageData.pageSize, // 每页多少条
            roleName: this.searchData.roleName, // 角色名称
          }
          this.getData(params)
        }
      } finally {
        this.loadingSubmit = false
      }
    },
    // 启用
    async enable(row) {
      try {
        let params = {
          id: row.id,
          state: 1,
        }
        let res = await api.roleUpdate(params)
        if (res.code == 200) {
          this.handleCancel()
          this.$message.success('启用成功')
          let params = {
            pageNum: this.pageData.pageNum, // 第几页
            pageSize: this.pageData.pageSize, // 每页多少条
            roleName: this.searchData.roleName, // 角色名称
          }
          this.getData(params)
        }
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
        let res = await api.roleUpdate(params)
        if (res.code == 200) {
          this.handleCancel()
          this.$message.success('禁用成功')
          let params = {
            pageNum: this.pageData.pageNum, // 第几页
            pageSize: this.pageData.pageSize, // 每页多少条
            roleName: this.searchData.roleName, // 角色名称
          }
          this.getData(params)
        }
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
    // 选中权限
    onCheck(checkedKeys, e) {
      this.checkedKeys = checkedKeys
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
    searchPhone() {
      let userPhone = this.modelForm.getFieldsValue().userPhone
      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(userPhone)) {
        return
      }
    },
    //添加用户
    handleAdd(e) {
      e.preventDefault()
      this.modelForm.validateFields((err, values) => {
        if (!err) {
          return new Promise((resolve, reject) => {
            this.onSubmit(values)
            this.modelVisibleAdd = false
          })
        }
      })
    },
    onSubmit(values) {
      console.log(values)
    },
    //添加用户取消
    handleCancelAdd() {
      //   this.modelForm.resetFields()
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
