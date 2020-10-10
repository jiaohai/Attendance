<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
    </div>
    <div class="commonpiece" @click="goReminder">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>打卡提醒</span>
        </div>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece" @click="goSearch">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>上下班汇报对象</span>
        </div>
        <span class="spanstyle">{{ tellman }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece" @click="goSearch">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>外出汇报对象</span>
        </div>
        <span class="spanstyle">{{ outtellman }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece" @click="goDevice">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>常用打卡设备</span>
        </div>
        <span class="spanstyle">{{ device }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checksetting',
  data () {
    return {
      msg: '打卡设置',
      tellman: '考勤管理员',
      outtellman: '请选择',
      device: '手机信息'
    }
  },
  methods: {
    goBackThing () {
      window.history.go(-1)
    },
    goReminder () {
      this.$router.push('/checkreminder')
    },
    goSearch () {
      this.$router.push('/search')
    },
    goDevice () {
      this.$router.push('/device')
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
