<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
          <div class="more common" @click="saveData(false)">
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
              <span class="spanstyle">{{ tempData.weekDay }}</span>
              <!-- <div v-for="(item, index) in workDay" :key="index">
                <span class="spanstyle" v-if="item.ischeck" >{{ item.dayname }}</span>
              </div> -->
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
              <span class="spanstyle">{{ tempData.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece" v-for="(item, index) in workTime" :key="index">
          <div class="delitem">
            <span style="margin: auto auto auto 20px; font-size: small;" v-if="workTime.length === 1">上下班时间段</span>
            <span style="margin: auto auto auto 20px; font-size: small;" v-if="workTime.length > 1">上下班时间段{{ index + 1}}</span>
            <span style="margin: auto 10px auto auto; font-size: small;" v-if="workTime.length > 1" @click="delWorkTime(item)">删除</span>
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="showTimeModal(item, 'start')">
            <div class="titles">
              <span>上班</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ item.starttime }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="showTimeModal(item, 'end')">
            <div class="titles">
              <span>下班</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ item.endtime }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%;" v-if="index === workTime.length - 1" @click="addWorkTime">
            <i class="fa fa-plus" style="font-size: large; margin: auto 0px 5px 25px;"/>
            <span style="padding-left: 10px;margin: auto 0px 5px 0px;;">添加</span>
          </div>
        </div>
        <div class="commonpiece" v-if="workTime.length === 1">
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="titles">
              <span>休息时间</span>
            </div>
            <i class="fa fastyle fa-toggle-on" style="margin-right: 5%" v-if="editRtime" @click="openRest"/>
            <i class="fa fastyle fa-toggle-off" style="margin-right: 5%" v-if="!editRtime" @click="openRest"/>
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" v-if="editRtime" @click="showTimeModal(restTime[0], 'start')">
            <div class="titles">
              <span>开始</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ restTime.starttime }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" v-if="editRtime" @click="showTimeModal(restTime[0], 'end')">
            <div class="titles">
              <span>结束</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ restTime.endtime }}</span>
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
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" v-for="(item, index) in cycleInfo" :key="index" @click="editCycle(item)">
            <div class="titles">
              <span>{{ item.dayNum }}</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ item.dayInfo.name }}</span>
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
    <time-picker v-if="showEditTime" @savetime="getEditTime" v-on:closepicker="closeTime"></time-picker>
    <mselect-modal v-if="showDay" :selection="workDay" :titlename="'工作日'" @getday="getDay" v-on:closeday="closeDay"></mselect-modal>
    <input-modal v-if="inputShitName" :titlename="'班次名称'" :inputtxt="shiftName" @getinput="getShiftName" v-on:closeinput="closeInputShift"></input-modal>
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
    workDay: {
      type: Array,
      default: () => [
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
      ]
    },
    dataType: {
      type: String,
      default: 'fixed'
    },
    shiftName: {
      type: String,
      default: '未设置'
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
      inputShitName: false,
      showEditTime: false,
      showCycle: false,
      tempData: this.parentData,
      weekDay: '',
      workTime: [],
      restTime: [],
      cycleInfo: [],
      cycleOption: [],
      editCycleName: '',
      shiftList: []
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
        this.cycleInfo = this.parentData.cycleInfo
        for (let i = 0; i < this.parentData.shiftList.length; i++) {
          this.cycleOption.push(this.parentData.shiftList[i].name)
          this.shiftList.push(this.parentData.shiftList[i])
        }
        this.shiftList.push({name: '休息'})
        this.cycleOption.push('休息')
      } else {
        this.workTime = this.parentData.workTime
        this.restTime = this.parentData.restTime
      }
    },
    openRest () {
      this.editRtime = !this.editRtime
    },
    closeSelf () {
      this.$emit('closetime')
    },
    saveData (msg) {
      if (this.dataType === 'shift') {
        this.$emit('gettime', {name: this.tempData.name, time: this.workTime, rest: this.restTime})
      }
      if (this.dataType === 'fixed') {
        this.$emit('gettime', {day: this.tempData.weekDay, time: this.workTime, rest: this.restTime})
      }
      if (this.dataType === 'cycle') {
        this.$emit('gettime', {name: this.tempData.name, cycleInfo: this.cycleInfo})
      }
      this.closeSelf()
    },
    addWorkTime () {
      var timename = '时间段' + (this.workTime.length + 1)
      this.workTime.push({name: timename, starttime: '09:00', endtime: '18:00'})
    },
    delWorkTime (item) {
      this.workTime.splice(this.workTime.indexOf(item, 1))
    },
    addCycleInfo () {
      var cyclename = '第' + (this.cycleInfo.length + 1) + '天'
      this.cycleInfo.push({dayNum: cyclename, dayInfo: {name: '未设置'}})
    },
    showDayModal () {
      this.showDay = !this.showDay
    },
    getDay (msg) {
      var weektime = ''
      for (let i = 0; i < msg.length; i++) {
        if (msg[i].ischeck) {
          weektime = weektime + ' ' + msg[i].dayname
        }
      }
      this.tempData.weekDay = weektime
    },
    closeDay () {
      this.showDay = !this.showDay
    },
    showTimeModal (timeInfo, timeType) {
      this.editTime = timeInfo
      this.editTimeType = timeType
      this.showEditTime = !this.showEditTime
    },
    getEditTime (msg) {
      if (this.editTime.name === 'rest') {
        if (this.editTimeType === 'start') {
          this.restTime[0].starttime = msg
        } else {
          this.restTime[0].endtime = msg
        }
      } else {
        for (let i = 0; i < this.workTime.length; i++) {
          if (this.workTime[i].name === this.editTime.name) {
            if (this.editTimeType === 'start') {
              this.workTime[i].starttime = msg
            } else {
              this.workTime[i].endtime = msg
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
      this.showInput = !this.showInput
      this.inputShitName = !this.inputShitName
    },
    getShiftName (msg) {
      this.tempData.name = msg
    },
    closeInputShift () {
      this.inputShitName = !this.inputShitName
    },
    editCycle (item) {
      this.editCycleName = item.dayNum
      this.showCycle = !this.showCycle
    },
    getCycle (msg) {
      for (let i = 0; i < this.cycleInfo.length; i++) {
        if (this.cycleInfo[i].dayNum === this.editCycleName) {
          this.cycleInfo[i].dayInfo = msg
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
