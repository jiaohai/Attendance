<template>
  <div class="attendance">
    <div class="heading">
      <div class="title" style="align-items:center;">{{ msg }}</div>
      <div class="opete" style="align-items:center;">
        <!-- <button @click="goAddRule(newData)" >创建</button> -->
        <button @click="goBackThing" >返回</button>
      </div>
    </div>
    <hr style="margin-top: 0px; margin-bottom: 0px;"/>
    <div class="contentbody" style="height: calc(100% - 45px)">
      <div class="piece">
        <div class="user">
          <img :src="avatarurl" width="35" height="35" />
  <!--        <el-avatar :src="avatarurl"></el-avatar>-->
          <span style="padding-left: 20px;margin-top: 5px;font-weight: bold">{{ username }}</span>
        </div>
        <span style="margin-left: 20px; padding-bottom: 10px; display: block;">打卡规则：{{ rulename }}</span>
      </div>
      <div class="piece">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span style="color: #1a8abe;font-weight: bold">打卡时间</span>
          </div>
          <i class="fa fastyle fa-angle-down" style="color: #1a8abe" v-if="!showtime" @click="showTime" />
          <i class="fa fastyle fa-angle-up" style="color: #1a8abe" v-if="showtime" @click="showTime" />
        </div>
  <!--      固定上下班-->
        <div class="content" v-if="showtime" v-show="showSchedule">
          <hr style="margin: auto; margin-left: 20px; margin-right: 10px;"/>
          <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;" v-if="showSchedule" v-for="(schedule, index) in schedules" :key="index">
            <span>上下班时间</span>
            <div class="svgplace" style="margin-top: 10px;line-height: 1.5em">
              <span v-html="schedule.content"></span>
            </div>
          </div>
        </div>
  <!--      按班次上下班-->
        <div class="content" v-if="showtime" v-show="showShift">
          <hr style="margin: auto; margin-left: 20px; margin-right: 10px;"/>
          <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;" v-if="showShift" v-for="(shift, _index) in shifts" :key="_index">
            <span style="font-weight: bolder">上下班时间</span>
            <div class="svgplace" style="margin-top: 10px;line-height: 1.5em">
              <span v-html="shift.content"></span>
            </div>
          </div>
        </div>
  <!--      自由上下班-->
        <div class="content" v-if="showtime" v-show="showFree">
          <hr style="margin: auto; margin-left: 20px; margin-right: 10px;"/>
          <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;" v-if="showFree">
            <span style="font-weight: bolder">上下班时间</span>
            <div class="svgplace" style="margin-top: 10px;line-height: 1.5em">
              <span v-html="this.worktime"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="piece">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span style="color: #1a8abe;font-weight: bold">打卡范围</span>
          </div>
          <i class="fa fastyle fa-angle-down" style="color: #1a8abe" v-if="!showplace" @click="showPlace" />
          <i class="fa fastyle fa-angle-up" style="color: #1a8abe" v-if="showplace" @click="showPlace" />
        </div>
        <div class="content" v-if="showplace">
          <hr style="margin: auto; margin-left: 20px; margin-right: 10px;" />
          <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;line-height: 1.5em">
            <el-row >
              <span>打卡地点</span>
            </el-row>
            <el-row v-for="(item, index) in places" :key="index">
              <div class="svgplace" style="margin-top: 10px;background: #99a9bf;width:auto; display:inline-block !important; display:inline;" >
                <i class="fa fa-map-marker" />
                <span>{{ item.name }}</span>
              </div>
            </el-row>
          </div>
        </div>
      </div>
      <div class="piece">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span style="color: #1a8abe;font-weight: bold">加班规则</span>
          </div>
          <i class="fa fastyle fa-angle-down" style="color: #1a8abe" v-if="!showwork" @click="showWork" />
          <i class="fa fastyle fa-angle-up" style="color: #1a8abe" v-if="showwork" @click="showWork" />
        </div>
        <div class="content" v-if="showwork">
          <hr style="margin: auto; margin-left: 20px; margin-right: 10px;" />
          <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
            <span>加班方式</span>
            <div class="svgplace" style="margin-top: 10px;">
              <span>{{ workout }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="piece" style="margin-bottom: 10px;">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span style="color: #1a8abe;font-weight: bold">更多规则</span>
          </div>
          <i class="fa fastyle fa-angle-down" style="color: #1a8abe" v-if="!showrule" @click="showRule" />
          <i class="fa fastyle fa-angle-up" style="color: #1a8abe" v-if="showrule" @click="showRule" />
        </div>
        <div class="content" v-if="showrule">
          <hr style="margin: auto; margin-left: 20px; margin-right: 10px;" />
          <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
            <span>{{ moreRule }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { findRuleInfoByRuleId } from '../api/record/rule'
import { setCookie,
  getCookie,
  delCookie} from '../utils/cookie-util'

export default {
  name: 'checkrule',
  data () {
    return {
      msg: '打卡规则',
      rulename: '打卡规则名称',
      avatarurl: '../assets/logo.png',
      username: '',
      worktime: '具体的上下班时间',
      place: '设置的打卡地点',
      workout: '加班方式，时间以什么为准',
      ruleinfo: '打卡规则中一些注意的事项，提醒员工，与以说明，避免一些特殊情况让员工感到困惑，从而影响打卡',
      showFree: false,
      showtime: true,
      showplace: true,
      showrule: true,
      showwork: true,
      showSchedule: true,
      showShift: false,
      places: [],
      // 班次上下班
      shifts: [],
      schedules: [],
      contents: '弹性上下班<br/><span style="color: #a5a5a5">上班前半个小时内可打上班卡,下个班次上班前半个小时可以打上个班次下班卡,最后一个班次下班后两小时内可打下班卡</span>',
      moreRule: '无'
    }
  },
  beforeMount () {
    Vue.prototype.$cookieStore = {
      setCookie,
      getCookie,
      delCookie
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      // 员工头像 用户名
      let employeeId = sessionStorage.getItem('userId')
      this.checkUser(employeeId)
      findRuleInfoByRuleId(this.$cookieStore.getCookie('ruleId')).then(res => {
        // debugger
        console.log(res.data.data)
        // 回填数据
        let this_ = this
        let tmp = res.data.data
        this.rulename = tmp.ruleName
        // 打卡地点有可能多个
        this.places = tmp.places
        // 加班规则
        if (Object.keys(tmp.overTime).length !== 0){
          this.workout = tmp.overTime.type
          if (tmp.overTime.type === '以加班申请为准'){
            this.workout += ':加班申请通过后，直接记录为加班时长'
          } else if (tmp.overTime.type === '以打卡时间为准'){
            this.workout += ':根据打卡时间自动计算加班时长'
          } else {
            this.workout += ':打卡后，根据加班申请核算加班时长'
          }
        } else {
          this.workout = '无'
        }
        // 打卡时间
        let workTime_ = []
        let obj = {}
        // this.worktime = tmp.schedule[0].day + '  ' + tmp.schedule[0].workTime[0].startTime + '-' + tmp.schedule[0].workTime[0].endTime
        if (tmp.ruleType === '固定上下班'){
          this.showFree = false
          this.showShift = false
          this.showSchedule = true
          let schedules_ = tmp.schedule
          for (let index in schedules_) {
            workTime_ = schedules_[index].workTime
            for (let index_ in workTime_){
              obj = {}
              obj.content = '<span style="color: #a5a5a5">' + schedules_[index].day + '  ' + workTime_[index_].startTime + '-' + workTime_[index_].endTime + '</span>'
              this_.schedules.push(obj)
            }
          }
        } else if (tmp.ruleType === '按班次上下班'){
          this.showFree = false
          this.showShift = true
          this.showSchedule = false
          let shifts_ = tmp.shift
          for (let index in shifts_){
            workTime_ = shifts_[index].workTime
            for (let index_ in workTime_){
              obj = {}
              obj.content = '<span style="color: #a5a5a5">' + shifts_[index].shiftName + '  ' + workTime_[index_].startTime + '-' + workTime_[index_].endTime + '</span></br>' + this_.contents
              this_.shifts.push(obj)
            }
          }
          let tmp1 = {}
          tmp1.content = '<span style="color: #a5a5a5">休息</span></br>' + this.contents
          this.shifts.push(tmp1)
          console.log(this.shifts)
        } else {
          this.showFree = true
          this.showShift = false
          this.showSchedule = false
          this.worktime = '<span style="color: #a5a5a5">自由上下班</span></br>无时间限制,可随时打卡,只统计旷工'
        }
        // 更多规则
        this.moreRule = ''
        if (tmp.lateSign === 1){
          // 允许补卡
          this.moreRule += '允许提交补卡申请'
          if (tmp.lateSign === null){
            this.moreRule += ',不限制补卡次数'
          } else {
            this.moreRule += ',限制补卡' + tmp.lateSignCount + '次'
          }
          if (tmp.expiration === '不限制' || tmp.expiration === null || tmp.expiration === ''){
            this.moreRule += ',不限制补卡时限'
          }
        } else {
          // 不允许补卡
          this.moreRule += '不允许提交补卡申请'
        }
      })
    },
    // 给头像，员工名赋值
    checkUser (employeeId) {
      this.$axios.get('/groupApi/getUserInfo?userId=' + employeeId).then(res => {
        if (res.data.flag) {
          this.avatarurl = res.data.data.employee.avatar
          this.username = res.data.data.employee.name
        } else {
          this.openMsg('获取用户信息失败！！')
        }
      }).catch(err => {
        console.log(err)
        this.openMsg('获取用户信息请求失败！！')
      })
    },
    openMsg (message) {
      this.$confirm(message, '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        type: 'warning'
      }).then(() => {}).catch(() => {})
    },
    goBackThing () {
      window.history.go(-1)
    },
    showTime () {
      if (this.showtime) {
        this.showtime = false
      } else {
        this.showtime = true
      }
    },
    showPlace () {
      if (this.showplace) {
        this.showplace = false
      } else {
        this.showplace = true
      }
    },
    showRule () {
      if (this.showrule) {
        this.showrule = false
      } else {
        this.showrule = true
      }
    },
    showWork () {
      if (this.showwork) {
        this.showwork = false
      } else {
        this.showwork = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .attendance{
    height:100%;
  }

  .contentbody{
    height: calc(100% - 107px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }

  .piece{
    width: 95%;
    border: 1px solid rgb(222, 222, 222);
    border-radius:10px;
    margin:auto;
    margin-top:10px;
    text-align:left;
    background-color: white;
  }
  .user{
    margin-left: 20px;
    margin-top: 10px;
    display: flex;
  }
  .titles{
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .fastyle{
    margin: auto;
    margin-right: 10px;
  }
</style>
