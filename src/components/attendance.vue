<template>
  <div class="attendance">
    <div class="heading">
      <div class="black common">
        <i class="fa fa-arrow-left" />
      </div>
      <div class="title common" style="align-items:center;">{{ msg }}</div>
      <div class="more common">
        <i class="fa fa-ellipsis-v" />
      </div>
    </div>
    <div class="miding">
      <div class="manner">
        <button class="work-clock">
          <span>上下班打卡</span>
        </button>
        <button class="out-clock">
          <span>外出打卡</span>
        </button>
      </div>
      <div class="operate"></div>
    </div>
    <div class="bottoming">
      <button class="clock-in">
        <i class="fa fa-map-marker" />
        <span>打卡</span>
      </button>
      <button class="statistics">
        <i class="fa fa-pie-chart" />
        <span>统计</span>
      </button>
      <button class="rule">
        <i class="fa fa-sliders" />
        <span>规则</span>
      </button>
      <button class="setting">
        <i class="fa fa-cog" />
        <span>设置</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Attendance',
  data () {
    return {
      msg: '打卡'
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
    border-style:solid;
    text-align: center;
  }

  .black {
    width:5%;
  }
  .title {
    width:90%;
  }
  .more {
    width:5%;
  }
  .common {
    position: inherit;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  .bottoming {
    position: fixed;
    width:100%;
    height:40px;
  }
</style>
