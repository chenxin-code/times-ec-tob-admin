<template>
  <div>
    <a-modal
      title="存在以下信息差异，请再次核对确认是否要上传"
      v-if="visible"
      :visible="visible"
      :closable='false'
      :width='850'
    >
      <div >
        <a-table
          :columns="tableColumns"
          :row-key="(r,i) => i"
          :data-source="difference.purchaseInfoVerifyRespDtoList"
          :pagination="false"
        >
          <template slot="materialName" slot-scope="materialName">
            <div style="color:red">
              {{materialName}}
            </div>
          </template>
          <template slot="unitPrice" slot-scope="unitPrice">
            <div style="color:red">
              {{unitPrice}}
            </div>
          </template>
        </a-table>
        <!-- <div v-for="(v,i) in difference" :key="i" class="info-box-difference">
          <div>
            <div>系统物料名称</div>
            <div>{{v.systemMaterialName || '无'}}</div>
          </div>
          <div>
            <div>导入物料名称</div>
            <div>{{v.materialName || '无'}}</div>
          </div>
          <div>
            <div>系统单价</div>
            <div>{{v.systemUnitPrice || '无'}}</div>
          </div>
          <div>
            <div>物料单价</div>
            <div>{{v.unitPrice || '无'}}</div>
          </div>
        </div> -->
      </div>
			<template slot="footer">
        <a-button key="back" :loading='confirmLoading' @click="close">
          取消
        </a-button>
        <a-button key="submit" :loading='confirmLoading' type="primary"  @click="handle('ok')">
          确认上传
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
	import api from "@/api";

export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		},
    difference: {
			type: Object,
      default:()=>{}
		},
		title: {
			type: String,
			default: '二次确认'
		},

	},
  data() {
    return {
      confirmLoading: false,
      tableColumns:[
        {
          title: "商品编码",
          dataIndex: "productCode",
          // width: 160,
          // ellipsis: false,
        },
        {
          title: "系统物料名称",
          dataIndex: "systemMaterialName",
          // width: 160,
          // ellipsis: false,
        },
        {
          title: "导入物料名称",
          dataIndex: "materialName",
          scopedSlots: { customRender: "materialName" },
          // width: 160,
          // ellipsis: false,
        },
        {
          title: "系统单价",
          dataIndex: "systemUnitPrice",
          // width: 160,
          // ellipsis: false,
        },
        {
          title: "物料单价",
          dataIndex: "unitPrice",
          scopedSlots: { customRender: "unitPrice" },
          // width: 160,
          // ellipsis: false,
        },
      ]
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handle(e) {
      this.confirmLoading = true;
      console.log('difference---->',this.difference)
			api.changeVerifySign({
        purchaseNo: this.difference.purchaseNo,//"CG2105317012",
        sign: e == 'ok'? '1' : '0' // （0-否，1-是）
      }).then(res => {
        if(res.code == 200) {
          this.$message.success('操作成功');
        }
      }).catch(() => {
        this.$message.success('操作失败');
      }).finally(() => {
        this.confirmLoading = false;
			  this.$emit("close")
      });
    },
    close(e) {
			this.$emit("close")
    },
  },
};
</script>
<style lang="less" scoped>
  .info-box-difference {
		// width: 100%;
		display: flex;
		// flex-direction: column;
		// align-items: center;
		justify-content: space-around;
    >div{
      margin:10px 0;
    }
    div {

      text-align: center;
    }
  }
</style>