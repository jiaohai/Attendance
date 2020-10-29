<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
          <div class="more common" @click="saveDay">
          <span>确定</span>
        </div>
      </div>
      <div class="contentbody" >
        <div class="commonpiece" >
          <div class="titlehead" style="display: inline-flex; width:100%;" @click="editDate">
            <div class="titles">
              <span>日期</span>
            </div>
            <div class="descrip" style="display: inline-flex; text-overflow: unset; overflow-x: scroll;" >
              <span class="spanstyle">{{ tempexist.date }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <!-- <div  v-if="dayType === 'clock'"> -->
          <div class="commonpiece" v-for="(item, index) in tempexist.workTime" :key="index" >
            <div class="delitem">
              <span style="margin: auto auto auto 20px; font-size: small;" v-if="tempexist.workTime.length === 1">上下班时间段</span>
              <span style="margin: auto auto auto 20px; font-size: small;" v-if="tempexist.workTime.length > 1">上下班时间段{{ index + 1}}</span>
              <span style="margin: auto 10px auto auto; font-size: small;" v-if="tempexist.workTime.length > 1" @click="delWorkTime(item)">删除</span>
            </div>
            <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="editTime(item, 'start')">
              <div class="titles">
                <span>上班</span>
              </div>
              <div class="descrip">
                <span class="spanstyle">{{ item.startTime }}</span>
              </div>
              <i class="fa fastyle fa-angle-right" />
            </div>
            <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="editTime(item, 'end')">
              <div class="titles">
                <span>下班</span>
              </div>
              <div class="descrip">
                <span class="spanstyle">{{ item.endTime }}</span>
              </div>
              <i class="fa fastyle fa-angle-right" />
            </div>
            <div class="titlehead" style="display: inline-flex; width:100%;" v-if="index === tempexist.workTime.length - 1" @click="addWorkTime">
              <i class="fa fa-plus" style="font-size: large; margin: auto 0px 5px 25px;"/>
              <span style="padding-left: 10px;margin: auto 0px 5px 0px;;">添加</span>
            </div>
          </div>
        <!-- </div> -->
        <div class="commonpiece">
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="editCause">
            <div class="titles">
              <span>事由</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ tempexist.reason }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
      </div>
    </div>
    <date-select v-if="isEdiDate" @getdate="getDate" v-on:closedate="closeDate"></date-select>
    <time-picker v-if="isEditTime" :hourInfo="editHour" :minuteInfo="editMinute" @savetime="getTime" v-on:closepicker="closeTime"></time-picker>
    <input-modal v-if="isEditCause" :titlename="'事由'" :inputtxt="cause" @getinput="getCause" v-on:closeinput="closeCause"></input-modal>
  </div>
</template>

<script>

import dateSelect from '../components/dateSelect'
import timePicker from '../components/timePicker'
import inputModal from '../components/inputModal'

export default {
  name: 'settingDay',
  props: {
    existData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      titlename: '编辑时间',
      isEdiDate: false,
      isEditTime: false,
      editTimeData: {},
      editTimeType: '',
      isEditCause: false,
      cause: '',
      tempexist: this.existData
    }
  },
  created: function () {
  },
  components: {
    dateSelect,
    timePicker,
    inputModal
  },
  methods: {
    closeSelf () {
      this.$emit('closeday')
    },
    saveDay (msg) {
      this.$emit('getday', this.tempexist)
      this.closeSelf()
    },
    addWorkTime () {
      let startHour = ''
      let endHour = ''
      let timeStart = this.tempexist.workTime[this.tempexist.workTime.length - 1].endTime.split(':')[0]
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
      this.tempexist.workTime.push({name: this.tempexist.workTime.length + 1, startTime: startHour, endTime: endHour})
      console.log(this.tempexist.workTime)
    },
    delWorkTime (item) {
      let tempWorData = []
      for (let i = 0; i < this.tempexist.workTime.length; i++) {
        if (this.tempexist.workTime[i].name !== item.name) {
          tempWorData.push({
            name: tempWorData.length + 1,
            startTime: this.tempexist.workTime[i].startTime,
            endTime: this.tempexist.workTime[i].endTime
          })
        }
      }
      this.tempexist.workTime = tempWorData
    },
    editDate () {
      this.isEdiDate = !this.isEdiDate
    },
    getDate (msg) {
      this.tempexist.date = msg
    },
    closeDate () {
      this.isEdiDate = !this.isEdiDate
    },
    editTime (timeInfo, timeType) {
      if (timeType === 'start') {
        this.editHour = timeInfo.startTime.split(':')[0]
        this.editMinute = timeInfo.startTime.split(':')[1]
      } else {
        this.editHour = timeInfo.endTime.split(':')[0]
        this.editMinute = timeInfo.endTime.split(':')[1]
      }
      this.editTimeType = timeType
      this.editTimeData = timeInfo
      this.editTimeType = timeType
      this.isEditTime = !this.isEditTime
    },
    getTime (msg) {
      for (let i = 0; i < this.tempexist.workTime.length; i++) {
        if (this.tempexist.workTime[i].name === this.editTimeData.name) {
          if (this.editTimeType === 'start') {
            this.tempexist.workTime[i].startTime = msg
          } else {
            this.tempexist.workTime[i].endTime = msg
          }
          break
        }
      }
    },
    closeTime () {
      this.isEditTime = !this.isEditTime
    },
    editCause () {
      this.isEditCause = !this.isEditCause
    },
    getCause (msg) {
      this.tempexist.reason = msg
    },
    closeCause () {
      this.isEditCause = !this.isEditCause
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
