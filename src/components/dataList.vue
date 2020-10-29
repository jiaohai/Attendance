<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="seveData">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveSearch(false)" v-if="isedit">
          <span>确定</span>
        </div>
        <div class="more common" @click="editList" v-if="!isedit">
          <span>编辑</span>
        </div>
      </div>
      <div class="existstyle">
        <div class="addtitle" v-if="dataType === 'fixed'" @click="showTimeModal(fixedNew, -1)">
          <i class="fa fa-plus" style="font-size: x-large; margin: auto 0px auto 25px;"/>
          <div style="margin: 5px auto auto 0px;">
            <span style="padding-left: 10px;margin-top: 5px;">添加</span>
          </div>
        </div>
        <div class="addtitle" v-if="dataType === 'shift'" @click="showTimeModal(shiftNew, -1)">
          <i class="fa fa-plus" style="font-size: x-large; margin: auto 0px auto 25px;"/>
          <div style="margin: 5px auto auto 0px;">
            <span style="padding-left: 10px;margin-top: 5px;">添加</span>
          </div>
        </div>
        <div class="addtitle" v-if="dataType === 'cycle'" @click="showTimeModal(cycleNew, -1)">
          <i class="fa fa-plus" style="font-size: x-large; margin: auto 0px auto 25px;"/>
          <div style="margin: 5px auto auto 0px;">
            <span style="padding-left: 10px;margin-top: 5px;">添加</span>
          </div>
        </div>
        <div class="options" v-if="dataType === 'fixed'">
          <div class="alloption" v-for="(item, index) in tempexist" :key="index">
            <div class="infos">
              <div class="lione">
                <span class="titlespan">工作日</span>
                <div class="spancontent">
                  <span class="spanstyle">{{ item.day }}</span>
                </div>
              </div>
              <div class="lione">
                <span class="titlespan">时段</span>
                <div class="spancontent">
                  <span class="spanstyle" v-for="(timeitem, index) in item.workTime" :key="index" >{{ timeitem.startTime }}~{{ timeitem.endTime }}</span>
                </div>
              </div>
            </div>
            <div v-if="isedit" class="fastyle" @click="delDate(item)">
              <i class="fa fa-close" />
            </div>
            <div v-if="!isedit" class="fastyle"  @click="showTimeModal(item, index)">
              <i class="fa fa-angle-right" />
            </div>
          </div>
        </div>
        <div class="options" v-if="dataType === 'shift'">
          <div class="alloption" v-for="(item, index) in tempexist" :key="index">
            <div class="infos">
              <div class="lione">
                <span class="titlespan">班次名称</span>
                <div class="spancontent">
                  <span class="spanstyle">{{ item.shiftName }}</span>
                </div>
              </div>
              <div class="lione">
                <span class="titlespan">时段</span>
                <div class="spancontent">
                  <span class="spanstyle" v-for="(timeitem, index) in item.workTime" :key="index" >{{ timeitem.startTime }}~{{ timeitem.endTime }}</span>
                </div>
              </div>
            </div>
            <div v-if="isedit" class="fastyle" @click="delDate(item)">
              <i class="fa fa-close" />
            </div>
            <div v-if="!isedit" class="fastyle" @click="showTimeModal(item, index)">
              <i class="fa fa-angle-right" />
            </div>
          </div>
        </div>
        <div class="options" v-if="dataType === 'cycle'">
          <div class="alloption" v-for="(item, index) in tempexist" :key="index">
            <div class="infos">
              <div class="lione">
                <span class="titlespan">周期名称</span>
                <div class="spancontent">
                  <span class="spanstyle">{{ item.name }}</span>
                </div>
              </div>
              <div class="lione">
                <span class="titlespan">周期天数</span>
                <div class="spancontent">
                  <span class="spanstyle">{{ item.dayInfo.length }}天为周期：</span>
                  <span class="spanstyle" v-for="(timeitem, index) in item.dayInfo" :key="index" >
                    <span v-if="timeitem.isRest === 1">休息</span>
                    <span v-if="timeitem.shift">{{ timeitem.shift.shiftName }}</span>
                  </span>
                </div>
              </div>
            </div>
            <div v-if="isedit" class="fastyle" @click="delDate(item)">
              <i class="fa fa-close" />
            </div>
            <div v-if="!isedit" class="fastyle" @click="showTimeModal(item, index)">
              <i class="fa fa-angle-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <time-modal v-if="showModal" :parentData="parentData" :dataselect="selectType" :dataType="listType" @gettime="getTime" v-on:closetime="closeTimeModal"></time-modal>
  </div>
