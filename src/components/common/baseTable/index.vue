<template>
  <div class="container-table" style="height:100%;">
    <!-- 表格 -->
    <baseModule :class="{ 'module-table': total <= 0 }">
      <a-table
        ref="aTable"
        :columns="columns"
        :row-key="(r, i) => r.id"
        :data-source="tableData"
        :scroll="{ x: 1000, y: tableY }"
        :pagination="false"
        :loading="loading"
        v-bind="tableConfig"
      >
        <template
          v-for="item in setSlot"
          :slot="item"
          slot-scope="props, text, index"
        >
          <slot :name="item" :props="props" :index="index"></slot>
        </template>
      </a-table>
    </baseModule>
    <!-- 分页  -->
    <baseModule v-if="total > 0" class="container-table-module">
      <a-pagination
        :total="total"
        :show-total="total => `共 ${total} 条`"
        show-quick-jumper
        show-size-changer
        v-model="currents"
        :default-current="currents"
        :page-size.sync="pageSizes"
        :pageSizeOptions="pageSizeOptions"
        @change="onShowSizeChange"
        @showSizeChange="onShowSizeChange"
      />
    </baseModule>
  </div>
</template>
<script>
export default {
  name: 'baseTable',
  data() {
    return {
      tableY: 400,
      currents: 1,
      pageSizes: 10,
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    scrollY: {
      type: Number,
      default: 400,
    },
    tableConfig: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: [Number, String],
      default: 1,
    },
    pageSize: {
      type: [Number, String],
      default: 10,
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['10', '20', '50', '100'],
    },
    isShowPagination: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    current(val) {
      this.currents = val
    },
    pageSize(val) {
      this.pageSizes = val
    },
    total() {
      this.setHeight()
    },
  },
  computed: {
    setSlot() {
      return _.cloneDeep(this.columns)
        .filter(a => {
          return a.scopedSlots && a.scopedSlots.customRender
        })
        .map(b => b.scopedSlots.customRender)
    },
  },
  created() {
    this.$nextTick(function() {
      this.setHeight()
    })
    this.currents = this.current
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      this.$emit('onShowSizeChange', current, pageSize)
    },
    setHeight() {
      const _this = this
      setTimeout(function() {
        _this.tableY = `${document.documentElement.clientHeight -
          _this.$refs.aTable.$el.offsetTop -
          (_this.total > 0 ? 140 : 85)}px`
      }, 0)
    },
  },
}
</script>
<style lang="less" scoped>
.container-table {
  height: 100%;
}
.container-table-module {
  margin-bottom: 0;
  /deep/ .ant-pagination {
    text-align: right;
  }
}
.module-table {
  height: 100%;
  overflow-y: hidden;
}
/deep/.ant-table-tbody > tr > td {
  padding: 8px 10px;
}
/deep/.ant-table-thead > tr > th {
  padding: 16px 10px;
}
</style>
