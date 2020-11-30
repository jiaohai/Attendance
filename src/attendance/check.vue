<template>
  <div class="attendance">
    <div class="miding" v-if="!showCheckInfo">
      <el-main v-loading="!showCheckInfo" style="height: 100%;"></el-main>
    </div>
    <div class="miding" v-if="userError">
      <span>用户身份获取失败，请退出应用！！</span>
    </div>
    <div class="miding" v-show="showCheckInfo">
      <div class="manner">
        <button class="work-check check" @click="changeCheckTpye">
          <span :class="showworkcheck ? 'colortext' : 'colorcommon' ">上下班打卡</span>
        </button>
        <!-- <button class="out-check check" @click="changeCheckTpye" >
          <span :class="showoutcheck ? 'colortext' : 'colorcommon' ">外出打卡</span>
        </button> -->
      </div>
      <div class="operate" v-if="showworkcheck">
        <div class="showmpa">
          <!-- <iframe id="mapPage" width="100%" height="100%" style="display:none;" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE&referer=myapp"></iframe> -->
          <!-- <iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE&referer=myapp"></iframe> -->
          <!-- <iframe id="markPage" width="100%" height="100%" frameborder=0 scrolling="no" :src="mapsrc"></iframe> -->
          <el-image v-loading="loading" element-loading-text="loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="map" :src="showMapImg" >
            <div slot="error">
            </div>
          </el-image>
        </div>
        <div class="checkbutton">
          <!-- <el-main class="buttonline" v-loading="clocking" style="height: 100%;">
            <button class="workbutton" @click="checkOntime" v-if="!clocking">
              <span>{{ checkmassege }}</span>
            </button>
          </el-main> -->
          <el-main v-loading="clocking" style="height: 100%;"></el-main>
          <div class="buttonline" v-if="!clocking">
            <button class="workbutton" @click="checkOntime">
              <span>{{ checkmassege }}</span>
            </button>
          </div>
        </div>
        <div class="massege" v-if="!showRecoed && showIsCheck">请准时打卡</div>
        <div class="massege" v-if="showRecoed">
          <div class="recordType">{{ recordType }} {{ recordStatus }}</div>
          <div class="recordTime">打卡时间 {{ recordTime }}</div>
        </div>
        <div class="record">
          <button>
            <router-link to='/checkrecord' class="menu_li">
              <!-- <i class="fa fa-bars" style="padding-top: 3px;" /> -->
              <div class="selectext">
                打卡记录
              </div>
            </router-link>
          </button>
          <button v-if="false">
            <router-link to='/checksetting'  class="menu_li">
              <!-- <i class="fa fa-cog" style="padding-top: 3px;" /> -->
              <div class="selectext">
                打卡设置
              </div>
            </router-link>
          </button>
        </div>
      </div>
      <div class="operate" v-if="showoutcheck">
        <div v-if="ifShow" style="height: 100%;width: 100%">
          <div class="showmpa">显示打卡地址</div>
          <div class="checkbutton">
            <div class="buttonline">
              <button class="workbutton" @click="checkOutRecord">
                <el-row><span>外出打卡</span></el-row>
                <span>第{{outCount}}次外出</span>
              </button>
            </div>
          </div>
          <div class="massege">人员信息</div>
        </div>
        <div v-if="!ifShow" style="height: 100%;width: 100%">
          <div class="">
            <img src="../img/success.png" style="width: 30%;height: 30%">
            <p style="color: #67C23A;font-weight: bolder">外出打卡成功</p>
          </div>
          <el-divider></el-divider>
          <div class="massege">
            <el-row>
              <el-col :span="9" :offset="2"><span>时间</span></el-col>
              <el-col :span="9" :offset="2"><span>{{time}}</span></el-col>
            </el-row>
          </div>
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
  </div>
</template>
<script>

import moment from 'moment'
import { getRecordOutByTime } from '../api/record/record'

