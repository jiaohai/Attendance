<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
          <div class="more common" @click="saveData(false)">
          <span>确定</span>
        </div>
      </div>
      <div class="contentbody">
        <div class="commonpiece">
          <div class="titlehead" style="display: inline-flex; width:100%; border-bottom: 1px solid #eee; display: flex;" v-for="item in selection" :key="item.id" @click="getCheck(item)">
            <div class="titles">
              <span>{{ item.dayname }}</span>
            </div>
            <i class="fa fa-check" v-if="item.ischeck" style="margin: auto; margin-right: 10px;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mselectModal',
  props: {
    selection: {
      type: Array,
      default: () => [
        {
          dayname: '星期一',
          ischeck: true
        },
        {
          dayname: '星期二',
          ischeck: true
        },
        {
          dayname: '星期三',
          ischeck: true
        },
        {
          dayname: '星期四',
          ischeck: true
        },
        {
          dayname: '星期五',
          ischeck: true
        },
        {
          dayname: '星期六',
          ischeck: false
        },
        {
          dayname: '星期日',
          ischeck: false
        }
      ]
    },
    titlename: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    closeSelf () {
      this.$emit('closeday')
    },
    saveData (msg) {
      this.$emit('getday', this.selection)
      this.closeSelf()
    },
    getCheck (item) {
      const selectlen = this.selection.length
      for (let i = 0; i < selectlen; i++) {
        if (this.selection[i].dayname === item.dayname) {
          this.selection[i].ischeck = !this.selection[i].ischeck
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgb(248, 248, 248);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .attendance{
    height:100%;
    width: 100%;
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

  .contentbody{
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: scroll;
    overflow-x: hidden;
    /* position: relative; */
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
    width: 20%
  }
</style>
