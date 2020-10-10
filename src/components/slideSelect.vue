<template>
  <div class="modal-backdrop" @click="closeSelf" style="background-color: rgba(0,0,0,.3)">
    <div class="modal" @click.stop="">
      <div class="modal-header" style="padding: 10px; display: inline-flex;">
        <div class="black" @click="closeSelf">
          <span>取消</span>
        </div>
        <div class="title"></div>
        <div class="more" @click="saveSlide">
          <span>确定</span>
        </div>
      </div>
      <div class="modal-body">
        <div class="timeChoice">
          <div>
            <basic-select :values="optionList" @select="getSelectValue"></basic-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import basicSelect from '../components/basicSelect'

export default {
  name: 'slideSelect',
  props: {
    selection: {
      type: Array,
      default: () => []
    },
    optionList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selecteName: '休息'
    }
  },
  components: {
    basicSelect
  },
  methods: {
    closeSelf () {
      this.$emit('closeslide')
    },
    getSelectValue (msg) {
      console.log(msg)
      this.selecteName = msg
    },
    saveSlide () {
      for (let i = 0; i < this.selection.length; i++) {
        if (this.selection[i].name === this.selecteName) {
          this.$emit('saveslide', this.selection[i])
          break
        }
      }
      this.closeSelf()
    }
  }
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal {
    background-color: #fff;
    /* box-shadow: 2px 2px 20px 1px; */
    overflow-x:auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    bottom:0px;
    position: fixed;
}
.modal-header {
    border-bottom: 1px solid #eee;
    color: #313131;
    justify-content: space-between;
    padding: 15px;
    display: inline;
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
.modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
}
.modal-body {
    position: relative;
    padding: 0px 0px 0px 0px;
}
.timeChoice{
  display:inline-flex;
}
.contentspan{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top:10px;
    text-align: left;
  }
  .secondspan{
    margin-top:5px;
    margin-bottom:5px;
    font-size:small;
    color:rgb(165,165,165);
  }
</style>
