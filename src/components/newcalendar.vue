<template>
  <div class="d_date">
    <van-nav-bar :title="this.yearAndMonth" left-text="" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="arrow" @click="onClickRight"/>
      </template>
    </van-nav-bar>
    <van-calendar v-model="show"
                  :poppable="false"
                  :show-confirm="false"
                  :first-day-of-week="0"
                  :show-mark="false"
                  :row-height="48"
                  :default-date="new Date()"
                  :min-date="new Date(this.firstDayThisMonth)"
                  :max-date="new Date(this.lastDayThisMonth)"
                  @select="selectDay"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      show: false,
      year: 1971,
      month: 7,
      lastDay: 30,
      yearAndMonth: '',
      lastDayThisMonth: '1971/07/01',
      firstDayThisMonth: '1971/07/30'
    }
  },
  mounted () {
    this.year = new Date().getFullYear()
    this.month = new Date().getMonth() + 1
    this.yearAndMonth = this.year + '年' + this.month + '月'
    this.getFirstAndLastDayThisMonth()
  },
  methods: {
    formatDate (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    selectDay (item) {
      let date = this.formatDate(item)
      if (date == null || typeof (date) === 'undefined'){
        this.$message.error('invalid date')
      } else {
        let split = '-'
        const arr = date.split(split)
        let month = arr[1]
        let day = arr[2]
        if (month < 10){
          month = '0' + month
        }
        if (day < 10){
          day = '0' + day
        }
        let str = arr[0] + split + month + split + day
        this.date = str
        this.$emit('selectDay', this.date)
      }
    },
    onClickLeft () {
      if (this.month === 1){
        this.month = 12
        this.year = this.year - 1
      } else {
        this.month = this.month - 1
      }
      let date = new Date()
      date.setFullYear(this.year)
      date.setMonth(this.month - 1)
      this.getFirstAndLastDayThisMonth(date)
    },
    onClickRight () {
      if (this.month === 12){
        this.month = 1
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
      let date = new Date()
      date.setFullYear(this.year)
      date.setMonth(this.month - 1)
      this.getFirstAndLastDayThisMonth(date)
    },

    getFirstAndLastDayThisMonth (date) {
      if (date == null || typeof (date) === 'undefined'){
        date = new Date()
      }
      let currentMonth = date.getMonth()
      let nextMonth = ++currentMonth
      let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
      let oneDay = 1000 * 60 * 60 * 24
      let lastTime = new Date(nextMonthFirstDay - oneDay)
      let month = parseInt(lastTime.getMonth() + 1)
      this.year = date.getFullYear()
      this.month = month
      let day = lastTime.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      this.firstDayThisMonth = date.getFullYear() + '/' + month + '/' + '01'
      this.lastDayThisMonth = date.getFullYear() + '/' + month + '/' + day
      this.yearAndMonth = this.year + '年' + this.month + '月'
    }
  }
}
</script>

<style scoped>
  /deep/ .van-calendar__selected-day {
    width: 54px;
    height: 54px;
    color: rgb(26, 138, 190);
    background-color: #f5f7fa;
    border-radius: 4px;
  }

  /deep/ .van-calendar__header-subtitle {
    display: none;
  }

  /deep/ .van-calendar__header-title {
    display: none;
  }

  /deep/ .van-calendar__days {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-user-select: none;
    user-select: none;
    background: rgb(26, 138, 190);
  }

  /deep/ .van-calendar__weekdays {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    background: rgb(26, 138, 190);
  }

  /deep/ .van-calendar__weekday {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    color: #c8c9cc;
  }

  /deep/ .van-calendar__day {
    position: relative;
    width: 14.285%;
    height: 64px;
    font-size: 16px;
    cursor: pointer;
    color: #e5e9f2;
  }

  /deep/ .van-nav-bar__content {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 46px;
    background: rgb(26, 138, 190);
  }

  /deep/ .van-icon-arrow-left::before {
    content: '\F008';
    color: #e5e9f2;
  }

  /deep/ .van-icon-arrow::before {
    content: '\F00A';
    color: #e5e9f2;
  }

  /deep/ .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #e5e9f2;
    font-weight: 500;
    font-size: 16px;
  }
</style>
