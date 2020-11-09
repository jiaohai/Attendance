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
    <div class="miding" v-if="!showCheckInfo">
      <el-main v-loading="!showCheckInfo" style="height: 100%;"></el-main>
    </div>
    <div class="miding" v-show="showCheckInfo">
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
          <!-- <iframe id="mapPage" width="100%" height="100%" style="display:none;" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE&referer=myapp"></iframe> -->
          <iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE&referer=myapp"></iframe>
          <iframe id="markPage" width="100%" height="100%" frameborder=0 scrolling="no" :src="mapsrc"></iframe>
          <!-- <el-image v-loading="loading" element-loading-text="loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="map" :src="showMapImg" >
            <div slot="error">
            </div>
          </el-image> -->
        </div>
        <div class="checkbutton">
          <el-main v-loading="clocking" style="height: 100%;"></el-main>
          <div class="buttonline" v-if="!clocking">
            <button class="workbutton" @click="checkOntime">
              <span>{{ checkmassege }}</span>
            </button>
          </div>
        </div>
        <div class="massege" v-if="!showRecoed">请准时打卡</div>
        <div class="massege" v-if="showRecoed">
          <div class="recordType">{{ recordType }} {{ recordStatus }}</div>
          <div class="recordTime">打卡时间 {{ recordTime }}</div>
        </div>
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
        <span>设置</span>
      </button>
    </div>
  </div>
</template>
<script>

import moment from 'moment'

