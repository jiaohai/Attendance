<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <!-- <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveOver">
          <span>确定</span>
        </div>
      </div> -->
      <div class="heading">
        <div class="title" style="align-items:center;">{{ titlename }}</div>
        <div class="opete" style="align-items:center;">
          <button @click="saveOver" >确定</button>
          <button @click="closeSelf" >返回</button>
        </div>
      </div>
      <hr style="margin-top: 0px"/>
      <div class="commonpiece" @click="editOvertyoe">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>加班方式</span>
          </div>
          <div class="descrip">
            <span class="spanstyle">{{ tempexist.type }}</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece" v-if="showFactor">
        <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
          <div class="langtitles">
            <span>允许工作日加班</span>
          </div>
          <i class="fa fastyle fa-toggle-on" style="margin-right: 5%" v-if="tempexist.dayWork.isOver" @click="isOver('day')"/>
          <i class="fa fastyle fa-toggle-off" style="margin-right: 5%" v-if="!tempexist.dayWork.isOver" @click="isOver('day')"/>
        </div>
        <div style="width: 100%" v-if="tempexist.dayWork.isOver">
          <div class="titlehead" v-if="showTimefactor" @click="editDuration('dstime')" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="langtitles">
              <span>加班开始时间</span>
            </div>
            <div class="shortdescrip">
              <span class="spanstyle">下班后{{ tempexist.dayWork.startTime }}分钟</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" v-if="showTimefactor" @click="editDuration('dntime')" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="langtitles">
              <span>最短加班时长</span>
            </div>
            <div class="shortdescrip">
              <span class="spanstyle">{{ tempexist.dayWork.minTime }}分钟</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" v-if="showTimefactor" @click="editDuration('dxtime')" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="langtitles">
              <span>最长加班时长</span>
            </div>
            <div class="shortdescrip">
              <span class="spanstyle">{{ tempexist.dayWork.maxTime }}分钟</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" @click="editDeduction('wday')" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="langtitles">
              <span>加班休息扣除方式</span>
            </div>
            <div class="shortdescrip">
              <span class="spanstyle">{{ tempexist.dayWork.restType.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
      </div>
      <div class="commonpiece" v-if="showFactor">
        <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
          <div class="langtitles">
            <span>允许非工作日加班</span>
          </div>
          <i class="fa fastyle fa-toggle-on" style="margin-right: 5%" v-if="tempexist.holiday.isOver" @click="isOver('holiday')"/>
          <i class="fa fastyle fa-toggle-off" style="margin-right: 5%" v-if="!tempexist.holiday.isOver" @click="isOver('holiday')"/>
        </div>
        <div style="width: 100%" v-if="tempexist.holiday.isOver">
          <div class="titlehead" v-if="showTimefactor" @click="editDuration('hntime')" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="langtitles">
              <span>最短加班时长</span>
            </div>
            <div class="shortdescrip">
              <span class="spanstyle">{{ tempexist.holiday.minTime }}分钟</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" v-if="showTimefactor" @click="editDuration('hxtime')" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="langtitles">
              <span>最长加班时长</span>
            </div>
            <div class="shortdescrip">
              <span class="spanstyle">{{ tempexist.holiday.maxTime }}分钟</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" @click="editDeduction('hday')" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
            <div class="langtitles">
              <span>加班休息扣除方式</span>
            </div>
            <div class="shortdescrip">
              <span class="spanstyle">{{ tempexist.holiday.restType.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
      </div>
      <select-modal v-if="showOvertyoe" :selection="overType" :titlename="'加班方式'" @gettype="getOverType" v-on:closeme="closeType"></select-modal>
      <input-modal v-if="showDuration" :titlename="'输入时长'" :onlyNum="true" :inputtxt="inputDuration" @getinput="getDuration" v-on:closeinput="closeDuration"></input-modal>
      <deduction-type v-if="showDeduction" :existdata="deductionData" @getdeduction="getDeduction" v-on:closededuction="closeDeduction"></deduction-type>
    </div>
  </div>
</template>

<script>

import selectModal from '../components/selectModal'
import inputModal from '../components/inputModal'
import deductionType from '../components/deductionType'

export default {
  name: 'overRule',
  props: {
    existlist: {
      type: Object,
      default: () => {}
    },
    overType: {
      type: Array,
      default: () => []
    },
    titlename: {
      type: String,
      default: '加班规则'
    }
  },
  // created: {
  // },
  data () {
    return {
      showOvertyoe: false,
      showFactor: true,
      showTimefactor: true,
      showDuration: false,
      inputDuration: '0',
      durationType: '',
      showDeduction: false,
      deductionData: {},
      deductionType: '',
      tempexist: this.existlist
    }
  },
  created: function () {
    this.initModal()
  },
  components: {
    selectModal,
    inputModal,
    deductionType
  },
  methods: {
    initModal () {
      if (this.tempexist.type === '以加班申请为准') {
        this.showFactor = false
      }
    },
    closeSelf () {
      this.$emit('closeover')
    },
    saveOver () {
      this.$emit('getover', this.tempexist)
      this.closeSelf()
    },
    isOver (type) {
      if (type === 'day') {
        this.tempexist.dayWork.isOver = !this.tempexist.dayWork.isOver
      }
      if (type === 'holiday') {
        this.tempexist.holiday.isOver = !this.tempexist.holiday.isOver
      }
    },
    editOvertyoe () {
      this.showOvertyoe = !this.showOvertyoe
    },
    getOverType (msg) {
      this.tempexist.type = msg
      if (this.tempexist.type === '以加班申请为准') {
        this.showFactor = false
        this.showTimefactor = false
      }
      if (this.tempexist.type === '以打卡时间为准') {
        this.showFactor = true
        this.showTimefactor = true
      }
      if (this.tempexist.type === '以加班申请核算打卡记录') {
        this.showFactor = true
        this.showTimefactor = false
      }
    },
    closeType () {
      this.showOvertyoe = !this.showOvertyoe
    },
    editDuration (type) {
      this.durationType = type
      this.showDuration = !this.showDuration
    },
    getDuration (msg) {
      if (this.durationType === 'dstime') {
        this.tempexist.dayWork.startTime = msg
      } else if (this.durationType === 'dxtime') {
        this.tempexist.dayWork.maxTime = msg
      } else if (this.durationType === 'dntime') {
        this.tempexist.dayWork.minTime = msg
      } else if (this.durationType === 'hxtime') {
        this.tempexist.holiday.maxTime = msg
      } else if (this.durationType === 'hntime') {
        this.tempexist.holiday.minTime = msg
      }
    },
    closeDuration () {
      this.showDuration = !this.showDuration
    },
    editDeduction (type) {
      this.deductionType = type
      if (this.deductionType === 'wday') {
        this.deductionData = this.tempexist.dayWork.restType
      } else {
        this.deductionData = this.tempexist.holiday.restType
      }
      this.showDeduction = !this.showDeduction
    },
    getDeduction (msg) {
      if (this.deductionType === 'wday') {
        this.tempexist.dayWork.restType = msg
      } else {
        this.tempexist.holiday.restType = msg
      }
    },
    closeDeduction () {
      this.showDeduction = !this.showDeduction
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
</style>
