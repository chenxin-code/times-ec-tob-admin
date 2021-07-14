<template>
  <div class="select-transfer">
      <div class="ant-transfer-list">
            <div class="ant-transfer-list-header" style="padding: 0 12px;line-height: 39px;">
                <span class="ant-transfer-list-header-selected">
                    <span>{{menuData.tableName}}</span>
                    <span class="ant-transfer-list-header-title"></span>
                </span>
            </div>
            <div class="ant-transfer-list-body">
                <div class="ant-transfer-list-body-customize-wrapper">
                    <div ref="menuDom" class="ant-table-wrapper" style="height: 404px; overflow: auto">
                        <div class="ant-table-body">
                            <a-radio-group v-model="appId" @change="onChange" class="radio-vertical">
                                <a-list item-layout="horizontal">
                                    <a-list-item v-for="item in nowSelectData" :key="'radio'+item.key" :id="item.key">
                                        <a-radio :value="item.key">
                                            {{item.title}}
                                        </a-radio>
                                    </a-list-item>
                                </a-list>
                            </a-radio-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="v-transfer" style="flex:1">
            <a-spin :spinning="spinning">
                <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                <div class="ant-transfer ant-transfer-customize-list" style="width:812px;">
                    <div class="ant-transfer-list" style="height: 480px;margin-right: 0;">
                        <div class="ant-transfer-list-header">
                            <span class="ant-transfer-list-header-selected">
                                <span>可以分配的权限列表</span>
                                <!-- <span>{{selecteDataLeft.length}} 项</span> -->
                            </span>
                        </div>
                        <div class="ant-table-body">
                            <a-table :columns="leftColumns" :data-source="mockData" 
                            :row-selection="rowSelectionLeft()"
                            :scroll="{ y: 330 }">
                            </a-table>
                        </div>
                    </div>
                    <div class="ant-transfer-operation">
                        <a-button :disabled="selecteDataLeft.length === 0" @click="clickTransfer()">
                           <a-icon type="right" class="anticon anticon-right"/>
                        </a-button>
                    </div>
                    <div class="ant-transfer-list" style="height: 480px;">
                        <div class="ant-transfer-list-header">
                            <span class="ant-transfer-list-header-selected">
                                <span>{{selecteDataRight.length}} 项</span>
                            </span>
                            <span class="relative-right">
                                <a-button class="del-but" type="link" block @click="delAll()" :disabled="0 === selecteDataRight.length">
                                    <img src="@/assets/img/public/del_small.png">
                                </a-button>
                            </span>
                        </div>
                        <div class="ant-table-body">
                            <a-table :columns="rightColumnsData" :data-source="value.modelList" :row-selection="rowSelectionRight()" :scroll="{ y: 330 }">
                                <template slot="delBut" slot-scope="text, record">
                                 <a-button class="del-but" type="link" block @click="delRow(record)">
                                     <img src="@/assets/img/public/del_small.png">
                                </a-button>
                                </template>
                            </a-table>
                        </div>
                    </div>
                </div>
                <!-- <vTransfer v-model="value.modelVal" :mockData="mockData" :isShowSearch="false" :leftColumns="leftColumns" :rightColumns="rightColumns"/> -->
            </a-spin>
        </div>
  </div>
</template>

<script>
/**
 * 提示：该组件目前只适用于【角色管理】模块里的权限分配功能，如果在其他模块里引用请确认是否和【角色权限分配】功能UI交互一致，如不一致请重构该组件组件成公共组件（需兼容角色权限分配功能）
 */
