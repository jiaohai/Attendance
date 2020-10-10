<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveShift">
          <span>确定</span>
        </div>
      </div>
      <div class="commonpiece" @click="editShift('shift')">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>班次</span>
          </div>
          <div class="descrip" v-if="tempexist.shiftlist.length > 0">
            <span class="spanstyle" v-for="(item, index) in tempexist.shiftlist" :key="index" >{{ item.name }}</span>
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
          <div class="titles">
            <span>编辑排班</span>
          </div>
          <div class="descrip" >
            <!-- <span class="spanstyle" >{{ existlist.shiftcycle.length }}个周期</span> -->
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
    </div>
    <data-list v-if="showShiftdata" :existlist="editData" :selectType="selectData" :dataType="edittype" @getdata="getEditdata" v-on:closelist="closeEditshift"></data-list>
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
        this.editData = this.tempexist.shiftlist
      } else {
        if (this.tempexist.shiftlist.length === 0) {
          alert('请先设置班次')
          return
        }
        this.selectData = this.tempexist.shiftlist
        this.editData = this.tempexist.shiftcycle
      }
      this.showShiftdata = !this.showShiftdata
    },
    getEditdata (msg) {
      console.log('3333333333')
      if (this.edittype === 'shift') {
        this.tempexist.shiftlist = msg
      } else {
        this.tempexist.shiftcycle = msg
      }
    },
    closeEditshift () {
      this.showShiftdata = !this.showShiftdata
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
