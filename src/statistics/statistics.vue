<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common" @click="goAllreport">
        月报
      </div>
    </div>
    <Calendar></Calendar>
    <div class="statisticspiece">
      <span class="stcspan">上下班统计</span>
      <div class="cotentinfo">
        <el-row>
          <div class="vol-data">
            <div id="myChart" :style="{width:'100%',height:'300px'}">
            </div>
          </div>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset = "2"><div class="grid-content bg-purple"></div>正常:<span style="color: #67C23A">{{normal}}</span></el-col>
          <el-col :span="6" :offset = "2"><div class="grid-content bg-purple"></div>异常:<span style="color: #F56C6C">{{error}}</span></el-col>
          <el-col :span="6" :offset = "2"><div class="grid-content bg-purple"></div>缺勤:<span style="color: #E6A23C">{{absence}}</span></el-col>
        </el-row>
      </div>
    </div>
    <div class="statisticspiece">
      <span class="stcspan">外出统计</span>
      <div class="cotentinfo">
        <template>
          <el-row :gutter="40">
            <el-col :span="4" :offset = "2" v-for="item in recordOutList" :key="item.name">
              <div class="grid-content">
                <div style="text-align: center">
                  <el-avatar :src=item.avatar></el-avatar>
                </div>
                <div style="text-align: center">
                  {{item.name}}
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </div>
    </div>
    <div class="bottoming">
      <button class="clock-in bottomchildre" :class="$route.path.indexOf('check') !== -1 ? 'colortext' : 'colorcommon' " v-if="showcheck" @click="gocheck">
        <i class="fa fa-map-marker" />
        <span>打卡</span>
      </button>
      <button class="statistics bottomchildre" :class="$route.path.indexOf('statistics') !== -1 ? 'colortext' : 'colorcommon' " v-if="showstatistics" @click="gostatistics">
        <i class="fa fa-pie-chart" />
        <span>统计</span>
      </button>
      <button class="rule bottomchildre" :class="$route.path.indexOf('rule') !== -1 ? 'colortext' : 'colorcommon' " v-if="showrule" @click="gorule">
        <i class="fa fa-sliders " />
        <span>规则</span>
      </button>
      <button class="setting bottomchildre" :class="$route.path.indexOf('addadmin') !== -1 ? 'colortext' : 'colorcommon' " v-if="showsetting" @click="gosetting">
        <i class="fa fa-cog" />
        <span>设置</span>
      </button>
    </div>
  </div>
</template>

<script>
import Calendar from '../components/calendar'
import {
  getRecordByDate,
  getRecordOutByTime
} from '../api/record/record'

export default {
  name: 'statistics',
  data () {
    return {
      msg: '统计',
      showcheck: true,
      showstatistics: true,
      showrule: true,
      showsetting: true,
      normal: 0,
      error: 0,
      absence: 0,
      recordDate: '2020-10-12',
      recordDataList: [],
      statusArr: ['正常', '异常', '缺勤'],
      items:[
        {message: 'Foo', url : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'},
        {message: 'Bar', url : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'}
      ],
      recordOutList:[]
    }
  },
  components: {
    Calendar
  },
  mounted () {
    this.getData()
    this.getRecordOutData()
  },
  methods: {
    drawLine (){
      console.log(this.recordDataList)
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['正常', '异常', '缺勤']
        },
        // 设置饼状图每个颜色块的颜色
        // color : [ 'red', 'green', 'yellow' ],
        series: [
          {
            name: '上下班统计',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.recordDataList
          }
        ]
      }
      myChart.setOption(option)
    },
    checkData (recordDataList){
      if (!this.inArray(recordDataList, '正常')){
        const obj = {}
        const itemStyle = {}
        obj.value = 0
        obj.name = '正常'
        itemStyle.color = '#67C23A'
        obj.itemStyle = itemStyle
        this.recordDataList.push(obj)
      }
      if (!this.inArray(recordDataList, '异常')){
        const obj = {}
        const itemStyle = {}
        obj.value = 0
        obj.name = '异常'
        itemStyle.color = '#F56C6C'
        obj.itemStyle = itemStyle
        this.recordDataList.push(obj)
      }
      if (!this.inArray(recordDataList, '缺勤')){
        const obj = {}
        const itemStyle = {}
        obj.value = 0
        obj.name = '缺勤'
        itemStyle.color = '#E6A23C'
        obj.itemStyle = itemStyle
        this.recordDataList.push(obj)
      }
      // 绘制echarts
      this.drawLine()
    },
    // 获取上下班统计
    getData (){
      getRecordByDate(this.recordDate).then(res => {
        const list = []
        for (let item in res.data.data){
          const obj = {}
          const itemStyle = {}
          if (res.data.data[item].status === '正常'){
            this.normal = res.data.data[item].count
            itemStyle.color = '#67C23A'
          } else if (res.data.data[item].status === '异常'){
            this.error = res.data.data[item].count
            itemStyle.color = '#F56C6C'
          } else {
            this.absence = res.data.data[item].count
            itemStyle.color = '#E6A23C'
          }
          obj.value = res.data.data[item].count
          obj.name = res.data.data[item].status
          obj.itemStyle = itemStyle
          list.push(obj)
        }
        this.recordDataList = list
        this.checkData(this.recordDataList)
      })
    },
    // 获取外出统计
    getRecordOutData (){
      getRecordOutByTime('2020-10-22').then(res => {
        this.recordOutList = res.data.data
      })
    },
    // 判断数组中的元素是否包含search
    inArray (array, search) {
      for (let i in array) {
        if (array[i].name === search) {
          return true
        }
      }
      return false
    },
    goBackThing () {
      window.history.go(-1)
    },
    goAllreport () {
      this.$router.push('/allreport')
    },
    gocheck () {
      this.$router.push('/check')
    },
    gostatistics () {
      this.$router.push('/statistics')
    },
    gorule () {
      this.$router.push('/rule')
    },
    gosetting () {
      this.$router.push('/addadmin')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .heading {
    display: inline-flex;
    width:100%;
    height:45px;
    background:inherit;
    background-color:rgb(26, 138, 190);
    box-sizing:border-box;
    border-width:1px;
    text-align: center;
  }

  .black {
    width:10%;
  }
  .title {
    width:80%;
  }
  .more{
    width:10%;
  }
  .common {
    position: inherit;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    color:white;
  }

  button{
    background-color:white;
    border-width:inherit;
  }
  button:focus{
    /* color: #fff; */
    /* background: #0a90f5; */
    background: white;
    outline: none;
  }

  .statisticspiece{
    display:inline-grid;
    width: 98%;
    margin:auto;
    margin-top:10px;
    text-align:left;
    background-color: white;
  }
  .cotentinfo{
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    min-height: 100px;
  }
  .stcspan{
    margin-left: 20px;
    margin-top: 10px;
  }

  .bottoming {
    position:fixed;
    display:flex;
    flex:0;
    width:100%;
    height:40px;
    bottom:0px;
    background-color:white;
  }
  .bottomchildre{
    display: grid;
    margin-top:5px;
    width: 100%;
  }
  .colortext{
    color: rgb(26, 138, 190);
  }
  .colorcommon{
    color: rgb(170, 170, 170);
  }
  .el-row {
    margin-bottom: 20px;
    /*&:last-child {*/
     /*margin-bottom: 0;*/
   /*}*/
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  /*.bg-purple {
    background: #d3dce6;
  }*/
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
