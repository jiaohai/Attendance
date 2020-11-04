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
        <div class="showmpa">
          <el-image v-loading="loading" element-loading-text="loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="map" :src="showMapImg" >
            <div slot="error">
            </div>
          </el-image>
        </div>
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
      signKey: null,
      loading: true,
      userId: null,
      range: null,
      authority: 1,
      // showMapImg: null,
      showMapImg: '',
      userData: null,
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
  created: function () {
    // this.getMyLocation()
    // this.getSignKey()
    this.getCheckInfo()
  },
  methods: {
    async getCheckInfo () {
      this.userId = this.$route.query.userId
      this.authority = this.$route.query.authority
      await this.getUserInfo()
      console.log(this.userId)
      console.log(this.authority)
      console.log(this.userData)
      console.log(this.range)
    },
    async getUserInfo () {
      try {
        let res = await this.$axios.get('/api/rule/attendance/', {
          params: {
            employeeId: this.$route.query.userId
          }
        })
        this.userData = res.data
        // this.getMyLocation()
        // await this.getPlace()
      } catch (err) {
        console.log(err)
        alert('请求出错！')
      }
    },
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
    getRange (lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0
      var radLat2 = lat2 * Math.PI / 180.0
      var a = radLat1 - radLat2
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
      s = s * 6378.137 // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000
      return s
    },
    openMsg (message) {
      this.$confirm(message, '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        type: 'warning'
      }).then(() => {}).catch(() => {})
    },
    getSignKey () {
      this.$axios.get('/groupApi/getSign/', {params: {
        url: 'http://shooturbrain.top:8083/check'
      }}).then(res => {
        if (res.data.flag) {
          this.signKey = res.data.data
        }
      })
      console.log(this.signKey)
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
    },
    async getMyLocation () {
      /* eslint-disable*/
      var _this = this
      console.log('22222222222222222222')
      var geolocation = new qq.maps.Geolocation('5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE', 'myapp')
      geolocation.getLocation(this.getSeccss, this.filde)
    },
    getSeccss (position) {
      this.showMapImg = 'https://apis.map.qq.com/ws/staticmap/v2/?center=' + position.lat + ',' + position.lng + '&zoom=18&size=500*300&maptype=roadmap&scale=2&markers=size:large|color:red|' + position.lat + ',' + position.lng + '&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE'
      this.loading = false
      this.range = this.getRange(position.lat, position.lng, 29.612842034, 106.503453517)
    },
    filde () {
      this.loading = false
      this.openMsg('定位失败')
    },
    async getPlace () {
      var _this = this
      // var map = new AMap.Map('container', {
      //   resizeEnable: true
      // })
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：5s
        buttonPosition:'RB',    //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      })
      geolocation.getCurrentPosition(function(status,result){
        if(status=='complete'){
            _this.onComplete(result)
        }else{
            _this.onError(result)
        }
      })
      // AMap.plugin('AMap.Geolocation', function() {
      //   console.log('11111111111111111111111111111111111111')
      //   var geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //     timeout: 10000,          //超过10秒后停止定位，默认：5s
      //     buttonPosition:'RB',    //定位按钮的停靠位置
      //     buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //     zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      //   })
      //   map.addControl(geolocation);
      //   geolocation.getCurrentPosition(function(status,result){
      //     if(status=='complete'){
      //         _this.onComplete(result)
      //     }else{
      //         _this.onError(result)
      //     }
      //   })
      // })
    },
    //解析定位结果
    onComplete (data) {
      console.log(data)
      var positionList = data.position.lng
      this.showMapImg = 'https://apis.map.qq.com/ws/staticmap/v2/?center=' + data.position.lat + ',' + data.position.lng + '&zoom=18&size=500*300&maptype=roadmap&scale=2&markers=size:large|color:red|' + data.position.lat + ',' + data.position.lng + '&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE'
      this.loading = false
      this.range = this.getRange(data.position.lat, data.position.lng, 29.612842034, 106.503453517)
    },
    //解析定位错误信息
    onError (data) {
      this.loading = false
      this.openMsg('定位失败')
    }
  },
  mounted () {
    // this.getMyLocation()
    this.getPlace()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

  .el-message-box{
    max-width: 50%;
  }

  .map{
    width: 100%;
    height: 100%;
  }
</style>
