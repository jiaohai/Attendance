<template>
  <div class="attendance">
    <div class="heading">
      <div class="title" style="align-items:center;">{{ msg }}</div>
      <div class="opete" style="align-items:center;">
        <button @click="goSingleReport" v-if="ifShowMonthReport">月报</button>
        <button @click="goBackThing">返回</button>
      </div>
    </div>
    <hr style="margin-top: 0px; margin-bottom: 0px;"/>
<!--    <Calendar @transferDay="getSelectDate"></Calendar>-->
    <new-calendar @selectDay="getSelectDate"></new-calendar>
    <div class="uncommonpiece" @click="goRule" v-if="ifShow">
      <div class="rulecotent">
        <span class="contentspan">上下班打卡</span>
        <span class="contentspan secondspan">打卡规则:{{ checkrule }} | 工作时长:{{ worktime }}</span>
      </div>
      <div class="rightside">
        <i class="fa fa-angle-right" />
      </div>
    </div>
    <div v-if="!ifShow" style="height: 100%;width: 100%; text-align: center;">
      <p style="color:#a5a5a5">无打卡记录</p>
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
          <p v-html="activity.content"></p>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import Calendar from 'vue-calendar-component'
import Calendar from '../components/calendar'
import newCalendar from "../components/newcalendar";

import { recordDate,
  findById } from '../api/record/checkRecord'

import { setCookie,
  getCookie,
  delCookie} from '../utils/cookie-util'

