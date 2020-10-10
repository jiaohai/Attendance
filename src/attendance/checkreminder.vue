<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
    </div>
    <span class="spanstyle">关闭后，不会收到打卡提醒信息</span>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>上班打卡提醒</span>
        </div>
        <i class="fa fastyle fa-toggle-on" v-if="workremind" @click="changeWorkRemind" />
        <i class="fa fastyle fa-toggle-off" v-if="!workremind" @click="changeWorkRemind" />
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>下班打卡提醒</span>
        </div>
        <i class="fa fastyle fa-toggle-on" v-if="unworkremind" @click="changeUnworkRemind" />
        <i class="fa fastyle fa-toggle-off" v-if="!unworkremind" @click="changeUnworkRemind" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkreminder',
  data () {
    return {
      msg: '打卡提醒',
      workremind: false,
      unworkremind: false
    }
  },
  methods: {
    goBackThing () {
      window.history.go(-1)
    },
    changeWorkRemind () {
      if (this.workremind) {
        this.workremind = false
      } else {
        this.workremind = true
      }
    },
    changeUnworkRemind () {
      if (this.unworkremind) {
        this.unworkremind = false
      } else {
        this.unworkremind = true
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
    margin-right: 20px;
    font-size: x-large;
    color: rgb(26, 138, 190);
  }
  .spanstyle{
    margin-left: 20px;
    font-size: small;
    color:rgb(165, 165, 165);
  }
</style>
