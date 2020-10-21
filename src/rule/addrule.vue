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
          <span class="spanstyle">{{ ruleData.ruleType }}</span>
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
          <span class="spanstyle">{{ ruleData.ruleName }}</span>
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
          <span class="spanstyle" v-for="(item, index) in ruleData.DepartmentAndUser" :key="index" >{{ item.name }}</span>
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="showDataList('fixed')" v-if="ruletpye === '固定上下班'">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡时间</span>
        </div>
        <div class="descrip" style="display: inline-flex; text-overflow: unset; overflow-x: scroll;">
          <!-- <span class="spanstyle">工作日 {{ workTime[0].starttime }}~{{ workTime[0].endtime }}</span> -->
          <div v-for="(item, index) in ruleData.attendceTime.workTime" :key="index">
            <span class="spanstyle">工作日 {{ item.starttime }}~{{ item.endtime }}</span>
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
        <div class="descrip" style="display: inline-flex; text-overflow: unset; overflow-x: scroll;" >
          <span class="spanstyle" >{{ ruleData.attendceTime.weekDay }}</span>
          <!-- <div v-for="(item, index) in workDay" :key="index">
            <span class="spanstyle" v-if="item.ischeck" >{{ item.dayname }}</span>
          </div> -->
        </div>
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" v-if="ruletpye === '按班次上下班'" @click="shiftSet">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>排班设置</span>
        </div>
        <div class="descrip" v-if="ruleData.attendceTime.shiftList.length > 0">
          <span class="spanstyle" v-for="(item, index) in ruleData.attendceTime.shiftList" :key="index" >{{ item.name }}</span>
        </div>
        <div class="descrip" v-if="ruleData.attendceTime.shiftList.length === 0">
          <span class="spanstyle">未设置</span>
        </div>
        <!-- <div class="descrip">
          <span class="spanstyle"></span>
        </div> -->
        <i class="fa fastyle fa-angle-right" />
      </div>
    </div>
    <div class="commonpiece" @click="position">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡位置</span>
        </div>
        <div class="descrip" style="display: inline-flex;">
          <span class="spanstyle" v-if="ruleData.attendceTime.position.length === 0">未设置</span>
          <span class="spanstyle" v-if="ruleData.attendceTime.position.length === 1">{{ ruleData.attendceTime.position[0].name }}</span>
          <span class="spanstyle" v-if="ruleData.attendceTime.position.length > 1">{{ ruleData.attendceTime.position[0].name }}等{{ ruleData.attendceTime.position.length }}个地点</span>
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
          <span class="spanstyle">{{ ruleData.attendceTime.overTime.type }}</span>
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
    <input-modal v-if="showInput" :titlename="'规则名称'" :inputtxt="rulename" @getinput="getInput" v-on:closeinput="closeInput"></input-modal>
    <search-modal v-if="showSearch" :titlename="'打卡人员列表'" :showAdd="isexist" :existlist="existlist" @getsearch="getSearch" v-on:closesearch="closeSearch"></search-modal>
    <mselect-modal v-if="showDay" :selection="workDay" :titlename="'工作日'" @getday="getDay" v-on:closeday="closeDay"></mselect-modal>
    <data-list v-if="showData" :titlename="'打卡时间'" :existlist="workRule" :dataType="typerule" @getdata="getdataList" v-on:closelist="closeDataList"></data-list>
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
      isexist: true,
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
      // existlist: []
      existlist: [
        {
          name: '部门二',
          isdepantment: true,
          ischecked: true,
          id: 2
        },
        {
          name: '员工一',
          isdepantment: false,
          ischecked: true,
          di: 3
        },
        {
          name: '员工二',
          isdepantment: false,
          ischecked: true,
          id: 4
        }
      ],
      workDay: [
        {
          dayname: '星期一',
          ischeck: true
        },
        {
          dayname: '星期二',
          ischeck: true
        },
        {
          dayname: '星期三',
          ischeck: true
        },
        {
          dayname: '星期四',
          ischeck: true
        },
        {
          dayname: '星期五',
          ischeck: true
        },
        {
          dayname: '星期六',
          ischeck: false
        },
        {
          dayname: '星期日',
          ischeck: false
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
      overWork: [
        {
          name: '以加班申请为准',
          desc: '加班申请通过后，直接记录为加班时长',
          selected: true
        },
        {
          name: '以打卡时间为准',
          desc: '根据打卡时间自动计算加班时长',
          selected: false
        },
        {
          name: '以加班申请核算打卡记录',
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
      workRule: [],
      shiftList: [],
      shiftCycle: [],
      shiftRule: [],
      shiftCont: {},
      rulePosition: [],
      ruleData: {}
    }
  },
  created: function () {
    this.initData()
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
      this.ruleData = this.$route.params.editData
      this.ruletpye = this.ruleData.ruleType
    },
    goBackThing () {
      this.$router.push('/rule')
    },
    // goMoreRule () {
    //   this.$router.push('/morerule')
    // },
    saveRule () {
      alert('保存数据')
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
      }
      if (msg === '按班次上下班') {
        this.typerule = 'shift'
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
      console.log(this.existlist)
      console.log(this.existlist.length)
      if (this.existlist.length === 0) {
        this.isexist = true
      } else {
        this.isexist = false
      }
      this.showSearch = !this.showSearch
    },
    getSearch (msg) {
      this.existlist = msg
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
      this.showDay = !this.showDay
    },
    getDay (msg) {
      this.workDay = msg
    },
    closeDay () {
      this.showDay = !this.showDay
    },
    showDataList (type) {
      this.typerule = type
      this.workRule = []
      var weektime = ''
      for (let i = 0; i < this.workDay.length; i++) {
        if (this.workDay[i].ischeck) {
          weektime = weektime + ' ' + this.workDay[i].dayname
        }
      }
      // if (type === 'shift') {
      //   this.workRule.push({
      //     shiftName: '白班',
      //     workTime: this.workTime,
      //     restTime: this.restTime
      //   })
      // }
      this.workRule.push({
        weekDay: weektime,
        workTime: this.workTime,
        restTime: this.restTime
      })
      this.showData = !this.showData
    },
    getdataList (msg) {
      this.workRule = msg
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
        shiftlist: this.shiftList,
        shiftcycle: this.shiftCycle,
        shiftrule: this.shiftRule
      }
      this.showShift = !this.showShift
    },
    getShift (msg) {
      this.shiftList = msg.shiftlist
      this.shiftCycle = msg.shiftcycle
      this.shiftRule = msg.shiftrule
    },
    closeShift () {
      this.showShift = !this.showShift
    },
    editOver () {
      this.showOver = !this.showOver
    },
    getOver (msg) {
      this.overTime = msg
    },
    closeOver () {
      this.showOver = !this.showOver
    },
    moreSet () {
      this.moreFactor = this.ruleData.moreFactor
      this.showMoreset = !this.showMoreset
    },
    getMoreset (msg) {
      this.ruleData.moreFactor = msg
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
