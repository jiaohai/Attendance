<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common">
        <i class="fa fa-floppy-o" @click="saveRule" />
      </div>
    </div>
    <div class="commonpiece" @click="toggleModal">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>规则类型</span>
        </div>
        <div class="descrip">
          <span class="spanstyle">{{ ruletpye }}</span>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <transition name="slide-fade">
      <select-modal v-if="showModal" :selection="ruletype" :titlename="'规则类型'" @gettype="getType" v-on:closeme="closeme"></select-modal>
    </transition>
    <div class="commonpiece" @click="showInputModal">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>规则名称</span>
        </div>
        <div class="descrip">
          <span class="spanstyle">{{ rulename }}</span>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="showSearchModal">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡人员</span>
        </div>
        <div class="descrip">
          <span class="spanstyle" v-for="(item, index) in attendanceData.departs" :key="'d' + index" >{{ item.name }}</span>
          <span class="spanstyle" v-for="(item, index) in attendanceData.users" :key="'u' + index" >{{ item.name }}</span>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="showDataList('fixed')" v-if="ruletpye === '固定上下班'">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡时间</span>
        </div>
        <div class="descrip" style="display: inline-flex; text-overflow: unset; overflow-x: scroll;" v-if="scheduleData.length === 0">
          <div>
            <span class="spanstyle">未设置</span>
          </div>
        </div>
        <div class="descrip" style="display: inline-flex; text-overflow: unset; overflow-x: scroll;" v-if="scheduleData.length > 0">
          <div v-for="(item, index) in scheduleData" :key="index">
            <span class="spanstyle">工作日 {{ item.day }}</span>
          </div>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="showDayModal" v-if="ruletpye === '自由上下班'">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>工作日</span>
        </div>
        <div class="descrip" style="display: inline-flex; text-overflow: unset; overflow-x: scroll;" v-if="weekDay === ''">
          <span class="spanstyle" >未设置</span>
        </div>
        <div class="descrip" style="display: inline-flex; text-overflow: unset; overflow-x: scroll;" v-if="weekDay != ''">
          <span class="spanstyle" >{{ weekDay }}</span>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" v-if="ruletpye === '按班次上下班'" @click="shiftSet">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>排班设置</span>
        </div>
        <div class="descrip" v-if="ruleData.shift.length > 0">
          <span class="spanstyle" v-for="(item, index) in ruleData.shift" :key="index" >{{ item.shiftName }}</span>
        </div>
        <div class="descrip" v-if="ruleData.shift.length === 0">
          <span class="spanstyle">未设置</span>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="position">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡位置</span>
        </div>
        <div class="descrip" style="display: inline-flex;">
          <span class="spanstyle" v-if="ruleData.places.length === 0">未设置</span>
          <span class="spanstyle" v-if="ruleData.places.length === 1">{{ ruleData.places[0].name }}</span>
          <span class="spanstyle" v-if="ruleData.places.length > 1">{{ ruleData.places[0].name }}等{{ ruleData.places.length }}个地点</span>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="editOver">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>加班规则</span>
        </div>
        <div class="descrip" style="display: inline-flex;">
          <span class="spanstyle">{{ ruleData.overTime.type }}</span>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="moreSet">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>更多设置</span>
        </div>
        <div class="descrip">
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="deleteRule" v-if="ruleData.id">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>删除</span>
        </div>
      </div>
    </div>
    <input-modal v-if="showInput" :titlename="'规则名称'" :inputtxt="rulename" @getinput="getInput" v-on:closeinput="closeInput"></input-modal>
    <search-modal v-if="showSearch" :titlename="'编辑人员'" :existlist="attendanceData" @getsearch="getSearch" v-on:closesearch="closeSearch"></search-modal>
    <mselect-modal v-if="showDay" :selection="workDay" :titlename="'工作日'" @getday="getDay" v-on:closeday="closeDay"></mselect-modal>
    <data-list v-if="showData" :titlename="'打卡时间'" :existlist="scheduleData" :dataType="typerule" @getdata="getdataList" v-on:closelist="closeDataList"></data-list>
    <shift-setting v-if="showShift" :titlename="'排班设置'" :existlist="shiftCont" :dataType="typerule" @getshift="getShift" v-on:closeshift="closeShift"></shift-setting>
    <get-position v-if="showPosition" :existlist="position" @getposition="getPosition" v-on:closeposition="closePosition"></get-position>
    <over-rule v-if="showOver" :existlist="overTime" :overType="overWork" @getover="getOver" v-on:closeover="closeOver"></over-rule>
    <more-setting v-if="showMoreset" :existlist="moreFactor" :titlename="'更多设置'" @getmore="getMoreset" v-on:closemore="closeMore"></more-setting>
  </div>
