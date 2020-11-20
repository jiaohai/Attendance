<template>
  <div class="attendance" style="height: 100%">
    <div class="heading">
      <div class="title" style="align-items:center;">{{ msg }}</div>
      <div class="opete" style="align-items:center;">
        <button @click="showEditGroup(newAttendanceGroup, 'new')" >创建</button>
        <!-- <button @click="goBackThing" >返回</button> -->
      </div>
    </div>
    <hr style="margin-top: 0px"/>
    <div class="contentbody" style="height: calc(100% - 86px);" v-if="isLoad">
      <el-main v-loading="isLoad" style="height: 100%;"></el-main>
    </div>
    <div class="contentbody" v-loading="false" style="height: calc(100% - 86px);" v-show="!isLoad">
      <div class="uncommonpiece" v-if="attendanceList.length === 0">
        <div class="rulecotent">
          <span class="contentspan">没有数据，请新建考勤组</span>
        </div>
      </div>
      <div class="uncommonpiece" v-for="(item, index) in attendanceList" :key="index" @click="showEditGroup(item, 'edit')">
        <div class="rulecotent">
          <span class="contentspan">{{ item.name }}</span>
          <span class="contentspan secondspan" v-if="item.admins.length === 0" >管理员：</span>
          <span class="contentspan secondspan" v-if="item.admins.length === 1" >管理员：{{ item.admins[0].name }}</span>
          <span class="contentspan secondspan" v-if="item.admins.length > 1" >管理员：{{ item.admins[0].name }} 等{{ item.admins.length }}位</span>
        </div>
        <div class="rightside">
          <i class="fa fastyle fa-angle-right" />
        </div>
      </div>
    </div>
    <div class="bottoming" v-if="showfoot">
      <button class="clock-in bottomchildre" :class="$route.path.indexOf('check') !== -1 ? 'colortext' : 'colorcommon' " @click="gocheck">
        <i class="fa fa-map-marker" />
        <span>打卡</span>
      </button>
      <button class="statistics bottomchildre" :class="$route.path.indexOf('statistics') !== -1 ? 'colortext' : 'colorcommon' " v-if="showS || showR" @click="gostatistics">
        <i class="fa fa-pie-chart" />
        <span>统计</span>
      </button>
      <button class="rule bottomchildre" :class="$route.path.indexOf('rule') !== -1 ? 'colortext' : 'colorcommon' " v-if="showR" @click="gorule">
        <i class="fa fa-sliders " />
        <span>规则</span>
      </button>
      <button class="setting bottomchildre" :class="$route.path.indexOf('addadmin') !== -1 ? 'colortext' : 'colorcommon' " v-if="showA" @click="gosetting">
        <i class="fa fa-cog" />
        <span>考勤组</span>
      </button>
    </div>
    <edit-group v-if="isEdit" :existdate="editGroupData" :userID="userId" :isEditGroup="needEdit" @getedit="getEdit" v-on:closeedit="closeEdit"></edit-group>
  </div>
</template>

<script>

import editGroup from '../components/editGroup'

export default {
  name: 'addadmin',
  data () {
    return {
      msg: '考勤组设置',
      isLoad: true,
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
      userId: null,
      authority: null,
      isaddAddmin: false,
      editGroupData: {},
      newAttendanceGroup: {
        id: null,
        name: '',
        admins: [],
        departs: [],
        users: [],
        descrise: ''
      },
      showfoot: false,
      showS: false,
      showR: false,
      showA: false
    }
  },
  created: function () {
    // this.userId = this.$route.query.userId
    // this.authority = parseInt(this.$route.query.authority)
    this.userId = sessionStorage.getItem('userId')
    this.authority = parseInt(sessionStorage.getItem('authority'))
    if (this.authority > 1) {
      this.showfoot = true
    }
    if (this.authority === 2) {
      this.showS = true
    } else if (this.authority === 3) {
      this.showR = true
    } else if (this.authority === 4) {
      this.showA = true
    } else if (this.authority === 5) {
      this.showS = true
      this.showR = true
      this.showA = true
    }
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
      this.$axios.get('/groupApi/group/groupAndDepart?creatorId=' + this.userId).then(res => {
        if (res.data.flag) {
          this.attendanceList = res.data.data.allGroup
          this.isLoad = false
        } else {
          this.openMsg(res.data.msg)
          this.isLoad = false
        }
      }).catch(error => {
        console.log(error)
        this.openMsg('发送请求失败！')
        this.isLoad = false
      })
    },
    openMsg (message) {
      this.$confirm(message, '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        type: 'warning'
      }).then(() => {}).catch(() => {})
    },
    goBackThing () {
      window.history.go(-1)
    },
    gocheck () {
      if (this.$route.path === '/check') {
        return
      }
      this.$router.push('/check')
    },
    gostatistics () {
      if (this.$route.path === '/statistics') {
        return
      }
      this.$router.push('/statistics')
    },
    gorule () {
      if (this.$route.path === '/rule') {
        return
      }
      this.$router.push('/rule')
    },
    gosetting () {
      if (this.$route.path === '/addadmin') {
        return
      }
      this.$router.push('/addadmin')
    },
    showEditGroup (item, type) {
      this.editGroupData = {
        id: item.id,
        name: item.name,
        admins: item.admins,
        departs: item.departs,
        users: item.users,
        descrise: item.descrise
      }
      if (type === 'edit') { this.needEdit = true }
      this.isEdit = !this.isEdit
    },
    getEdit (msg) {
      // this.editGroupData = msg
      // if (!this.needEdit) {
      //   this.attendanceList.push(msg)
      // }
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
    width: calc(90% - 20px);
  }
  .rightside{
    width: 10%;
    text-align: center;
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
