<template>
  <a-transfer
    :data-source="mockData"
    :target-keys="value"
    :show-search="isShowSearch"
    :list-style= "{
      height: '480px'
    }"
    :filter-option="filterOption"
    :show-select-all="false"
    :titles="['未选','已选']"
    @change="onChange"
  >
    <template
      slot="children"
      slot-scope="{
        props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
        on: { itemSelectAll, itemSelect },
      }"
    >
      <a-table
        style="width:360px;height:360px;overflow:auto"
        :row-selection="
        getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })"
        :columns="direction === 'left' ? leftColumns : rightColumns"
        :data-source="filteredItems"
        size="small"
        :style="{ pointerEvents: listDisabled ? 'none' : null}"
        :custom-row="
            ({ key, disabled: itemDisabled }) => ({
            on: {
            click: () => {
            if (itemDisabled || listDisabled) return;
            itemSelect(key, !selectedKeys.includes(key));
            },},
        })"
      />
    </template>
  </a-transfer>
</template>

<script>
  import difference from 'lodash/difference';
  export default {
    name: "vTransfer",
    props:{
      value:{
        type:Array,
        default() {
          return [];
        }
      },
      mockData:{
        type:Array,
        default() {
          return [];
        }
      },
      leftColumns:{
        type:Array,
        default() {
          return [];
        }
      },
      rightColumns:{
        type:Array,
        default() {
          return [];
        }
      },
      //是否显示搜索框
      isShowSearch: {
        type: Boolean,
        default() {
          return true;
        }
      },
      //当显示搜索框时需要过滤的字段key
      filterKeyList:{
        type: Array,
        default() {
          return ["title"];
        }
      }
    },
    data() {
      return {
        targetKeys: this.value,
      }
    },
    created() {
      window._tf=this;
    },
    methods: {
      //搜索过滤字段
      filterOption(inputValue, item,isShow = false,i = 0){
        for(;i < this.filterKeyList.length; i++){
          if(item[this.filterKeyList[i]].indexOf(inputValue) !== -1){
            isShow = true;
            break;
          }
        }
        return isShow;
      },
      onChange(nextTargetKeys) {
        this.targetKeys = nextTargetKeys;
        this.$emit('input',this.targetKeys)
      },
      getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
        return {
          getCheckboxProps: item => ({props: {disabled: disabled || item.disabled}}),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({key}) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, selectedKeys)
              : difference(selectedKeys, treeSelectedKeys);
            itemSelectAll(diffKeys, selected);
          },
          onSelect({key}, selected) {
            itemSelect(key, selected);
          },
          selectedRowKeys: selectedKeys,
        };
      }
    }
  }
</script>

<style scoped>

</style>