</template>

<script>

import timeModal from '../components/timeModal'

export default {
  name: 'dataList',
  props: {
    existlist: {
      type: Array,
      default: () => []
    },
    selectType: {
      type: Array,
      default: () => []
    },
    titlename: {
      type: String,
      default: ''
    },
    dataType: {
      type: String,
      default: 'fixed'
    }
  },
  // created: {
  // },
  data () {
    return {
      isedit: false,
      showModal: false,
      listType: this.dataType,
      workDay: '',
      workTime: [],
      restTime: {},
      parentData: {},
      editIndex : -1,
      fixedNew: {
        day: '星期一 星期二 星期三 星期四 星期五',
        restStart: '12:00',
        restEnd: '14:00',
        workTime: [
          {
            name: 1,
            startTime: '08:00',
            endTime: '18:00'
          }
        ]
      },
      shiftNew: {
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
      },
      cycleNew: {
        name: '',
        dayInfo: [
          {
            dayName: 1,
            shift: null,
            isRest: 0,
            id: null
          }
        ]
      },
      tempexist: this.existlist
    }
  },
  created: function () {
    this.initList()
  },
  components: {
    timeModal
  },
  methods: {
    initList () {
      if (this.tempexist.length === 0) {
        if (this.dataType === 'fixed') {
          this.showTimeModal(this.fixedNew, -1)
        } else if (this.dataType === 'shift') {
          this.showTimeModal(this.shiftNew, -1)
        } else if (this.dataType === 'cycle') {
          this.showTimeModal(this.cycleNew, -1)
        }
      }
    },
    closeSelf () {
      this.$emit('closelist')
    },
    seveData () {
      this.$emit('getdata', this.tempexist)
      this.closeSelf()
    },
    editList () {
      this.isedit = !this.isedit
    },
    saveSearch (iskeyinput) {
      this.isedit = !this.isedit
    },
    delDate (item) {
      this.existlist.splice(this.existlist.indexOf(item, 1))
    },
    showTimeModal (editData, index) {
      console.log(editData, index)
      this.editIndex = index
      this.parentData = editData
      this.showModal = !this.showModal
    },
    getTime (msg) {
      if (this.editIndex === -1){
        this.tempexist.push(msg)
      } else {
        this.tempexist[this.editIndex] = msg
      }
    },
    closeTimeModal: function () {
      this.showModal = !this.showModal
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

  .existstyle{
    background-color: white;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 55px);
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .options{
    display: inline-grid;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: calc(100% - 41px);
  }
  .alloption{
    display: flex;
    margin-left: 20px;
    width: calc(100% - 20px);
    border-bottom: 1px solid rgb(238, 238, 238);
  }
  .infos{
    width: 95%;
    display: inline-grid;
    margin: 5px auto auto auto;
  }
  .lione{
    display: inline-flex;
    width: 100%;
    text-align: left;
  }
  .titlespan{
    width: 20%;
  }
  .spancontent{
    margin-left: 5px;
    width: calc(80% - 5px);
    /* width: 200px; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .spanstyle{
    margin: auto;
    margin-right: 10px;
    font-size: small;
    color: rgb(165, 165, 165);
  }
  .fastyle{
    width: 5%;
    margin: auto 1px auto auto;
    text-align: left;
  }
  .addtitle{
    display: inline-flex;
    width: 100%;
    height: 30px;
    margin: 10px auto auto auto;
    text-align: center;
    border-bottom: 1px solid rgb(238, 238, 238);
    overflow-x: scroll;
    white-space: nowrap;
  }
</style>
