const user = {
    state: { //存储定义的变量
        username: window.localStorage.getItem("SD_USERNAME"),
        useravatar: window.localStorage.getItem("SD_USERAVATAR"),
        rowEditinformation:''
    },
    mutations: { //更改state里面的值定义的一些方法
        setUsername(state, username) {
            state.username = username;
        },
        setUseravatar(state, useravatar) {
            state.useravatar = useravatar;
        },
        setrowEditinformationSync(state, n){
            state.rowEditinformation = n;
          }
    },
    getters: {//依赖state里面的值衍生的新的变量
        setRowEditinformation: state => {
            return state.rowEditinformation;
          }
    },
    action: {//提交mutations
        
    }
}

export default user