<template>
  <div class="attendance" style="height: 100%">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common">
        <i class="fa fa-plus" @click="goAddRule(newData)" />
      </div>
    </div>
    <div v-if="ruledata.length === 0">
      <span>没有打卡规则，请添加打卡规则</span>
    </div>
    <div class="contentbody" style="height: calc(100% - 86px);">
      <div class="uncommonpiece" v-for="item in ruledata" :key="item.id" @click="goAddRule(item)">
        <div class="rulecotent">
          <span class="contentspan">{{ item.ruleName }}</span>
          <span class="contentspan secondspan" v-if="item.ruleType === '固定上下班'">
            时间
            <span v-for="(itmes, index) in item.schedule" :key="index + 's'">{{ itmes.workTime[0].startTime }} ~ {{ itmes.workTime[0].endTime }}</span>
          </span>
          <span class="contentspan secondspan" v-if="item.ruleType === '按班次上下班'">
            班次
            <span v-for="(itmef, index) in item.shift" :key="index + 'f'">{{ itmef.name }}</span>
          </span>
          <span class="contentspan secondspan" v-if="item.ruleType === '自由上下班'">
            工作日 {{ item.workDay }}</span>
          <span class="contentspan secondspan" v-if="item.places.length === 0">位置 未设置</span>
          <span class="contentspan secondspan" v-if="item.places.length > 0">位置 {{ item.places[0].name }}</span>
        </div>
        <div class="rightside">
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
    </div>
    <div class="bottoming">
      <button class="clock-in bottomchildre" :class="$route.path.indexOf('check') !== -1 ? 'colortext' : 'colorcommon' " v-if="showcheck" @click="gocheck">
        <i class="fa fa-map-marker" />
        <span>打卡</span>
      </button>
      <button class="statistics bottomchildre" :class="$route.path.indexOf('statistics') !== -1 ? 'colortext' : 'colorcommon' " v-if="showstatistics" @click="gostatistics">
        <i class="fa fa-pie-chart" />
        <span>统计</span>
      </button>
      <button class="rule bottomchildre" :class="$route.path.indexOf('rule') !== -1 ? 'colortext' : 'colorcommon' " v-if="showrule" @click="gorule">
        <i class="fa fa-sliders " />
        <span>规则</span>
      </button>
      <button class="setting bottomchildre" :class="$route.path.indexOf('addadmin') !== -1 ? 'colortext' : 'colorcommon' " v-if="showsetting" @click="gosetting">
        <i class="fa fa-cog" />
        <span>设置</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rule',
  data () {
    return {
      msg: '规则',
      showcheck: true,
      showstatistics: true,
      showrule: true,
      showsetting: true,
      ruledata: [],
      newData: {
        id: null,
        ruleName: '',
        ruleType: '固定上下班',
        lateSign: 1,
        expiration: '不限制',
        lateSignCount: 30,
        remind: 0,
        offWorkRemind: null,
        workRemind: '十分钟',
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
                startTime: '08:00',
                endTime: '18:00'
              }
            ]
          }
        ],
        shift: [
          {
            id: null,
            restStart: '12:00',
            name: '',
            restEnd: '14:00',
            workTime: [
              {
                id: null,
                startTime: '08:00',
                endTime: '18:00'
              }
            ]
          }
        ],
        shiftCycle: [],
        shiftRule: [],
        places: [
          {
            id: '',
            name: '',
            location: '',
            longtitude: null,
            latitude: null,
            range: '300',
            ruleId: null
          }
        ],
        whiteList: [],
        attendance: {
          users: [],
          departs: []
        },
        supervisors: []
      }
    }
  },
  created: function () {
    this.getInit()
  },
  methods: {
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
      this.$router.push('/check')
    },
    gostatistics () {
      this.$router.push('/statistics')
    },
    gorule () {
      this.$router.push('/rule')
    },
    gosetting () {
      this.$router.push('/addadmin')
    },
    getInit () {
      this.$axios.get('/api/rule/ruleList').then(res => {
        if (res.data.flag) {
          this.ruledata = res.data.data
        }
        console.log(res)
      })
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
    background: white;
    outline: none;
  }

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
    width: calc(80% - 20px);
  }
  .rightside{
    width: 20%;
    text-align: right;
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

  .bottoming {
    position:fixed;
    display:flex;
    flex:0;
    width:100%;
    height:40px;
    bottom:0px;
    background-color:white;
  }
  .bottomchildre{
    display: grid;
    margin-top:5px;
    width: 100%;
  }
  .colortext{
    color: rgb(26, 138, 190);
  }
  .colorcommon{
    color: rgb(170, 170, 170);
  }
</style>
