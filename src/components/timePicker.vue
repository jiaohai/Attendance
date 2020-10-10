<template>
  <div class="modal-backdrop" @click="closeSelf" style="background-color: rgba(0,0,0,.3)">
    <div class="modal" @click.stop="">
      <div class="modal-header" style="padding: 10px; display: inline-flex;">
        <div class="black" @click="closeSelf">
          <span>取消</span>
        </div>
        <div class="title"></div>
        <div class="more" @click="saveTime">
          <span>确定</span>
        </div>
      </div>
      <div class="modal-body">
        <div class="timeChoice">
          <div>
            <basic-select :values="daytype" @select="getDayValue"></basic-select>
          </div>
          <div class="timeChoice">
            <basic-select :values="hourList" @select="getHourValue"></basic-select>
            <span style="margin: auto;">:</span>
            <basic-select :values="minuteList" @select="getMinuteValue"></basic-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import basicSelect from '../components/basicSelect'

export default {
  name: 'timePicker',
  props: {
    selection: {
      type: Array,
      default: () => []
    },
    dayInfo: {
      type: String,
      default: ''
    },
    hourInfo: {
      type: String,
      default: '00'
    },
    minuteInfo: {
      type: String,
      default: '00'
    }
  },
  data () {
    return {
      daytype: ['今日', '次日'],
      hourList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      minuteList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      day: this.dayInfo,
      hour: this.hourInfo,
      minute: this.minuteInfo
    }
  },
  components: {
    basicSelect
  },
  methods: {
    closeSelf () {
      this.$emit('closepicker')
    },
    getDayValue (msg) {
      console.log(msg)
      this.day = msg
    },
    getHourValue (msg) {
      console.log(msg)
      this.hour = msg
    },
    getMinuteValue (msg) {
      console.log(msg)
      this.minute = msg
    },
    saveTime () {
      var editTime = this.hour + ':' + this.minute
      if (this.day === '次日') {
        editTime = this.day + ' ' + editTime
      }
      this.$emit('savetime', editTime)
      this.closeSelf()
    }
  }
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal {
    background-color: #fff;
    /* box-shadow: 2px 2px 20px 1px; */
    overflow-x:auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    bottom:0px;
    position: fixed;
}
.modal-header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 15px;
    display: inline;
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
.modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
}
.modal-body {
    position: relative;
    padding: 0px 0px 0px 0px;
}
.timeChoice{
  display:inline-flex;
}
.contentspan{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top:10px;
    text-align: left;
  }
  .secondspan{
    margin-top:5px;
    margin-bottom:5px;
    font-size:small;
    color:rgb(165,165,165);
  }
</style>
