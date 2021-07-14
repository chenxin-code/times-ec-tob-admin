export const filtFn = function (arr, v) {
  let str = '';
  arr.forEach(element => {
    if (element.v === v) str = element.n;
  });
  return str;
}
export const occupyStateArr = [
  {n: '未占用', v: '0' },
  {n:'已占用', v: '1'},
  {n:'占用失败', v: '2'},

]

export const orderTypeArr = [
  {n:'家政', v: 'SERVICE'},
  {n:'旅游', v: 'TRAVEL'}
]

export const orderSourceArr = [
  {n:'时代星选小程序', v: 'TIMES_XINGXUAN'},
  {n:'邻里邦ProAPP', v: 'TIMES_LINLIBANG'},
  {n:'美居APP', v: 'TIMES_MEIJU'},
]

export const orderStateListArr = [
  {n:'待支付', v: 'UNPAID'},
  {n:'已支付', v: 'PAID'},
  {n:'进行中', v: 'ON_GOING'},
  {n:'已完成', v: 'COMPLETED'},
  {n:'已取消', v: 'CANCELED'},
  { n: '交易关闭', v: 'CLOSE' },
  {n:'全部', v: 'all'}
]

export const tableColumns = [ //表头数据
  {
    title: "请款单编号",
    dataIndex: "cashRequirementNo",
    width: 200,

    // ellipsis: true,
  },
  {
    title: "应付单编号",
    dataIndex: "payBillNo",
    width: 200,

    // ellipsis: true,
  },
  {
    title: "供应商名称",
    dataIndex: "supplier",
    width: 200,

    // ellipsis: true,
  },
  {
    title: "请款金额",
    dataIndex: "mny",
    width: 200,

    // ellipsis: true,
  },
  {
    title: "税额",
    dataIndex: "taxAmout",
    width: 200,

    // ellipsis: true,
  },
  {
    title: "预算占用状态",
    dataIndex: "occupySatus",
    width: 200,

    customRender: (text, record, index) => {
			let str = "";
			switch (text) {
				case "0":
					str = "未占用";
					break;
				case "1":
					str = "已占用";
					break;
        case "2":
          str = "占用失败";
          break;
				default:
					break;
			}
      return str;
		},
  },
  {
    title: "占用日期",
    width: 200,

    dataIndex: "occupyDate",
    // ellipsis: true,
  }
]