export default {
  name: 'check',
  data () {
    return {
      msg: '打卡',
      userError: false,
      showCheckInfo: true,
      checkmassege: '加载中....',
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
      ifShow: true,
      showfoot: false,
      showS: false,
      showR: false,
      showA: false,
      showcheck: true,
      signKey: null,
      loading: true,
      userId: null,
      range: null,
      authority: null,
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
      },
      recordOut: {
        employeeId: sessionStorage.getItem('userId'),
        reason: '',
        image: '',
        longtitude: 29.0,
        latitude: 336.0
      },
      outCount: 1,
      time: null
    }
  },
  created: async function () {
    // sessionStorage.setItem('userId', 'liulixi')
    // sessionStorage.setItem('authority', 5)

    if (this.$route.query.userId && this.$route.query.authority) {
      sessionStorage.setItem('userId', this.$route.query.userId)
      sessionStorage.setItem('authority', this.$route.query.authority)
      this.getCheckInfo()
      this.testCheckInfo()
      return
    }
    if (sessionStorage.getItem('userId') === null) {
      // this.openMsg('获取身份')
      try {
        let res = await this.$axios.get('/wxkq/user/login/authorize/login?code=' + this.$route.query.code + '&state=' + this.$route.query.state)
        if (res.data.flag) {
          sessionStorage.setItem('userId', res.data.data.userId)
          sessionStorage.setItem('authority', res.data.data.authority)
        } else {
          this.openMsg(res.data.msg + '，身份验证失败！！请重新进入此应用。')
          this.userError = true
          return
        }
      } catch (err) {
        this.openMsg('发送身份验证的请求失败！！请重新进入此应用。')
        this.userError = true
        return
      }
    }
    this.userId = sessionStorage.getItem('userId')
    this.authority = parseInt(sessionStorage.getItem('authority'))
    this.getSignKey()
    // this.testCheckInfo()
    this.getCheckInfo()
  },
  methods: {
    async testCheckInfo () {
      this.$axios.get('/wxkq/rule/attendance/', { params: {
        employeeId: this.userId
      }}).then(res => {
        if (res.data.flag) {
          this.userData = res.data.data
          if (this.userData.isAttendance) {
            this.showIsCheck = true
            this.checkmassege = this.userData.type === 0 ? '上班打卡' : '下班打卡'
            if (this.userData.record.length !== 0) {
              this.recordData = this.userData.record[0]
              if (this.recordData.leaveRecord === null && parseInt(this.recordData.lateCount) > 0) {
                this.recordTime = moment(this.recordData.reachRecord).format('HH:mm')
                this.recordStatus = '迟到'
                this.recordType = '上班打卡'
              } else if (this.recordData.leaveRecord !== null && parseInt(this.recordData.ifLeaveEarliy) > 0) {
                this.recordTime = moment(this.recordData.leaveRecord).format('HH:mm')
                this.recordStatus = '早退'
                this.recordType = '下班打卡'
              } else {
                this.recordStatus = '正常'
                this.recordTime = this.recordData.leaveRecord === null ? moment(this.recordData.reachRecord).format('HH:mm') : moment(this.recordData.leaveRecord).format('HH:mm')
                this.recordType = this.recordData.leaveRecord === null ? '上班打卡' : '下班打卡'
              }
              this.checkmassege = '更新打卡'
              this.showRecoed = true
            }
          } else {
            this.showIsCheck = false
            this.checkmassege = '今天不上班，好好休息'
          }
          for (let i = 0; i < this.userData.position.length; i++) {
            let pos = this.userData.position[i]
            this.range = this.getRange(29, 106, pos.latitude, pos.longtitude)
            if ((this.range * 1000) < (parseInt(pos.range) - 10)) {
              this.checkPlace = pos.id
              break
            }
          }
          if (this.checkPlace === null && this.userData.position.length > 0) {
            this.showIsCheck = false
            this.openMsg('不在打卡范围！！')
            this.checkmassege = '不在打卡范围，不能打卡'
          }
          this.showCheckInfo = true
        } else {
          this.showIsCheck = false
          this.openMsg('获取打卡信息失败！！')
          this.checkmassege = '获取信息失败，不能打卡'
          this.showCheckInfo = true
        }
      }).catch(err => {
        console.log(err)
        this.showIsCheck = false
        this.openMsg('发送获取信息请求失败！！')
        this.checkmassege = '获取信息失败，不能打卡'
        this.showCheckInfo = true
      })
    },
    getCheckInfo () {
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
    },
    async getUserInfo () {
      this.userId = this.$route.query.userId
      if (!this.userId) {
        this.userId = localStorage.getItem('userId')
      }
      try {
        let res = await this.$axios.get('/wxkq/rule/attendance/', {
          params: {
            employeeId: this.userId
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
            this.checkmassege = '今天不上班，好好休息'
          }
        } else {
          console.log(res)
          this.openMsg('获取打卡信息失败！！')
          this.checkmassege = '获取信息失败，不能打卡'
        }
      } catch (err) {
        this.openMsg('获取打卡信息失败！')
        this.checkmassege = '获取信息失败，不能打卡'
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
      this.showoutcheck = false
      this.showworkcheck = true
    },
    getRange (lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0
      var radLat2 = lat2 * Math.PI / 180.0
      var a = radLat1 - radLat2
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
      s = s * 6378.137 // EARTH_RADIUS
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
      /* eslint-disable*/
      var _this = this
      this.$axios.get('/wxkq/user/ticket/getSign/', {params: {
        url: window.location.href.split('#')[0]
      }}).then(res => {
        if (res.data.flag) {
          _this.signKey = res.data.data
          wx.config({
            beta: true,
            // debug: true,
            appId: _this.signKey.appId,
            timestamp: _this.signKey.timestamp,
            nonceStr: _this.signKey.nonceStr,
            signature: _this.signKey.signature,
            jsApiList: [
              'openLocation',
              'getLocation',
              'invoke',
              'onLocationChange',
              'hideOptionMenu'
            ]
          })
          wx.hideOptionMenu()
          wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed // 速度，以米/每秒计
              // var accuracy = res.accuracy // 位置精度

              // this.$store.commit('setPosition',latitude,longtitude)

              _this.showMapImg = 'https://apis.map.qq.com/ws/staticmap/v2/?center=' + latitude + ',' + longitude + '&zoom=18&size=500*300&maptype=roadmap&scale=2&markers=size:large|color:red|' + latitude + ',' + longitude + '&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE'
              _this.loading = false
              _this.$axios.get('/wxkq/rule/attendance/', { params: {
                employeeId: _this.userId
              }}).then(userres => {
                if (userres.data.flag) {
                  _this.userData = userres.data.data
                  if (_this.userData.isAttendance) {
                    _this.showIsCheck = true
                    _this.checkmassege = _this.userData.type === 0 ? '上班打卡' : '下班打卡'
                    if (_this.userData.record.length !== 0) {
                      _this.recordData = _this.userData.record[0]
                      if (_this.recordData.leaveRecord === null && parseInt(_this.recordData.lateCount) > 0) {
                        _this.recordTime =  moment(_this.recordData.reachRecord).format('HH:mm')
                        _this.recordStatus = '迟到'
                        _this.recordType = '上班打卡'
                      } else if (_this.recordData.leaveRecord !== null && parseInt(_this.recordData.ifLeaveEarliy) > 0) {
                        _this.recordTime = moment(_this.recordData.leaveRecord).format('HH:mm')
                        _this.recordStatus = '早退'
                        _this.recordType = '下班打卡'
                      } else {
                        _this.recordStatus = '正常'
                        _this.recordTime = _this.recordData.leaveRecord === null ? moment(_this.recordData.reachRecord).format('HH:mm') : moment(_this.recordData.leaveRecord).format('HH:mm')
                        _this.recordType = _this.recordData.leaveRecord === null ? '上班打卡' : '下班打卡'
                      }
                      _this.checkmassege = '更新打卡'
                      _this.showRecoed = true
                    }
                  } else {
                    _this.showIsCheck = false
                    _this.checkmassege = '今天不上班，好好休息'
                    return
                  }
                  for (let i = 0; i < _this.userData.position.length; i++) {
                    let pos = _this.userData.position[i]
                    _this.range = _this.getRange(latitude, longitude, pos.latitude, pos.longtitude)
                    if ((_this.range * 1000) < (parseInt(pos.range) - 10)) {
                      _this.checkPlace = pos.id
                      break
                    }
                  }
                  if (_this.checkPlace === null && _this.userData.position.length > 0) {
                    _this.showIsCheck = false
                    _this.openMsg('不在打卡范围！！')
                    _this.checkmassege = '不在打卡范围，不能打卡'
                  }
                  _this.showCheckInfo = true
                } else {
                  _this.showIsCheck = false
                  _this.openMsg('获取打卡信息失败！！')
                  _this.checkmassege = '获取信息失败，不能打卡'
                  _this.showCheckInfo = true
                }
              }).catch(err => {
                console.log(err)
                _this.showIsCheck = false
                _this.openMsg('发送获取信息请求失败！！')
                _this.checkmassege = '获取信息失败，不能打卡'
                _this.showCheckInfo = true
              })
            },
            fail: function () {
              _this.openMsg('地图加载失败失败！')
              _this.checkmassege = '定位失败，不能打卡'
              _this.loading = false
              _this.showCheckInfo = true
            }
          })
        }
      })
    },
    async checkOntime () {
      if (!this.showIsCheck) {
        return
      }
      this.clocking = true
      var nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
      try {
        let res = await this.$axios.post('/wxkq/record/clockIn/', {
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
          if (parseInt(this.recordData.status) === 0) {
            this.recordStatus = '正常'
          } else if (parseInt(this.recordData.status) === 1) {
            this.recordStatus = '迟到'
          } else if (parseInt(this.recordData.status) === 2) {
            this.recordStatus = '早退'
          }
          this.recordTime = moment(this.recordData.recordTime).format('HH:mm')
          this.recordType = this.userData.type === 0 ? '上班打卡' : '下班打卡'
        } else {
          this.openMsg('打卡失败！')
        }
      } catch(err) {
        this.openMsg('打卡失败！')
      }

      this.clocking = false
    },
    // 外出打卡
    async checkOutRecord () {
      let res = await this.$axios.post('/wxkq/recordOut/add', this.recordOut)
      if (res.data.flag){
        this.ifShow = !this.ifShow
        let date = new Date()
        let spl = ':'
        let hour = date.getHours()
        let minutes = date.getMinutes()
        if (hour >= 1 && hour <= 9) {
          hour = '0' + hour
        }
        if (minutes >= 0 && minutes <= 9) {
          minutes = '0' + minutes
        }
        this.time =  hour + spl + minutes
      } else {
        this.openMsg('打卡失败！')
      }
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
    }
  },
  mounted () {
    getRecordOutByTime(new Date(),sessionStorage.getItem('userId')).then(res => {
      this.outCount = res.data.data.length + 1
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manner {
  display: flex;
  height: 35px;
}
.check {
  width: 100%;
  height: 100%;
}

.attendance {
  height: 100%;
}
.miding {
  height: calc(100% - 40px);
  padding-bottom: 40px;
  background-color: rgb(245, 245, 245);
}
.operate {
  height: calc(98% - 35px);
  margin: 2%;
  background-color: white;
}

.selectpart {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}
.cover {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0;
}
.selectlist {
  position: absolute;
  z-index: 100;
  top: 60px;
  right: 15px;
  background: rgb(26, 138, 190);
  border-radius: 5px;
}
ul {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.menu_li {
  color: black;
  display: flex;
  text-decoration: blink;
}
.selectext {
  /*padding-left: 5px;*/
  /*padding-bottom: 5px;*/
}

.showmpa {
  width: 100%;
  height: 40%;
  background-color: rgb(231, 221, 226);
}
.checkbutton {
  width: 100%;
  height: 30%;
  display: inline-grid;
}
.buttonline {
  /* float: left; */
  /* font: 14px/10px Arial, Verdana, sans-serif; */
  color: #fff;
  background-color: #06b11c;
  width: 30vw;
  height: 30vw;
  /* padding: 10px; */
  margin: auto;
  /* -webkit-border-radius: 60px; */
  /* -moz-border-radius: 60px; */
  border-radius: 50%;
}
.workbutton {
  color: black;
  width: 84%;
  height: 84%;
  padding: 0px;
  margin: 8%;
  text-align: center;
  -webkit-border-radius: 60px;
  -moz-border-radius: 60px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
}
.massege {
  width: 100%;
  height: 15%;
}
.record {
  width: 100%;
  height: 5%;
}

.el-message-box {
  max-width: 50%;
}

.map {
  width: 100%;
  height: 100%;
}

/deep/ .el-divider {
  background-color: #dcdfe6;
  position: relative;
}

/deep/ .el-divider--horizontal {
  display: block;
  height: 1px;
  width: 50%;
  margin: 24px 200px;
}
</style>