import vTransfer from "@/components/transfer";
export default {
    props:{
        value:{
            type:Object,
            default() {
                return {}
            }
        },
        selectData:{
            type:Array,
            default() {
                return []
            }
        },
        leftColumns:{
            type:Array,
            default() {
                return []
            }
        },
        rightColumns:{
            type:Array,
            default() {
                return []
            }
        },
        //详情接口
        apiDataDetail:{
            type:Function,
            default() {
                return ()=>{
                    return new Promise((resolve,reason)=>{
                        reason('NoIntroduction');
                    })
                }
            }
        },
        menuData:{
            type:Object,
            default() {
                return {}
            }
        }
    },
    components: {vTransfer },
    data(){
        return {
            interactive:1,//交互模式，1=穿梭框穿梭内容禁用，2 = 删除
            selectedRowKeysLift:[],
            selectedRowKeysRight:[],
            leftColumnsData:[],
            rightColumnsData:[],
            spinning:false,
            appId:"",//应用ID
            nowSelectData:[],
            menuVal:"",
            menuList:[],
            targetKeys: [],
            mockData:[],
            leftOrRightMenu:{//穿梭框字段从当前所应用列表取值
                left:[],
                right:[]
            },
            selecteDataLeft:[],//左侧多选
            selecteDataRight:[],//左侧多选
        }
    },
    watch: {
        selectData(val,oldVal){
            this.nowSelectData = val;
        }
    },
    created() {
        window._st=this;
        this.init();
    },
    methods:{
        //重置多选项
        selectedReset() {
            this.selectedRowKeysLift = [];
            this.selectedRowKeysRight = [];
        },
        //初始化
        init(){
            this.dynamicWatch();
            this.nowSelectData = this.selectData;
            //穿梭框右侧列表添加删除按钮
            try {
                this.rightColumnsData = JSON.parse(JSON.stringify(this.rightColumns));
                this.rightColumnsData.push(
                    {
                        dataIndex: "delBut",
                        title: "",
                        superDataIndex:'title',
                        scopedSlots:{ customRender: 'delBut' }
                    }
                );
            } catch (error) {
                console.error(error);
            }
            //END——穿梭框右侧列表添加删除按钮
            let offsetTop = 0;
            this.$nextTick(()=>{
                this.appId = this.value.leftModelVal;
                if(this.value.leftModelVal){
                    this.onChange(null,true);
                    //滚动到应用列表位置
                    let dom=document.getElementById(this.value.leftModelVal);
                    if(dom){
                        offsetTop = dom.offsetTop - 200;
                    }
                }else{
                    this.onChange();
                }
                this.$refs.menuDom && (this.$refs.menuDom.scrollTop = offsetTop);
                let arr = [];
                this.rightColumns.forEach((it)=>{
                    if(it.isSuper){
                        arr.push(it);
                    }
                });
                this.leftOrRightMenu.right = arr;
                arr = [];
                this.leftColumns.forEach((it)=>{
                    if(it.isSuper){
                        arr.push(it);
                    }
                });
                this.leftOrRightMenu.left = arr;
            })
        },
        //动态监听
        dynamicWatch(){
            this.$watch('value.modelList',(val,oldVal)=>{
                let arr = [];
                val.forEach((it)=>{
                    arr.push(it.key);
                })
                this.$set(this.value,'modelVal',arr);
            })
        },
        //左侧多选
            rowSelectionLeft(){
			    const that = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        this.selectedRowKeysLift = selectedRowKeys;
                        this.selecteDataLeft = selectedRows;
                    },
                    onSelect: (record, selected, selectedRows) => {
                        this.selectedRowKeysLift.push(selectedRows.key)
                        // this.selectedRowKeysLift =selectedRows;
                        this.selecteDataLeft = selectedRows;
                    },
                    onSelectAll: (selected, selectedRows, changeRows) => {
                        this.selecteDataLeft = selectedRows;
                    },
                    getCheckboxProps(record){
                        return {
                            props: {
                                disabled: record.disabled,
                                key: record.key,
                            }
                        }
                    },
                    selectedRowKeys: that.selectedRowKeysLift
                }
            },
        //右侧多选
        rowSelectionRight(){
			const that = this;
            return {
                selectedRowKeys: that.selectedRowKeysRight,
                onChange: (selectedRowKeys, selectedRows) => {
                    this.selectedRowKeysRight = selectedRowKeys;
                    this.selecteDataRight = selectedRows;
                },
                onSelect2: (record, selected, selectedRows) => {
                    this.selecteDataRight = selectedRows;
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    this.selecteDataRight = selectedRows;
                }
            }
        },
        //穿梭
        clickTransfer(){
            let selecteDataLeft = this.selecteDataLeft;
            if(selecteDataLeft.length > 0){
                this.selectedReset();
                this.value.modelList.push(...this.selecteDataLeft);
                this.selecteDataLeft = [];
                if(2 === this.interactive){
                    selecteDataLeft.forEach((it)=>{
                        this.delete({suber:this,key:'mockData'},it);
                    });
                }else{
                    selecteDataLeft.forEach((it)=>{
                        it.disabled=true;
                    });
                    this.mockData.push();//触发列表重新渲染
                }
            }
        },
        //删除
        delRow(row){
            this.$confirm({
            title: '删除',
            content: '确定删除？',
            centered: true,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                if(2 === this.interactive){
                    //判断当前删除权限是否属于当前应用
                    if(row.superCode === this.appId){
                        this.mockData.push(row);
                    }
                }else{
                    if(row.superCode === this.appId){
                        let mockData = this.mockData,i = 0,len = mockData.length;
                        for(;i < len; i++){
                            if(row.key === mockData[i].key){
                                mockData[i].disabled = false;
                                break;
                            }
                        }
                        this.mockData.push();//触发列表重新渲染
                    }
                }
                this.delete({suber:this.value,key:'modelList'},row);
            },
            onCancel: () => {
              console.log('Cancel');
            },
          });
        },
        delAll(){
            this.$confirm({
            title: '删除',
            content: '确定批量删除？',
            centered: true,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                let nowMockData = [];
                let callBack = (row)=>{
                    nowMockData.push(row.key);
                }
                //判断当前交互逻辑
                if(2 === this.interactive){
                    callBack = (row)=>{
                        this.mockData.push(row);
                    }
                }
                this.selecteDataRight.forEach(row=>{
                    //判断当前删除权限是否属于当前应用
                    if(row.superCode === this.appId){
                        callBack(row);
                    }
                    this.delete({suber:this.value,key:'modelList'},row);
                })
                if(nowMockData.length){
                    let mockData = this.mockData,i = 0,len = mockData.length;
                    for(;i < len; i++){
                        if(nowMockData.includes(mockData[i].key)){
                            mockData[i].disabled = false;
                        }
                    }
                    this.mockData.push();//触发列表重新渲染
                }
            },
            onCancel: () => {
              console.log('Cancel');
            },
          });
        },
        delete(par,row){
            let modelList = par.suber[par.key];
            let i = 0;
            let item = null;
            for(;i < modelList.length;i++){
               item = modelList[i];
               if(item.key === row.key && item.title === row.title){
                   break;
               }
            }
            modelList.splice(i,1);
            par.suber[par.key]=modelList;
        },
        //数据置换
        arrExchange(arr1,arr2,condition){
            let i = 0,nowApp;
            for(;i < arr1.length;i++){
                if(arr1[i].key === condition){
                    nowApp=arr1[i];
                    break;
                }
            }
            if(nowApp){
                arr2.push(nowApp);
                arr1.splice(i,1);
                return true;
            }
            return false;
        },
        //添加左侧主数据
        addMenu() {
            if(this.menuVal){
                let is=this.arrExchange(this.selectData,this.nowSelectData,this.menuVal);
                if(is){
                    this.menuVal = null;
                }
            }
        },
        //左侧主数据（单选）改变
        onChange(e,isInit){
            /* 
            let olDmodelVal = [];
            if(isInit){
                this.value.modelList
            }else{
                olDmodelVal = this.value.modelVal;
                this.value.modelVal = [];//清空之前选择的数据
            } */
            if(!this.appId){
                return;
            }
            let superObj={};
            this.spinning=true;
            this.apiDataDetail({code:this.appId}).then((res)=>{
                this.spinning=false;
                let msg="";
                if(200 === res.code){
                    if(Array.isArray(res.data) && res.data.length && res.data[0]){
                        let mockData=[];
                        let obj={};
                        if(this.leftOrRightMenu.right.length){
                            this.leftOrRightMenu.right.forEach((it)=>{
                               obj[it.dataIndex] = superObj[it.superDataIndex];
                            })
                        }
                        res.data.forEach(it => {
                            mockData.push({
                                superCode:this.appId,
                                key: it.code,
                                title: it.name,
                                disabled: false,
                                ...obj
                            })
                        });
                    //过滤穿梭框左侧数据
                        let isBack = true,
                        i,
                        modelList = this.value.modelList,
                        len = modelList.length;
                        mockData = mockData.filter((item)=>{
                            isBack = true;
                            i = 0;
                            for(;i < len; i++){
                                if(item.key === modelList[i].key){
                                    isBack = false;
                                    break;
                                }
                            }
                            //判断交互逻辑
                            if(1 === this.interactive){
                                item.disabled = !isBack;
                                return true;
                            }
                            return isBack;
                        })
                    //END——过滤穿梭框左侧数据
                        this.mockData=mockData;
                    }else{
                        msg="未查询到数据"
                    }
                }else{
                    msg="查询数据失败"
                }
                msg && this.$message.error(msg);
            }).catch((error)=>{
                this.spinning=false;
                if('NoIntroduction' === error){
                    console.error('没有引入api详情接口')
                }else{
                    console.error(error)
                }
            })
            this.value.leftModelVal=this.appId;
            for(let i = 0;i < this.nowSelectData.length;i++){
                if(this.appId === this.nowSelectData[i].key){
                    superObj = this.nowSelectData[i];
                    break;
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .float-right{
        float:right
    }
    .select-transfer{
        display:flex;
        background: #fff;
        & .ant-transfer-list{
            height: 480px;
            width:310px;
            margin-right: 20px;
        }
        & .v-transfer{
            & /deep/ .ant-transfer-list{
                // padding-top: 0;
            }
            // & /deep/ .ant-transfer-list-header{
            //     padding: 18px 12px 18px;
            //     position: relative;
            // }
        }
        & .ant-radio-group{
            display: block;
        }
        .radio-vertical{
            padding:0 20px 20px;
            & /deep/{
                & .ant-radio-wrapper{
                    display: block;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
        & .del-but img{
            width: 20px;
        }
        .relative-right{
            position: absolute;
            right: 0;
            top:2px;
        }
    }

</style>