<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
    </div>
    <div class="piece">
      <div class="user">
        <img :src="avatarurl" width="35" height="35" />
<!--        <el-avatar :src="avatarurl"></el-avatar>-->
        <span style="padding-left: 20px;margin-top: 5px;position: absolute;font-weight: bold">{{ username }}</span>
      </div>
      <span style="margin-left: 20px; padding-bottom: 10px; display: block;">打卡规则：{{ rulename }}</span>
    </div>
    <div class="piece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡时间</span>
        </div>
        <i class="fa fastyle fa-chevron-down" v-if="!showtime" @click="showTime" />
        <i class="fa fastyle fa-chevron-up" v-if="showtime" @click="showTime" />
      </div>
      <div class="content" v-if="showtime">
        <hr style="margin: auto; margin-left: 20px; margin-right: 10px;"/>
        <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
          <span>上下班时间</span>
          <div class="svgplace" style="margin-top: 10px;">
            <span>{{ worktime }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="piece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡范围</span>
        </div>
        <i class="fa fastyle fa-chevron-down" v-if="!showplace" @click="showPlace" />
        <i class="fa fastyle fa-chevron-up" v-if="showplace" @click="showPlace" />
      </div>
      <div class="content" v-if="showplace">
        <hr style="margin: auto; margin-left: 20px; margin-right: 10px;" />
        <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
          <span>打卡地点</span>
          <div class="svgplace" style="margin-top: 10px;" v-for="(item, index) in places" :key="index">
            <i class="fa fa-map-marker" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="piece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>加班规则</span>
        </div>
        <i class="fa fastyle fa-chevron-down" v-if="!showwork" @click="showWork" />
        <i class="fa fastyle fa-chevron-up" v-if="showwork" @click="showWork" />
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
          <span>更多规则</span>
        </div>
        <i class="fa fastyle fa-chevron-down" v-if="!showrule" @click="showRule" />
        <i class="fa fastyle fa-chevron-up" v-if="showrule" @click="showRule" />
      </div>
      <div class="content" v-if="showrule">
        <hr style="margin: auto; margin-left: 20px; margin-right: 10px;" />
        <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
          <span>{{ ruleinfo }}</span>
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
      username: '待传入',
      worktime: '具体的上下班时间',
      place: '设置的打卡地点',
      workout: '加班方式，时间以什么为准',
      ruleinfo: '打卡规则中一些注意的事项，提醒员工，与以说明，避免一些特殊情况让员工感到困惑，从而影响打卡',
      showtime: true,
      showplace: true,
      showrule: true,
      showwork: true,
      places: []
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
      findRuleInfoByRuleId(this.$cookieStore.getCookie('ruleId')).then(res => {
        // debugger
        console.log(res.data.data)
        // 回填数据
        let this_ = this
        let employeeId = sessionStorage.getItem('userId')
        let tmp = res.data.data
        // 员工头像 用户名
        this_.checkUser(employeeId, tmp.attendance.users)
        this.rulename = tmp.ruleName
        // 打卡时间
        this.worktime = tmp.schedule[0].day + '  ' + tmp.schedule[0].workTime[0].startTime + '-' + tmp.schedule[0].workTime[0].endTime
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
      })
    },
    // 给头像，员工名赋值
    checkUser (employeeId, arr) {
      for (let item in arr) {
        if (arr[item].employeeId === employeeId){
          this.avatarurl = arr[item].avatar
          this.username = arr[item].name
          break
        }
      }
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
    width:90%;
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
