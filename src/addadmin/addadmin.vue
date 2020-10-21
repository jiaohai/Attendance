<template>
  <div class="attendance" style="height: 100%">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common">
        <i class="fa fa-plus" @click="showEditGroup(newAttendanceGroup, 'new')" />
      </div>
    </div>
    <div class="contentbody" style="height: calc(100% - 86px);">
      <div class="uncommonpiece" v-for="(item, index) in attendanceList" :key="index" @click="showEditGroup(item, 'edit')">
        <div class="rulecotent">
          <span class="contentspan">{{ item.name }}</span>
          <span class="contentspan secondspan" v-if="item.admins.length === 0" >管理员：</span>
          <span class="contentspan secondspan" v-for="(citem, cindex) in item.admins" :key="'a' + cindex">管理员：{{ citem.name }}</span>
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
    <edit-group v-if="isEdit" :existdate="editGroupData" :isEditGroup="needEdit" @getedit="getEdit" v-on:closeedit="closeEdit"></edit-group>
  </div>
</template>

<script>

import editGroup from '../components/editGroup'

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
      isEdit: false,
      needEdit: false,
      marktype: '',
      inputTxt: '',
      existList: [],
      user: {},
      isaddAddmin: false,
      editGroupData: {},
      newAttendanceGroup: {
        name: '',
        admins: [],
        departs: [],
        users: [],
        descrise: ''
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
    editGroup
  },
  methods: {
    getAttendce () {
      this.$axios.get('/groupApi/group/groupAndDepart/').then(res => {
        if (res.data.flag) {
          this.attendanceList = res.data.data.allGroup
        }
        console.log(res)
      })
    },
    goBackThing () {
      window.history.go(-1)
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
    showEditGroup (item, type) {
      console.log(type)
      this.editGroupData = item
      if (type === 'edit') { this.needEdit = true }
      this.isEdit = !this.isEdit
    },
    getEdit (msg) {
      this.editGroupData = msg
      if (!this.needEdit) {
        this.attendanceList.push(msg)
      }
      this.needEdit = false
    },
    closeEdit () {
      this.isEdit = !this.isEdit
      this.needEdit = false
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
    height: calc(100% - 45px);
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
