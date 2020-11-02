<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common" @click="goBackThing">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common">
      </div>
    </div>
    <div class="heading" style="height: 60px">
      <monthesSlider @change="getSelectDate"></monthesSlider>
    </div>
    <div class="statisticspiece">
      <span class="stcspan">上下班统计</span>
      <div class="cotentinfo">
      </div>
    </div>
    <div class="statisticspiece">
      <span class="stcspan">加班统计</span>
      <div class="cotentinfo">
      </div>
    </div>
    <div class="statisticspiece">
      <span class="stcspan">假勤统计</span>
      <div class="cotentinfo">
      </div>
    </div>
  </div>
</template>

<script>

// import dateSlider from '../components/dateSlider'
import monthesSlider from '../components/monthesSlider'

export default {
  name: 'singlereport',
  data () {
    return {
      msg: '月报'
    }
  },
  components: {
    // dateSlider,
    monthesSlider
  },
  methods: {
    goBackThing () {
      window.history.go(-1)
    },
    getSelectDate (msg) {
      console.log(msg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  .statisticspiece{
    display:inline-grid;
    width: 98%;
    margin:auto;
    margin-top:10px;
    text-align:left;
    background-color: white;
  }
  .cotentinfo{
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    min-height: 100px;
  }
  .stcspan{
    margin-left: 20px;
    margin-top: 10px;
  }
</style>
