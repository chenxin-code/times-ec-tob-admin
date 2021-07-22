<template>
  <div style="height: 100%;marginBottom: 60px;">
    <div class="content-header">
      {{ id.id ? "编辑" : "添加" }}商品基础信息
      <span class="fallback" @click="FALLBACK" style="cursor:pointer">返回</span>
    </div>
    <div class="content-main" style="height: calc(100% - 91px);margin-top:20px;">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" style="height: 100%;overflow: auto;" autoComplete="off">
        <a-form-item label="SKU名称">
          <a-input
            v-decorator="['skuName', { rules: [{ required: true, message: '供应商名称不能为空' },{whitespace: true,message: '供应商名称不能为空'}] } ]"
            placeholder="请输入供应商名称"
          />
        </a-form-item>
        <a-form-item label="合作期限">
          <a-range-picker showToday.Boolean="true"  style="width: 100%" 
          v-decorator="['time', { rules: [{ required: true, message: '合作期限不能为空' }] } ]"
            />
        </a-form-item>
        <a-form-item label="SKU编码">
          <a-input
            v-decorator="['skuCode', { rules: [{ required: true, message: '合同编号不能为空' },{whitespace: true,message: '合同编号不能为空'}] } ]"
            placeholder="请输入合同编号"
          />
        </a-form-item>
        <a-form-item label="SPU名称">
          <a-input
            v-decorator="['itemName', { rules: [{ required: true, message: '联系人名称不能为空' },{whitespace: true,message: '联系人名称不能为空'}] } ]"
            placeholder="请输入联系人名称"
          />
        </a-form-item>
        <a-form-item label="SPU编码">
          <a-input
            v-decorator="['itemCode', { rules: [{ required: true, message: '联系电话不能为空' }] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="商城SKU自编码">
          <a-input
            v-decorator="['contactPhone',]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="商品状态">
           <a-select v-decorator="['selling', { rules: [{ required: true, message: '联系电话不能为空' }] } ]"
           default-value="全部" @change="handleChangesataus">
            <a-select-option :value="v.id" v-for="(v,i) in selectArrstrain" :key="i">
              {{v.name}}
            </a-select-option>
        </a-select>
          <!-- <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          /> -->
        </a-form-item>
        <a-form-item label="商品品类">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' }] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="所属品牌">
          <a-input
            v-decorator="['brandName', { rules: [{ required: true, message: '联系电话不能为空' }] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="供应商">
            <a-select
              show-search
              option-filter-prop="children"
              @change="handleChange"
               :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              @search="handleSearch"
              v-decorator="['supplierName',{ rules: [{ required: true, message: '请选择供应商' }] }]"
              placeholder="请选择供应商" >
                <a-select-option v-for="item in supplierList" :key="item.id" :value="`${item.id}`+`:${item.supplierName}`+`:${item.companyId}`">
                  {{item.supplierName}}
                </a-select-option>
            </a-select>
        </a-form-item>
         <a-form-item label="税收分类编码">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' }] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="税率">
          <a-input
            v-decorator="['taxRate', { rules: [{ required: true, message: '联系电话不能为空' }] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="价格类型">
            <a-select v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' }] } ]"
           default-value="全部" @change="hChangcontactPhone">
            <a-select-option :value="v.id" v-for="(v,i) in selectcontact" :key="i">
              {{v.name}}
            </a-select-option>
            </a-select>
        </a-form-item>
         <a-form-item label="库存">
          <a-input
            v-decorator="['stock', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/\d/,message: '格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="PC端商品详情">
          <quill-editor ref="myTextEditor" class="editorted" v-model="pccontent" :options="editorOption" ></quill-editor>
        
        </a-form-item>
        <a-form-item label="app商品详情">
          <quill-editor ref="TextEditor" class="editorted" v-model="appcontent" :options="editorOption" ></quill-editor>
        </a-form-item>
         <a-form-item label="成本价">
           <div class="intpud" v-for="item in costPrice" :key="item.id">
            <span  style="width: 50px;" >数量:</span> 
             <a-input placeholder="请输入" :value="item.minNum" class="cbintpudnum" type="number" />
             <span  style="width: 70px;">成本价：</span> 
             <a-input placeholder="请输入" :value="item.costPrice" type="number" class="cbintpudnum" />
           </div>
        </a-form-item>

        <a-form-item label="销售价">
           <div class="intpud" v-for="(item,index) in sellingPrice" :key="index">
             <span style="minWidth: 45px;" >数量：</span> 
             <a-input placeholder="请输入" v-model="item.maxNum" class="intpudnum"  type="number" @change="onNum(item.maxNum,index)"/>
             <span class="spshu">税前销售价:</span> 
             <a-input placeholder="请输入" v-model="item.minNum" class="intpudnum" type="number"  @change="onSaleBefore(item,index)"/>
             <span class="spshu">税后销售价:</span> 
             <a-input placeholder="请输入" v-model="item.priceType" class="intpudnum" type="number"  @change="onSaleAfter(item.priceType,index)" />
           </div>
          <a-button-group class="butdb">
            <a-button size='small' @click="dellis" :disabled='deldisabled'><a-icon type="minus" /></a-button>
            <a-button type="primary" @click="addlis" size='small'><a-icon type="plus"/></a-button>
          </a-button-group>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-footer">
      <a-button type="primary" size="large" :disabled='deldisasub' style="width: 120px;" :loading="loading" @click="onSubmit(0)">保存</a-button>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import moment from "moment";
