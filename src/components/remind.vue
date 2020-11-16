<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="title" style="align-items:center;">{{ titlename }}</div>
        <div class="opete" style="align-items:center;">
          <button @click="saveRemind" >确定</button>
          <button @click="closeSelf" >返回</button>
        </div>
      </div>
      <hr style="margin-top: 0px"/>
      <!-- <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveRemind">
          <span>确定</span>
        </div>
      </div> -->
      <div class="commonpiece" @click="editRemindTime('stime')">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>上班提醒</span>
          </div>
          <div class="descrip">
            <span class="spanstyle" v-if="tempexist.workRemind !== 0">上班前{{ tempexist.workRemind }}分钟</span>
            <span class="spanstyle" v-if="tempexist.workRemind === 0">上班准点</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece" @click="editRemindTime('xtime')">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>下班提醒</span>
          </div>
          <div class="descrip">
            <span class="spanstyle" v-if="tempexist.offWorkRemind === 0">下班准点</span>
            <span class="spanstyle" v-if="tempexist.offWorkRemind !== 0">下班后{{ tempexist.offWorkRemind }}分钟</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
    </div>
    <input-modal v-if="isEditTime" :titlename="'输入时长'" :onlyNum="true" :inputtxt="inputTime" @getinput="getRemindTime" v-on:closeinput="closeRemindTime"></input-modal>
  </div>
</template>

<script>

import inputModal from '../components/inputModal'

export default {
  name: 'remind',
  props: {
    existData: {
      type: Object,
      default: () => {}
    },
    titlename: {
      type: String,
      default: '提醒设置'
    }
  },
  data () {
    return {
      inputTime: '',
      isEditTime: false,
      remindType: '',
      tempexist: this.existData
    }
  },
  created: function () {
  },
  components: {
    inputModal
  },
  methods: {
    closeSelf () {
      this.$emit('closeremind')
    },
    saveRemind () {
      this.$emit('getremind', this.tempexist)
      this.closeSelf()
    },
    editRemindTime (type) {
      this.remindType = type
      if (this.remindType === 'stime') {
        this.inputTime = this.tempexist.workRemind + ''
      } else {
        this.inputTime = this.tempexist.offWorkRemind + ''
      }
      this.isEditTime = !this.isEditTime
    },
    getRemindTime (msg) {
      console.log(msg)
      if (this.remindType === 'stime') {
        this.tempexist.workRemind = parseInt(msg)
      } else {
        this.tempexist.offWorkRemind = parseInt(msg)
      }
    },
    closeRemindTime () {
      this.isEditTime = !this.isEditTime
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
