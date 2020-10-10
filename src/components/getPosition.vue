<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
        <div class="more common">
          <span>确定</span>
        </div>
      </div>
      <div class="showmap">
      </div>
      <div class="optioncont">
        <div class="options">
        </div>
      </div>
      <div class="bottoming">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getPosition',
  props: {
    existlist: {
      type: Array,
      default: () => []
    },
    titlename: {
      type: String,
      default: ''
    },
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  // created: {
  // },
  data () {
    return {
      inputvlue: '',
      checked: true,
      tempexist: this.existlist
    }
  },
  created: function () {
  },
  methods: {
    closeSelf () {
      this.$emit('closeposition')
    },
    seveData () {
      this.$emit('getsearch', this.existlist)
      this.closeSelf()
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

  .commonpiece{
    width: 100%;
    height: 40px;
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
    margin: auto 10px auto 10px;
    color: rgb(165, 165, 165);
  }
  .spanstyle{
    margin: auto;
    margin-right: 10px;
    font-size: small;
    color:rgb(165, 165, 165);
  }
  input{
    width: 100%;
    margin: 1px 10px 1px 10px;
    height: 35px;
    border: 0;
    outline: none;
    font-size: inherit;
  }

  .depatment{
    display: inherit;
    width: calc(100% - 15px);
    height: 30px;
    /* text-align: left; */
    margin-top: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 5px;
    border-bottom: 1px solid rgb(238, 238, 238);
    overflow-x: scroll;
    white-space: nowrap;
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .showmap{
    width: 100%;
    height: 40%;
  }
  .optioncont{
    background-color: white;
    height: calc(60% - 85px);
    text-align: left;
  }
  .options{
    display: inline-grid;
    margin: 0px auto 0px 10px;
    width: 100%;
    overflow-y: scroll;
    max-height: calc(100% - 41px);
  }
  .circle{
    font-size: x-large;
    margin: auto 0px auto 0px;
  }
  .alloption{
    display: inline-flex;
    margin: 5px auto 0px 0px;
    width: calc(100% - 10px);
  }
  .user{
    margin: 3px auto 0px 15px;
    border-bottom: 1px solid rgb(238, 238, 238);
    width: calc(100% - 24px);
    display: inline-flex;
  }
  .addtitle{
    display: inline-flex;
    width: 100%;
    height: 30px;
    margin: 10px auto auto auto;
    text-align: center;
    border-bottom: 1px solid rgb(238, 238, 238);
    overflow-x: scroll;
    white-space: nowrap;
  }

  .bottoming {
    position:fixed;
    display:flex;
    flex:0;
    width:100%;
    height:40px;
    bottom:0px;
    background-color: rgb(248, 248, 248);
  }
</style>
