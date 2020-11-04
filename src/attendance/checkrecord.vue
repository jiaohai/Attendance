<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common" @click="goSingleReport">
        月报
      </div>
    </div>
    <Calendar @transferDay="getSelectDate"></Calendar>
    <div class="uncommonpiece" @click="goRule" v-if="ifShow">
      <div class="rulecotent">
        <span class="contentspan">上下班打卡</span>
        <span class="contentspan secondspan">打卡规则: {{ checkrule }} | 工作时长 {{ worktime }}</span>
      </div>
      <div class="rightside">
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div v-if="!ifShow">
      <h4 style="position: center">无打卡记录</h4>
    </div>
    <div class="block">
      <el-timeline v-for="(item, index_) in activities" :key="index_">
        <el-timeline-item placement="top" v-for="(activity, index) in item"
                          :key="index"
                          :icon="activity.icon"
                          :type="activity.type"
                          :color="activity.color"
                          :size="activity.size"
                          :timestamp="activity.timestamp">
          <p v-html="activity.content">{</p>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>

// import Calendar from 'vue-calendar-component'
import Calendar from '../components/calendar'

import { recordDate } from '../api/record/checkRecord'

export default {
  name: 'checkrecord',
  data () {
    return {
      ifShow: false,
      employeeId: '',
      recordDate: new Date(),
      msg: '打卡记录',
      checkrule: '打卡规则',
      worktime: '8小时',
      activities: []
    }
  },
  components: {
    Calendar
  },
  mounted () {
    // 个人打卡详情
    this.getData()
  },
  methods: {
    getData () {
      debugger
      recordDate(this.recordDate, 'jiaohaia').then(res => {
        console.log(res.data.data)
        // 每次加载数据前清空
        this.activities = []
        const record = res.data.data.Record
        if (record.length > 0){
          this.ifShow = true
        } else {
          this.ifShow = false
        }
        for (let item in record){
          const arr = []
          const obj = {}
          const obj1 = {}
          obj.timestamp = record[item].startTime
          if (record[item].reachRecord == null || record[item].reachRecord === ''){
            obj.content = '<b style="color: #F56C6C">上班<br/>未打卡</b>'
          } else if (record[item].lateCount !== 0){
            obj.content = '<b style="color: #F56C6C">上班<br/>迟到打卡(' + record[item].reachRecord + ')</b>'
          } else {
            obj.content = '<b>上班</b><br/>上班打卡(' + record[item].reachRecord + ')'
          }
          arr.push(obj)
          obj1.timestamp = record[item].endTime
          if (record[item].leaveRecord == null || record[item].leaveRecord === ''){
            // obj1.color = '#F56C6C'
            obj1.content = '<b style="color: #F56C6C">下班<br/>未打卡</b>'
          } else if (record[item].ifLeaveEarliy === 1){
            // obj1.color = '#F56C6C'
            obj1.content = '<b style="color: #F56C6C">下班<br/>早退打卡(' + record[item].leaveRecord + ')</b>'
          } else {
            // obj1.color = '#67C23A'
            obj1.content = '<b>下班</b><br/>下班打卡(' + record[item].leaveRecord + ')'
          }
          arr.push(obj1)
          this.activities.push(arr)
        }
      })
    },
    goBackThing () {
      window.history.go(-1)
    },
    goRule () {
      this.$router.push('/checkrule')
    },
    goSingleReport () {
      this.$router.push('/singlereport')
    },
    getSelectDate (msg) {
      this.recordDate = msg.date
      // 重新加载数据
      this.getData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .attendance{
    height:100%;
  }

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

  .uncommonpiece{
    display:inline-flex;
    width: 100%;
    margin:auto;
    margin-top:10px;
    text-align:left;
    background-color: white;
  }
  .rulecotent{
    display:inline-grid;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: calc(80% - 20px);
  }
  .rightside{
    width: 20%;
    text-align: right;
  }
  .fastyle{
    margin-top:50%;
    margin-right: 10px;
  }
  .contentspan{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .secondspan{
    margin-top:10px;
    font-size:small;
    color:rgb(165,165,165);
  }

  /deep/ .el-timeline-item__timestamp.is-top {
    margin-bottom: 8px;
    padding-top: 4px;
    position: absolute;
    left: -40px;
    top: -1px;
  }
  /deep/ .el-timeline-item__content {
    color: #303133;
    position: relative;
    left: -300px;
  }
  /deep/ .el-timeline {
    padding-left: 60px;
  }
  /deep/ .el-timeline-item__tail {
    position: absolute;
    left: 4px;
    height: 120%;
    border-left: 2px solid #E4E7ED;
  }
</style>
