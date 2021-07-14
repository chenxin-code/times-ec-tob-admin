<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script>
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {},
  };
  if (index === 4) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];

export default {
  data() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        customRender: (text, row, index) => {
          if (index < 4) {
            return <a href="javascript:;">{text}</a>;
          }
          return {
            children: <a href="javascript:;">{text}</a>,
            attrs: {
              colSpan: 5,
            },
          };
        },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        customRender: renderContent,
      },
      {
        title: 'Phone',
        colSpan: 0,
        dataIndex: 'phone',
        customRender: renderContent,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        customRender: renderContent,
      },
    ];
    return {
      data,
      columns,
      tableData:[]
    };
  },
  mounted() {
    const para = {
      ...this.form,
      pageNum: this.current,
      pageSize : this.pageSize,
    };
    if (para.applyTimeStart) para.applyTimeStart =  para.applyTimeStart.format('YYYY-MM-DD HH:mm:ss');
    if (para.applyTimeEnd) para.applyTimeEnd =  para.applyTimeEnd.format('YYYY-MM-DD HH:mm:ss');
    if (para.orderTimeStart) para.orderTimeStart =  para.orderTimeStart.format('YYYY-MM-DD HH:mm:ss');
    if (para.orderTimeEnd) para.orderTimeEnd =  para.orderTimeEnd.format('YYYY-MM-DD HH:mm:ss');
    api.aftersaleList(para).then(res => {
      if (res.code === 200) {
        let arr = [];
        res.data.records.forEach(v=> {

        })
        this.tableData = res.data.records;
      }
    })
  }
};
</script>
