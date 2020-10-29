<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common">
      </div>
    </div>
    <div class="heading" style="height: 60px">
      <monthesSlider @change="getSelectDate"></monthesSlider>
    </div>
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
          <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>正常: <span style="color: #67C23A;font-weight: 700">{{normal}}</span></el-col>
<!--          <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>异常: <span style="color: #F56C6C;font-weight: 700">{{error}}</span></el-col>-->
          <el-col :span="6" :offset="2"><div class="grid-content bg-purple"></div>缺勤: <span style="color: #E6A23C;font-weight: 700">{{absence}}</span></el-col>
        </el-row>
      </div>
    </div>
    <div class="statisticspiece">
      <span class="stcspan">加班统计</span>
      <div class="cotentinfo">
      </div>
    </div>
    <div class="statisticspiece">
      <span class="stcspan">假勤统计</span>
      <div class="cotentinfo">
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
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['正常', '迟到', '旷工', '缺卡', '早退']
        },
        series: [
          {
            name: '上下班统计',
            type: 'pie',
            radius: ['50', '70'],
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
    getData () {
      count(this.date, this.employeeId).then(res => {
        const list = []
        const record = res.data.data.record
        for (let item in record){
          const obj = {}
          const itemStyle = {}
          obj.name = record[item]
          if (item === 'leaveEarliy'){
            itemStyle.color = '#F56C6C'
            obj.name = '早退'
            obj.value = record[item]
          } else if (item === 'normol'){
            itemStyle.color = '#67C23A'
            obj.name = '正常'
            obj.value = record[item]
          } else if (item === 'absenceAll'){
            itemStyle.color = '#E6A23C'
            obj.name = '旷工'
            obj.value = record[item]
          } else if (item === 'late'){
            itemStyle.color = '#F56C6C'
            obj.name = '迟到'
            obj.value = record[item]
          } else if (item === 'absence'){
            itemStyle.color = '#F56C6C'
            obj.name = '缺卡'
            obj.value = record[item]
          }
          list.push(obj)
        }
        this.ifLate = res.data.data.record.late
        this.ifAbsent = res.data.data.record.absence
        this.ifLeaveEarly = res.data.data.record.leaveEarliy
        this.absence = res.data.data.record.absenceAll
        this.normal = res.data.data.record.normol
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
</style>
