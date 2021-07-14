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
		title: "订单编号",
		dataIndex: "saleOrderNo",
		key: "saleOrderNo",
		width: 250
	},
	{
		title: "采购公司(出账公司)",
		width: 250,
		key: "purchaseCompany",
		dataIndex: "purchaseCompany"
	},
	{
		title: "收货信息",
		width: 250,
		scopedSlots: { customRender: "addressDto" }
	},
	{
		title: "支付方式",
		width: 100,
		key: "payWay",
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
					'22'
					break;
			}
			return str;
		}
	},
	{
		title: "税前订单总额（元）",
		dataIndex: "totalPretaxAmount",
		key: "totalPretaxAmount",
		width: 200
	},
	{
		title: "税后订单总额（元）",
		dataIndex: "totalAmount",
		key: "totalAmount",
		width: 200
	},
	{
		title: "税前优惠总额（元）",
		dataIndex: "totalPretaxReducedAmount",
		key: "totalPretaxReducedAmount",
		width: 200
	},
	{
		title: "税后优惠总额（元）",
		dataIndex: "totalReducedAmount",
		key: "totalReducedAmount",
		width: 200
	},
	{
		title: "下单时间",
		dataIndex: "orderTime",
		key: "orderTime",
		width: 200
	},
	{
		title: "账套名称",
		dataIndex: "financialAccounting",
		key: "financialAccounting",
		width: 200
	},
	{
		title: "城市公司",
		dataIndex: "cityCompany",
		key: "cityCompany",
		width: 150
		
	},
	{
		title: "项目名称",
		dataIndex: "projectName",
		key: "projectName",
		width: 200
	},
	{
		title: "操作",
		key: "operation",
		fixed: "right",
		width: 200,
		scopedSlots: { customRender: "action" },
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
