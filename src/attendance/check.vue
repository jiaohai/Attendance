<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common">
        <i class="fa fa-ellipsis-v" @click="controlShow" />
        <div class="selectpart" v-show="showmore">
          <div class="cover" @click="controlHide"></div>
          <div class="selectlist">
            <ul>
              <router-link to='/checkrecord' class="menu_li">
                <i class="fa fa-bars" style="padding-top: 3px;" />
                <div class="selectext">
                  打卡记录
                </div>
              </router-link>
              <router-link to='/application'  class="menu_li">
                <i class="fa fa-pencil-square-o" style="padding-top: 3px;" />
                <div class="selectext">
                  假勤申请
                </div>
              </router-link>
              <router-link to='/checksetting'  class="menu_li">
                <i class="fa fa-cog" style="padding-top: 3px;" />
                <div class="selectext">
                  打卡设置
                </div>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="miding">
      <div class="manner">
        <button class="work-check check" @click="changeCheckTpye">
          <span :class="showworkcheck ? 'colortext' : 'colorcommon' ">上下班打卡</span>
        </button>
        <button class="out-check check" @click="changeCheckTpye">
          <span :class="showoutcheck ? 'colortext' : 'colorcommon' ">外出打卡</span>
        </button>
      </div>
      <div class="operate" v-if="showworkcheck">
        <div class="showmpa">判断时候在打卡范围</div>
        <div class="checkbutton">
          <div class="buttonline">
            <button class="workbutton" @click="checkOntime">
              <span>{{ checkmassege }}</span>
            </button>
          </div>
        </div>
        <div class="massege">人员信息</div>
      </div>
      <div class="operate" v-if="showoutcheck">
        <div class="showmpa">显示打卡地址</div>
        <div class="checkbutton">
          <div class="buttonline">
            <button class="workbutton">
              <span>外出打卡</span>
            </button>
          </div>
        </div>
        <div class="massege">人员信息</div>
      </div>
    </div>
    <div class="bottoming" v-if="showfoot">
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
  </div>
</template>

<script>
export default {
  name: 'check',
  data () {
    return {
      msg: '打卡',
      checkmassege: '未打卡',
      checkcount: 0,
      showmore: false,
      showworkcheck: true,
      showoutcheck: false,
      showfoot: true,
      showcheck: true,
      showstatistics: true,
      showrule: true,
      showsetting: true,
      resultData: {
        userId: '',
        username: '',
        canAttendance: true,
        workType: '上班打卡', // 下班打卡
        workTime: '',
        position: {
          latitude: '',
          longitude: '',
          name: '',
          address: '',
          rang: ''
        },
        attendanceTeam: {
          name: '',
          id: ''
        }
      }
    }
  },
  methods: {
    controlShow () {
      this.showmore = true
    },
    controlHide () {
      this.showmore = false
    },
    changeCheckTpye () {
      if (this.showworkcheck) {
        this.showworkcheck = false
        this.showoutcheck = true
      } else {
        this.showworkcheck = true
        this.showoutcheck = false
      }
    },
    checkOntime () {
      this.checkcount += 1
      this.checkmassege = this.checkcount + '次打卡'
    },
    gocheck () {
      this.$router.push('/check')
    },
    gostatistics () {
      this.$router.push('/statistics')
    },
    gorule () {
      this.$router.push('/rule')
    },
    gosetting () {
      this.$router.push('/addadmin')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .manner {
    display: flex;
    height: 35px;
  }
  .check {
    width: 50%;
    height: 100%;
  }

  .attendance{
    height:100%;
  }
  .miding{
    height: calc(100% - 85px);
    padding-bottom:40px;
    background-color:rgb(245, 245, 245);
  }
  .operate{
    height: calc(98% - 35px);
    margin: 2%;
    background-color: white;
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

  .selectpart{
    position: fixed;
    z-index:2;
    width:100%;
    height:100%;
    top:0;
    right:0;
  }
  .cover{
    position: fixed;
    width:100%;
    height: 100%;
    background:#000;
    opacity: 0;
  }
  .selectlist{
    position: absolute;
    z-index:100;
    top:60px;
    right:15px;
    background:rgb(26, 138, 190);
    border-radius:5px;
  }
  ul{
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .menu_li{
    color: white;
    display: flex;
    text-decoration: blink;
  }
  .selectext{
    padding-left: 5px;
    padding-bottom: 5px;
  }

  .showmpa{
    width:100%;
    height:40%;
    background-color:rgb(231, 221, 226);
  }
  .checkbutton{
    width:100%;
    height:40%;
    display: inline-grid;
  }
  .buttonline{
    /* float: left; */
    font: 14px/10px Arial, Verdana, sans-serif;
    color: #FFF;
    background-color: #06b11c;
    width: 90px;
    height: 90px;
    padding: 10px;
    margin: auto;
    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    border-radius: 60px;
  }
  .workbutton{
    width: 90px;
    height: 90px;
    text-align: center;
    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    border-radius: 60px;
    font-size: 14px;
    font-weight: bold;
  }
  .massege{
    width:100%;
  }
</style>
