<template>
  <div class="hello">
    <div class="hello-title">
      新闻列表管理
    </div>
    <div class="form-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item >
          <el-input v-model="formInline.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.contain" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
   <div class="table">
     <template>
       <el-table
         border
         :data="tableData"
         >
         <el-table-column
           prop="image"
           label="图片"
           min-width="20%">
           <template slot-scope="scope">
             <div>
               <img :src="scope.row.image" alt="">
             </div>
           </template>
         </el-table-column>
         <el-table-column
           prop="title"
           label="标题"
           min-width="20%">
         </el-table-column>
         <el-table-column
           prop="contain"
           label="内容"
           min-width="20%">
         </el-table-column>
         <el-table-column
           prop="time"
           label="时间"
           min-width="20%">
         </el-table-column>
         <el-table-column
           prop="operation"
           label="操作"
           min-width="20%">
           <template slot-scope="scope">
             <el-button @click="del(scope.row.id)">删除</el-button>
           </template>
         </el-table-column>
       </el-table>
     </template>
   </div>
    <div class="footer">
      <div class="btn-box">
        <el-button @click="prevFun">上一页</el-button>
        <el-button @click="nextFun">下一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted () {
    this.getNewsList()
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      msg: 'Welcome to Your Vue.js App',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      formInline: {
        title: '',
        contain: ''
      }
    }
  },
  methods: {
    getNewsList () {
      this.$axios.get('/api/get/news', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.pageNewsList
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    prevFun () {
      this.pageIndex--
      this.getNewsList()
    },
    nextFun () {
      this.pageIndex++
      this.getNewsList()
    },
    add () {
      this.$axios.post('/api/add/news', {
        titles: this.formInline.title,
        contain: this.formInline.contain
      }).then(res => {
        console.log(res)
      })
      this.getNewsList()
    },
    del (id) {
      this.$axios.post('/api/delete/news', {
        id
      }).then(res => {
        console.log(res)
      })
      this.getNewsList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
