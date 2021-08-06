<template>
  <vxe-virtual-tree
    class="vxe-virtual-tree-table"
    show-overflow
    row-key
    row-id="categoryId"
    :data="tableData"
    :tree-config="{ children: 'children' }"
    :columns="tableColumns"
  >
  </vxe-virtual-tree>
</template>
<script>
import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)

// ...
import VXETablePluginVirtualTree from 'vxe-table-plugin-virtual-tree'
import 'vxe-table-plugin-virtual-tree/dist/style.css'
// ...

VXETable.use(VXETablePluginVirtualTree)
export default {
  data() {
    return {
      tableColumn: [
        // { field: 'name', title: '名称', treeNode: true },
        // { field: 'isChildren', title: '是否末级' },
      ],
      tableData: [
        // {
        //   id: '101',
        //   name: '文档1',
        //   size: 12,
        //   type: 'xlsx',
        //   date: '2019-12-12',
        // },
        // {
        //   id: '102',
        //   name: '文件夹',
        //   size: 12,
        //   type: '',
        //   date: '2019-12-12',
        //   children: [
        //     {
        //       id: '103',
        //       name: '文档3',
        //       size: 12,
        //       type: 'avi',
        //       date: '2019-12-12',
        //     },
        //   ],
        // },
      ],
    }
  },
  props: {
    tableColumns: {
      default: () => [],
      type: Array,
    },
    tableDatas: {
      default: () => [],
      type: Array,
    },
  },
  watch: {
    tableDatas(old, newval) {
      this.tableData = this.tableDatas.map(item => {
        return {
          name: item.name,
          isChildren: item.children && item.children.length > 0 ? '否' : '是',
          children: item.children || [],
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.vxe-virtual-tree-table .vxe-cell {
  padding: 12px;
}
</style>
