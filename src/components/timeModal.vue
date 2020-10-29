<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
          <div class="more common" @click="saveData">
          <span>确定</span>
        </div>
      </div>
      <div class="contentbody"  v-if="dataType === 'fixed' || dataType === 'shift'">
        <div class="commonpiece" @click="showDayModal" v-if="dataType === 'fixed'">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>工作日</span>
            </div>
            <div class="descrip" style="display: inline-flex; text-overflow: unset; overflow-x: scroll;" >
              <span class="spanstyle">{{ tempData.day }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece" @click="showInputShift" v-if="dataType === 'shift'">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>班次名称</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ tempData.shiftName }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece" v-for="(item, index) in tempData.workTime" :key="index">
          <div class="delitem">
            <span style="margin: auto auto auto 20px; font-size: small;" v-if="tempData.workTime.length === 1">上下班时间段</span>
            <span style="margin: auto auto auto 20px; font-size: small;" v-if="tempData.workTime.length > 1">上下班时间段{{ item.name }}</span>
            <span style="margin: auto 10px auto auto; font-size: small;" v-if="tempData.workTime.length > 1" @click="delWorkTime(item)">删除</span>
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="showTimeModal(item, 'start')">
            <div class="titles">
              <span>上班</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ item.startTime }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="showTimeModal(item, 'end')">
            <div class="titles">
              <span>下班</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ item.endTime }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%;" v-if="index === tempData.workTime.length - 1" @click="addWorkTime">
            <i class="fa fa-plus" style="font-size: large; margin: auto 0px 5px 25px;"/>
            <span style="padding-left: 10px;margin: auto 0px 5px 0px;;">添加</span>
          </div>
        </div>
        <div class="commonpiece" v-if="tempData.workTime.length === 1">
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="titles">
              <span>休息时间</span>
            </div>
            <i class="fa fastyle fa-toggle-on" style="margin-right: 5%" v-if="editRtime" @click="openRest"/>
            <i class="fa fastyle fa-toggle-off" style="margin-right: 5%" v-if="!editRtime" @click="openRest"/>
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" v-if="editRtime" @click="showTimeModal(restTime, 'start')">
            <div class="titles">
              <span>开始</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ restTime.startTime }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" v-if="editRtime" @click="showTimeModal(restTime, 'end')">
            <div class="titles">
              <span>结束</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ restTime.endTime }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
      </div>
      <div class="contentbody"  v-if="dataType === 'cycle'">
        <div class="commonpiece" @click="showInputShift">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>周期名称</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ tempData.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece">
          <div class="delitem">
            <span style="margin: auto auto auto 20px; font-size: small;">周期天数</span>
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" v-for="(item, index) in tempData.dayInfo" :key="index" @click="editCycle(item)">
            <div class="titles">
              <span>第{{ item.dayName }}天</span>
            </div>
            <div class="descrip">
              <span class="spanstyle" v-if="item.isRest === 0 && !item.shift">未设置</span>
              <span class="spanstyle" v-if="item.isRest === 1">休息</span>
              <span class="spanstyle" v-if="item.shift">{{ item.shift.shiftName }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%;" @click="addCycleInfo">
            <i class="fa fa-plus" style="font-size: large; margin: auto 0px 5px 25px;"/>
            <span style="padding-left: 10px;margin: auto 0px 5px 0px;;">添加</span>
          </div>
        </div>
      </div>
    </div>
    <time-picker v-if="showEditTime" :hourInfo="editHour" :minuteInfo="editMinute" @savetime="getEditTime" v-on:closepicker="closeTime"></time-picker>
    <mselect-modal v-if="showDay" :selection="workDay" :titlename="'工作日'" @getday="getDay" v-on:closeday="closeDay"></mselect-modal>
    <input-modal v-if="inputName" :titlename="'班次名称'" :inputtxt="initInput" @getinput="getShiftName" v-on:closeinput="closeInputShift"></input-modal>
    <slide-select v-if="showCycle" :selection="shiftList" :optionList="cycleOption" @saveslide="getCycle" v-on:closeslide="closeCycle"></slide-select>
  </div>
</template>

<script>

import mselectModal from '../components/mselectModal'
import timePicker from '../components/timePicker'
import inputModal from '../components/inputModal'
import slideSelect from '../components/slideSelect'

export default {
  name: 'timeModal',
  props: {
    parentData: {
      type: Object,
      default: () => {}
    },
    workRule: {
      type: Array,
      default: () => []
    },
    dataselect: {
      type: Array,
      default: () => []
    },
    dataType: {
      type: String,
      default: 'fixed'
    },
    cycleName: {
      type: String,
      default: '未设置'
    }
  },
  data () {
    return {
      titlename: '编辑打卡时间',
      overTime: [
        {
          worktype: '以加班申请为准',
          des: '加班申请通过后，直接记录为加班时长'
        },
        {
          worktype: '以打卡时间为准',
          des: '根据打卡时间自动计算加班时长'
        },
        {
          worktype: '以加班申请核算打卡记录',
          des: '打卡后，根据加班申请核算加班时长'
        }
      ],
      editRtime: true,
      showDay: false,
      editTime: null,
      editTimeType: '',
      inputName: false,
      showEditTime: false,
      showCycle: false,
      tempData: this.parentData,
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
      workTime: [],
      restTime: {},
      cycleInfo: [],
      cycleOption: [],
      selectedInfo: null,
      shiftList: [],
      initInput: '',
      editHour: '00',
      editMinute: '00'
    }
  },
  created: function () {
    this.initPage()
  },
  components: {
    mselectModal,
    inputModal,
    timePicker,
    slideSelect
  },
  methods: {
    initPage () {
      if (this.dataType === 'cycle') {
        this.shiftList.push({shiftName: '休息'})
        this.cycleOption.push('休息')
        for (let i = 0; i < this.dataselect.length; i++) {
          this.cycleOption.push(this.dataselect[i].shiftName)
          this.shiftList.push(this.dataselect[i])
        }
      } else {
        this.workTime = this.parentData.workTime
        this.restTime = {
          name: 'rest',
          startTime: this.tempData.restStart,
          endTime: this.tempData.restEnd
        }
      }
    },
    openRest () {
      this.editRtime = !this.editRtime
    },
    closeSelf () {
      this.$emit('closetime')
    },
    saveData () {
      console.log(this.tempData)
      this.$emit('gettime', this.tempData)
      this.closeSelf()
    },
    addWorkTime () {
      let startHour = ''
      let endHour = ''
      let timeStart = this.tempData.workTime[this.tempData.workTime.length - 1].endTime.split(':')[0]
      let timeInt = parseInt(timeStart)
      let minInt = timeInt + 1
      let endTimeInt = timeInt + 2
      if (timeInt === 0) {
        alert('时间不能超过当天24点')
        return
      } else if (timeInt === 23) {
        minInt = 23
        startHour = '23:01'
        endHour = '00:00'
      } else if (timeInt === 22) {
        startHour = '23:00'
        endHour = '00:00'
      } else {
        startHour = minInt < 10 ? ('0' + minInt + ':' + '00') : (minInt + ':' + '00')
        endHour = endTimeInt < 10 ? ('0' + endTimeInt + ':' + '00') : (endTimeInt + ':' + '00')
      }
      this.tempData.workTime.push({name: this.tempData.workTime.length + 1, startTime: startHour, endTime: endHour})
      console.log(this.tempData.workTime)
    },
    delWorkTime (item) {
      let tempWorData = []
      for (let i = 0; i < this.tempData.workTime.length; i++) {
        if (this.tempData.workTime[i].name !== item.name) {
          tempWorData.push({
            name: tempWorData.length + 1,
            startTime: this.tempData.workTime[i].startTime,
            endTime: this.tempData.workTime[i].endTime
          })
        }
      }
      this.tempData.workTime = tempWorData
    },
    addCycleInfo () {
      var cyclename = this.tempData.dayInfo.length + 1
      this.tempData.dayInfo.push({
        dayName: cyclename,
        shift: null,
        isRest: 0
      })
    },
    delCycleInfo (delData) {
      var cyclename = this.tempData.dayInfo.length + 1
      this.tempData.dayInfo.push({
        dayName: cyclename,
        shift: null,
        isRest: 0
      })
    },
    showDayModal () {
      let dayList = this.tempData.day.split(' ')
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
      this.tempData.day = weekDayStr
    },
    closeDay () {
      this.showDay = !this.showDay
    },
    showTimeModal (timeInfo, timeType) {
      console.log(timeInfo)
      this.editTime = timeInfo
      if (timeType === 'start') {
        this.editHour = timeInfo.startTime.split(':')[0]
        this.editMinute = timeInfo.startTime.split(':')[1]
      } else {
        this.editHour = timeInfo.endTime.split(':')[0]
        this.editMinute = timeInfo.endTime.split(':')[1]
      }
      this.editTimeType = timeType
      this.showEditTime = !this.showEditTime
    },
    getEditTime (msg) {
      if (this.editTime.name === 'rest') {
        if (this.editTimeType === 'start') {
          this.restTime.startTime = msg
          this.tempData.restStart = msg
        } else {
          this.restTime.restEnd = msg
          this.tempData.endTime = msg
        }
      } else {
        for (let i = 0; i < this.workTime.length; i++) {
          if (this.tempData.workTime[i].name === this.editTime.name) {
            if (this.editTimeType === 'start') {
              this.tempData.workTime[i].startTime = msg
            } else {
              this.tempData.workTime[i].endTime = msg
            }
            break
          }
        }
      }
    },
    closeTime () {
      this.showEditTime = !this.showEditTime
    },
    showInputShift () {
      if (this.dataType === 'shift') {
        this.initInput = this.tempData.shiftName
      }
      if (this.dataType === 'cycle') {
        this.initInput = this.tempData.name
      }
      this.inputName = !this.inputName
    },
    getShiftName (msg) {
      if (this.dataType === 'shift') {
        this.tempData.shiftName = msg
      }
      if (this.dataType === 'cycle') {
        this.tempData.name = msg
      }
    },
    closeInputShift () {
      this.inputName = !this.inputName
    },
    editCycle (editData) {
      this.selectedInfo = editData
      this.showCycle = !this.showCycle
    },
    getCycle (msg) {
      let selIndex = this.cycleOption.indexOf(msg)
      console.log(this.tempData, msg)
      console.log(this.cycleOption)
      console.log(selIndex)
      console.log(this.shiftList[selIndex])
      for (let i = 0; i < this.tempData.dayInfo.length; i++) {
        if (this.tempData.dayInfo[i] === this.selectedInfo) {
          if (msg === '休息') {
            this.tempData.dayInfo[i].isRest = 1
            this.tempData.dayInfo[i].shift = null
            break
          }
          this.tempData.dayInfo[i].isRest = 0
          this.tempData.dayInfo[i].shift = this.shiftList[selIndex]
          break
        }
      }
    },
    closeCycle () {
      this.showCycle = !this.showCycle
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgb(248, 248, 248);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .attendance{
    height:100%;
    width: 100%;
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

  .contentbody{
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: scroll;
    overflow-x: hidden;
    /* position: relative; */
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
  .delitem{
    display: inline-flex;
    width:100%;
    background-color: rgb(248, 248, 248);
    border: 1px solid rgb(248,248,248);
  }
</style>