export default {
  name: 'check',
  data () {
    return {
      msg: '打卡',
      showCheckInfo: true,
      checkmassege: '今天不上班，好好休息',
      showIsCheck: false,
      checkcount: 0,
      checkPlace: null,
      isClocked: false,
      clocking: false,
      showRecoed: false,
      recordData: null,
      recordType: null,
      recordStatus: null,
      recordTime: null,
      showmore: false,
      showworkcheck: true,
      showoutcheck: false,
      showfoot: false,
      showS: false,
      showR: false,
      showA: false,
      showcheck: true,
      signKey: null,
      loading: true,
      userId: null,
      range: null,
      authority: 1,
      mapsrc: '',
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
    /* eslint-disable*/
    // this.getMyLocation()
    var _this = this
    window.addEventListener('message', function (event) {
      // _this.openMsg(event)
      if (!_this.loading) {
        return
      }
      var loc = event.data
      console.log('location', loc)
      // _this.openMsg(loc)
      if (loc && loc.module === 'geolocation') {
        // _this.showMapImg = 'https://apis.map.qq.com/ws/staticmap/v2/?center=' + loc.lat + ',' + loc.lng + '&zoom=18&size=500*300&maptype=roadmap&scale=2&markers=size:large|color:red|' + loc.lat + ',' + loc.lng + '&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE'
        _this.mapsrc = 'https://apis.map.qq.com/tools/poimarker' + '?marker=coord:' + loc.lat + ',' + loc.lng + '&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE&referer=myapp'
        _this.loading = false
        for (let i = 0; i < _this.userData.position.length; i++) {
          let pos = _this.userData.position[i]
          _this.range = _this.getRange(loc.lat, loc.lng, pos.latitude, pos.longtitude)
          if ((_this.range * 1000) < parseInt(pos.range)) {
            _this.showCheckInfo = true
            _this.checkPlace = pos.id
            break
          }
        }
        // _this.range = _this.getRange(loc.lat, loc.lng, 29.612842034, 106.503453517)
        _this.showCheckInfo = true
      }
      // else {
      //   _this.showCheckInfo = true
      //   _this.openMsg('定位失败')
      // }
    }, false)
    // this.getSignKey()
    this.getCheckInfo()
    // 全局userid
    this.setUserId()
  },
  methods: {
    setUserId () {
      let userId = this.$route.query.userId
      sessionStorage.setItem('userId',userId + '')
      // sessionStorage.setItem('userId','jiaohaia' + '')

    },
    async getCheckInfo () {
      this.userId = this.$route.query.userId
      this.authority = parseInt(this.$route.query.authority)
      if (this.authority > 1) {
        this.showfoot = true
      }
      console.log(this.authority)
      if (this.authority === 2) {
        this.showS = true
      } else if (this.authority === 3) {
        this.showR = true
      } else if (this.authority === 4) {
        this.showA = true
      }
      await this.getUserInfo()
      console.log(this.userId)
      console.log(this.authority)
      console.log(this.userData)
    },
    async getUserInfo () {
      try {
        let res = await this.$axios.get('/api/rule/attendance/', {
          params: {
            employeeId: this.$route.query.userId
          }
        })
        if (res.data.flag) {
          this.userData = res.data.data
          if (this.userData.isAttendance) {
            this.showIsCheck = true
            this.checkmassege = this.userData.type === 0 ? '上班打卡' : '下班打卡'
            this.checkPlace = this.userData.position[0].id
          } else {
            this.showIsCheck = false
          }
        } else {
          console.log(res)
          // this.openMsg('获取打卡信息失败！')
        }
        // this.getMyLocation()
        // await this.getPlace()
      } catch (err) {
        console.log(err)
        // this.openMsg('请求出错！')
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
          wx.config({
            beta: true,
            debug: true,
            // appId: 'ww434de06cbbaf240a',
            appId: this.signKey.appId,
            timestamp: this.signKey.timestamp,
            nonceStr: this.signKey.nonceStr,
            signature: this.signKey.signature,
            jsApiList: [
              'openLocation',
              'getLocation',
              'invoke',
              'onLocationChange',
              'hideOptionMenu'
            ]
          })
          var _this = this
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度
              _this.showMapImg = 'https://apis.map.qq.com/ws/staticmap/v2/?center=' + latitude + ',' + longitude + '&zoom=18&size=500*300&maptype=roadmap&scale=2&markers=size:large|color:red|' + latitude + ',' + longitude + '&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE'
              _this.loading = false
              _this.range = this.getRange(latitude, longitude, 29.612842034, 106.503453517)
              console.log(this.authority)
            }
          })
        }
      })
      console.log(this.signKey)
    },
    async checkOntime () {
      this.clocking = true
      var _this = this
      var nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
      let res = await this.$axios.put('/record/clockIn/', {
        employeeId: this.userId,
        recordTime: nowTime,
        type: this.userData.type,
        placeId: this.checkPlace
      })
      if (res.data.flag) {
        console.log(res.data)
        this.checkmassege = '更新打卡'
        this.showRecoed = true
        this.recordData = res.data.data
        if (this.recordData.status === 0) {
          this.recordStatus = '正常'
        } else if (this.recordData.status === 1) {
          this.recordStatus = '迟到'
        } else if (this.recordData.status === 2) {
          this.recordStatus = '早退'
        }
        this.recordTime = moment(this.recordData.recordTime).format('HH:mm')
        this.recordType = this.userData.type === 0 ? '上班打卡' : '下班打卡'
      } else {
        console.log(res)
        // this.openMsg('打卡失败！')
      }
      this.clocking = false
    },
    gocheck () {
      if (this.$route.path === '/check') {
        return
      }
      this.$router.push({path: '/check', query:{ userId: this.userId, authority: this.authority}})
    },
    gostatistics () {
      if (this.$route.path === '/statistics') {
        return
      }
      this.$router.push({path: '/statistics', query:{ userId: this.userId, authority: this.authority}})
    },
    gorule () {
      if (this.$route.path === '/rule') {
        return
      }
      this.$router.push({path: '/rule', query:{ userId: this.userId, authority: this.authority}})
    },
    gosetting () {
      if (this.$route.path === '/addadmin') {
        return
      }
      this.$router.push({path: '/addadmin', query:{ userId: this.userId, authority: this.authority}})
    },
    async getMyLocation () {
      var _this = this
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
      // this.openMsg('定位失败')
    },
    async getPlace () {
      var _this = this
      // var map = new AMap.Map('container', {
      //   resizeEnable: true
      // })
      // var geolocation = new AMap.Geolocation({
      //   enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //   timeout: 10000,          //超过10秒后停止定位，默认：5s
      //   buttonPosition:'RB',    //定位按钮的停靠位置
      //   buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //   zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      // })
      // geolocation.getCurrentPosition(function(status,result){
      //   if(status=='complete'){
      //       _this.onComplete(result)
      //   }else{
      //       _this.onError(result)
      //   }
      // })
      AMap.plugin('AMap.Geolocation', function() {
        console.log('11111111111111111111111111111111111111')
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          buttonPosition:'RB',    //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        })
        // map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status,result){
          if(status=='complete'){
              _this.onComplete(result)
          }else{
              _this.onError(result)
          }
        })
      })
    },
    //解析定位结果
    onComplete (data) {
      console.log(data)
      var positionList = data.position.lng
      this.showMapImg = 'https://apis.map.qq.com/ws/staticmap/v2/?center=' + data.position.lat + ',' + data.position.lng + '&zoom=18&size=500*300&maptype=roadmap&scale=2&markers=size:large|color:red|' + data.position.lat + ',' + data.position.lng + '&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE'
      this.loading = false
      this.range = this.getRange(data.position.lat, data.position.lng, 29.612842034, 106.503453517)
      console.log(this.authority)
    },
    //解析定位错误信息
    onError (data) {
      this.loading = false
      // this.openMsg('定位失败')
    }
  },
  mounted () {
    // this.getMyLocation()
    // this.getPlace()
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
    /* font: 14px/10px Arial, Verdana, sans-serif; */
    color: #FFF;
    background-color: #06b11c;
    width: 30vw;
    height: 30vw;
    /* padding: 10px; */
    margin: auto;
    /* -webkit-border-radius: 60px; */
    /* -moz-border-radius: 60px; */
    border-radius: 50%;
  }
  .workbutton{
    width: 84%;
    height: 84%;
    padding: 0px;
    margin: 8%;
    text-align: center;
    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    border-radius: 60px;
    font-size: 14px;
    font-weight: bold;
  }
  .massege{
    width:100%;
    height: 20%;
  }

  .el-message-box{
    max-width: 50%;
  }

  .map{
    width: 100%;
    height: 100%;
  }
</style>
