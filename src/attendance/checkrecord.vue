<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common" @click="goSingleReport">
        月报
      </div>
    </div>
    <Calendar></Calendar>
    <div class="uncommonpiece" @click="goRule">
      <div class="rulecotent">
        <span class="contentspan">上下班打卡</span>
        <span class="contentspan secondspan">打卡规则 {{ checkrule }} | 工作时长 {{ worktime }}</span>
      </div>
      <div class="rightside">
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>

// import Calendar from 'vue-calendar-component'
import Calendar from '../components/calendar'

export default {
  name: 'checkrecord',
  data () {
    return {
      msg: '打卡记录',
      checkrule: '打卡规则',
      worktime: '8小时'
    }
  },
  components: {
    Calendar
  },
  methods: {
    goBackThing () {
      window.history.go(-1)
    },
    goRule () {
      this.$router.push('/checkrule')
    },
    goSingleReport () {
      this.$router.push('/singlereport')
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

  .uncommonpiece{
    display:inline-flex;
    width: 100%;
    margin:auto;
    margin-top:10px;
    text-align:left;
    background-color: white;
  }
  .rulecotent{
    display:inline-grid;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: calc(80% - 20px);
  }
  .rightside{
    width: 20%;
    text-align: right;
  }
  .fastyle{
    margin-top:50%;
    margin-right: 10px;
  }
  .contentspan{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .secondspan{
    margin-top:10px;
    font-size:small;
    color:rgb(165,165,165);
  }
</style>
