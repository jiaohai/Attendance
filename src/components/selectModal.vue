<template>
  <div class="modal-backdrop" @click="closeSelf" style="background-color: rgba(0,0,0,.3)">
    <div class="modal" @click.stop="">
      <div class="modal-header">
        <span>{{ titlename }}</span>
      </div>
      <div class="modal-body">
        <div v-for="item in selection" :key="item.id" @click="getCheck(item)" style="border-bottom: 1px solid #eee; display: flex;">
          <div>
            <span class="contentspan">{{ item.name }}</span>
            <span class="contentspan secondspan">{{ item.desc }}</span>
          </div>
          <i class="fa fa-check" v-if="item.selected" style="margin: auto; margin-right: 10px;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectModal',
  props: {
    selection: {
      type: Array,
      default: () => []
    },
    titlename: {
      type: String,
      default: `0`
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    closeSelf () {
      this.$emit('closeme')
    },
    getCheck (item) {
      const selectlen = this.selection.length
      for (let i = 0; i < selectlen; i++) {
        if (this.selection[i].name === item.name) {
          this.selection[i].selected = true
        } else {
          this.selection[i].selected = false
        }
      }
      this.$emit('gettype', item.name)
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
.modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
}
.modal-body {
    position: relative;
    padding: 0px 0px 10px 20px;
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
