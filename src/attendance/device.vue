<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>名称</span>
        </div>
        <span class="spanstyle">{{ devicename }}</span>
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>编号</span>
        </div>
        <span class="spanstyle">{{ devicenb }}</span>
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>最近打卡时间</span>
        </div>
        <span class="spanstyle">2020-09-18 08:30:00</span>
      </div>
    </div>
  </div>
</template>

<script>

import MobileDetect from 'mobile-detect'

export default {
  name: 'device',
  data () {
    return {
      msg: '常用打卡设备',
      devicename: 'xxxxxxxxx',
      devicenb: 'xxxxxxxx',
      device: '手机信息'
    }
  },
  created: function () {
    this.getDevice()
  },
  methods: {
    getDevice () {
      /* eslint-disable */
      Array.prototype.contains = function (needle) {
        for (i in this) {
          if (this[i].indexOf(needle) > 0) return i
        }
        return -1
      }
      var deviceType = navigator.userAgent // 获取userAgent信息
      var md = new MobileDetect(deviceType) // 初始化mobile-detect
      var os = md.os() // 获取系统
      console.log(os)
      console.log(md)
      var model = ''
      // ios系统的处理
      if (os === 'iOS') {
        os = +md.version('iPhone')
        console.log(os)
        model = md.mobile()
      } else if (os === 'AndroidOS') { // Android系统的处理
        os = md.os() + md.version('Android')
        var sss = deviceType.split(';')
        var i = sss.contains('Build/')
        if (i > -1) {
          model = sss[i].substring(0, sss[i].indexOf('Build/'))
        }
      }
      // alert(os + "---" + model);//打印系统版本和手机型号
      console.log(model + '||' + os, '打印系统版本和手机型号')
      this.devicename = os + ' ' + model
    },
    goBackThing () {
      window.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .attendance{
    height:100%;
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
    width:90%;
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
    margin: auto;
    margin-right: 10px;
  }
  .spanstyle{
    margin: auto;
    margin-right: 10px;
    font-size: small;
    color:rgb(165, 165, 165);
  }
</style>
