<template>
  <div id="app">
    <!-- 在引用elementui的时候,会出现一个错误 el: "#app", -->
    <h1>
      {{ msg }}
    </h1>

    <!-- <input type="button" value="获取远程数据" @click="axiosClickGet()"> -->
    <div class="title">学生列表</div>
    <div class="thead">
      <div class="row bold">
        <div class="col">编号</div>
        <div class="col">姓名</div>
        <div class="col">性别</div>
        <div class="col">年龄</div>
      </div>
    </div>
    <div class="tbody">
      <div v-if="students.length > 0">
        <!-- <div class="row" v-for="s of students" :key="s.id">
          <div class="col">{{ s.id }}</div>
          <div class="col">{{ s.name }}</div>
          <div class="col">{{ s.sex }}</div>
          <div class="col">{{ s.age }}</div>
        </div> -->
        <div>
          <div>
            <el-form ref="form" :model="formData" label-width="80px">
              <el-input
                v-model="formData.name"
                placeholder="请输入姓名"
                size="mini"
              ></el-input>
              <el-select
                v-model="formData.sex"
                placeholder="请选择活动区域"
                size="mini"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
              <el-select
                v-model="formData.age"
                placeholder="请选择活动区域"
                size="mini"
              >
                <el-option label="0,20" value="0到20岁"></el-option>
                <el-option label="20,100" value="20到100"></el-option>
              </el-select>

              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="searchData"
                >搜索</el-button
              >
            </el-form>
          </div>
        </div>
        <el-table :data="students" style="width: 100%">
          <el-table-column prop="id" label="编号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
          <el-table-column prop="age" label="年龄"> </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            layout="prev, pager, next,sizes,total"
            :total="queryData.total"
            :page-sizes="[5, 10, 20, 50, 100]"
            :page-size="queryData.pagesize"
            :current-page="queryData.currentPage"
            @current-change="handleCurrentChange"
            @size-change="sizeChange"
          >
          </el-pagination>
        </div>
      </div>

      <div class="row" v-else>暂无学生数据</div>
    </div>
    <input type="button" value="获取远程数据" @click="axiosClickGet" />
    <input
      type="button"
      value="获取请求头中数据数据"
      @click="axiosClickPost()"
    />
    <input
      type="button"
      value="获取请求中携带的数据"
      @click="axiosClickPostAdd()"
    />

    <div>
      <h1 style="text-align: center">父组件(重用组件)</h1>
      <!-- <my-button></my-button> -->
      <!-- js里面使用的不是驼峰命名法,而是这种向数据库那种命名法 -->
    </div>

    <div>
      <h1 style="text-align: center">使用elementui组件</h1>
      <el-button>我是按钮</el-button>
      <!-- js里面使用的不是驼峰命名法,而是这种向数据库那种命名法 -->

      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
    </div>
  </div>
</template>

<script>
// 先导入axios
import axios from "../utils/myaxios"; // 这里面导入的文件的axios通过我们修改了一些配置，和加上了一些拦截器

const options = {
  components: {
    // 名称一样：才可以这样简写
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
