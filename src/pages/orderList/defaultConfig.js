export const orderStatusListSelect = [
	{
		id: "0",
		name: "全部",
	},
	{
		id: "1",
		name: "待发货",
	},
	{
		id: "2",
		name: "已发货",
	},
	{
		id: "3",
		name: "已完成",
	},
	{
		id: "4",
		name: "已关闭",
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

export const columns = [
	{
		title: "商品",
		width: 350,
		scopedSlots: { customRender: "goods" },
	},
	{
		title: "商品编号",
		width: 200,
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
		title: "供应商",
		dataIndex: "supplierName",
		key: "supplierName",
		width: 300,
	},
	{
		title: "支付方式",
		dataIndex: "payWay",
		key: "payWay",
		width: 100,
		customRender: (text, record, index) => {
			let str = "";
			switch (text) {
				case "ONLINE":
					str = "线上";
					break;
				case "OFFLINE":
					str = "线下";
					break;

				default:
					break;
			}
			return str;
		},
	},
	{
		title: "采购单号",
		dataIndex: "purchaseCode",
		key: "purchaseCode",
		width: 220,
	},
	{
		title: "订单号",
		dataIndex: "supplierOrderNo",
		key: "supplierOrderNo",
		width: 250,
	},
	{
		title: "下单时间",
		dataIndex: "orderTime",
		key: "orderTime",
		width: 200,
	},
	{
		title: "应收/实收金额",
		width: 200,
		customRender: (text, record, index) => {
			return `${record.amountPayable} / ${record.amountPay}`;
		},
	},
	{
		title: "收货信息",
		width: 200,
		customRender: (text, record, index) => {
			return `${record.receiverName}
			${record.receiverPhone}`;
		},
	},
	{
		title: "发货状态",
		width: 150,
		scopedSlots: { customRender: "deliveryStatus" },
	},
	{
		title: "订单状态",
		dataIndex: "orderStatus",
		key: "orderStatus",
		width: 100,
		customRender: (text, record, index) => {
			let str = "";
			switch (text) {
				case "WAIT_DELIVERY":
					str = "待发货";
					break;
				case "DELIVERING":
					str = "部分发货";
					break;
				case "WAIT_RECEIVE":
					str = "待收货";
					break;
				case "COMPLETED":
					str = "已完成";
					break;
				case "CANCELED":
					str = "已取消";
					break;
				case "CLOSE":
					str = "交易关闭";
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
];

export const modalColumns = [
	{
		title: "商品",
		width: 300,
		scopedSlots: { customRender: "goods" },
	},
	{
		title: "数量",
		dataIndex: "buyNum",
		key: "buyNum",
		width: 60,
	},
	{
		title: "退款退货审核中",
		dataIndex: "refundReturnApproving",
		key: "refundReturnApproving",
		width: 150,
	},
	{
		title: "换货审核中",
		dataIndex: "exchangeApproving",
		key: "exchangeApproving",
		width: 120,
	},
	{
		title: "退款退货成功",
		dataIndex: "refundReturnApproved",
		key: "refundReturnApproved",
		width:150,
	},
	{
		title: "换货成功",
		dataIndex: "exchangeApproved",
		key: "exchangeApproved",
		width: 100,
	},
	{
		title: "可售后数",
		dataIndex: "available",
		key: "available",
		width: 100,
	},
	{
		title: "发起售后数",
		width: 100,
		scopedSlots: { customRender: "afterAmount" },
	},
];

export const columns1 = [
	{
		title: "商品",
		width:350,
		scopedSlots: { customRender: "goods" },
	},
	{
		title: "sku编码",
		dataIndex: "skuCode",
		key: "skuCode",
		width: 200,
	},
	{
		title: "商品编号",
		dataIndex: "itemCode",
		key: "itemCode",
		width:200,

	},
	{
		title: "单价（元）",
		dataIndex: "itemPrice",
		key: "itemPrice",
		width: 150,

	},
	{
		title: "数量",
		dataIndex: "buyNum",
		key: "buyNum",
		width: 100,

	},
	{
		title: "已发货数量",
		dataIndex: "deliveryNum",
		key: "deliveryNum",
		width: 180,

	},
	{
		title: "小计",
		dataIndex: "totalAmount",
		key: "totalAmount",
		width: 150,

	},
	{
		title: "发货状态",
		dataIndex: "deliveryStatus",
		key: "deliveryStatus",
		width: 100,

		customRender: (text, record, index) => {
			let str = "";
			switch (record.deliveryStatus*1) {
				case 0:
					str = "未发货";
					break;
				case 1:
					str = "部分发货";
					break;
				case 2:
					str = "全部发货";
					break;
				default:
					break;
			}
			return str;
		},
	},
];

export const columns2 = [
	{
		title: "发货单号",
		dataIndex: "deliveryNo",
		key: "deliveryNo",
		width: 250,

	},
	{
		title: "发货商品",
		width: 350,
		scopedSlots: { customRender: "goods" },
	},
	{
		title: "货品编号",
		dataIndex: "skuCode",
		key: "skuCode",
		width: 200,
		scopedSlots: { customRender: "skuCode" },
	},
	{
		title: "发货数量",
		dataIndex: "deliveryNum",
		key: "deliveryNum",
		width: 150,
		scopedSlots: { customRender: "deliveryNum" },
	},
	{
		title: "发货时间",
		dataIndex: "deliveryTime",
		key: "deliveryTime",
		width: 250,
	},
	{
		title: "配送凭证",
		width: 100,
		scopedSlots: { customRender: "dispatching" },
	},
	{
		title: "签收凭证",
		width: 120,
		scopedSlots: { customRender: "receiptProof" },
	},
	{
		title: "审核状态",
		width: 100,
		scopedSlots: { customRender: "approveStatus" },
	},
	{
		title: "收货审核",
		width: 120,
		scopedSlots: { customRender: "receivingAudit" },
	},
	{
		title: "审核原因",
		dataIndex: "approveRemark",
		key: "approveRemark",
		width: 200,
	},
];

export const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {},
	onSelect: (record, selected, selectedRows) => {},
	onSelectAll: (selected, selectedRows, changeRows) => {},
};

export const afterSaleType = [
	{ id: "REFUND_RETURN", name: "退款退货" },
	{ id: "EXCHANGE", name: "换货" },
];
