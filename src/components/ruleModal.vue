<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveTime(false)">
          <i class="fa fa-floppy-o"/>
        </div>
      </div>
      <div class="contentbody">
        <div class="commonpiece" @click="toggleModal">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>规则类型</span>
            </div>
            <div class="descrip">
              <span class="spanstyle">{{ ruletype }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <select-modal v-if="showModal" :selection="ruleList" :titlename="'规则类型'" @gettype="getType" v-on:closeme="closeme"></select-modal>
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
        <!-- <div class="commonpiece" @click="showSearchModal">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>打卡人员</span>
            </div>
            <div class="descrip">
              <span class="spanstyle" v-for="(item, index) in existlist" :key="index" >{{ item.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div> -->
      </div>
    </div>
    <input-modal v-if="showInput" :titlename="'规则名称'" :inputtxt="rulename" @getinput="getInput" v-on:closeinput="closeInput"></input-modal>
    <!-- <search-modal v-if="showSearch" :titlename="'打卡人员列表'" :showAdd="isexist" :existlist="existlist" @getsearch="getSearch" v-on:closesearch="closeSearch"></search-modal> -->
    <!-- <time-modal v-if="showTime" :workDay="workDay" :restTime="restTime" :ruletype="ruletpye" :workTime="workTime" @gettime="getTime" v-on:closetime="closeTimeModal"></time-modal> -->
  </div>
</template>

<script>

import selectModal from '../components/selectModal'
import inputModal from '../components/inputModal'
import searchModal from '../components/searchModal'
import timeModal from '../components/timeModal'

export default {
  name: 'ruleModal',
  props: {
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
    workTime: {
      type: Array,
      default: () => [
        {
          name: '时间段一',
          worktime: '09:00',
          resttime: '18:00'
        }
      ]
    },
    restTime: {
      type: Array,
      default: () => [
        {
          name: '时间段一',
          starttime: '12:00',
          endtime: '13:00'
        }
      ]
    },
    titlename: {
      type: String,
      default: '添加规则'
    },
    ruletype: {
      type: String,
      default: '固定上下班'
    },
    rulename: {
      type: String,
      default: ''
    }
  },
  components: {
    selectModal,
    inputModal,
    searchModal,
    timeModal
  },
  data () {
    return {
      ruleList: [
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
      showModal: false,
      showInput: false,
      showSearch: false,
      showTime: false
    }
  },
  methods: {
    openRest () {
      this.editRtime = !this.editRtime
    },
    closeSelf () {
      this.$emit('closetime')
    },
    saveTime (msg) {
      this.$emit('gettime', {day: this.workDay, work: this.workDay, rest: this.restTime})
      this.closeSelf()
    },
    addWorkTime () {
      this.workTime.push({name: '时间段一', worktime: '09:00', resttime: '18:00'})
    },
    delWorkTime (item) {
      this.workTime.splice(this.workTime.indexOf(item, 1))
    },
    toggleModal: function () {
      this.showModal = !this.showModal
    },
    getType (msg) {
      this.ruletpye = msg
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
