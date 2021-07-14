export const filtFn = function (arr, v) {
  let str = '';
  arr.forEach(element => {
    if (element.v === v) str = element.n;
  });
  return str;
}

export const afterSaleStatusArr = [
  {n: '审核中', v: 'APPROVING' },
  {n:'审核通过', v: 'APPROVED'},
  {n:'退款成功', v: 'SUCC'},
  { n: '退款失败', v: 'FAIL' },
  {n:'审核驳回', v: 'REJECT'},
  {n:'已取消', v: 'CANCEL'},

]

export const afterSaleTypeArr = [
  {n:'换货', v: 'EXCHANGE'},
  {n:'退款退货', v: 'REFUND_RETURN'},
]

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {},
  };
  if (row.commodity) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
export const tableColumns = [ //表头数据
  {
		title: "商品",
		width: 350,
    // ellipsis: true,
		scopedSlots: { customRender: "goods" },
  },
  {
		title: "售后单号",
		dataIndex: "afterSaleNo",
		key: "afterSaleNo",
		width: 230,
  },
  {
		title: "采购单号",
		dataIndex: "purchaseCode",
		key: "purchaseCode",
		width: 150,
  },
  {
		title: "订单号",
		dataIndex: "orderNo",
		key: "orderNo",
		width: 230,
	},
	{
		title: "下单时间",
		dataIndex: "orderTime",
		key: "orderTime",
		width: 180,
  },
  {
		title: "申请时间",
		dataIndex: "applyTime",
		key: "applyTime",
		width: 180,
	},
	{
		title: "商品编号",
		width: 150,
		scopedSlots: { customRender: "sku" },
  },
  {
		title: "成本价",
		width: 120,
		scopedSlots: { customRender: "itemCostPrice" },
	},
	{
		title: "单价（元）",
		width: 120,
		scopedSlots: { customRender: "itemPrice" },
	},
	{
		title: "小计",
		width: 100,
		scopedSlots: { customRender: "totalAmount" },
	},
	{
		title: "供应商",
		scopedSlots: { customRender: "supplierName" },
		width: 260,
  },
  {
		title: "售后数量",
		dataIndex: "itemTotal",
		key: "itemTotal",
		width: 100,
  },
  {
		title: "应退金额",
		width: 100,
		scopedSlots: { customRender: "refundAmount" },
  },
  {
		title: "收货信息",
		width: 150,
		scopedSlots: { customRender: "orderAddress" },
  },
  {
		title: "售后类型",
		dataIndex: "afterSaleType",
		key: "afterSaleType",
		width: 100,
		customRender: (text, record, index) => {
			let str = "";
			switch (text) {
				case "EXCHANGE":
					str = "换货";
					break;
				case "REFUND_RETURN":
					str = "退款退货";
					break;

				default:
					break;
			}
			return str;
		},
  },
  {
		title: "申请理由",
    dataIndex: "applyReason",
		key: "applyReason",
		width: 160,
  },
  {
		title: "审核原因",
		dataIndex: "approveRemark",
		key: "approveRemark",
		width: 160,
  },
	{
		title: "审核状态",
		dataIndex: "afterSaleState",
		key: "afterSaleState",
		width: 100,
		customRender: (text, record, index) => {
			let str = "";
			switch (text) {
				case "APPROVING":
					str = "审核中";
					break;
				case "APPROVED":
					str = "审核通过";
					break;
        case "SUCC":
          str = "退款成功";
          break;
        case "FAIL":
          str = "退款失败";
          break;
        case "REJECT":
          str = "审核驳回";
          break;
        case "CANCEL":
          str = "已取消";
          break;
				default:
					break;
			}
			return str;
		},
	},
	{
		title: "操作",
		key: "operation",
		fixed: "right",
		width: 200,
		scopedSlots: { customRender: "action" },
	},
]