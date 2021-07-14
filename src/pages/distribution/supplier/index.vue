<template>
  <div id="member-info">
    <div class="content-header">供应商列表页</div>
    <div class="content-main" ref="contentMain" style="padding: 20px;">
      <FilterForm
        ref="memberForm"
        rowCol="3"
        :formList="this.formList"
        :onSubmit="this.onSearch"
        :doubleBtn="true"
        :doubleBtnText="'重置'"
        :doubleBtnEvent="addpush"
      />
      <!-- <a-button type="primary" @click="addpush">
        <a-icon type="plus" /> 添 加
      </a-button> -->
      <!-- 表格 -->
     <a-table
       style="width:100%;margin-top:8px;"
       :columns="columns"
       :data-source="tableDataList"
       :pagination="false"
       :loading="tableLoading"
       :scroll="{ y: scrollY }"
      >
        <template slot="faceAmountSlot" slot-scope="rowData">
          <div class="editable-row-operations">
            <a @click="onCheck(rowData)">查看</a><a-divider type="vertical" />
            <a @click="onChecked(rowData)">编辑</a><a-divider type="vertical" />
            <a @click="onChecking(rowData)">{{rowData.isValidState ==false? '启用':'无效'}}</a>
          </div>
        </template>
      </a-table>
      <a-pagination
        :total="total"
        :show-total="total => `共 ${total} 条`"
        show-quick-jumper
        show-size-changer
        v-model="current"
        :default-current="current"
        :page-size.sync="pageSize"
        :pageSizeOptions="['10', '20', '30', '40', '50', '100']"
        @change="onShowSizeChange"
        @showSizeChange="onShowSizeChange"
        style="margin-top:30px;width:100%;text-align: right;"
      />
    </div>

  </div>
</template>

