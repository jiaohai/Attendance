<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="title" style="align-items:center;">{{ titlename }}</div>
        <div class="opete" style="align-items:center;">
          <button @click="saveSet" >确定</button>
          <button @click="closeSelf" >返回</button>
        </div>
      </div>
      <hr style="margin-top: 0px"/>
      <!-- <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveSet">
          <span>确定</span>
        </div>
      </div> -->
      <div class="commonpiece" @click="editUser('report')">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>汇报对象</span>
          </div>
          <div class="descrip">
            <div v-for="(item, index) in tempexist.supervisors" :key="index">
              <span class="spanstyle">{{ item.name }}</span>
            </div>
            <span class="spanstyle" v-if="tempexist.supervisors.length === 0">未设置</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece" @click="editUser('white')">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>白名单</span>
          </div>
          <div class="descrip">
            <span class="spanstyle">未设置</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece" @click="editRemind">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>提醒</span>
          </div>
          <div class="descrip" >
            <span class="spanstyle" v-if="tempexist.remind.workRemind !== 0">上班前{{ tempexist.remind.workRemind }}分钟,</span>
            <span class="spanstyle" v-if="tempexist.remind.workRemind === 0">上班准点,</span>
            <span class="spanstyle" v-if="tempexist.remind.offWorkRemind === 0">下班准点</span>
            <span class="spanstyle" v-if="tempexist.remind.offWorkRemind !== 0">下班后{{ tempexist.remind.offWorkRemind }}分钟</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece" v-if="false">
        <div class="titlehead" style="display: inline-flex; width:100%;" @click="editHspday">
          <div class="langtitles">
            <span>节假日与特殊日期（敬请期待）</span>
          </div>
          <div class="shortdescrip" >
            <!-- <span class="spanstyle" >{{ existlist.shiftcycle.length }}个周期</span> -->
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece" @click="editBoder">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="langtitles">
            <span>上下班界定</span>
          </div>
          <div class="shortdescrip" >
            <span class="spanstyle" >{{ tempexist.workBorder }}</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece">
        <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
          <div class="langtitles">
            <span>允许提交补卡申请</span>
          </div>
          <i class="fa fastyle fa-toggle-on" style="margin-right: 5%" v-if="isApplyRcard" @click="isApply"/>
          <i class="fa fastyle fa-toggle-off" style="margin-right: 5%" v-if="!isApplyRcard" @click="isApply"/>
        </div>
        <div class="titlehead" v-if="isApplyRcard" @click="editCount('dcount')" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee;">
          <div class="langtitles">
            <span>允许补卡时限</span>
          </div>
          <div class="shortdescrip" >
            <span class="spanstyle" v-if="tempexist.expiration === 0">不限制</span>
            <span class="spanstyle" v-if="tempexist.expiration !== 0">{{ tempexist.expiration }}天</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
        <div class="titlehead" v-if="isApplyRcard" @click="editCount('count')" style="display: inline-flex; width:100%;">
          <div class="langtitles">
            <span>每月允许补卡次数</span>
          </div>
          <div class="shortdescrip" >
            <span class="spanstyle" v-if="tempexist.lateSignCount === 0">不限制</span>
            <span class="spanstyle" v-if="tempexist.lateSignCount !== 0">{{ tempexist.lateSignCount }}次</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
    </div>
    <search-modal v-if="showList" :titlename="'请选择'" :onlyUser="onlyUser" :existlist="userData" @getsearch="getUser" v-on:closesearch="closeUser"></search-modal>
    <remind v-if="showRemind" :existData="remindData" @getremind="getRemind" v-on:closeremind="closeRemind"></remind>
    <time-picker v-if="showBoder" :hourInfo="editHour" :minuteInfo="editMinute" @savetime="getBoder" v-on:closepicker="closeBoder"></time-picker>
    <special-day v-if="showHspday" :existData="hspdayDate" @gethspday="getHspday" v-on:closehspday="closeFspday"></special-day>
    <input-modal v-if="isEditCount" :titlename="'请输入'" :onlyNum="true" :inputtxt="inputCount" @getinput="getCount" v-on:closeinput="closeCount"></input-modal>
  </div>
