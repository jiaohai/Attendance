<template>
  <div class="attendance">
    <div class="heading">
      <div class="title" style="align-items:center;">{{ msg }}</div>
      <div class="opete" style="align-items:center;">
        <button @click="goBackThing" >返回</button>
      </div>
    </div>
    <hr style="margin-top: 0px; margin-bottom: 0px;"/>
    <div class="monthheading" style="height: 60px">
      <monthesSlider @change="getSelectDate"></monthesSlider>
    </div>
    <div class="contentbody">
      <div class="statisticspiece">
        <span class="stcspan">上下班统计·人</span>
        <div class="cotentinfo">
          <van-row>
            <div class="vol-data">
              <div id="myChart" :style="{width:'100%',height:'200px'}">
              </div>
            </div>
          </van-row>
          <van-row>
            <van-col span="6" offset="2">迟到: <span style="color: #F56C6C;font-weight: 700" @click="openDetail('1')">{{ifLate}}</span></van-col>
            <van-col span="6" offset="2">缺卡: <span style="color: #F56C6C;font-weight: 700" @click="openDetail('2')">{{ifAbsent}}</span></van-col>
            <van-col span="6" offset="2">早退: <span style="color: #F56C6C;font-weight: 700" @click="openDetail('3')">{{ifLeaveEarly}}</span></van-col>
<!--            <van-col span="6" offset="2">全勤: <span style="color: #67C23A;font-weight: 700" @click="openDetail('0')">{{normal}}</span></van-col>-->
            <van-col span="6" offset="2">旷工: <span style="color: #F56C6C;font-weight: 700" @click="openDetail('4')">{{absence}}</span></van-col>
          </van-row>
        </div>
      </div>
      <div class="statisticspiece" v-if="false">
        <span class="stcspan">加班统计·人</span>
        <div class="cotentinfo">
        </div>
      </div>
      <div class="statisticspiece" v-if="false">
        <span class="stcspan">假勤统计·人</span>
        <div class="cotentinfo">
        </div>
      </div>
    </div>
    <record-detail :status="this.status" :check-date="this.date" v-if="ifSHow"></record-detail>
  </div>
</template>

<script>

import recordDetail from './recordDetail'
import monthesSlider from '../components/monthesSlider'
import { getRecordCountByTime,
  getRecordCountByTimeForECharts} from '../api/record/record'

export default {
  name: 'allreport',
  data () {
    return {
      ifSHow: false,
      status: '',
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
    this.getRecordCountByTimeForECharts()
    this.getRecordCountByTime()
  },
  components: {
    recordDetail,
    monthesSlider
  },
  methods: {
    getRecordCountByTimeForECharts () {
      getRecordCountByTimeForECharts(this.date).then(res => {
        const list = []
        const record = res.data.data
        for (let item in record) {
          const obj = {}
          const itemStyle = {}
          if (item === 'normal'){
            itemStyle.color = '#67C23A'
            obj.name = '全勤' + record[item] + '人'
            obj.value = record[item]
            obj.itemStyle = itemStyle
            this.normal = record[item]
          } else if (item === 'error'){
            itemStyle.color = '#F56C6C'
            obj.name = '异常' + record[item] + '人'
            obj.value = record[item]
            obj.itemStyle = itemStyle
            this.error = record[item]
          }
          list.push(obj)
        }
        this.recordDataList = list
        // 绘制echarts
        this.drawLine()
      })
    },
    openDetail (status) {
      this.status = status
      this.ifSHow = false
    },
    goBackThing () {
      window.history.go(-1)
    },
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
          data: ['全勤' + this.normal + '人', '异常' + this.error + '人']
        },
        // 设置饼状图每个颜色块的颜色
        // color : [ 'red', 'green', 'yellow' ],
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
    getRecordCountByTime (){
      getRecordCountByTime(this.date).then(res => {
        const record = res.data.data
        for (let item in record){
          if (item === 'ifLeaveEarliy'){
            this.ifLeaveEarly = record[item].length
          } else if (item === 'normal'){
            this.normal = record[item].length
          } else if (item === 'absent'){
            this.absence = record[item].length
          } else if (item === 'lateCount'){
            this.ifLate = record[item].length
          } else if (item === 'ifAbsence'){
            this.ifAbsent = record[item].length
          }
        }
      })
    },

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
      this.normal = 0
      this.error = 0
      this.absence = 0
      this.ifLate = 0
      this.ifAbsent = 0
      this.ifLeaveEarly = 0
      this.getRecordCountByTimeForECharts()
      this.getRecordCountByTime()
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
    height: calc(100% - 108px);
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
