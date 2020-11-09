<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common">
        月报
      </div>
    </div>
    <div class="heading" style="height: 60px">
      <monthesSlider @change="getSelectDate"></monthesSlider>
    </div>
    <div class="statisticspiece">
      <span class="stcspan">上下班统计·人</span>
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
      <span class="stcspan">加班统计·人</span>
      <div class="cotentinfo">
      </div>
    </div>
    <div class="statisticspiece">
      <span class="stcspan">假勤统计·人</span>
      <div class="cotentinfo">
      </div>
    </div>
  </div>
</template>

<script>

import monthesSlider from '../components/monthesSlider'
import {
  getRecordCountByTime } from '../api/record/record'

export default {
  name: 'allreport',
  data () {
    return {
      msg: '月报',
      date: new Date(),
      recordDataList: [],
      normal: 0,
      error: 0,
      absence: 0,
      ifLate: 0,
      ifAbsent: 0,
      ifLeaveEarly: 0
    }
  },
  mounted (){
    // this.getRecordCountByTimeForECharts()
    this.getRecordCountByTime()
  },
  components: {
    monthesSlider
  },
  methods: {
    goBackThing () {
      window.history.go(-1)
    },
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
          data: ['正常', '迟到', '旷工', '早退', '缺卡']
        },
        // 设置饼状图每个颜色块的颜色
        // color : [ 'red', 'green', 'yellow' ],
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
    getRecordCountByTime (){
      //  这里测试用10月份的 this.date
      getRecordCountByTime(this.date).then(res => {
        debugger
        const list = []
        const record = res.data.data[0]
        for (let item in record){
          const obj = {}
          const itemStyle = {}
          if (item === 'ifLeaveEarliy'){
            itemStyle.color = '#F56C6C'
            obj.name = '早退'
            obj.value = record[item]
            // obj.itemStyle = itemStyle
          } else if (item === 'normal'){
            itemStyle.color = '#67C23A'
            obj.name = '正常'
            obj.value = record[item]
            obj.itemStyle = itemStyle
          } else if (item === 'absent'){
            itemStyle.color = '#E6A23C'
            obj.name = '旷工'
            obj.value = record[item]
            obj.itemStyle = itemStyle
          } else if (item === 'lateCount'){
            itemStyle.color = '#F56C6C'
            obj.name = '迟到'
            obj.value = record[item]
            // obj.itemStyle = itemStyle
          } else if (item === 'ifAbsence'){
            itemStyle.color = '#F56C6C'
            obj.name = '缺卡'
            obj.value = record[item]
            // obj.itemStyle = itemStyle
          }
          list.push(obj)
        }
        this.ifLate = res.data.data[0].lateCount
        this.ifAbsent = res.data.data[0].ifAbsence
        this.ifLeaveEarly = res.data.data[0].ifLeaveEarliy
        this.absence = res.data.data[0].absent
        this.normal = res.data.data[0].normal
        this.recordDataList = list
        // 绘制echarts
        this.drawLine()
      })
    },

    // getRecordCountByTime (){
    //   //  这里测试用10月份的 this.date
    //   getRecordCountByTime(this.date).then(res => {
    //     this.ifLate = res.data.data[0].lateCount
    //     this.ifAbsent = res.data.data[0].ifAbsence
    //     this.ifLeaveEarly = res.data.data[0].ifLeaveEarliy
    //   })
    // },
    checkData (recordDataList){
      if (!this.inArray(recordDataList, '0')){
        const obj = {}
        const itemStyle = {}
        obj.value = 0
        obj.name = '正常'
        itemStyle.color = '#67C23A'
        obj.itemStyle = itemStyle
        this.recordDataList.push(obj)
      }
      if (!this.inArray(recordDataList, '2')){
        const obj = {}
        const itemStyle = {}
        obj.value = 0
        obj.name = '异常'
        itemStyle.color = '#F56C6C'
        obj.itemStyle = itemStyle
        this.recordDataList.push(obj)
      }
      if (!this.inArray(recordDataList, '1')){
        const obj = {}
        const itemStyle = {}
        obj.value = 0
        obj.name = '缺勤'
        itemStyle.color = '#E6A23C'
        obj.itemStyle = itemStyle
        this.recordDataList.push(obj)
      }
      // 绘制echarts
      // this.drawLine()
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
    getSelectDate (msg) {
      console.log(msg)
      this.date = msg
      this.getRecordCountByTime()
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
