<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">{{ titlename }}</div>
          <div class="more common" @click="saveInput(false)">
          <span>确定</span>
        </div>
      </div>
      <div class="commonpiece">
        <div class="titlehead" style="display: inline-flex; width:100%;">
          <input id="focusinput" autocomplete="off" v-model="inputvlue" v-if="onlyNum" @keydown.enter="saveInput(true)" oninput="value=value.replace(/[^\d]/g,'')"/>
          <input id="focusinput" autocomplete="off" v-model="inputvlue" v-if="!onlyNum" @keydown.enter="saveInput(true)"/>
          <i class="fa fa-close fastyle" v-if="inputvlue" @click="clearInput" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputModal',
  props: {
    inputtxt: {
      type: String,
      default: ''
    },
    titlename: {
      type: String,
      default: `0`
    },
    onlyNum: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputvlue: ''
    }
  },
  mounted () {
    document.getElementById('focusinput').focus()
  },
  created: function () {
  },
  methods: {
    closeSelf () {
      this.$emit('closeinput')
    },
    clearInput () {
      this.inputvlue = ''
    },
    saveInput (iskeyinput) {
      if (this.inputvlue) {
        this.$emit('getinput', this.inputvlue)
      } else {
        if (iskeyinput) {
          return
        }
        this.$emit('getinput', this.inputtxt)
      }
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
    margin: 5px 10px 5px 10px;
    height: 35px;
    border: 0;
    outline: none;
    font-size: large;
  }
</style>
