# snx-webbv

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

###包结构

```
|——public
|	|——favicon.ico          # logo
|	|——index.html           # 入口模板
|——src
|	|——api                  # api
|	|——assets               # 本地静态资源
|	|——components           # 业务通用组件
|	|——config               # 项目基础配置,包含menu、portal
|	|——constance            # 全部变量配置
|	|——pages                # 业务页面
|	|——router               # Vue-Router
|	|——store                # Vuex
|	|——utils                # 工具库
|	|——App.vue              # Vue模板入口
|	|——main.js              # Vue入口js

```

### 新页面

- 需要在目录下建立文件夹，命名为小写，如需分词使用驼峰 ，如 “addSpace”
- 文件夹下至少需要 1 个文件

```
|-- page
|	|-- index.vue // 页面
```

### 全局 css

```
|—src
|	|—assets
|   |	|—css
|   |	|	|—common.less
```

### api 定义

```
|—api
|	|—模块.js              配置当前模块ajax
|	|—index.js            引入模块.js
|	|—urlConfig.js        配置api
```

#### 接口地址列表

- 接口地址 swigger
- 原型地址：https://uw4rw2.axshare.com
- 接口地址：https://mall-uat-api-linli.timesgroup.cn:9525/times-ec-tob-mall/swagger-ui.html
- 接口地址：https://mall-uat-api-linli.timesgroup.cn:9525/times-ec-tob-mall/doc.html#/home
---

###  订单列表 & 售后列表
#### 订单列表
- 商品列表渲染常规字段 定义 在defaultConfig.js中定义，
- action字段 目前定义  查看详情，申请售后，取消订单
- 申请售后模态弹窗与订单详情模态弹窗一致，已封装在afterSaleApproveModal.vue文件
- 售后申请需获取订单商品数量，根据可申请售后的商品数 发起售后申请，需验证可售后数量  不可为空或为0
- 订单详情配送信息  需要区分部分发货 及全部发货的状态
- 配送信息需要在erp后台操作发货，才有发货信息流转到案场订单信息的配送信息
- 配送信息的通过/挂起操作，通过即等于确认收货操作，挂起后仍可以通过

##### ant-design-vue 强制调用校验规则

```
const _this = this
      getUserPage({ username: userName }).then(res => {
        const { records } = res
        if (records.length > 0) {
          this.$nextTick(() => {
            _this.isRepeat = true
            _this.form.validateFields(['username'], { force: true })  //手动调用字段校验
          })
        } else {
          _this.isRepeat = false
          _this.form.validateFields(['username'], { force: true })
        }
      })

```

#### 新增大数据展示
- [vxe-table] https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/use 