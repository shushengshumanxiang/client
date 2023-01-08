<template>
  <el-container id="app">
    <el-header
      ><el-button
        type="primary"
        icon="el-icon-edit"
        circle
        size="mini"
        @click="jump('/main')"
      ></el-button>
      <el-button
        type="success"
        icon="el-icon-check"
        circle
        size="mini"
        @click="jump('/home')"
      ></el-button>
      <el-button
        type="warning"
        icon="el-icon-star-off"
        circle
        size="mini"
        @click="jump('/about')"
      ></el-button
    ></el-header>
    <el-container>
      <el-aside width="200px">
        <router-link to="/main">P1</router-link>
        <router-link to="/about">P2</router-link>
        <router-link to="/home">P3</router-link>
      </el-aside>
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- <router-view></router-view> -->
</template>

<script>
// 先导入axios
import axios from "./utils/myaxios"; // 这里面导入的文件的axios通过我们修改了一些配置，和加上了一些拦截器
import MyButton from "./components/MyButton.vue";
import { mapState } from "vuex";

//  mapState提供计算属性，就不需要一个一个的进行手写方法了
console.log(mapState(["name", "age"]));

const options = {
  components: {
    MyButton, // 名称一样：才可以这样简写
  },
  data: function () {
    return {
      msg: "你好",
      students: [],
      formData: {
        name: "",
        sex: "",
        age: "",
      },
      queryData: {
        currentPage: 1,
        total: 20,
        pagesize: 5,
        name: "",
        sex: "",
        age: "",
      },
    };
  },
  // created实在页面渲染前执行的，mounted实在页面渲染后后面执行的
  created: function () {},
  mounted: function () {
    this.axiosClickGet();
    this.axiosGetPage();
  },
  methods: {
    jump(url) {
      this.$router.push(url);
    },
    axiosClickGet() {
      axios.get("/student").then((res) => {
        this.students = res.data.data;
      });
    },
    searchData() {
      axios.get("/student/search", {
        params: this.formData,
      });
    },
    axiosGetPage() {
      // 分页操作，利用后端的分页操作进行分页，前端之发送一个请求，利用params进行传输数据，而不是使用路径传参数
      axios
        .get("/student/page", {
          params: {
            currentPage: this.queryData.currentPage,
            pageSize: this.queryData.pagesize,
          },
        })
        .then((res) => {
          // res里面是后端返回的所有的数据
          this.students = res.data.data.records;
          this.queryData.total = res.data.data.total;
          this.queryData.pageSize = res.data.data.size;
        });
    },
    handleCurrentChange(page) {
      //页面页码
      //  页面进行变化时，将数据
      this.queryData.currentPage = page;
      this.axiosGetPage();
    },
    sizeChange(size) {
      this.queryData.pagesize = size;
      this.axiosGetPage();
    },
    axiosClickPost() {
      // 用于测试查询请求体的数据
      axios
        .post(
          "/student/post",
          {},
          {
            headers: {
              Authorization: "demo", // 里面还不能包括中文
            },
          }
        )
        .then((res) => {
          // console.log(res);
          res.data;
        });
    },
    axiosClickPostAdd() {
      //   第一种方式： 利用拼接的方法就行传输数据

      // let name = "xiao";    //特殊字符需要使用编码过后才可以发送
      // let age = 18;
      // axios.post(`/student/post1?name=${name}&age=${age}`, {}, {

      // })

      //第二种方式，利用请求头中的数据进行传参,params参数
      // axios.post(
      //   "/student/post1",
      //   {},
      //   {
      //     params: {
      //       name: "wode",
      //       age: 20,
      //     },
      //   }
      // );

      //第三种方式：想要利用请求体进行传输数据(请求体中的数据传输的json的格式，所以后台收到数据的格式是json的格式
      // 用两种方法进行处理，multipart和urlencoded )   这种数据的传输的是js格式的数据
      axios.post("/student/post1", {
        name: "wode",
        age: 20,
      });

      // 第四种方式：利用json格式进行发送数据
      axios.post("/student/post2", {
        name: "jjjjj",
        age: 20,
      });

      // 有可以使用create进行创建一个axios，可以进行一些自己的需要修改的配置

      // 9.拦截器(这里是可以通用的，所以但是提取出来使用一个文件进行处理)
      // axios.interceptors.request.use(
      //   function (config) {
      //     // 比如在这里添加统一的 headers
      //     console.log(config);
      //     config.headers = {
      //       Authorization: "aabbcc"
      //     }
      //     return config;
      //   },
      //   function (error) {
      //     return Promise.reject(error);
      //   }
      // );
      // axios.interceptors.response.use(
      //   function (response) {
      //     // 2xx 范围内走这里(成功之后走这里)
      //     console.log(response);
      //     return response;
      //   },
      //   function (error) {
      //     // 超出 2xx, 比如 4xx, 5xx 走这里
      //     return Promise.reject(error);
      //   }
      // );
    },
  },
};
export default options;
</script>

<style scoped>
.el-main {
  color: red;
}
.el-header {
  color: black;
}

.el-aside {
  background-color: aqua;
}
div {
  font-family: 华文行楷;
  font-size: 20px;
}

.el-input--mini,
.el-select--mini {
  width: 193px;
  margin: 10px 10px 5px 0;
}
.title {
  margin-bottom: 10px;
  font-size: 30px;
  color: #333;
  text-align: center;
}

.row {
  background-color: #fff;
  display: flex;
  justify-content: center;
}

.col {
  border: 1px solid #f0f0f0;
  width: 15%;
  height: 35px;
  text-align: center;
  line-height: 35px;
}

.bold .col {
  background-color: #f1f1f1;
}
</style>