</template>

<script>

import searchModal from '../components/searchModal'
import remind from '../components/remind'
import timePicker from '../components/timePicker'
import inputModal from '../components/inputModal'
import specialDay from '../components/specialDay'

export default {
  name: 'moreSetting',
  props: {
    existlist: {
      type: Object,
      default: () => {}
    },
    titlename: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showList: false,
      hasUser: false,
      listType: '',
      onlyUser: true,
      userData: {
        departs: [],
        users: []
      },
      showRemind: false,
      remindData: {},
      showHspday: false,
      hspdayDate: {},
      isApplyRcard: false,
      showBoder: false,
      inputCount: '0',
      countType: '',
      isEditCount: false,
      tempexist: this.existlist
    }
  },
  created: function () {
    this.getIsApply()
  },
  components: {
    searchModal,
    remind,
    timePicker,
    specialDay,
    inputModal
  },
  methods: {
    closeSelf () {
      this.$emit('closemore')
    },
    saveSet () {
      this.$emit('getmore', this.tempexist)
      this.closeSelf()
    },
    getIsApply () {
      if (this.tempexist.lateSign === 1) {
        this.isApplyRcard = true
      } else {
        this.isApplyRcard = false
      }
    },
    getLateSign () {
      if (this.isApplyRcard) {
        this.tempexist.lateSign = 1
      } else {
        this.tempexist.lateSign = 0
      }
    },
    isApply () {
      this.isApplyRcard = !this.isApplyRcard
      this.getLateSign()
    },
    editUser (type) {
      this.listType = type
      if (type === 'report') {
        this.userData.users = this.tempexist.supervisors
      }
      if (type === 'white') {
        this.userData.users = this.tempexist.whiteList
      }
      this.showList = !this.showList
    },
    getUser (msg) {
      if (this.listType === 'report') {
        this.tempexist.supervisors = msg.users
      }
      if (this.listType === 'white') {
        this.tempexist.whiteList = msg.users
      }
    },
    closeUser () {
      this.showList = !this.showList
    },
    editRemind () {
      this.remindData = this.tempexist.remind
      this.showRemind = !this.showRemind
    },
    getRemind (msg) {
      this.tempexist.remind = msg
    },
    closeRemind () {
      this.showRemind = !this.showRemind
    },
    editBoder () {
      this.editHour = this.tempexist.workBorder.split(':')[0]
      this.editMinute = this.tempexist.workBorder.split(':')[1]
      this.showBoder = !this.showBoder
    },
    getBoder (msg) {
      this.tempexist.workBorder = msg
    },
    closeBoder () {
      this.showBoder = !this.showBoder
    },
    editCount (type) {
      this.countType = type
      if (this.countType === 'dcount') {
        this.inputCount = this.tempexist.expiration === 0 ? '' : this.tempexist.expiration + ''
      } else {
        this.inputCount = this.tempexist.lateSignCount === 0 ? '' : this.tempexist.lateSignCount + ''
      }
      this.isEditCount = !this.isEditCount
    },
    getCount (msg) {
      if (this.countType === 'dcount') {
        this.tempexist.expiration = parseInt(msg)
      } else {
        this.tempexist.lateSignCount = parseInt(msg)
      }
    },
    closeCount () {
      this.isEditCount = !this.isEditCount
    },
    editHspday () {
      if (!this.tempexist.special) {
        this.hspdayDate = {
          id: null,
          holiday: 1,
          noAttendanceDay: [],
          attendanceDay: []
        }
      } else {
        this.hspdayDate = this.tempexist.special
      }
      this.showHspday = !this.showHspday
    },
    getHspday (msg) {
      this.hspdayDate = msg
      this.tempexist.special = this.hspdayDate
    },
    closeFspday () {
      this.showHspday = !this.showHspday
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