import { mapActions } from "vuex";
import { debounce } from "@/utils/util";
import { quillEditor } from 'vue-quill-editor'
export default {
  name: "supplierEdit",
  props: {
    id: {
      type: Object,
      default: () => ({})
    }
  },
  components: { quillEditor},
  data() {
    return {
      form: this.$form.createForm(this, { name: "form" }),
      loading: false,
      deldisasub:false,
      companyName: "",
      supplierList:[],//供应商列表
      supplierId:'',//供应商id
      supplierName:'',//供应商名称
      costPrice:[], //成本价
      marketPrice:[],//市场价
      sellingPrice:[],//销售价
      dataLiading: false,
      submitLoading: false,
      deldisabled:false,
      //富文本
      pccontent: '',
      selectcontact:[
        {id: '1', name: '普通价'},
        {id: '2', name: '阶梯价'},],
      selectArrstrain:[
        {id: '', name: '全部'},
        {id: '1', name: '上架'},
        {id: '2', name: '下架'},
      ],
      // editorOption: {
      //     placeholder: '编辑文章内容'
      //   },
        editorOption: {
                placeholder: "请在这里输入",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
                        ["blockquote", "code-block"], //引用，代码块
                        [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                        [{ list: "ordered" }, { list: "bullet" }], //列表
                        [{ script: "sub" }, { script: "super" }], // 上下标
                        [{ indent: "-1" }, { indent: "+1" }], // 缩进
                        [{ direction: "rtl" }], // 文本方向
                        [{ size: ["small", false, "large", "huge"] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
                        [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                        [{ font: [] }], //字体
                        [{ align: [] }], //对齐方式
                        ["clean"], //清除字体样式
                        ["image"], //上传图片、上传视频
                    ],
                },
                },
      appcontent: '',
    };
  },
  computed: {},
  created() {
      this.params = this.$route.params;
      console.log(this.params.typ);
    this.getData();
    this.supplier();
  },
  mounted() {
    if(this.params.typ == '1'){
        this.deldisasub = true;
      }else if(this.params.typ == '2'){
      this.deldisasub = false;
      }
    // this.$refs.form.setFieldsValue({
    //     status: this.formList[1].selectOptions[0]?.id,
    //     supplier:this.formList[2].selectOptions[0]?.id,
    //   });
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  methods: {
    onNum(item,index){
      console.log(item,index);
      this.sellingPrice[index].minNum = item;
    },
    onSaleBefore(item,index){
        console.log(item,index);
    },
    onSaleAfter(item,index){
       this.sellingPrice[index].priceType = item;
    },
    handleChangesataus(value){
      console.log(value);
    },
    handleSearch(value) {
      debounce(() => {
      this.supplier(value);
       },300);
    },
    supplier(value){
        api.getSupplierListByPager({keyword:value,"pageNum":1,"pageSize":10}).then((res)=>{
          this.supplierList = res.data.records;
        })
    },
    handleChange(value) {//供应商
      this.supplierId = value.split(":")[0];
      this.supplierName = value.split(":")[1];
      this.companyId = value.split(":")[2];
      console.log(this.supplierId, this.supplierName, this.companyId);
    },
    addlis(){//加
      this.deldisabled = false;
      console.log(this.sellingPrice.pop())
      // this.sellingPrice.push(this.sellingPrice.split(-1)[0]);
      // let arr = this.deldisabled;
      // let a = JSON.params(JSON.stringify(arr));
      // let b = a.lice(-1)[0];
      this.sellingPrice.push({});
      console.log(this.sellingPrice);

    //   addFjtc () {
    //   // 增加车辆技术装备数据
    //   const length = this.aFile.length
    //   this.aFile.push({
    //     key: length === 0 ? '1' : (parseInt(this.aFile[length - 1].key) + 1).toString(),
    //     mj: '',  tccjwds: '',  xz: '',
    //     tccwz: '',  zmcllj: '', editables: true, isNews: true
    //   })
    // }


    },
    dellis(){ //减
      if(this.sellingPrice.length <=1){
        this.deldisabled = true;
        return;
      }
        this.sellingPrice.pop();
    },
    //富文本方法
    onEditorChange({ editor, html, text }) {
            this.content = html;
        },
    ...mapActions(["FALLBACK"]),
    getData() {//获取列表详情
      console.log(this.params.id);
      let that = this;
        api.getProductDetail( this.params.id ).then(res => {
          if (res.code === 200) {
            const data = res.data;
            that.supplierId = data.supplierId; //供应商id
            that.supplierName = data.supplierName;
            that.pccontent = data.pcItemInfo; //pc详情
            that.appcontent = data.appItemInfo;//app详情
            that.costPrice=data.costPrice,//成本价
            that.marketPrice=data.marketPrice, //市场价
            that.sellingPrice=data.sellingPrice,//销售价
            this.form.setFieldsValue({
              skuName:data.skuName,//sku名称
              time: [data.cooperationPeriod, data.cooperationEndperiod],//时间
              skuCode:data.skuCode, //sku编码
              itemCode:data.itemCode, //spu编码
              itemName:data.itemName, //spu名称
              selling:data.selling==1?'上架':data.selling==2?'下架':'全部', //商品状态 上下架
              brandName:data.brandName,//所属品牌
              supplierName:data.supplierName,//供应商
              taxRate: data.taxRate,//税率
              stock:data.stock,//库存
            });
          }
        });
    },
    //保存
    onSubmit(e) {
      let that = this;
      console.log(this.pccontent,this.appcontent);
      debounce(() => {
        this.form.validateFields((err, values) => {
            this.loading = true;
            values = {
              id:  this.params.id??'',
              appItemInfo:that.appItemInfo,
              supplierId : that.supplierId, //供应商id
              supplierName: that.supplierName, //供应商名称
              pccontent : that.pcItemInfo, //pc详情
              appcontent : that.appItemInfo,//app详情
              costPrice: that.costPrice,//成本价
              marketPrice : that.marketPrice, //市场价
              sellingPrice : that.sellingPrice,//销售价
              skuName:values.skuName,//sku名称
              time: [values.cooperationPeriod, values.cooperationEndperiod],//时间
              skuCode:values.skuCode, //sku编码
              itemCode:values.itemCode, //spu编码
              itemName:values.itemName, //spu名称
              selling:values.selling=='上架'?1:data.selling=='下架'?2:'全部', //商品状态 上下架
              brandName:values.brandName,//所属品牌
              supplierName:values.supplierName,//供应商
              taxRate: values.taxRate,//税率
              stock:values.stock,//库存
              // cooperationEndperiod: values.time !== [] ? moment(values.time[1]).format("YYYY-MM-DD") : null,
              // companyList: this.dataSourceRight.map(a => a.id)
            };
          
            api.updateProduct(values)
              .then(res => {
                if (res.code === 200) {
                  this.$message.success("编辑成功");
                  this.$router.push({ name: "supplier" });
                }
              })
              .finally(() => {
                this.loading = false;
              });
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.cbintpudnum{
  margin: 0 20px 0 0;
  width: 40%;
}
.spshu{
  width: 40%;
  min-width: 85px;
}
.intpudnum{
  margin: 0 20px 0 0;
  width: 70%;
}
.intpud{
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.butdb{
  float: right;
  // position: absolute;
  // left: 550px;
  // top: 0px;
}
.editorted{
  margin: 20px auto;
  overflow: auto;
  
}
.content-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > *:not(.last-child) {
    margin-right: 10px;
  }
}
.search {
  width: 100%;
  height: 32px;
  margin: 0 0 20px 0;
}
.title {
  height: 32px;
  line-height: 32px;
  margin: 0 0 20px 0;
}
.table {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  > div {
    width: 48%;
  }
}
.content-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > *:not(.last-child) {
    margin-right: 10px;
  }
}
.search-alert-error {
  font-size: 10px;
  line-height: 1;
  padding: 5px 15px 5px 37px;
  /deep/ .ant-alert-icon {
    top: 5px;
  }
}
.editable-row-operations button {
  margin-right: 10px;
  padding: 0;
}
</style>
