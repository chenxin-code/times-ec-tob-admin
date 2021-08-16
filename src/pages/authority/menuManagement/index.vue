<template>
  <div class="container-modules column">
    <baseModule class="search-form">
      <a-button
        class="a-buttom-reset"
        type="primary"
        @click.stop="onDetails('add')"
        >添加</a-button
      >
    </baseModule>
    <div class="flex content-box">
      <baseTable
        :columns="columns"
        :tableData="tableData"
        :loading="tableLoading"
        :scrollY="scrollY"
      >
        <template slot="menuType" slot-scope="{ props }">
          {{ ['未定义', '菜单', '按钮'][props.menuType] }}
        </template>
        <template slot="visible" slot-scope="{ props }">
          {{ ['已启用', '已停用'][props.visible] }}
        </template>
        <template slot="operation" slot-scope="{ props }">
          <div class="editable-row-operations">
            <a-button
              class="a-buttom-reset-link"
              type="link"
              @click="onDetails('edit', props)"
              >编辑</a-button
            >
            <a-button
              class="a-buttom-reset-link"
              type="link"
              @click="onChangeStatus(props)"
              >{{ ['停用', '启用'][props.visible] }}</a-button
            >
            <a-button
              class="a-buttom-reset-link"
              type="link"
              @click="onDelete(props)"
              >删除</a-button
            >
          </div>
        </template>
      </baseTable>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '菜单名称',
          dataIndex: 'menuName',
          key: 'menuName',
          width: 280,
          ellipsis: true,
        },
        {
          title: '编码',
          dataIndex: 'perms',
          key: 'perms',
          width: 180,
          ellipsis: true,
        },
        {
          title: '排序',
          dataIndex: 'orderNum',
          key: 'orderNum',
          width: 120,
          ellipsis: true,
        },
        {
          title: '状态',
          key: 'visible',
          scopedSlots: { customRender: 'visible' },
          width: 120,
          ellipsis: true,
        },
        {
          title: '类型',
          scopedSlots: { customRender: 'menuType' },
          key: 'menuType',
          width: 120,
          ellipsis: true,
        },
        {
          title: '地址',
          dataIndex: 'url',
          key: 'url',
          width: 200,
          ellipsis: true,
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 200,
          align: 'center',
          fixed: 'right',
        },
      ],
      tableData: [],
      tableLoading: false,
      isShowSort: false,
      scrollY: 100,
    }
  },
  watch: {
    search: {
      handler: function(val) {
        this.isShowSort = _.compact(Object.values(val)).length > 0
      },
      deep: true,
    },
  },
  created() {
    this.initData()
    setTimeout(() => {
      this.scrollY = document.body.clientHeight - 230
    }, 0)
  },
  methods: {
    // 初始化树数据
    initData() {
      this.tableLoading = true
      this.$api
        .getMenuTreeList({})
        .then(res => {
          this.tableData = this.resetData(res.data)
        })
        .finally(() => (this.tableLoading = false))
    },
    // 递归删除空的children
    resetData(data) {
      _.forEach(data, element => {
        if (element.children) {
          if (element.children.length <= 0) {
            delete element.children
          } else {
            this.resetData(element.children)
          }
        }
      })
      return data
    },
    // 内页操作 type=  add/添加  || look/查看 || edit/编辑
    onDetails(type, props) {
      const title = {
        add: '添加菜单',
        look: '菜单详情',
        edit: '编辑菜单',
      }
      this.$router.push({
        name: 'menuManagementEdit',
        params: {
          type,
          title: title[type], // 内页的标题
          id: props?.id ?? '',
        },
      })
    },
    // 启用/禁用
    onChangeStatus(props) {
      const that = this
      this.$confirm({
        title: `您确认${['停用', '启用'][props.visible]}“${
          props.menuName
        }”该菜单?`,
        centered: true,
        onOk() {
          that.tableLoading = true
          that.$api
            .getMenuUpdateState({ id: props.id })
            .then(() => {
              that.$message.info(`${['停用', '启用'][props.visible]}成功`)
              that.initData()
              that.$store.dispatch('GET_MENU_LIST')
            })
            .finally(() => (that.tableLoading = false))
        },
        onCancel() {},
      })
    },
    // 删除
    onDelete(props) {
      const that = this
      this.$confirm({
        title: `您确认要删除"${props.menuName}"菜单吗?`,
        content: h => <div style="color:red;">如有子菜单也会一并删除!</div>,
        centered: true,
        onOk() {
          that.tableLoading = true
          that.$api
            .getMenuDelete({ id: props.id })
            .then(res => {
              if (res.code == 200) {
                that.$message.info(`删除成功`)
                that.initData()
                that.$store.dispatch('GET_MENU_LIST')
              } else {
                that.$message.error(`删除失败`)
              }
            })
            .finally(() => (that.tableLoading = false))
        },
        onCancel() {},
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
.container-modules {
  height: 100%;
}
.search-form {
  width: 100%;
  margin-bottom: 10px;
}
.content-box {
  width: 100%;
  background: #fff;
}
</style>
