<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common" @click="saveSearch(false)" v-if="isedit">
          <span>确定</span>
        </div>
        <div class="more common" @click="editList" v-if="isshowExist && !isedit">
          <span>编辑</span>
        </div>
      </div>
      <div class="commonpiece" v-if="showadd">
        <div class="titlehead" style="display: inline-flex; width:100%;" v-if="issearch">
          <div style="width: 100%; display: inline-flex;">
            <input id="focusinput" checked autocomplete="off" v-model="inputvlue" placeholder="搜索" v-on:input="searchDate"/>
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
          <span v-for="(item, index) in depatmentlist" :key="index" @click="getDepartment(item)">
            {{ item.name }}
            <i class="fa fa-angle-right" v-if="depatmentlist.length !== index + 1" />
          </span>
        </div>
        <div class="options">
          <div class="alloption" v-for="(item, index) in datalist" :key="index">
            <i class="fa fa-circle-o circle" v-if="!item.ischecked" @click="changeCheck(item)"/>
            <i class="fa fa-check-circle circle " v-if="item.ischecked" @click="changeCheck(item)"/>
            <div class="user" @click="getNextLevel(item)">
              <div >
                <img :src="item.avatarurl" v-if="!item.isdepantment" width="30" height="30" />
                <i class="fa fa-folder fa-2x" v-if="item.isdepantment" style="width: 30px; height: 30px;" />
              </div>
              <div style="margin: 5px auto auto 0px;">
                <span style="padding-left: 10px;margin-top: 5px;">{{ item.name }}</span>
              </div>
              <div v-if="item.isdepantment" style="margin: 5px 10px 5px 5px;">
                <i class="fa fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottoming" v-if="showadd">
        <div class="checkedlist">
          <div v-for="(item, index) in existlist" :key="index" style="margin: auto 0px auto 5px;">
            <div class="checker" v-if="!item.isdepantment" >
              <img :src="item.avatarurl" v-if="!item.isdepantment" width="30" height="30" />
            </div>
            <div class="checker" v-if="item.isdepantment" >
              <div style="padding: 5px;">
                <i class="fa fa-folder fa-1x" v-if="item.isdepantment" />
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="determin" style="margin: auto;" @click="seveData">
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
          <div class="alloption" v-for="(item, index) in tempexist" :key="index">
            <div class="user">
              <div >
                <img :src="item.avatarurl" v-if="!item.isdepantment" width="30" height="30" />
                <i class="fa fa-folder fa-2x" v-if="item.isdepantment" style="width: 30px; height: 30px;" />
              </div>
              <div style="margin: 5px auto auto 0px;">
                <span style="padding-left: 10px;margin-top: 5px;">{{ item.name }}</span>
              </div>
              <div v-if="isedit" style="margin: 5px 10px 5px 5px;" @click="delDate(item)">
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
      type: Array,
      default: () => []
    },
    titlename: {
      type: String,
      default: `0`
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
      datalist: [
        {
          name: '部门一',
          isdepantment: true,
          ischecked: false,
          id: 1
        },
        {
          name: '部门二',
          isdepantment: true,
          ischecked: false,
          id: 2
        },
        {
          name: '员工一',
          isdepantment: false,
          ischecked: false,
          di: 3
        },
        {
          name: '员工二',
          isdepantment: false,
          ischecked: false,
          id: 4
        }
      ],
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
      showadd: this.showAdd,
      isshowExist: !this.showAdd,
      tempexist: this.existlist
    }
  },
  created: function () {
  },
  // computed: {
  // },
  // mounted () {
  // },
  methods: {
    closeSelf () {
      this.$emit('closesearch')
    },
    addDate () {
      this.isshowExist = false
      this.isedit = false
      this.showadd = true
    },
    seveData () {
      this.$emit('getsearch', this.existlist)
      this.closeSelf()
    },
    clearSearch () {
      this.inputvlue = ''
    },
    saveSearch (iskeyinput) {
      this.isedit = !this.isedit
      this.existlist = this.tempexist
      // if (this.inputvlue) {
      //   this.$emit('getsearch', this.inputvlue)
      // } else {
      //   if (iskeyinput) {
      //     return
      //   }
      //   this.$emit('getsearch', this.inputtxt)
      // }
      // this.closeSelf()
    },
    searchDate () {
      // const temppartlist = this.depatmentlist[0]
      // this.depatmentlist = temppartlist
      this.datalist = [
        {
          name: '部门一',
          isdepantment: true,
          ischecked: false,
          id: 11
        },
        {
          name: '员工一',
          isdepantment: false,
          ischecked: false,
          di: 13
        }
      ]
    },
    editList () {
      this.isedit = !this.isedit
    },
    goSearch () {
      this.issearch = !this.issearch
    },
    getDepartment (item) {
      console.log(item)
      const temppartlist = []
      for (let i = 0; i < this.depatmentlist.length; i++) {
        if (this.depatmentlist[i].id === item.id) {
          break
        }
        temppartlist.push(this.depatmentlist[i])
      }
      this.depatmentlist = temppartlist
      this.getNextLevel(item)
    },
    getNextLevel (item) {
      if (!item.isdepantment) {
        return
      }
      this.depatmentlist.push(item)
      if (item.id === 0) {
        this.datalist = [
          {
            name: '部门一',
            isdepantment: true,
            ischecked: false,
            id: 1
          },
          {
            name: '部门二',
            isdepantment: true,
            ischecked: false,
            id: 2
          },
          {
            name: '员工一',
            isdepantment: false,
            ischecked: false,
            di: 3
          },
          {
            name: '员工二',
            isdepantment: false,
            ischecked: false,
            id: 4
          }
        ]
      } else {
        this.datalist = [
          {
            name: '部门一',
            isdepantment: true,
            ischecked: false,
            id: 11
          },
          {
            name: '员工一',
            isdepantment: false,
            ischecked: false,
            di: 13
          }
        ]
      }
    },
    changeCheck (item) {
      console.log(item)
      console.log(this.showAdd)
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].name === item.name) {
          this.datalist[i].ischecked = !this.datalist[i].ischecked
          if (this.datalist[i].ischecked) {
            this.existlist.push(this.datalist[i])
          } else {
            this.existlist.splice(this.existlist.indexOf(this.datalist[i], 1))
          }
        }
      }
    },
    delDate (item) {
      this.existlist.splice(this.existlist.indexOf(item, 1))
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
    position:fixed;
    display:flex;
    flex:0;
    width:100%;
    height:40px;
    bottom:0px;
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

  .colortext{
    color: rgb(26, 138, 190);
  }
  .colorcommon{
    color: rgb(170, 170, 170);
  }
</style>
