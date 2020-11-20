<template>
  <div class="attendance" style="height: 100%">
    <div class="heading">
      <div class="title" style="align-items:center;">{{ msg }}</div>
      <div class="opete" style="align-items:center;">
        <button @click="goAddRule(newData)" >创建</button>
        <!-- <button @click="goBackThing" >返回</button> -->
      </div>
    </div>
    <hr style="margin-top: 0px"/>
    <div class="contentbody" style="height: calc(100% - 86px);" v-if="isLoad">
      <el-main v-loading="isLoad" style="height: 100%;"></el-main>
    </div>
    <div class="contentbody" style="height: calc(100% - 86px);" v-show="!isLoad">
      <div class="uncommonpiece" v-if="ruledata.length === 0">
        <div class="rulecotent">
          <span class="contentspan">没有打卡规则，请添加打卡规则</span>
        </div>
      </div>
      <div class="uncommonpiece" v-for="(item, index) in ruledata" :key="index + 'r'" @click="goAddRule(item)">
        <div class="rulecotent">
          <span class="contentspan">{{ item.ruleName }}</span>
          <span class="contentspan secondspan" v-if="item.ruleType === '固定上下班'">
            时间
            <span v-for="(itmes, index1) in item.schedule" :key="index1 + 's'">{{ itmes.workTime[0].startTime }} ~ {{ itmes.workTime[0].endTime }}</span>
          </span>
          <span class="contentspan secondspan" v-if="item.ruleType === '按班次上下班'">
            班次
            <span v-for="(itmef, index2) in item.shift" :key="index2 + 'f'">{{ itmef.name }}</span>
          </span>
          <span class="contentspan secondspan" v-if="item.ruleType === '自由上下班'">
            工作日 {{ item.workDay }}</span>
          <span class="contentspan secondspan" v-if="item.places.length === 0">位置 未设置</span>
          <span class="contentspan secondspan" v-if="item.places.length > 0">位置 {{ item.places[0].name }}</span>
        </div>
        <div class="rightside">
          <i class="fa fa-angle-right" />
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
        <span>考勤组</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rule',
  data () {
    return {
      userId: null,
      authority: null,
      msg: '规则',
      showcheck: true,
      showstatistics: true,
      showrule: true,
      showsetting: true,
      isLoad: true,
      ruledata: [],
      newData: {
        id: null,
        ruleName: '',
        ruleType: '固定上下班',
        lateSign: 1,
        expiration: 0,
        lateSignCount: 30,
        remind: 0,
        offWorkRemind: 0,
        workRemind: 0,
        split: '12:00',
        workDay: '',
        overTime: {
          id: null,
          type: '按打卡时间',
          starTtime: null,
          shortest: null,
          longest: null,
          restStart: null,
          restEnd: null,
          ruleId: null,
          deductionName: null,
          overHour: null,
          deductHour: null
        },
        special: {
          id: null,
          holiday: 1,
          noAttendanceDay: [
            {
              date: '',
              reason: '',
              id: null,
              type: 0
            }
          ],
          attendanceDay: [
            {
              date: '',
              reason: '',
              id: null,
              type: 1,
              workTime: [
                {
                  id: '',
                  startTime: '08:00',
                  endTime: '18:00',
                  target: null,
                  scheduleId: 0,
                  overWorkId: 0,
                  shiftId: 0
                }
              ]
            }
          ]
        },
        schedule: [
          {
            id: null,
            restStart: '12:00',
            day: '星期一 星期二 星期三 星期四 星期五',
            restEnd: '14:00',
            workTime: [
              {
                id: null,
                name: 1,
                startTime: '08:00',
                endTime: '18:00'
              }
            ]
          }
        ],
        shift: [
          // {
          //   id: null,
          //   restStart: '12:00',
          //   name: '',
          //   restEnd: '14:00',
          //   workTime: [
          //     {
          //       id: null,
          //       startTime: '08:00',
          //       endTime: '18:00'
          //     }
          //   ]
          // }
        ],
        shiftCycle: [],
        shiftRule: [],
        places: [],
        whiteList: [],
        attendance: {
          users: [],
          departs: []
        },
        supervisors: []
      },
      showfoot: false,
      showS: false,
      showR: false,
      showA: false
    }
  },
  created: function () {
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
    this.getInit()
  },
  methods: {
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
    goAddRule (item) {
      this.$router.push({
        name: 'addrule',
        params: {
          editData: item
        }
      })
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
    getInit () {
      this.$axios.get('/api/rule/ruleList?creatorId=' + this.userId).then(res => {
        if (res.data.flag) {
          this.ruledata = res.data.data
          this.isLoad = false
        } else {
          this.openMsg(res.data.msg)
          this.isLoad = false
        }
      }).catch(error => {
        console.log(error)
        this.openMsg('发送请求失败！')
        this.isLoad = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contentbody{
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: scroll;
    overflow-x: hidden;
    /* position: relative; */
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
    text-align: center;
    margin: auto;
  }
  .fastyle{
    margin-top:53%;
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
</style>
