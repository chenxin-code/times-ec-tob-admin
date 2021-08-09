<template>
  <div id="neighborhoodLife">
    <!-- <div class="content-main" ref="content_main">
      <a-row style="padding: 20px;height: 100%;">
        <a-col>
          <a-table
            :columns="columns"
            :data-source="categoryData"
            :loading="tableLoading"
            row-key="categoryId"
            :indentSize="35"
            :pagination="false"
          >
            <template slot="children" slot-scope="scope">
              <div class="editable-row-operations">
                <span v-html="childrenParse(scope.children)"></span>
              </div>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div> -->
    <virtualTree :tableColumns="tableColumn" :tableDatas="categoryData">
    </virtualTree>
  </div>
</template>

<script>
import api from './../../api'
import virtualTree from '@/components/virtual-tree'
export default {
  data() {
    return {
      tableColumn: [
        { field: 'name', title: '名称', treeNode: true },
        { field: 'isChildren', title: '是否末级' },
      ],
      categoryData: [],
      columns: [
        {
          title: '品类名称',
          dataIndex: 'name',
          key: 'name',
          width: 300,
          fixed: 'left',
        },
        {
          title: '是否末级',
          key: 'children',
          scopedSlots: { customRender: 'children' },
          align: 'left',
          //   width: 800,
          //   fixed: 'right',
        },
      ],
      tableLoading: false,
    }
  },
  components: {
    virtualTree,
  },
  computed: {},
  methods: {
    childrenParse(param) {
      if (!param || param.length === 0) {
        return '是'
      } else {
        return '否'
      }
    },
    delChild(data) {
      for (let i = 0; i < data.length; i++) {
        data[i].isChildren = this.childrenParse(data[i].children)
        if (data[i].children.length === 0) {
          delete data[i].children
        } else {
          this.delChild(data[i].children)
        }
      }
    },
  },
  mounted() {
    this.tableLoading = true
    api
      .getCategoryTree({})
      .then(resp => {
        if (resp.code === 200) {
          this.categoryData = resp.data.map(item => {
            return {
              ...item,       
            }
          })
          console.log(this.categoryData)
          this.delChild(this.categoryData)
        }
      })
      .finally(() => {
        this.tableLoading = false
      })
  },
}
</script>

<style lang="less" scoped></style>
