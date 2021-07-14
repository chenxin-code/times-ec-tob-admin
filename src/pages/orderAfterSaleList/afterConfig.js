export const columns = [
	{
		title: "商品",
		width: 350,
		scopedSlots: { customRender: "goods" },
	},
	{
		title: "商品编号",
		width: 220,
		scopedSlots: { customRender: "sku" },

	},
	{
		title: "单价（元）",
		width: 120,
		scopedSlots: { customRender: "price" },

	},
	{
		title: "数量",
		width: 100,
		scopedSlots: { customRender: "amount" },

	},
	{
		title: "小计",
		width: 100,
		scopedSlots: { customRender: "subtotal" },

	},
	{
		title: "供应商",
		dataIndex: "supplierName",
		key: "supplierName",
		width: 260,
		scopedSlots: { customRender: "supplierName" },

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
		width: 230,
	},
	{
		title: "订单号",
		dataIndex: "orderNo",
		key: "orderNo",
		width: 230,
	},
	{
		title: "申请时间",
		dataIndex: "applyTime",
		key: "applyTime",
		width: 230,
	},
	{
		title: "售后数量",
		dataIndex: "itemTotal",
		key: "itemTotal",
		width: 100,

	},
	{
		title: "应退金额",
		dataIndex: "refundAmount",
		key: "refundAmount",
		width: 100,

	},
	{
		title: "收货信息",
		width: 250,
		customRender: (text, record, index) => {
			return `${record?.orderAddress?.receiverName}
			${record?.orderAddress?.receiverPhone}`;
		},

	},
	{
		title: "售后类型",
		dataIndex: "afterSaleType",
		key: "afterSaleType",
		width: 150,
		customRender: (text, record, index) => {
			return text == "EXCHANGE" ? "换货" : "退款退货";
		},

	},
	{
		title: "申请理由",
		dataIndex: "applyReason",
		key: "applyReason",
		width: 200,

	},
	{
		title: "审核原因",
		dataIndex: "approveRemark",
		key: "approveRemark",
		width: 150,

	},
	{
		title: "审核状态",
		dataIndex: "afterSaleState",
		key: "afterSaleState",
		width: 150,
		customRender: (text, record, index) => {
			let str = "";
			switch (text) {
				case "APPROVING":
					str="审核中"
					break;
				case "REJECT":
					str="审核不通过"
					break;
				case "APPROVED":
					str="审核通过"
					break;
				case "CANCEL":
					str="已取消"
					break;
				default:
					break;
			}
			return str;
		}
	},
	{
		title: "操作",
		key: "operation",
		fixed: "right",
		width: 200,
		scopedSlots: { customRender: "action" },

	},
];
export const pagination = {
	pageSizeOptions: ["10", "20", "50", "100"],
	pageSize: 10,
	total: 0,
	current: 1,
	showSizeChanger: true,
	showTotal: (total) => `共有${total}条`,
	showSizeChange: (current, pageSize) => (this.pageSize = pageSize),
	showQuickJumper: true,
	onChange: (pageNumber) => {},
};
export const data = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 2 Lake Park, London No. 2 Lake Park",
		tags: ["loser"],
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
];

export const approveList = [
	{
		id: "",
		name: "全部",
	},
	{
		id: "APPROVING",
		name: "审核中",
	},
	{
		id: "REJECT",
		name: "审核不通过",
	},
	{
		id: "APPROVED",
		name: "审核通过",
	},
	{
		id: "CANCEL",
		name: "自行取消",
	},
];

export const afterSaleTypeList = [
	{
		id: "",
		name: "全部",
	},
	{
		id: "EXCHANGE",
		name: "退款退货",
	},
	{
		id: "REFUND_RETURN",
		name: "换货",
	},
];