<script>
import FilterForm from '@/components/FilterGroup/index.jsx';
import api from '@/api';
import moment from 'moment';
export default {
  name: 'supplier',
  data() {
    return {
      tableDataList: [],  //所有列表数据
      state: 'false',  //状态启用
      cominq:[], //社区接口列表
      isValidState:'',
      //form列表
      formList: [
        // {
        //   label: '所在社区',
        //   type: 'select',
        //   name: 'cuNo',
        //   placeholder: '请选择',
        //   selectOptions:[
        //     {
        //       id: '',
        //       name: '全部'
        //     }
        //   ]
        // },
        {
          label: '供应商名称',
          type: 'input',
          name: 'name',
          placeholder: '供应商名称'
        },
         {
          label: '供应商编号',
          type: 'input',
          name: 'teamLeaderPhoneNumber',
          maxLength: 11,
          placeholder: '供应商编号'
        },
        // {
        //   type: 'button',
        //   buttonName: '添加',
        //   htmlType: 'submit',
        //   align: 'right',
        //   labelCol: { span: 0 },
        //   wrapperCol: { span: 24 }
        // },
      ],
      //表格高度
      scrollY: 100,
      //表头数据
      columns: [
        {
          dataIndex: 'teamLeaderName',
          key: 'id',
          title: '供应商名称'
        },
        {
          dataIndex: 'teamLeaderPhoneNumber',
          key: 'couponTitle',
          title: '供应商编码',
        },
         {
          title: '创建时间',
          key: 'addtimes',
          customRender: text => moment(text).format('YYYY-MM-DD')
        },
        // {
        //   dataIndex: 'isValidState',
        //   title: '人员状态',
        //   key: 'activity',
        //   customRender: text => {return text == 1? '启用':'无效'}
        // },
        // {
        //   title: '操作',
        //   key: 'createTime',
        //   scopedSlots: { customRender: 'faceAmountSlot' }
        // }
      ],
      tableLoading: false,
      //分页
      total: 0,  //总页
      current: 1, //首次加载页
      pageSize: 10 //首次加载条
    };
  },
  components: {
    FilterForm
  },
  created() {
    const timer1 = setTimeout(() => {
      this.scrollY = document.body.clientHeight - 370 + 'px';
    }, 0);
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer1);
    });
      // this.getCouponList();
      // api.cominq().then((res)=>{ //获取社区名列表
        // this.formList[0].selectOptions = res.data.records.map((item, index) => {
        //     return {
        //       id: item.id,
        //       name:item.name
        //     };
        //   });
          // this.formList[0].selectOptions.unshift({id:'',name:'全部'});
      //     console.log(this.cominq);
      // })
  },
    activated() {
      this.getCouponList();
    // 设置默认值全部
    this.$nextTick(() => {
      this.$refs.memberForm.setFieldsValue({
        cuNo:this.formList[0].selectOptions[0].id,
        validState:this.formList[1].selectOptions[0].id,
        commissionState:this.formList[3].selectOptions[0].id,
      });
    });
  },
  // beforeUpdate() {
  //   this.getCouponList();
  // },
  methods: {
    // 切换列表分页
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      this.current = current;
      this.pageSize = pageSize;
      this.getCouponList();
    },
    // 获取主页列表
    getCouponList() {
      this.tableLoading = true;
        // let  params = {
        //   pageNum:this.current,
        //   pageSize:this.pageSize
        //   }
        const params = new URLSearchParams();
        params.append("pageNum", this.current);
        params.append("pageSize", this.pageSize);
        params.append("sortBy", "id_desc");
        api.girthlist(params).then((res)=>{
          this.tableLoading = false;
          console.log('数据列表',res);
          this.tableDataList = res.data.records.map((item, index) => {
            return {
              ...item,
              key: index
            };
          });
           this.total = Number(res.data.total);
    }).finally(() => (this.tableLoading = false));
    },
    //查询按钮
     onSearch(args) {
      console.log(args);
      const params = new URLSearchParams();
            params.append("cuNo", args.cuNo?args.cuNo:'');
            params.append("validState", args.validState?args.validState:'');
            params.append("teamLeaderName", args.name?args.name:'');
            params.append("commissionState", args.commissionState?args.commissionState:'');
            params.append("teamLeaderPhoneNumber", args.teamLeaderPhoneNumber?args.teamLeaderPhoneNumber:'');
        //  let   params={
        //    cuNo: args.cuNo,
        //    validState:args.validState,
        //    teamLeaderName:args.name,
        //    commissionState:args.commissionState,
        //    teamLeaderPhoneNumber: args.teamLeaderPhoneNumber,
        //  }
      this.tableLoading = true;
    api.girthlist(params).then((res)=>{
          this.tableLoading = false;
          this.tableDataList = res.data.records.map((item, index) => {
            return {
              ...item,
              key: index
            };
          });
           this.total = Number(res.data.total);
    }).finally(() => (this.tableLoading = false));
    },
      //点击重置按钮
    addpush(){
        this.$router.push({ name: 'detail'})
        // $router.push('/addgirth')
    },
    //编辑按钮
    onChecked(rowData){
      console.log('编辑rowData::::::::',rowData)
          window.sessionStorage.setItem('teamLeaderNo', rowData.teamLeaderNo);
      this.$router.push({ name: 'addgirth', params: rowData})
    },
    //查看按钮
    onCheck(rowData){
          window.sessionStorage.setItem('teamLead', rowData.teamLeaderNo);
          this.$router.push({ name: 'detailgirth', params: rowData})
    },
    //点击更改启用禁用状态
    onChecking(rowData){
      this.$confirm({
        title: `是否确定${rowData.isValidState ==false? '启用':'无效'}该用户团长角色`,
        content: ``,
        centered: true,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
              console.log(rowData);
              let params = new URLSearchParams();
                  params.append("teamLeaderNo", rowData.teamLeaderNo);
                  params.append("validState", !rowData.isValidState);

                  console.log(rowData.isValidState);
                api.comonoff(params).then((res)=>{
                  this.$message.success( '修改状态成功', 2);
                  this.getCouponList();
                  }).catch((error)=>{
                      this.$message.error( '修改状态失败', 2);
                  })
                  }
                  });



    },
  },

};
</script>

<style lang="less" scoped>
#member-info {
  height: 100%;
  overflow: hidden;

  .content-main {
    ::v-deep .ant-btn {
      width: 98px !important;
    }

    ::v-deep .ant-input-number {
      width: 100%;
    }
  }
}
</style>
