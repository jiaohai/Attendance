<template>
  <div class="attendance">
    <div class="heading">
      <div class="title" style="align-items:center;">{{ msg }}</div>
      <div class="opete" style="align-items:center;">
        <!-- <button @click="goSingleReport" >月报</button> -->
        <button @click="goBackThing" >返回</button>
      </div>
    </div>
    <hr style="margin-top: 0px; margin-bottom: 0px;"/>
    <div class="monthheading" style="height: 60px">
      <monthesSlider @change="getSelectDate"></monthesSlider>
    </div>
    <div class="contentbody">
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
            <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>迟到: <span style="color: #F56C6C;font-weight: 700">{{ifLate}}</span></el-col>
            <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>缺卡: <span style="color: #F56C6C;font-weight: 700">{{ifAbsent}}</span></el-col>
            <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>早退: <span style="color: #F56C6C;font-weight: 700">{{ifLeaveEarly}}</span></el-col>
<!--            <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>正常: <span style="color: #67C23A;font-weight: 700">{{normal}}</span></el-col>-->
  <!--          <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>异常: <span style="color: #F56C6C;font-weight: 700">{{error}}</span></el-col>-->
            <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>旷工: <span style="color: #E6A23C;font-weight: 700">{{absence}}</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="statisticspiece" v-if="false">
        <span class="stcspan">加班统计</span>
        <div class="cotentinfo">
        </div>
      </div>
      <div class="statisticspiece" v-if="false">
        <span class="stcspan">假勤统计</span>
        <div class="cotentinfo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import monthesSlider from '../components/monthesSlider'

import { count } from '../api/record/checkRecord'

export default {
  name: 'singlereport',
  data () {
    return {
      date: new Date(),
      employeeId: sessionStorage.getItem('userId'),
      msg: '月报',
      normal: 0,
      error: 0,
      absence: 0,
      ifLate: 0,
      ifAbsent: 0,
      ifLeaveEarly: 0
    }
  },
  components: {
    monthesSlider
  },

  mounted () {
    this.date = this.getNowFormatDate()
    // 加载数据
    this.getData()
  },
  methods: {
    drawLine (){
      console.log(this.recordDataList)
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let option = {
        tooltip: {
          show:false
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['正常' + this.normal + '天', '异常' + this.error + '天' ]
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
    getData () {
      count(this.date, 'liyuanyuan'/*this.employeeId*/).then(res => {
        const list = []
        const record = res.data.data.record
        const single = res.data.data.single
        for (let item in record){
          const obj = {}
          obj.name = record[item]
          if (item === 'leaveEarliy'){
            this.ifLeaveEarly = record[item]
          } else if (item === 'normol'){
            this.normal = record[item]
          } else if (item === 'absenceAll'){
            this.absence = record[item]
          } else if (item === 'late'){
            this.ifLate = record[item]
          } else if (item === 'absence'){
            this.ifAbsent = record[item]
          }
        }

        for (let item in single){
          const obj = {}
          const itemStyle = {}
          if (item === 'error'){
            itemStyle.color = '#F56C6C'
            obj.name = '异常' + single[item] + '天'
            obj.value = single[item]
            obj.itemStyle = itemStyle
            this.error = single[item]
          } else if (item === 'normal'){
            itemStyle.color = '#67C23A'
            obj.name = '正常'+ single[item] + '天'
            obj.value = single[item]
            obj.itemStyle = itemStyle
            this.normal = single[item]
          }
          list.push(obj)
        }
        this.recordDataList = list
        this.drawLine()
      })
    },
    goBackThing () {
      window.history.go(-1)
    },
    getSelectDate (msg) {
      console.log(msg)
      this.date = msg
      this.normal = 0
      this.error = 0
      this.absence = 0
      this.ifLate = 0
      this.ifAbsent = 0
      this.ifLeaveEarly = 0
      // 重新加载数据
      this.getData()
    },
    /**
     * 获取当前日期yyyy-MM
     * @returns {string}
     */
    getNowFormatDate () {
      let date = new Date()
      let split = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      let currentDate = year + split + month
      return currentDate
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .monthheading {
    display: inline-flex;
    width:100%;
    height:45px;
    background:inherit;
    background-color:rgb(26, 138, 190);
    box-sizing:border-box;
    border-width:1px;
    text-align: center;
  }

  .contentbody{
    height: calc(100% - 109px);
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
</style>