</template>

<script>

import selectModal from '../components/selectModal'
import inputModal from '../components/inputModal'
import searchModal from '../components/searchModal'
import timeModal from '../components/timeModal'
import mselectModal from '../components/mselectModal'
import dataList from '../components/dataList'
import shiftSetting from '../components/shiftSetting'
import getPosition from '../components/getPosition'
import overRule from '../components/overRule'
import moreSetting from '../components/moreSetting'

export default {
  name: 'addrule',
  data () {
    return {
      msg: '添加规则',
      ruletpye: '固定上下班',
      rulename: '上下班规则',
      typerule: 'fixed',
      showModal: false,
      showInput: false,
      showSearch: false,
      showTime: false,
      showRule: false,
      showDay: false,
      showData: false,
      showShift: false,
      showPosition: false,
      showOver: false,
      showMoreset: false,
      ruletype: [
        {
          id: 1,
          name: '固定上下班',
          desc: '所有人按照相同时间打卡',
          selected: true
        },
        {
          id: 2,
          name: '按班次上下班',
          desc: '不同人员按照各自排班打卡',
          selected: false
        },
        {
          id: 3,
          name: '自由上下班',
          desc: '无时间限制，可随时打卡，只统计矿工',
          selected: false
        }
      ],
      attendanceData: {
        departs: [],
        users: []
      },
      workDay: [
        {
          dayname: '星期一',
          ischeck: false,
          selected: false
        },
        {
          dayname: '星期二',
          ischeck: false,
          selected: false
        },
        {
          dayname: '星期三',
          ischeck: false,
          selected: false
        },
        {
          dayname: '星期四',
          ischeck: false,
          selected: false
        },
        {
          dayname: '星期五',
          ischeck: false,
          selected: false
        },
        {
          dayname: '星期六',
          ischeck: false,
          selected: false
        },
        {
          dayname: '星期日',
          ischeck: false,
          selected: false
        }
      ],
      weekDay: '',
      workTime: [
        {
          name: '时间段一',
          starttime: '09:00',
          endtime: '18:00'
        }
      ],
      restTime: [
        {
          name: 'rest',
          starttime: '12:00',
          endtime: '13:00'
        }
      ],
      overWork: [
        {
          name: '以加班申请为准',
          value: 0,
          desc: '加班申请通过后，直接记录为加班时长',
          selected: false
        },
        {
          name: '以打卡时间为准',
          value: 1,
          desc: '根据打卡时间自动计算加班时长',
          selected: false
        },
        {
          name: '以加班申请核算打卡记录',
          value: 2,
          desc: '打卡后，根据加班申请核算加班时长',
          selected: false
        }
      ],
      overTime: {
        type: '以加班申请为准',
        dayWork: {
          isOver: false,
          maxTime: 240,
          minTime: 60,
          startTime: 30,
          restType: {
            name: '不扣除', // 指定休息时间，按加班时长扣除
            restTime: {
              startTime: '12:00',
              endTime: '13:00'
            },
            deduction: [
              {
                name: '扣除条件1',
                overHour: 300,
                delHour: 30
              }
            ]
          }
        },
        holiday: {
          isOver: false,
          maxTime: 240,
          minTime: 60,
          restType: {
            name: '不扣除', // 指定休息时间，按加班时长扣除
            restTime: {
              startTime: '12:00',
              endTime: '13:00'
            },
            deduction: [
              {
                name: '扣除条件1',
                overHour: 300,
                delHour: 30
              }
            ]
          }
        }
      },
      workPlace: [
        {
          name: '木星'
        },
        {
          name: '火星'
        }
      ],
      scheduleData: [],
      shiftData: [],
      shiftCycle: [],
      shiftRule: [],
      shiftCont: {},
      rulePosition: [],
      moreFactor: {
        reportTo: [],
        whitelist: [],
        remind: {
          workRemind: 0,
          offWorkRemind: 0
        },
        hspDay: {
          ruletype: '',
          isHolidayClock: true,
          notClockDay: [
            {
              day: '',
              desc: ''
            }
          ],
          clockDay: [
            {
              day: '',
              desc: '',
              workTime: [
                {
                  name: '',
                  startTime: '',
                  endtime: ''
                }
              ]
            }
          ]
        },
        isApplyRcard: true,
        rcardTimeLimit: 0,
        rcardCount: 0,
        workBorder: '12:00'
      },
      ruleData: {
        id: null,
        ruleName: '',
        ruleType: '固定上下班',
        workDay: '',
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
                startTime: '14:49',
                endTime: '14:49'
              }
            ]
          }
        ],
        shift: [
          {
            id: null,
            restStart: '12:00',
            shiftName: '',
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
        shiftCycle: [
          {
            id: null,
            name: '',
            dayInfo: {
              dayName: 1,
              shift: null,
              isRest: 0,
              id: null
            }
          }
        ],
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
        attendance: {
          users: [],
          departs: []
        },
        overTime: {
          id: null,
          type: '以加班申请为准',
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
        supervisors: [],
        whiteList: [],
        special: {
          id: null,
          holiday: 1,
          noAttendanceDay: [],
          attendanceDay: []
        },
        remind: 0,
        offWorkRemind: 10,
        workRemind: 10,
        lateSign: 1,
        expiration: 0,
        lateSignCount: 30,
        split: '12:00'
      }
    }
  },
  created: function () {
    this.initData()
  },
  beforeCreate: function () {
    // this.initData()
  },
  components: {
    selectModal,
    inputModal,
    searchModal,
    timeModal,
    dataList,
    shiftSetting,
    mselectModal,
    getPosition,
    overRule,
    moreSetting
  },
  methods: {
    initData () {
      let ruleInfo = this.$route.params.editData
      if (ruleInfo.id === null) {
        this.ruleData = this.$route.params.editData
        this.ruletpye = this.ruleData.ruleType
        this.rulename = this.ruleData.ruleName
        this.attendanceData = this.ruleData.attendance
        this.weekDay = this.ruleData.workDay
        this.scheduleData = this.ruleData.schedule
        this.shiftData = this.ruleData.shift
        this.shiftCycle = this.ruleData.shiftCycle
        this.moreFactor = {
          supervisors: this.ruleData.supervisors,
          whiteList: this.ruleData.whiteList,
          remind:{
            workRemind: this.ruleData.workRemind,
            offWorkRemind: this.ruleData.offWorkRemind
          },
          special: this.ruleData.special,
          lateSign: this.ruleData.lateSign,
          expiration: this.ruleData.expiration,
          lateSignCount: this.ruleData.lateSignCount,
          workBorder: this.ruleData.split
        }
      } else {
        this.$axios.get('/api/rule/findRuleInfo/' + ruleInfo.id).then(res => {
          if (res.data.flag) {
            this.ruleData = res.data.data
            this.ruletpye = this.ruleData.ruleType
            this.rulename = this.ruleData.ruleName
            this.attendanceData = this.ruleData.attendance
            this.weekDay = this.ruleData.workDay
            this.scheduleData = this.ruleData.schedule
            this.shiftData = this.ruleData.shift
            this.shiftCycle = this.ruleData.shiftCycle
            this.moreFactor = {
              supervisors: this.ruleData.supervisors,
              whiteList: this.ruleData.whiteList,
              remind:{
                workRemind: this.ruleData.workRemind,
                offWorkRemind: this.ruleData.offWorkRemind
              },
              special: this.ruleData.special,
              lateSign: this.ruleData.lateSign,
              expiration: this.ruleData.expiration,
              lateSignCount: this.ruleData.lateSignCount,
              workBorder: this.ruleData.split
            }
          }
          console.log(res)
        })
      }
      this.getTypeRule()
    },
    getTypeRule () {
      if (this.ruletpye === '固定上下班') {
        this.typerule = 'fixed'
      }
      if (this.ruletpye === '按班次上下班') {
        this.typerule = 'shift'
      }
    },
    goBackThing () {
      this.$router.push('/rule')
    },
    saveRule () {
      this.ruleData.ruleType = this.ruletpye
      this.ruleData.ruleName = this.rulename
      this.ruleData.attendance = this.attendanceData
      if (this.typerule === 'fixed') {
        this.ruleData.workDay = ''
        this.ruleData.schedule = this.scheduleData
        this.ruleData.shfit = []
        this.ruleData.shiftCycle = []
      } else if (this.typerule === 'shift') {
        this.ruleData.workDay = ''
        this.ruleData.schedule = []
        this.ruleData.shfit = this.shiftData
        this.ruleData.shiftCycle = this.shiftCycle
      } else if (this.typerule === 'free') {
        this.ruleData.workDay = this.weekDay
        this.ruleData.schedule = []
        this.ruleData.shfit = []
        this.ruleData.shiftCycle = []
      }
      this.ruleData.workDay = this.weekDay
      this.ruleData.schedule = this.scheduleData
      this.ruleData.shfit = this.shiftData
      this.ruleData.shiftCycle = this.shiftCycle
      console.log(this.ruleData)
      if (this.ruleData.id) {
        console.log('update rule')
        this.$axios.put('/api/rule/update/', this.ruleData).then(res => {
          if (res.data.flag) {
            alert('修改成功')
            this.$router.push('/rule')
          }
          console.log(res)
        })
      } else {
        console.log('create rule')
        this.$axios.post('/api/rule/add/', this.ruleData).then(res => {
          if (res.data.flag) {
            alert('新建成功')
            this.$router.push('/rule')
          }
          console.log(res)
        })
      }
    },
    deleteRule () {
      console.log('delete rule')
      this.$axios.delete('/api/rule/delete/' + this.ruleData.id).then(res => {
        if (res.data.flag) {
          alert('删除成功')
          this.$router.push('/rule')
        }
        console.log(res)
      })
    },
    goSearch () {
      this.$router.push('/search')
    },
    toggleModal: function () {
      this.showModal = !this.showModal
    },
    getType (msg) {
      this.ruletpye = msg
      if (msg === '固定上下班') {
        this.typerule = 'fixed'
      } else if (msg === '按班次上下班') {
        this.typerule = 'shift'
      } else if (msg === '自由上下班') {
        this.typerule = 'free'
      }
    },
    closeme: function () {
      this.showModal = !this.showModal
    },
    showInputModal: function () {
      this.showInput = !this.showInput
    },
    getInput (msg) {
      this.rulename = msg
    },
    closeInput: function () {
      this.showInput = !this.showInput
    },
    showSearchModal: function () {
      this.showSearch = !this.showSearch
    },
    getSearch (msg) {
      this.attendanceData = msg
    },
    closeSearch: function () {
      this.showSearch = !this.showSearch
    },
    showTimeModal: function () {
      this.showTime = !this.showTime
    },
    getTime (msg) {
      this.workDay = msg.day
      this.workTime = msg.time
      this.restTime = msg.rest
    },
    closeTimeModal: function () {
      this.showTime = !this.showTime
    },
    showDayModal () {
      // this.weekDay = '星期一 星期二 星期三 星期四 星期五'
      let dayList = this.weekDay.split(' ')
      for (let i = 0; i < this.workDay.length; i++) {
        if (dayList.indexOf(this.workDay[i].dayname) !== -1) {
          this.workDay[i].ischeck = true
        }
      }
      this.showDay = !this.showDay
    },
    getDay (msg) {
      this.workDay = msg
      var weekDayStr = ''
      for (let i = 0; i < this.workDay.length; i++) {
        if (this.workDay[i].ischeck) {
          weekDayStr = weekDayStr + ' ' + this.workDay[i].dayname
        }
      }
      this.weekDay = weekDayStr
    },
    closeDay () {
      this.showDay = !this.showDay
    },
    showDataList (type) {
      this.typerule = type
      this.showData = !this.showData
    },
    getdataList (msg) {
      this.scheduleData = msg
    },
    closeDataList () {
      this.showData = !this.showData
    },
    position () {
      this.showPosition = !this.showPosition
    },
    getPosition (msg) {
      this.rulePosition = msg
    },
    closePosition () {
      this.showPosition = !this.showPosition
    },
    shiftSet () {
      this.typerule = 'shfit'
      this.shiftCont = {
        shiftlist: this.shiftData,
        shiftcycle: this.shiftCycle,
        shiftrule: this.shiftRule
      }
      console.log(this.shiftCont)
      this.showShift = !this.showShift
    },
    getShift (msg) {
      this.shiftData = msg.shiftlist
      this.shiftCycle = msg.shiftcycle
      this.shiftRule = msg.shiftrule
    },
    closeShift () {
      this.showShift = !this.showShift
    },
    editOver () {
      for (let i = 0; i < this.overWork.length; i++) {
        if (this.overWork[i].name === this.ruleData.overTime.type) {
          this.overWork[i].selected = true
        }
      }
      this.showOver = !this.showOver
    },
    getOver (msg) {
      this.ruleData.overTime = msg
    },
    closeOver () {
      this.showOver = !this.showOver
    },
    moreSet () {
      this.showMoreset = !this.showMoreset
    },
    getMoreset (msg) {
      this.moreFactor = msg
    },
    closeMore () {
      this.showMoreset = !this.showMoreset
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

  .commonpiece{
    width: 100%;
    margin:auto;
    margin-top:10px;
    text-align:left;
    background-color: white;
  }
  .titles{
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 20%
  }
  .descrip{
    width: calc(75% - 20px);
    text-align: right;
    margin: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .fastyle{
    margin: auto 1px auto auto;
    width: 5%
  }
  .spanstyle{
    margin: auto;
    margin-right: 10px;
    font-size: small;
    color:rgb(165, 165, 165);
  }
</style>
