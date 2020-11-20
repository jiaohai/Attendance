<template>
  <div class="attendance">
    <div class="heading">
      <div class="title" style="align-items:center;">{{ msg }}</div>
      <div class="opete" style="align-items:center;">
        <button @click="goAllreport" >月报</button>
        <button @click="goBackThing" >返回</button>
      </div>
    </div>
    <hr style="margin-top: 0px; margin-bottom: 0px;"/>
    <div class="contentbody">
      <Calendar @transferDay="getSelectDate"></Calendar>
      <div class="statisticspiece">
        <span class="stcspan">上下班统计</span>
        <div class="cotentinfo">
          <el-row>
            <div class="vol-data">
              <div id="myChart" :style="{width:'100%',height:'200px'}">
              </div>
            </div>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset = "2"><div class="grid-content bg-purple"></div>迟到:<span style="color: #F56C6C;font-weight: 700">{{late}}</span></el-col>
            <el-col :span="6" :offset = "2"><div class="grid-content bg-purple"></div>早退:<span style="color: #E6A23C;font-weight: 700">{{leaveEarly}}</span></el-col>
            <!--<el-col :span="6" :offset = "2" @click=""><div class="grid-content bg-purple"></div>正常:<span style="color: #67C23A;font-weight: 700">{{normal}}</span></el-col>
            <el-col :span="6" :offset = "2" @click=""><div class="grid-content bg-purple"></div>异常:<span style="color: #F56C6C;font-weight: 700">{{error}}</span></el-col>-->
            <el-col :span="6" :offset = "2"><div class="grid-content bg-purple"></div>缺卡:<span style="color: #E6A23C;font-weight: 700">{{absence}}</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="statisticspiece" v-if="false">
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
    </div>
    <div class="bottoming" v-if="showfoot">
      <button class="clock-in bottomchildre" :class="$route.path.indexOf('check') !== -1 ? 'colortext' : 'colorcommon' " @click="gocheck">
        <i class="fa fa-map-marker" />
        <span>打卡</span>
      </button>
      <button class="statistics bottomchildre" :class="$route.path.indexOf('statistics') !== -1 ? 'colortext' : 'colorcommon' " v-if="showS || showR" @click="gostatistics">
        <i class="fa fa-pie-chart" />
        <span>统计</span>
      </button>
      <button class="rule bottomchildre" :class="$route.path.indexOf('rule') !== -1 ? 'colortext' : 'colorcommon' " v-if="showR" @click="gorule">
        <i class="fa fa-sliders " />
        <span>规则</span>
      </button>
      <button class="setting bottomchildre" :class="$route.path.indexOf('addadmin') !== -1 ? 'colortext' : 'colorcommon' " v-if="showA" @click="gosetting">
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
      late: 0,
      leaveEarly: 0,
      normal: 0,
      error: 0,
      absence: 0,
      recordDate: new Date(),
      recordDataList: [],
      statusArr: ['正常', '异常', '缺勤'],
      items:[
        {message: 'Foo', url : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'},
        {message: 'Bar', url : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'}
      ],
      recordOutList:[],
      userId: null,
      authority: null,
      showfoot: false,
      showS: false,
      showR: false,
      showA: false
    }
  },
  components: {
    Calendar
  },
  mounted () {
    this.getData()
    this.getRecordOutData()
  },
  created: function () {
    // this.userId = this.$route.query.userId
    // this.authority = parseInt(this.$route.query.authority)
    this.userId = sessionStorage.getItem('userId')
    this.authority = parseInt(sessionStorage.getItem('authority'))
    if (this.authority > 1) {
      this.showfoot = true
    }
    console.log(this.authority)
    if (this.authority === 2) {
      this.showS = true
    } else if (this.authority === 3) {
      this.showR = true
    } else if (this.authority === 4) {
      this.showA = true
    } else if (this.authority === 5) {
      this.showS = true
      this.showR = true
      this.showA = true
    }
  },
  methods: {
    drawLine (){
      console.log(this.recordDataList)
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let option = {
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          show:false
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['正常' + this.normal + '人', '异常' + this.error + '人']
        },
        series: [
          {
            name: '上下班统计',
            type: 'pie',
            hoverAnimation: false,
            radius: ['60%', '47%'],
            center: ['50%', '50%'],
            label: {
              show: false,
              textStyle:{color:'#3c4858', fontSize:'12'}
            },
            labelLine:{
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
        obj.name = '正常' + 0 + '人'
        itemStyle.color = '#67C23A'
        obj.itemStyle = itemStyle
        this.recordDataList.push(obj)
      }
      if (!this.inArray(recordDataList, '异常')){
        const obj = {}
        const itemStyle = {}
        obj.value = 0
        obj.name = '异常' + 0 + '人'
        itemStyle.color = '#F56C6C'
        obj.itemStyle = itemStyle
        this.recordDataList.push(obj)
      }
      // if (!this.inArray(recordDataList, '缺勤')){
      //   const obj = {}
      //   const itemStyle = {}
      //   obj.value = 0
      //   obj.name = '缺勤'
      //   itemStyle.color = '#E6A23C'
      //   obj.itemStyle = itemStyle
      //   this.recordDataList.push(obj)
      // }
      // 绘制echarts
      this.drawLine()
    },
    // 获取上下班统计
    getData (){
      getRecordByDate(this.recordDate).then(res => {
        if (res.data.flag){
          let data = res.data.data
          this.late = data.late
          this.leaveEarly = data.leaveEarly
          this.absence = data.absence
          this.normal = data.normal
          this.error = data.error
          const list = []
          for (let key in data){
            const obj = {}
            const itemStyle = {}
            if (key === 'normal'){
              obj.value = data[key]
              obj.name = '正常' + this.normal + '人'
              itemStyle.color = '#67C23A'
              obj.itemStyle = itemStyle
              list.push(obj)
            } else if (key === 'error'){
              obj.value = data[key]
              obj.name = '异常' + this.error + '人'
              itemStyle.color = '#F56C6C'
              obj.itemStyle = itemStyle
              list.push(obj)
            }
          }
          // let other =  0
          // for (let index in list){
          //   other += list[index].value;
          // }
          // list.push({value:other, name:'__other', itemStyle:{normal:{color:'rgba(0,0,0,0)'}}});
          this.recordDataList = list
          this.checkData(this.recordDataList)
        }
      })
    },
    // 获取外出统计
    getRecordOutData (){
      getRecordOutByTime(this.recordDate).then(res => {
        this.recordOutList = res.data.data
      })
    },
    // 判断数组中的元素是否包含search
    inArray (array, search) {
      for (let i in array) {
        if (array[i].name.split(search).length > 1) {
          return true
        }
      }
      return false
    },
    getSelectDate (msg) {
      this.recordDate = msg.date
      this.normal = 0
      this.error = 0
      this.absence = 0
      this.late = 0
      this.leaveEarly = 0
      // 重新加载数据
      this.getData()
      this.getRecordOutData()
    },
    goBackThing () {
      window.history.go(-1)
    },
    gocheck () {
      if (this.$route.path === '/check') {
        return
      }
      this.$router.push('/check')
    },
    gostatistics () {
      if (this.$route.path === '/statistics') {
        return
      }
      this.$router.push('/statistics')
    },
    gorule () {
      if (this.$route.path === '/rule') {
        return
      }
      this.$router.push('/rule')
    },
    gosetting () {
      if (this.$route.path === '/addadmin') {
        return
      }
      this.$router.push('/addadmin')
    },
    goAllreport () {
      this.$router.push('/allreport')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contentbody{
    height: calc(100% - 86px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    height: 0;
    width: 0;
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
