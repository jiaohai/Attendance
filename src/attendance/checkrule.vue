<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
    </div>
    <div class="piece">
      <div class="user">
        <img :src="avatarurl" width="35" height="35" />
        <span style="padding-left: 20px;margin-top: 5px;position: absolute;">{{ username }}</span>
      </div>
      <span style="margin-left: 20px; padding-bottom: 10px; display: block;">打卡规则：{{ rulename }}</span>
    </div>
    <div class="piece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡时间</span>
        </div>
        <i class="fa fastyle fa-chevron-down" v-if="!showtime" @click="showTime" />
        <i class="fa fastyle fa-chevron-up" v-if="showtime" @click="showTime" />
      </div>
      <div class="content" v-if="showtime">
        <hr style="margin: auto; margin-left: 20px; margin-right: 10px;"/>
        <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
          <span>上下班时间</span>
          <div class="svgplace" style="margin-top: 10px;">
            <span>{{ worktime }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="piece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡范围</span>
        </div>
        <i class="fa fastyle fa-chevron-down" v-if="!showplace" @click="showPlace" />
        <i class="fa fastyle fa-chevron-up" v-if="showplace" @click="showPlace" />
      </div>
      <div class="content" v-if="showplace">
        <hr style="margin: auto; margin-left: 20px; margin-right: 10px;" />
        <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
          <span>打卡地点</span>
          <div class="svgplace" style="margin-top: 10px;">
            <i class="fa fa-map-marker" />
            <span>{{ place }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="piece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>加班规则</span>
        </div>
        <i class="fa fastyle fa-chevron-down" v-if="!showwork" @click="showWork" />
        <i class="fa fastyle fa-chevron-up" v-if="showwork" @click="showWork" />
      </div>
      <div class="content" v-if="showwork">
        <hr style="margin: auto; margin-left: 20px; margin-right: 10px;" />
        <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
          <span>加班方式</span>
          <div class="svgplace" style="margin-top: 10px;">
            <span>{{ workout }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="piece" style="margin-bottom: 10px;">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>更多规则</span>
        </div>
        <i class="fa fastyle fa-chevron-down" v-if="!showrule" @click="showRule" />
        <i class="fa fastyle fa-chevron-up" v-if="showrule" @click="showRule" />
      </div>
      <div class="content" v-if="showrule">
        <hr style="margin: auto; margin-left: 20px; margin-right: 10px;" />
        <div class="caption" style="margin-top: 10px;margin-bottom: 10px;margin-left: 20px;">
          <span>{{ ruleinfo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkrule',
  data () {
    return {
      msg: '打卡规则',
      rulename: '打卡规则名称',
      avatarurl: '../assets/logo.png',
      username: '待传入',
      worktime: '具体的上下班时间',
      place: '设置的打卡地点',
      workout: '加班方式，时间以什么为准',
      ruleinfo: '打卡规则中一些注意的事项，提醒员工，与以说明，避免一些特殊情况让员工感到困惑，从而影响打卡',
      showtime: true,
      showplace: true,
      showrule: true,
      showwork: true
    }
  },
  methods: {
    goBackThing () {
      window.history.go(-1)
    },
    showTime () {
      if (this.showtime) {
        this.showtime = false
      } else {
        this.showtime = true
      }
    },
    showPlace () {
      if (this.showplace) {
        this.showplace = false
      } else {
        this.showplace = true
      }
    },
    showRule () {
      if (this.showrule) {
        this.showrule = false
      } else {
        this.showrule = true
      }
    },
    showWork () {
      if (this.showwork) {
        this.showwork = false
      } else {
        this.showwork = true
      }
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

  .piece{
    width: 95%;
    border: 1px solid rgb(222, 222, 222);
    border-radius:10px;
    margin:auto;
    margin-top:10px;
    text-align:left;
    background-color: white;
  }
  .user{
    margin-left: 20px;
    margin-top: 10px;
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
</style>
