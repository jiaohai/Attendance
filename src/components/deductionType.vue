<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <!-- <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveDeduction">
          <span>确定</span>
        </div>
      </div> -->
      <div class="heading">
        <div class="title" style="align-items:center;">{{ titlename }}</div>
        <div class="opete" style="align-items:center;">
          <button @click="saveDeduction" >确定</button>
          <button @click="closeSelf" >返回</button>
        </div>
      </div>
      <hr style="margin-top: 0px"/>
      <div class="commonpiece">
        <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" v-for="(item, index) in deductionType" :key="index" @click="changeDeduType(item)">
          <div class="titles" style="width: calc(95% - 20px)">
            <span>{{ item.name }}</span>
          </div>
          <!-- <div class="descrip">
            <span class="spanstyle"></span>
          </div> -->
          <i class="fa fastyle fa-check" v-if="item.ischeck" style="margin: auto; margin-right: 10px;"/>
        </div>
      </div>
      <div class="commonpiece" v-if="tempexist.name === '指定休息时间'">
        <div class="delitem">
          <span style="margin: auto auto auto 20px; font-size: small;" >休息时间</span>
        </div>
        <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="editTime('stime')">
          <div class="titles">
            <span>开始</span>
          </div>
          <div class="descrip">
            <span class="spanstyle">{{ tempexist.restTime.startTime}}</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
        <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="editTime('etime')">
          <div class="titles">
            <span>结束</span>
          </div>
          <div class="descrip">
            <span class="spanstyle">{{ tempexist.restTime.endTime}}</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="contentbody" v-if="tempexist.name === '按加班时长扣除'" style="height: calc(100% - 181px)">
        <div class="commonpiece" v-for="(item, index) in tempexist.deduction" :key="index">
          <div class="delitem">
            <span style="margin: auto auto auto 20px; font-size: small;" v-if="tempexist.deduction.length === 1">扣除条件</span>
            <span style="margin: auto auto auto 20px; font-size: small;" v-if="tempexist.deduction.length > 1">扣除条件{{ index + 1}}</span>
            <span style="margin: auto 10px auto auto; font-size: small;" v-if="tempexist.deduction.length > 1" @click="delDeduction(item)">删除</span>
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="editDeduction('otime')">
            <div class="titles">
              <span>加班满</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ item.overHour }}分钟</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;" @click="editDeduction('dtime')">
            <div class="titles">
              <span>对应扣除</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ item.delHour }}分钟</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
          <div class="titlehead" style="display: inline-flex; width:100%;" v-if="index === tempexist.deduction.length - 1" @click="addDeduction">
            <i class="fa fa-plus" style="font-size: large; margin: auto 0px 5px 25px;"/>
            <span style="padding-left: 10px;margin: auto 0px 5px 0px;;">添加</span>
          </div>
        </div>
      </div>
    </div>
    <time-picker v-if="isEditTime" @savetime="getTime" v-on:closepicker="closeTime"></time-picker>
    <input-modal v-if="isEditDuc" :titlename="'输入时长'" :onlyNum="true" :inputtxt="inputDeduction" @getinput="getDeduction" v-on:closeinput="closeDeduction"></input-modal>
  </div>
</template>

<script>

import timePicker from '../components/timePicker'
import inputModal from '../components/inputModal'

export default {
  name: 'deductionType',
  props: {
    existdata: {
      type: Object,
      default: () => {}
    },
    deductionType: {
      type: Array,
      default: () => [
        {
          name: '不扣除',
          ischeck: true
        },
        {
          name: '指定休息时间',
          ischeck: false
        },
        {
          name: '按加班时长扣除',
          ischeck: false
        }
      ]
    },
    titlename: {
      type: String,
      default: '加班休息扣除方式'
    }
  },
  // created: {
  // },
  data () {
    return {
      isEditTime: false,
      isEditDuc: false,
      inputDeduction: '0',
      timeType: '',
      dctType: '',
      tempexist: this.existdata
    }
  },
  created: function () {
    this.initModal()
  },
  components: {
    timePicker,
    inputModal
  },
  methods: {
    initModal () {
      for (let i = 0; i < this.deductionType.length; i++) {
        if (this.deductionType[i].name === this.tempexist.name) {
          this.deductionType[i].ischeck = true
        } else {
          this.deductionType[i].ischeck = false
        }
      }
    },
    closeSelf () {
      this.$emit('closededuction')
    },
    saveDeduction () {
      this.$emit('getdeduction', this.tempexist)
      this.closeSelf()
    },
    changeDeduType (item) {
      this.tempexist.name = item.name
      for (let i = 0; i < this.deductionType.length; i++) {
        if (this.deductionType[i].name === item.name) {
          this.deductionType[i].ischeck = true
        } else {
          this.deductionType[i].ischeck = false
        }
      }
    },
    addDeduction () {
      var ducname = '时间段' + (this.tempexist.deduction.length + 1)
      this.tempexist.deduction.push({name: ducname, overHour: 300, delHour: 30})
    },
    delDeduction (item) {
      this.tempexist.deduction.splice(this.tempexist.deduction.indexOf(item, 1))
    },
    editTime (type) {
      this.timeType = type
      this.isEditTime = !this.isEditTime
    },
    getTime (msg) {
      if (this.timeType === 'stime') {
        this.tempexist.restTime.startTime = msg
      } else {
        this.tempexist.restTime.endTime = msg
      }
    },
    closeTime () {
      this.isEditTime = !this.isEditTime
    },
    editDeduction (type) {
      this.dctType = type
      this.isEditDuc = !this.isEditDuc
    },
    getDeduction (msg) {
      if (this.dctType === 'otime') {
        this.tempexist.deduction.overHour = msg
      } else {
        this.tempexist.deduction.delHour = msg
      }
    },
    closeDeduction () {
      this.isEditDuc = !this.isEditDuc
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
