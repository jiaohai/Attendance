<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="title" style="align-items:center;">{{ titlename }}</div>
        <div class="opete" style="align-items:center;">
          <button @click="saveSearch(false)" v-if="isedit" >取消</button>
          <button @click="editList" v-if="isshowExist && !isedit" >编辑</button>
          <button @click="seveData" v-if="!showadd">返回</button>
          <button @click="returnData" v-if="showadd">返回</button>
        </div>
      </div>
      <hr style="margin-top: 0px"/>
      <!-- <div class="heading">
        <div class="black common" @click="seveData">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveSearch(false)" v-if="isedit">
          <span>取消</span>
        </div>
        <div class="more common" @click="editList" v-if="isshowExist && !isedit">
          <span>编辑</span>
        </div>
      </div> -->
      <div class="commonpiece" v-if="showadd">
        <div class="titlehead" style="display: inline-flex; width:100%;" v-if="issearch">
          <div style="width: 100%; display: inline-flex;">
            <input id="focusinput" checked autocomplete="off" v-model="inputvlue" placeholder="搜索" v-on:input="getSearchOptions"/>
            <i class="fa fa-close fastyle" v-if="inputvlue" @click="clearSearch" />
          </div>
          <span style="margin: auto 10px auto auto; white-space: nowrap;" @click="goSearch">取消</span>
        </div>
        <div class="titlehead" style="display: inline-flex; width:100%; height: 40px" v-if="!issearch" @click="goSearch">
          <span style="margin: 10px auto 10px auto; white-space: nowrap; height: 40px">搜索</span>
        </div>
      </div>
      <div class="optioncont" v-if="showadd">
        <div class="depatment">
          <span v-for="(iteml, indexl) in depatmentlist" :key="indexl" @click="getDepartment(iteml)">
            {{ iteml.name }}
            <i class="fa fa-angle-right" v-if="depatmentlist.length !== indexl + 1" />
          </span>
        </div>
        <div class="options" v-if="optionData.departs.length === 0 && optionData.users.length === 0">
          没有数据，请重新输入
        </div>
        <div class="options">
          <div class="alloption" v-for="(itemd, indexd) in optionData.departs" :key="'fitst' + indexd">
            <i class="fa fa-circle-o circle" v-if="deparstId.indexOf(itemd.departmentId) === -1 && newDeparts.indexOf(itemd.departmentId) === -1 && !parentChecked && !onlyUser" @click="changeCheck(itemd, 'depart')"/>
            <i class="fa fa-check-circle circleex " v-if="deparstId.indexOf(itemd.departmentId) > -1 && !onlyUser" @click="changeCheckDel(itemd, 'depart')"/>
            <i class="fa fa-check-circle circlege " v-if="newDeparts.indexOf(itemd.departmentId) > -1 && !onlyUser" @click="changeCheckDel(itemd, 'depart')"/>
            <i class="fa fa-check-circle circleex " v-if="deparstId.indexOf(itemd.departmentId) === -1  && newDeparts.indexOf(itemd.departmentId) === -1 && parentChecked  && !onlyUser" />
            <!-- <i class="fa fa-check-circle circleex " v-if="deparstId.indexOf(itemd.departmentId) > -1 && !parentChecked  && !onlyUser" @click="changeCheckDel(itemd, 'depart')"/>
            <i class="fa fa-check-circle circlege " v-if="newDeparts.indexOf(itemd.departmentId) > -1 && !parentChecked  && !onlyUser" @click="changeCheckDel(itemd, 'depart')"/>
            <i class="fa fa-check-circle circleex " v-if="parentChecked  && !onlyUser" /> -->
            <div class="user" @click="getNextLevel(itemd)">
              <div >
                <i class="fa fa-folder fa-2x fastylee" style="width: 30px; height: 30px;" />
              </div>
              <div style="margin: 5px auto auto 0px;">
                <span style="padding-left: 10px;margin-top: 5px;">{{ itemd.name }}</span>
              </div>
              <div style="margin: 5px 10px 5px 5px;">
                <i class="fa fa-angle-right" />
              </div>
            </div>
          </div>
          <div class="alloption" v-for="(itemo, indexo) in optionData.users" :key="'second' + indexo">
            <i class="fa fa-circle-o circle" v-if="usersId.indexOf(itemo.employeeId) === -1 && newUsers.indexOf(itemo.employeeId) === -1 && !parentChecked" @click="changeCheck(itemo, 'user')"/>
            <i class="fa fa-check-circle circleex " v-if="usersId.indexOf(itemo.employeeId) > -1 && !parentChecked" @click="changeCheckDel(itemo, 'user')"/>
            <i class="fa fa-check-circle circlege " v-if="newUsers.indexOf(itemo.employeeId) > -1" @click="changeCheckDel(itemo, 'user')"/>
            <i class="fa fa-check-circle circleex " v-if="parentChecked " />
            <!-- <i class="fa fa-check-circle circlege " v-if="usersId.indexOf(itemo.employeeId) > -1 && !parentChecked" @click="changeCheckDel(itemo, 'user')"/>
            <i class="fa fa-check-circle circlege " v-if="newUsers.indexOf(itemo.employeeId) > -1 && !parentChecked" @click="changeCheckDel(itemo, 'user')"/>
            <i class="fa fa-check-circle circleex " v-if="parentChecked  && !onlyUser" /> -->
            <div class="user">
              <div >
                <img :src="itemo.avatar" width="30" height="30" />
              </div>
              <div style="margin: 5px auto auto 0px;">
                <span style="padding-left: 10px;margin-top: 5px;">{{ itemo.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottoming" v-if="showadd">
        <div class="checkedlist">
          <div v-for="(itemi, indexi) in addDeparts" :key="'third' + indexi" style="margin: auto 0px auto 5px;">
            <div class="checker">
              <div style="padding: 5px;">
                <i class="fa fa-folder fa-1x" />
                {{ itemi.name }}
              </div>
            </div>
          </div>
          <div v-for="(itemu, indexu) in addUsers" :key="'foutth' + indexu" style="margin: auto 0px auto 5px;">
            <div class="checker">
              <img :src="itemu.avatar" width="30" height="30" />
            </div>
          </div>
        </div>
        <div class="determin" style="margin: auto;" @click="returnData">
          <span>确定</span>
        </div>
      </div>
      <div class="existstyle" v-if="isshowExist">
        <div class="addtitle" @click="addDate">
          <i class="fa fa-plus" style="font-size: x-large; margin: auto 0px auto 25px;"/>
          <div style="margin: 5px auto auto 0px;">
            <span style="padding-left: 10px;margin-top: 5px;">添加</span>
          </div>
        </div>
        <div class="options">
          <div class="alloption" v-for="(iteme, indexe) in tempexist.departs" :key="'fivth' + indexe">
            <div class="user">
              <div >
                <i class="fa fa-folder fa-2x fastylee" v-if="!onlyUser" style="width: 30px; height: 30px;" />
              </div>
              <div style="margin: 5px auto auto 0px;">
                <span style="padding-left: 10px;margin-top: 5px;">{{ iteme.name }}</span>
              </div>
              <div v-if="isedit" style="margin: 5px 10px 5px 5px;" @click="delDate(iteme, 'depart')">
                <i class="fa fa-close" />
              </div>
            </div>
          </div>
          <div class="alloption" v-for="(itemr, indexr) in tempexist.users" :key="'sixth' + indexr">
            <div class="user">
              <div >
                <img :src="itemr.avatar" width="30" height="30" />
              </div>
              <div style="margin: 5px auto auto 0px;">
                <span style="padding-left: 10px;margin-top: 5px;">{{ itemr.name }}</span>
              </div>
              <div v-if="isedit" style="margin: 5px 10px 5px 5px;" @click="delDate(itemr, 'user')">
                <i class="fa fa-close" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchModal',
  props: {
    existlist: {
      type: Object,
      default: () => {}
    },
    titlename: {
      type: String,
      default: ''
    },
    onlyUser: {
      type: Boolean,
      default: false
    },
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  // created: {
  // },
  data () {
    return {
      inputvlue: '',
      checked: true,
      depatmentlist: [
        {
          name: '通讯录',
          isdepantment: false,
          id: 0
        }
      ],
      isedit: false,
      showDel: false,
      issearch: false,
      showadd: true,
      isshowExist: false,
      parentChecked: false,
      parentCheckedID: [],
      tempexist: this.existlist,
      departAndUser: [],
      optionData: {
        departs: [],
        users: []
      },
      addDeparts: [],
      addUsers: [],
      newDeparts: [],
      newUsers: [],
      deparstId: [],
      usersId: []
    }
  },
  created: function () {
    this.initData()
  },
  // computed: {
  // },
  // mounted () {
  // },
  methods: {
    initData () {
      for (let i = 0; i < this.existlist.departs.length; i++) {
        this.deparstId.push(this.existlist.departs[i].departmentId)
        this.departAndUser.push(this.existlist.departs[i])
      }
      for (let i = 0; i < this.existlist.users.length; i++) {
        this.usersId.push(this.existlist.users[i].employeeId)
        this.departAndUser.push(this.existlist.users[i])
      }
      if (this.departAndUser.length > 0) {
        this.isshowExist = true
        this.showadd = false
      }
      this.getOptions('')
    },
    openMsg (message) {
      this.$confirm(message, '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        type: 'warning'
      }).then(() => {}).catch(() => {})
    },
    closeSelf () {
      this.$emit('closesearch')
    },
    addDate () {
      this.getDepartment({name: '通讯录', isdepantment: false, id: 0})
      this.isshowExist = false
      this.isedit = false
      this.showadd = true
    },
    returnData () {
      for (let i = 0; i < this.addDeparts.length; i++) {
        this.tempexist.departs.push(this.addDeparts[i])
        this.deparstId.push(this.addDeparts[i].departmentId)
      }
      for (let i = 0; i < this.addUsers.length; i++) {
        this.tempexist.users.push(this.addUsers[i])
        this.usersId.push(this.addUsers[i].employeeId)
      }
      this.isshowExist = true
      this.isedit = true
      this.showadd = false
      this.parentChecked = false
      this.addDeparts = []
      this.addUsers = []
      this.newDeparts = []
      this.newUsers = []
    },
    seveData () {
      this.$emit('getsearch', this.tempexist)
      this.closeSelf()
    },
    clearSearch () {
      this.inputvlue = ''
    },
    saveSearch (iskeyinput) {
      this.isedit = !this.isedit
      this.existlist = this.tempexist
    },
    getSearchOptions (item) {
      if (this.inputvlue === '') {
        return
      }
      this.$axios.get('/groupApi/depart/userAndDepart/Search/', {
        params: {
          searchKey: this.inputvlue
        }
      }).then(res => {
        if (res.data.flag) {
          this.optionData = res.data.data
        } else {
          this.openMsg(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
        this.openMsg('发送请求失败！')
      })
    },
    getOptions (item) {
      let paramsData
      if (item === '') {
        paramsData = {
          departOnly: false,
          type: 'group'
        }
      } else {
        paramsData = {
          departOnly: false,
          parentId: item,
          type: 'group'
        }
      }
      this.$axios.get('/groupApi/depart/findNextDepAndEmp/', {
        params: paramsData
      }).then(res => {
        if (res.data.flag) {
          this.optionData = res.data.data
        } else {
          this.openMsg(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
        this.openMsg('发送请求失败！')
      })
    },
    editList () {
      this.isedit = !this.isedit
    },
    goSearch () {
      this.issearch = !this.issearch
    },
    getDepartment (item) {
      const temppartlist = []
      var tempParentId = []
      for (let i = 0; i < this.depatmentlist.length; i++) {
        if (this.depatmentlist[i].id !== item.id) {
          temppartlist.push(this.depatmentlist[i])
        } else {
          break
        }
        // temppartlist.push(this.depatmentlist[i])
      }
      for (let i = 0; i < this.parentCheckedID.length; i++) {
        if (this.parentCheckedID[i] !== item.departmentId) {
          tempParentId.push(this.parentCheckedID[i])
        } else {
          break
        }
        // temppartlist.push(this.depatmentlist[i])
      }
      this.parentCheckedID = tempParentId
      this.depatmentlist = temppartlist
      this.getNextLevel(item)
    },
    getNextLevel (item) {
      if (item === 0) {
        this.parentChecked = false
        this.parentCheckedID = []
        this.getOptions('')
      } else {
        if (this.deparstId.indexOf(item.departmentId) > -1 || this.newDeparts.indexOf(item.departmentId) > -1) {
          this.parentCheckedID.push(item.departmentId)
          this.parentChecked = true
        } else {
          if (this.parentCheckedID.indexOf(item.parentId) > -1) {
            this.parentCheckedID.push(item.departmentId)
            this.parentChecked = true
          } else {
            this.parentChecked = false
          }
        }
        this.depatmentlist.push(item)
        this.getOptions(item.departmentId)
      }
    },
    changeCheckDel (item, type) {
      var tempData = []
      var tempIds = []
      if (type === 'depart') {
        for (let i = 0; i < this.addDeparts.length; i++) {
          if (this.addDeparts[i].departmentId !== item.departmentId) {
            tempData.push(this.addDeparts[i])
            tempIds.push(this.addDeparts[i].departmentId)
          }
        }
        this.addDeparts = tempData
        this.newDeparts = tempIds
      } else {
        for (let i = 0; i < this.addUsers.length; i++) {
          if (this.addUsers[i].employeeId !== item.employeeId) {
            tempData.push(this.addUsers[i])
            tempIds.push(this.addUsers[i].employeeId)
          }
        }
        this.addUsers = tempData
        this.newUsers = tempIds
      }
    },
    changeCheck (item, type) {
      if (type === 'depart') {
        this.addDeparts.push(item)
        this.newDeparts.push(item.departmentId)
      } else {
        this.addUsers.push(item)
        this.newUsers.push(item.employeeId)
      }
    },
    refreshExist () {
      this.parentChecked = false
      this.deparstId = []
      this.usersId = []
      for (let i = 0; i < this.tempexist.departs.length; i++) {
        this.deparstId.push(this.tempexist.departs[i].departmentId)
      }
      for (let i = 0; i < this.tempexist.users.length; i++) {
        this.usersId.push(this.tempexist.users[i].employeeId)
      }
    },
    delDate (item, type) {
      var tempWorData = []
      if (type === 'depart') {
        for (let i = 0; i < this.tempexist.departs.length; i++) {
          if (this.tempexist.departs[i].departmentId !== item.departmentId) {
            tempWorData.push(this.tempexist.departs[i])
          }
        }
        this.tempexist.departs = tempWorData
        // this.tempexist.departs.splice(this.tempexist.departs.indexOf(item.departmentId, 1))
      } else {
        for (let i = 0; i < this.tempexist.users.length; i++) {
          if (this.tempexist.users[i].employeeId !== item.employeeId) {
            tempWorData.push(this.tempexist.users[i])
          }
        }
        this.tempexist.users = tempWorData
        // this.tempexist.users.splice(this.tempexist.users.indexOf(item.employeeId, 1))
      }
      this.refreshExist()
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
    height: 40px;
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
  .fastyle{
    margin: auto 10px auto 10px;
    color: rgb(165, 165, 165);
  }
  .fastylee{
    color: rgba(21, 164, 221)
  }
  .spanstyle{
    margin: auto;
    margin-right: 10px;
    font-size: small;
    color:rgb(165, 165, 165);
  }
  input{
    width: 100%;
    margin: 1px 10px 1px 10px;
    height: 35px;
    border: 0;
    outline: none;
    font-size: inherit;
  }

  .depatment{
    display: inherit;
    width: calc(100% - 15px);
    height: 30px;
    /* text-align: left; */
    margin-top: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 5px;
    border-bottom: 1px solid rgb(238, 238, 238);
    overflow-x: scroll;
    white-space: nowrap;
  }
  ::-webkit-scrollbar {
    height: 0;
  }
  .optioncont{
    background-color: white;
    height: calc(100% - 145px);
    text-align: left;
  }
  .options{
    display: inline-grid;
    margin: 0px auto 0px 10px;
    width: 100%;
    overflow-y: scroll;
    max-height: calc(100% - 41px);
  }
  .circle{
    font-size: x-large;
    color: darkgrey;
    margin: auto 0px auto 0px;
  }
  .circlege{
    font-size: x-large;
    color: rgb(34, 156, 226);
    margin: auto 0px auto 0px;
  }
  .circleex{
    font-size: x-large;
    color: rgb(146, 206, 230);
    margin: auto 0px auto 0px;
  }

  .alloption{
    display: inline-flex;
    margin: 5px auto 0px 0px;
    width: calc(100% - 10px);
  }
  .user{
    margin: 3px auto 0px 15px;
    border-bottom: 1px solid rgb(238, 238, 238);
    width: calc(100% - 24px);
    display: inline-flex;
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

  .bottoming {
    background-color: rgb(248, 248, 248);
  }
  .checkedlist{
    display: inherit;
    width: calc(80% - 15px);
    height: 30px;
    /* text-align: left; */
    /* margin-top: 10px; */
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 5px;
    border-top: 1px solid rgb(238, 238, 238);
    overflow-x: scroll;
    white-space: nowrap;
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .checker{
    height: 30px;
    background-color: lightgray;
  }
  .existstyle{
    background-color: white;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 55px);
  }
</style>
