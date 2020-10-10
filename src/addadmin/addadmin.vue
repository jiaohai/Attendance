<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common" v-if="!isaddAddmin">
        <i class="fa fa-plus" @click="addAddmin" />
      </div>
      <div class="more common" v-if="isaddAddmin">
        <i class="fa fa-floppy-o" @click="saveAddmin" />
      </div>
    </div>
    <div class="contentbody" v-if="isaddAddmin">
      <div class="commonpiece" @click="showInputModal('attendname')">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <div class="titles">
            <span>考勤组名称</span>
          </div>
          <div class="descrip" style="display: inline-flex;">
            <span class="spanstyle">{{ newAttendanceGroup.name }}</span>
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
            <span class="spanstyle" v-for="(item, index) in newAttendanceGroup.department" :key="index" >{{ item.name }}</span>
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
            <span class="spanstyle" v-for="(item, index) in newAttendanceGroup.people" :key="index" >{{ item.name }}</span>
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
            <span class="spanstyle">{{ newAttendanceGroup.des }}</span>
          </div>
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
    </div>
    <div class="contentbody" v-if="attendanceList.length !== 0 && !isaddAddmin">
      <div class="uncommonpiece" v-for="item in attendanceList" :key="item.id">
        <div class="rulecotent">
          <span class="contentspan">{{ item.name }}</span>
          <span class="contentspan secondspan">管理员：{{ item.people.name }}</span>
        </div>
        <div class="rightside">
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
    </div>
    <div class="bottoming">
      <button class="clock-in bottomchildre" :class="$route.path.indexOf('check') !== -1 ? 'colortext' : 'colorcommon' " v-if="showcheck" @click="gocheck">
        <i class="fa fa-map-marker" />
        <span>打卡</span>
      </button>
      <button class="statistics bottomchildre" :class="$route.path.indexOf('statistics') !== -1 ? 'colortext' : 'colorcommon' " v-if="showstatistics" @click="gostatistics">
        <i class="fa fa-pie-chart" />
        <span>统计</span>
      </button>
      <button class="rule bottomchildre" :class="$route.path.indexOf('rule') !== -1 ? 'colortext' : 'colorcommon' " v-if="showrule" @click="gorule">
        <i class="fa fa-sliders " />
        <span>规则</span>
      </button>
      <button class="setting bottomchildre" :class="$route.path.indexOf('addadmin') !== -1 ? 'colortext' : 'colorcommon' " v-if="showsetting" @click="gosetting">
        <i class="fa fa-cog" />
        <span>设置</span>
      </button>
    </div>
    <input-modal v-if="showInput" :titlename="'请输入'" :inputtxt="inputTxt" @getinput="getInput" v-on:closeinput="closeInput"></input-modal>
    <search-modal v-if="showSearch" :titlename="'添加'" :showAdd="isexist" :existlist="existList" @getsearch="getSearch" v-on:closesearch="closeSearch"></search-modal>
  </div>
</template>

<script>

import searchModal from '../components/searchModal'
import inputModal from '../components/inputModal'

export default {
  name: 'addadmin',
  data () {
    return {
      msg: '设置',
      showcheck: true,
      showstatistics: true,
      showrule: true,
      showsetting: true,
      attendanceList: [],
      isexist: false,
      showSearch: false,
      showInput: false,
      marktype: '',
      inputTxt: '',
      existList: [],
      user: {},
      isaddAddmin: false,
      newAttendanceGroup: {
        name: '',
        people: [],
        department: [],
        des: ''
      }
    }
  },
  created: function () {
    this.user = this.$route.query.user
    this.getAttendce()
    if (this.attendanceList.length === 0) {
      this.isaddAddmin = true
    }
  },
  components: {
    inputModal,
    searchModal
  },
  methods: {
    getAttendce () {
      this.attendanceList = [
        {
          id: 1,
          name: '考情组一',
          people: {
            name: '赵一'
          }
        },
        {
          id: 2,
          name: '考情组二',
          people: {
            name: '钱二'
          }
        },
        {
          id: 3,
          name: '考情组三',
          people: {
            name: '孙三'
          }
        }
      ]
    },
    goBackThing () {
      window.history.go(-1)
    },
    addAddmin () {
      this.isaddAddmin = !this.isaddAddmin
    },
    saveAddmin () {
      this.isaddAddmin = !this.isaddAddmin
    },
    gocheck () {
      this.$router.push('/check')
    },
    goSearch () {
      this.$router.push('/search')
    },
    gostatistics () {
      this.$router.push('/statistics')
    },
    gorule () {
      this.$router.push('/rule')
    },
    gosetting () {
      this.$router.push('/addadmin')
    },
    showInputModal (mark) {
      this.marktype = mark
      if (mark === 'attendname') {
        this.inputTxt = this.newAttendanceGroup.name
      }
      if (mark === 'attenddes') {
        this.inputTxt = this.newAttendanceGroup.des
      }
      this.showInput = !this.showInput
    },
    getInput (msg) {
      if (this.marktype === 'attendname') {
        this.newAttendanceGroup.name = msg
      }
      if (this.marktype === 'attenddes') {
        this.newAttendanceGroup.des = msg
      }
    },
    closeInput () {
      this.showInput = !this.showInput
    },
    showSearchModal (mark) {
      this.marktype = mark
      if (mark === 'attendrange') {
        this.existList = JSON.parse(JSON.stringify(this.newAttendanceGroup.department))
      }
      if (mark === 'attendpeople') {
        this.existList = JSON.parse(JSON.stringify(this.newAttendanceGroup.people))
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
        this.newAttendanceGroup.department = JSON.parse(JSON.stringify(msg))
      }
      if (this.marktype === 'attendpeople') {
        this.newAttendanceGroup.people = JSON.parse(JSON.stringify(msg))
      }
    },
    closeSearch () {
      this.showSearch = !this.showSearch
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  .bottoming {
    position:fixed;
    display:flex;
    flex:0;
    width:100%;
    height:40px;
    bottom:0px;
    background-color:white;
  }
  .bottomchildre{
    display: grid;
    margin-top:5px;
    width: 100%;
  }
  .colortext{
    color: rgb(26, 138, 190);
  }
  .colorcommon{
    color: rgb(170, 170, 170);
  }
</style>
