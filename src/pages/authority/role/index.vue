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
            <template v-if="props.status == 1">
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
      :title="type"
      :visible="modalVisible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <span>您确定要“{{ type }}”吗？</span>
    </a-modal>
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
                  initialValue: roleName,
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
        label: '用户姓名',
        type: 'input',
        name: 'roleName',
        placeholder: '请输入角色名称',
        wrapperCol: { span: 18 },
      },
      {
        label: '手机号码',
        type: 'input',
        name: 'rolePhone',
        placeholder: '请输入手机号',
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
        title: '角色名称',
        dataIndex: 'roleName',
        key: 1,
        width: 200,
        ellipsis: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 2,
        width: 100,
        ellipsis: false,
      },
      {
        title: '创建时间',
        dataIndex: 'creatTime',
        key: 3,
        width: 200,
        ellipsis: false,
      },
      {
        title: '操作',
        fixed: 'right',
        width: 300,
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
      formItemLayout,
      form: this.$form.createForm(this, { name: 'form' }),
      modelForm: this.$form.createForm(this, { name: 'modelForm' }),
      rules: [{ required: true, message: '请输入角色名称' }],
      roleName: '',
      title: '新增',
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
        roleName: '角色名称',
        creatTime: '13560086925',
        status: 1,
        key: 1,
        id: 1,
      },
      {
        roleName: '用户名名称',
        creatTime: '13560086925',
        status: 0,
        key: 2,
        id: 2,
      },
      {
        roleName: '用户名名称',
        creatTime: '13560086925',
        status: 1,
        key: 3,
        id: 3,
      },
    ]
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
        roleName: this.searchData.roleName, // 角色名称
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
      this.title = '新增'
      this.modelVisibleAdd = true
    },
    // 编辑
    edit(row) {
      this.title = '编辑'
      this.modelVisibleAdd = true
      this.roleName = row.roleName
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
    //分配权限
    assignAuthority(row) {
      this.$router.push({
        name: 'assignAuthority',
        params: {
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
            roleName: this.searchData.roleName, // 角色名称
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
      this.modelForm.resetFields()
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
