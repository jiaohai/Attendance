<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ msg }}</div>
        <div class="more common">
          <i class="fa fa-floppy-o" @click="saveGrup" />
        </div>
      </div>
      <div class="contentbody">
        <div class="commonpiece" @click="showInputModal('attendname')">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>考勤组名称</span>
            </div>
            <div class="descrip" style="display: inline-flex;">
              <span class="spanstyle">{{ newGroup.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece" @click="showSearchModal('attendrange')">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>考勤组范围</span>
            </div>
            <div class="descrip">
              <span class="spanstyle" v-for="(item, index) in newGroup.departs" :key="index" >{{ item.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece" @click="showSearchModal('attendpeople')">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>考勤组管理员</span>
            </div>
            <div class="descrip">
              <span class="spanstyle" v-for="(item, index) in newGroup.admins" :key="index" >{{ item.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece" @click="showInputModal('attenddes')">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>描述</span>
            </div>
            <div class="descrip" style="display: inline-flex;">
              <span class="spanstyle">{{ newGroup.descrise }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece" @click="delGruop" v-if="isEditGroup">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles" style="text_agin: center">
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
      <input-modal v-if="showInput" :titlename="'请输入'" :inputtxt="inputTxt" @getinput="getInput" v-on:closeinput="closeInput"></input-modal>
      <search-modal v-if="showSearch" :titlename="'添加'" :showAdd="isexist" :existlist="existList" @getsearch="getSearch" v-on:closesearch="closeSearch"></search-modal>
    </div>
  </div>
</template>

<script>

import searchModal from '../components/searchModal'
import inputModal from '../components/inputModal'

export default {
  name: 'editGroup',
  props: {
    existdate: {
      type: Object,
      default: () => {}
    },
    isEditGroup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      msg: '编辑考情组',
      isexist: false,
      showSearch: false,
      showInput: false,
      marktype: '',
      inputTxt: '',
      existList: [],
      user: {},
      newGroup: this.existdate
    }
  },
  created: function () {
  },
  components: {
    inputModal,
    searchModal
  },
  methods: {
    closeSelf () {
      this.$emit('closeedit')
    },
    saveGrup () {
      this.$emit('getedit', this.newGroup)
      this.closeSelf()
    },
    showInputModal (mark) {
      this.marktype = mark
      if (mark === 'attendname') {
        this.inputTxt = this.newGroup.name
      }
      if (mark === 'attenddes') {
        this.inputTxt = this.newGroup.des
      }
      this.showInput = !this.showInput
    },
    getInput (msg) {
      if (this.marktype === 'attendname') {
        this.newGroup.name = msg
      }
      if (this.marktype === 'attenddes') {
        this.newGroup.des = msg
      }
    },
    closeInput () {
      this.showInput = !this.showInput
    },
    showSearchModal (mark) {
      this.marktype = mark
      if (mark === 'attendrange') {
        this.existList = this.newGroup.department
      }
      if (mark === 'attendpeople') {
        this.existList = this.newGroup.people
      }
      if (this.existList.length === 0) {
        this.isexist = true
      } else {
        this.isexist = false
      }
      this.showSearch = !this.showSearch
    },
    getSearch (msg) {
      if (this.marktype === 'attendrange') {
        this.newGroup.department = msg
      }
      if (this.marktype === 'attendpeople') {
        this.newGroup.people = msg
      }
    },
    closeSearch () {
      this.showSearch = !this.showSearch
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
    background-color: rgb(248, 248, 248);
    display: flex;
    justify-content: center;
    align-items: center;
}
.attendance{
  height:100%;
  width: 100%;
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
.modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
}
.modal-body {
    position: relative;
    padding: 0px 0px 10px 20px;
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
    height: calc(100% - 85px);
    overflow-y: scroll;
    overflow-x: hidden;
    /* position: relative; */
  }
  .uncommonpiece{
    display:inline-flex;
    width: 100%;
    margin:auto;
    margin-top:10px;
    text-align:left;
    background-color: white;
  }
  .rulecotent{
    display:inline-grid;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: calc(80% - 20px);
  }
  .rightside{
    width: 20%;
    text-align: right;
    margin: auto;
  }
  .fastyle{
    margin-top:50%;
    margin-right: 10px;
  }
  .contentspan{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .secondspan{
    margin-top:10px;
    font-size:small;
    color:rgb(165,165,165);
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

  button{
    background-color:white;
    border-width:inherit;
  }
  button:focus{
    /* color: #fff; */
    /* background: #0a90f5; */
    background: white;
    outline: none;
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
  }
  .descrip{
    /* width: calc(75% - 20px); */
    text-align: right;
    margin: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .fastyle{
    margin: auto;
    margin-right: 10px;
  }
</style>