export default {
  name: 'checkrecord',
  data () {
    return {
      ifShow: false,
      employeeId: sessionStorage.getItem('userId'),
      recordDate: new Date(),
      msg: '打卡记录',
      checkrule: '打卡规则',
      worktime: '8',
      activities: []
    }
  },
  components: {
    Calendar,
    newCalendar
  },

  props : {
    goBack: {
      type:Boolean,
      default: true
    },
    ifShowMonthReport: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      default: ''
    },
    checkDate: {
      type: Date,
      default : null
    }
  },
  mounted () {
    // 个人打卡详情
    this.getData()
  },
  beforeMount () {
    Vue.prototype.$cookieStore = {
      setCookie,
      getCookie,
      delCookie
    }
  },
  methods: {
    getRuleDetail (id) {
      findById(id).then(res => {
        let rule = res.data.data
        this.checkrule = rule.name
        this.ruleType = rule.type
        this.$cookieStore.setCookie('ruleId', rule.id)
        // 这里不知道为什么全局变量设置不进去 偏方
        if (rule.type === '自由上下班'){
          this.$cookieStore.setCookie('ruleType', '1')
        } else {
          this.$cookieStore.setCookie('ruleType', '2')
        }
      })
    },
    /**
     * 加载数据
     */
    getData () {
      if (this.userId !== '' && this.userId != null){
        this.employeeId = this.userId
      }
      if (this.checkDate !== '' && this.checkDate != null){
        this.recordDate = this.checkDate
      }
      recordDate(this.recordDate, this.employeeId).then(res => {
        // 获取当前日期 yyyy-MM-dd
        let cur = this.getNowDate()
        let curSencond = this.getNowDateSecond()
        let reg = new RegExp('-', 'g')
        // 每次加载数据前清空
        this.activities = []
        const record = res.data.data.Record
        if (record.length > 0){
          this.getRuleDetail(record[0].ruleId)
        }
        if (record.length > 0){
          this.ifShow = true
        } else {
          this.ifShow = false
        }
        debugger
        let ruleType = this.$cookieStore.getCookie('ruleType')
        for (let item in record){
          const arr = []
          const obj = {}
          const obj1 = {}
          let workTimeCount = 0
          obj.timestamp = record[item].startTime
          obj1.timestamp = record[item].endTime
          if (ruleType === '1'){
            if (record[item].reachRecord !== null && record[item].reachRecord !== ''){
              obj.content = '<b>上班</b><br/>上班打卡(' + record[item].reachRecord + ')'
            } else {
              obj.content = '<b style="color: #a5a5a5">上班</b>'
            }
            if (record[item].leaveRecord !== null && record[item].leaveRecord !== ''){
              obj1.content = '<b>下班</b><br/>下班打卡(' + record[item].leaveRecord + ')'
            } else {
              obj1.content = '<b style="color: #a5a5a5">下班</b>'
            }
            if ((record[item].reachRecord !== null && record[item].reachRecord !== '') && (record[item].leaveRecord !== null && record[item].leaveRecord !== '')){
              workTimeCount = workTimeCount + parseInt((Date.parse(cur + ' ' + record[item].leaveRecord + ':00') - Date.parse(cur + ' ' + record[item].reachRecord + ':00')) / parseInt(1000 * 3600))
              this.worktime = workTimeCount + '小时'
            } else {
              this.worktime = '-'
            }
          } else {
            if (Date.parse(cur.replace(reg, '/')) < Date.parse((record[item].createTime).replace(reg, '/'))){
            obj.content = '<b style="color: #a5a5a5">上班</b>'
            obj1.content = '<b style="color: #a5a5a5">下班</b>'
            this.worktime = '-'
          } else if (Date.parse(cur.replace(reg, '/')) > Date.parse((record[item].createTime).replace(reg, '/'))){
            // 设置上班卡样式
            if (record[item].reachRecord == null || record[item].reachRecord === ''){
              obj.content = '<b style="color: #F56C6C">上班<br/>未打卡</b>'
            } else if (record[item].lateCount !== 0){
              obj.content = '<b style="color: #F56C6C">上班<br/>迟到打卡(' + record[item].reachRecord + ')</b>'
            } else {
              obj.content = '<b>上班</b><br/>上班打卡(' + record[item].reachRecord + ')'
            }
            // 设置下班卡
            if (record[item].leaveRecord == null || record[item].leaveRecord === ''){
              obj1.content = '<b style="color: #F56C6C">下班<br/>未打卡</b>'
            } else if (record[item].ifLeaveEarliy === 1){
              obj1.content = '<b style="color: #F56C6C">下班<br/>早退打卡(' + record[item].leaveRecord + ')</b>'
            } else {
              obj1.content = '<b>下班</b><br/>下班打卡(' + record[item].leaveRecord + ')'
            }
            if ((record[item].reachRecord == null || record[item].reachRecord === '') || (record[item].leaveRecord == null || record[item].leaveRecord === '')){
              this.worktime = '-'
            } else {
              workTimeCount = workTimeCount + parseInt((Date.parse(cur + ' ' + record[item].leaveRecord + ':00') - Date.parse(cur + ' ' + record[item].reachRecord + ':00')) / parseInt(1000 * 3600))
              this.worktime = workTimeCount + '小时'
            }
          } else {
            if (record[item].reachRecord == null || record[item].reachRecord === ''){
              // 当前时间在今日开始前到今日12:00:00之间如果未打卡 置灰
              if (Date.parse((cur + ' ' + '00:00:00').replace(reg, '/')) < Date.parse(curSencond.replace(reg, '/')) &&
                Date.parse(curSencond.replace(reg, '/')) < Date.parse((cur + ' ' + '12:00:00').replace(reg, '/'))){
                obj.content = '<b style="color: #a5a5a5">上班</b>'
              } else {
                obj.content = '<b style="color: #F56C6C">上班<br/>未打卡</b>'
              }
              this.worktime = '-'
            } else if (record[item].lateCount !== 0){
              obj.content = '<b style="color: #F56C6C">上班<br/>迟到打卡(' + record[item].reachRecord + ')</b>'
            } else {
              obj.content = '<b>上班</b><br/>上班打卡(' + record[item].reachRecord + ')'
            }
            if (record[item].leaveRecord == null || record[item].leaveRecord === ''){
              this.worktime = '-'
              // 下班时间到下班后三个小时为空 置灰
              if (Date.parse((cur + ' ' + record[item].startTime + ':00').replace(reg, '/')) < Date.parse(curSencond.replace(reg, '/')) &&
                Date.parse(curSencond.replace(reg, '/')) < (Date.parse((cur + ' ' + record[item].endTime + ':00').replace(reg, '/')) + 1000 * 60 * 60 * 3)){
                obj1.content = '<b style="color: #a5a5a5">下班</b>'
              } else {
                obj1.content = '<b style="color: #F56C6C">下班<br/>未打卡</b>'
              }
            } else if (record[item].ifLeaveEarliy === 1){
              obj1.content = '<b style="color: #F56C6C">下班<br/>早退打卡(' + record[item].leaveRecord + ')</b>'
            } else {
              obj1.content = '<b>下班</b><br/>下班打卡(' + record[item].leaveRecord + ')'
            }
            if ((record[item].reachRecord == null || record[item].reachRecord === '') || (record[item].leaveRecord == null || record[item].leaveRecord === '')){
              this.worktime = '-'
            } else {
              let end = cur + ' ' + record[item].leaveRecord + ':00'
              let start = cur + ' ' + record[item].reachRecord + ':00'
              let newEnd = end.replace(reg,'/')
              let newStart = start.replace(reg,'/')
              workTimeCount = parseInt((Date.parse(newEnd) - Date.parse(newStart)) / parseInt(1000 * 3600))
              this.worktime = workTimeCount + '小时'
            }
          }}
          arr.push(obj)
          arr.push(obj1)
          this.activities.push(arr)
        }
      })
    },
    /**
     * 获取当前日期yyyy-MM-dd
     * @returns {string}
     */
    getNowDate () {
      let date = new Date()
      let split = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let currentDate = year + split + month + split + strDate
      return currentDate
    },
    getNowDateSecond () {
      let date = new Date()
      let split = '-'
      let spl = ':'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      let second = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 1 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (second >= 0 && second <= 9) {
        second = '0' + second
      }
      let currentDate = year + split + month + split + strDate + ' ' + hour + spl + minutes + spl + second
      return currentDate
    },
    goBackThing () {
      if (this.goBack){
        window.history.go(-1)
      } else {
        this.$emit('close')
      }
    },
    goRule () {
      this.$router.push('/checkrule')
    },
    goSingleReport () {
      this.$router.push('/singlereport')
    },
    getSelectDate (msg) {
      this.recordDate = msg
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
    width: calc(90% - 20px);
  }

  .rightside{
    width: 10%;
    margin: auto;
    text-align: center;
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
    left: -50px;
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
