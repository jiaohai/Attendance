<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="title" style="align-items:center;">{{ titlename }}</div>
        <div class="opete" style="align-items:center;">
          <button @click="saveShift" >确定</button>
          <button @click="closeSelf" >返回</button>
        </div>
      </div>
      <hr style="margin-top: 0px"/>
      <!-- <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveShift">
          <span>确定</span>
        </div>
      </div> -->
      <div class="commonpiece" @click="editShift('shift')">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>班次</span>
          </div>
          <div class="descrip" v-if="tempexist.shiftlist.length > 0">
            <span class="spanstyle" v-for="(item, index) in tempexist.shiftlist" :key="index" >{{ item.shiftName }}</span>
          </div>
          <div class="descrip" v-if="tempexist.shiftlist.length === 0">
            <span class="spanstyle">未设置</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece" @click="editShift('cycle')">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>周期</span>
          </div>
          <div class="descrip" v-if="tempexist.shiftcycle.length > 0">
            <span class="spanstyle" >{{ tempexist.shiftcycle.length }}个周期</span>
          </div>
          <div class="descrip" v-if="tempexist.shiftcycle.length === 0">
            <span class="spanstyle">未设置</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
      <div class="commonpiece">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles" style="width: 70%;">
            <span>编辑排班（敬请期待）</span>
          </div>
          <!-- <div class="descrip" >
            <span class="spanstyle" >{{ existlist.shiftcycle.length }}个周期</span>
          </div>
          <i class="fa fastyle fa-angle-right" /> -->
        </div>
      </div>
    </div>
    <data-list v-if="showShiftdata" :titlename="setName" :existlist="editData" :selectType="selectData" :dataType="edittype" @getdata="getEditdata" v-on:closelist="closeEditshift"></data-list>
  </div>
</template>

<script>

import dataList from '../components/dataList'

export default {
  name: 'shiftSetting',
  props: {
    existlist: {
      type: Object,
      default: () => {}
    },
    titlename: {
      type: String,
      default: ''
    },
    dataType: {
      type: String,
      default: 'shift'
    }
  },
  // created: {
  // },
  data () {
    return {
      inputvlue: '',
      setName: '',
      showShiftdata: false,
      showModal: false,
      edittype: this.dataType,
      shiftData: [],
      cycleData: [],
      editData: [],
      selectData: [],
      tempexist: this.existlist
    }
  },
  created: function () {
  },
  components: {
    dataList
  },
  methods: {
    closeSelf () {
      this.$emit('closeshift')
    },
    saveShift () {
      this.$emit('getshift', this.tempexist)
      this.closeSelf()
    },
    editShift (type) {
      this.edittype = type
      if (type === 'shift') {
        this.setName = '班次'
        this.editData = this.tempexist.shiftlist
      } else {
        if (this.tempexist.shiftlist.length === 0) {
          this.openMsg('请先设置班次！')
          return
        }
        this.setName = '周期'
        this.selectData = this.tempexist.shiftlist
        this.editData = this.tempexist.shiftcycle
      }
      this.showShiftdata = !this.showShiftdata
    },
    getEditdata (msg) {
      if (this.edittype === 'shift') {
        this.tempexist.shiftlist = msg
      } else {
        this.tempexist.shiftcycle = msg
      }
    },
    closeEditshift () {
      this.showShiftdata = !this.showShiftdata
    },
    openMsg (message) {
      this.$confirm(message, '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        type: 'warning'
      }).then(() => {}).catch(() => {})
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
