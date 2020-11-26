<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="title" style="align-items:center;">{{ msg }}</div>
        <div class="opete" style="align-items:center;">
          <button @click="saveGrup" >保存</button>
          <button @click="closeSelf" >返回</button>
        </div>
      </div>
      <hr style="margin-top: 0px"/>
      <div class="contentbody">
        <div class="commonpiece" @click="showInputModal('attendname')">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>考勤组名称</span>
              <span style="color: #ff0000">*</span>
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
              <span style="color: #ff0000">*</span>
            </div>
            <div class="descrip">
              <span class="spanstyle" v-for="(item, index) in newGroup.departs" :key="'d' + index" >{{ item.name }}</span>
              <span class="spanstyle" v-for="(item, index) in newGroup.users" :key="'u' + index" >{{ item.name }}</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
        <div class="commonpiece" @click="showSearchModal('attendpeople')">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles">
              <span>考勤组管理员</span>
              <span style="color: #ff0000">*</span>
            </div>
            <div class="descrip">
              <span class="spanstyle" v-for="(item, index) in newGroup.admins" :key="'a' + index" >{{ item.name }}</span>
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
        <div class="commonpiece" @click="delGroup" v-if="isEditGroup">
          <div class="titlehead" style="display: inline-flex; width:100%;">
            <div class="titles" style="text_agin: center">
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
      <input-modal v-if="showInput" :titlename="'请输入'" :inputtxt="inputTxt" @getinput="getInput" v-on:closeinput="closeInput"></input-modal>
      <search-modal v-if="showSearch" :titlename="'编辑'" :onlyUser="onlyUser" :existlist="existList" @getsearch="getSearch" v-on:closesearch="closeSearch"></search-modal>
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
    },
    userID: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      msg: '编辑考勤组',
      showSearch: false,
      showInput: false,
      onlyUser: false,
      editAuthority: false,
      marktype: '',
      inputTxt: '',
      existList: {
        departs: [],
        users: []
      },
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
      this.existdate.admins = []
      this.existdate.departs = []
      this.existdate.users = []
      this.$emit('closeedit')
    },
    saveGrup () {
      this.updateGroup()
    },
    openMsg (message) {
      this.$confirm(message, '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        type: 'warning'
      }).then(() => {}).catch(() => {})
    },
    showInputModal (mark) {
      this.marktype = mark
      if (mark === 'attendname') {
        this.inputTxt = this.newGroup.name
      }
      if (mark === 'attenddes') {
        this.inputTxt = this.newGroup.descrise
      }
      this.showInput = !this.showInput
    },
    getInput (msg) {
      if (this.marktype === 'attendname') {
        this.newGroup.name = msg
      }
      if (this.marktype === 'attenddes') {
        this.newGroup.descrise = msg
      }
    },
    closeInput () {
      this.showInput = !this.showInput
    },
    showSearchModal (mark) {
      this.marktype = mark
      if (mark === 'attendrange') {
        this.onlyUser = false
        this.existList.departs = this.newGroup.departs
        this.existList.users = this.newGroup.users
      }
      if (mark === 'attendpeople') {
        this.onlyUser = true
        this.existList.departs = []
        this.existList.users = this.newGroup.admins
      }
      this.showSearch = !this.showSearch
    },
    getSearch (msg) {
      if (this.marktype === 'attendrange') {
        this.newGroup.departs = msg.departs
        this.newGroup.users = msg.users
      }
      if (this.marktype === 'attendpeople') {
        this.onlyUser = false
        this.newGroup.admins = msg.users
      }
    },
    closeSearch () {
      this.showSearch = !this.showSearch
    },
    getAdminId () {
      var adminId = []
      for (var index in this.newGroup.admins) {
        if (this.newGroup.admins[index].employeeId === this.userID) {
          this.editAuthority = true
        }
        adminId.push(this.newGroup.admins[index].employeeId)
      }
      return adminId.toString()
    },
    getDepartId () {
      var adminId = []
      for (var index in this.newGroup.departs) {
        adminId.push(this.newGroup.departs[index].departmentId)
      }
      return adminId.toString()
    },
    getUserId () {
      var adminId = []
      for (var index in this.newGroup.users) {
        adminId.push(this.newGroup.users[index].employeeId)
      }
      return adminId.toString()
    },
    updateGroup () {
      if (!this.newGroup.name) {
        this.openMsg('考勤组名称不能为空')
        return
      }
      if (this.newGroup.admins.length === 0) {
        this.openMsg('考勤组管理员不能为空')
        return
      }
      if (this.newGroup.departs.length === 0 && this.newGroup.users.length === 0) {
        this.openMsg('考勤组范围不能为空')
        return
      }
      // var groupparam = {
      //   group: {
      //     id: this.newGroup.id,
      //     groupName: this.newGroup.name,
      //     administratorsId: this.getAdminId(),
      //     descrise: this.newGroup.descrise
      //   },
      //   departs: this.getDepartId(),
      //   users: this.getUserId()
      // }
      if (this.isEditGroup) {
        this.$axios.post('/user/group/update/', {
          group: {
            id: this.newGroup.id,
            creator: this.userID,
            groupName: this.newGroup.name,
            administratorsId: this.getAdminId(),
            descrise: this.newGroup.descrise
          },
          departs: this.getDepartId(),
          users: this.getUserId()
        }).then(res => {
          if (res.data.flag) {
            this.openMsg('修改成功')
            this.updataAuthority()
            this.$router.go(0)
            // this.$router.push('/addadmin')
          } else {
            this.editAuthority = false
            this.openMsg(res.data.msg)
          }
        }).catch(error => {
          console.log(error)
          this.editAuthority = false
          this.openMsg('发送请求失败！')
        })
      } else {
        this.$axios.post('/user/group/add/', {
          group: {
            groupName: this.newGroup.name,
            creator: this.userID,
            administratorsId: this.getAdminId(),
            descrise: this.newGroup.descrise
          },
          departs: this.getDepartId(),
          users: this.getUserId()
        }).then(res => {
          if (res.data.flag) {
            this.openMsg('创建成功')
            this.updataAuthority()
            this.$router.go(0)
            // this.$router.push('/addadmin')
          } else {
            this.editAuthority = false
            this.openMsg(res.data.msg)
          }
        }).catch(error => {
          console.log(error)
          this.editAuthority = false
          this.openMsg('发送请求失败！')
        })
      }
    },
    updataAuthority () {
      var oldAuthority = sessionStorage.getItem('authority')
      if (oldAuthority === '4' && this.editAuthority) {
        sessionStorage.setItem('authority', 5)
      } else if (oldAuthority === '5' && !this.editAuthority) {
        sessionStorage.setItem('authority', 4)
      }
    },
    async delGroup () {
      // this.confirm
      const confirmResult = await this.$confirm('此操作将永久删除此考勤组，是否确认？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult === 'confirm'){
        this.$axios.post('/user/group/delete/' + this.newGroup.id).then(res => {
          if (res.data.flag) {
            this.openMsg('删除成功')
            this.$router.go(0)
          } else {
            this.openMsg(res.data.msg)
          }
        }).catch(error => {
          console.log(error)
          this.openMsg('发送请求失败！')
        })
      } else {
        this.$message.info('删除失败')
      }
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
    width: 30%;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .descrip{
    width: calc(65% - 20px);
    text-align: right;
    margin: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .fastyle{
    margin: auto;
    width: 5%;
  }
  .spanstyle{
    margin: auto;
    margin-right: 10px;
    font-size: small;
    color:rgb(165, 165, 165);
  }

  .el-message-box{
    max-width: 50%;
  }
</style>
