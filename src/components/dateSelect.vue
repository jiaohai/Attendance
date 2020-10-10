<template>
  <div class="modal-backdrop" @click="closeSelf" style="background-color: rgba(0,0,0,.3)">
    <div class="modal-calendar" @click.stop="" >
      <div class="modal-header" style="padding: 10px; display: inline-flex;">
        <div class="black" @click="closeSelf">
          <span>取消</span>
        </div>
        <div class="title"></div>
        <div class="more" @click="saveDate">
          <span>确定</span>
        </div>
      </div>
      <div class="modal-body" style="padding: 0;">
        <Calendar @transferDay="getSelectDate"></Calendar>
      </div>
    </div>
  </div>
</template>

<script>

import Calendar from '../components/calendar'

export default {
  name: 'dateSelect',
  props: {
    existdate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      date: ''
    }
  },
  watch: {
  },
  components: {
    Calendar
  },
  methods: {
    closeSelf () {
      this.$emit('closedate')
    },
    saveDate () {
      this.$emit('getdate', this.date)
      this.closeSelf()
    },
    getSelectDate (msg) {
      this.date = msg.date
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
.modal-calendar {
    background-color: #fff;
    /* box-shadow: 2px 2px 20px 1px; */
    overflow-x:auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    top: 40%;
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
