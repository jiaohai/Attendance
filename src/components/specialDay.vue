<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveHspday">
          <span>确定</span>
        </div>
      </div>
      <div class="contentbody" >
        <div class="commonpiece">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="langtitles" >
              <span>法定节假日不用打卡</span>
            </div>
            <i class="fa fastyle fa-toggle-on" style="margin-right: 5%" v-if="tempexist.isHolidayClock" @click="isClock"/>
            <i class="fa fastyle fa-toggle-off" style="margin-right: 5%" v-if="!tempexist.isHolidayClock" @click="isClock"/>
          </div>
        </div>
        <div class="commonpiece">
          <div class="delitem">
            <span style="margin: auto auto auto 20px; font-size: small;">必须打卡的日期</span>
          </div>
          <div class="titlehead" v-for="(item, index) in clockDay" :key="index">
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%;" @click="editDay('clock')">
            <i class="fa fa-plus" style="font-size: large; margin: auto 0px 5px 25px;"/>
            <span style="padding-left: 10px;margin: auto 0px 5px 0px;;">添加打卡时间</span>
          </div>
        </div>
        <div class="commonpiece">
          <div class="delitem">
            <span style="margin: auto auto auto 20px; font-size: small;">不用打卡的日期</span>
          </div>
          <div class="titlehead" v-for="(item, index) in notClockDay" :key="index">
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%;" @click="editDay('unclock')">
            <i class="fa fa-plus" style="font-size: large; margin: auto 0px 5px 25px;"/>
            <span style="padding-left: 10px;margin: auto 0px 5px 0px;;">添加打卡时间</span>
          </div>
        </div>
      </div>
    </div>
    <setting-day v-if="isEditDay" :existData="specialDayData" @getday="getDay" v-on:closeday="closeDay"></setting-day>
  </div>
</template>

<script>

import settingDay from '../components/settingDay'

export default {
  name: 'specialDay',
  props: {
    existData: {
      type: Object,
      default: () => {}
    },
    titlename: {
      type: String,
      default: '特殊日期'
    }
  },
  data () {
    return {
      notClockDay: [],
      clockDay: [],
      isEditDay: false,
      specialDayData: {},
      dayType: 'clock',
      tempexist: this.existData
    }
  },
  created: function () {
  },
  components: {
    settingDay
  },
  methods: {
    closeSelf () {
      this.$emit('closehspday')
    },
    saveHspday () {
      this.$emit('gethspday', this.tempexist)
      this.closeSelf()
    },
    isClock () {
      this.tempexist.isHolidayClock = !this.tempexist.isHolidayClock
    },
    editDay (type) {
      this.dayType = type
      if (this.dayType === 'clock') {
        this.specialDayData = {
          day: '',
          desc: '',
          workTime: [
            {
              name: '时间段1',
              starttime: '08:00',
              endtime: '18:00'
            }
          ]
        }
      } else {
        this.specialDayData = {
          day: '',
          desc: ''
        }
      }
      this.isEditDay = !this.isEditDay
    },
    getDay (msg) {
      if (this.dayType === 'clock') {
        this.clockDay.push(msg)
      } else {
        this.notClockDay.push(msg)
      }
    },
    closeDay () {
      this.isEditDay = !this.isEditDay
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

  .contentbody{
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: scroll;
    overflow-x: hidden;
    /* position: relative; */
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
  .langtitles{
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 50%
  }
  .shortdescrip{
    width: calc(45% - 20px);
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
  .fastyle{
    width: 5%;
    margin: auto 1px auto auto;
    text-align: left;
  }
  .delitem{
    display: inline-flex;
    width:100%;
    background-color: rgb(248, 248, 248);
    border: 1px solid rgb(248,248,248);
  }
</style>
