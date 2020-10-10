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
          <span>汇报对象</span>
        </div>
        <span class="spanstyle">{{ tellman }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>白名单</span>
        </div>
        <span class="spanstyle">{{ whitetip }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>提醒</span>
        </div>
        <span class="spanstyle">{{ remind }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>节假日与特殊日期</span>
        </div>
        <span class="spanstyle">{{ special }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>允许提交补卡申请</span>
        </div>
        <i class="fa switch fa-toggle-on" v-if="isswitch" @click="changeUnworkRemind" />
        <i class="fa switch fa-toggle-off" v-if="!isswitch" @click="changeUnworkRemind" />
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>允许补卡时限</span>
        </div>
        <span class="spanstyle">{{ endtime }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>每月允许补卡次数</span>
        </div>
        <span class="spanstyle">{{ lastcount }}</span>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
    <div class="commonpiece">
      <div class="titlehead" style="display: inline-flex; width:100%;">
        <div class="titles">
          <span>上下班界定</span>
        </div>
        <i class="fa fastyle fa-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'morerule',
  data () {
    return {
      msg: '更多设置',
      ruletpye: '固定上下班',
      rulename: '上下班规则',
      checkman: '所有人',
      checktime: '8:00~18:00',
      checkplace: '公司',
      workout: '打卡时间为准'
    }
  },
  methods: {
    goBackThing () {
      window.history.go(-1)
    },
    saveRule () {
      alert('保存数据')
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
  .switch{
    margin: auto;
    margin-right: 20px;
    font-size: x-large;
    color: rgb(26, 138, 190);
  }
</style>
