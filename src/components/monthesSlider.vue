<template>
  <div class="m-calendar" ref="calendar">
    <div class="m-toolbar">
      <div class="m-year-selector">
        <span>{{selectShowDate.year}}{{yearName}}</span>
      </div>
      <div class="m-month-selector">
        <span>{{monthNames[selectShowDate.month-1]}}</span>
      </div>
    </div>
    <div class="m-months-container" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <div class="m-months-wrapper" :style="{'transform': `translate3d(${-translateX*100}%, 0, 0)`}" >
        <div class="m-months" v-for="(month, monthIndex) in fullDate" :key="monthIndex" :style="{ transform: `translate3d(${(monthIndex-1+translateX + (isTouching ? touch.x : 0))*100}%, 0, 0)`, transitionDuration: isTouching ? '0s' : '.3s', }" >
          <div class="m-row">
            <div class="m-day" v-for="(day, dayIndex) in month" :key="dayIndex" @click="onDayClick(day)" >
              <span :class="{
                  'm-day-num':true,
                  'm-tomonth': day.isTomonth,
                  'm-select': day.isSelect,
                }" >
                <span style="padding-top: 6px;display: block;">{{ day.valueMonth }}</span>
              </span>
              <slot name="day" :date="day" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
let touchStartPosition
let touchEndPosition
// let timeStamp

export default {
  name: 'monthesSlider',
  props: {
    defaultDate: {
      type: [Date, Number, Array, String, moment]
    },
    disabledDate: {
      type: Array,
      default () {
        return []
      }
    },
    minDate: {
      type: [Date, Number, Array, String, moment]
    },
    maxDate: {
      type: [Date, Number, Array, String, moment]
    },
    mode: {
      type: String,
      default: 'single'
    },
    dayClick: {
      type: Function,
      default () {
        return function () {
          return true
        }
      }
    },
    enableTouch: {
      type: Boolean,
      default: true
    },
    monthNames: {
      type: Array,
      default () {
        return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    },
    weekNames: {
      type: Array,
      default () {
        return ['一', '二', '三', '四', '五', '六', '日']
      }
    },
    yearName: {
      type: String,
      default: '年'
    },
    restrictCurrentMonth: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    mode () {
      this.init()
    }
  },
  data () {
    return {
      fullDate: [[], [], []],
      translateX: 0,
      showDate: {
        year: undefined,
        month: undefined
      },
      selectShowDate: {
        year: undefined,
        month: undefined
      },
      dateNow: {
        year: moment().year(),
        month: moment().month() + 1,
        date: moment().date()
      },
      selectDate: [],
      touch: {
        x: 0,
        y: 0
      },
      isTouching: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init (date) {
      this.selectDate = []
      let { defaultDate, mode } = this
      if (date) {
        defaultDate = date
      }
      let dateToShow = moment().startOf('month')
      if (mode === 'single' && defaultDate) {
        this.selectDate = moment(defaultDate).startOf('day')
        dateToShow = this.selectDate.startOf('month')
      }
      if (mode === 'multiple' && Array.isArray(defaultDate)) {
        if (defaultDate.length > 0) {
          this.selectDate = defaultDate.map((item) => moment(item).startOf('day'))
        }
      }
      if (mode === 'during' && Array.isArray(defaultDate)) {
        if (defaultDate.length === 2) {
          const startDate = moment(defaultDate[0]).startOf('day')
          const endDate = moment(defaultDate[1]).startOf('day')
          if (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
            this.selectDate = [startDate, endDate]
          }
        }
      }
      this.showDate = {
        year: dateToShow.year(),
        month: dateToShow.month() + 1
      }
      this.selectShowDate = {
        year: dateToShow.year(),
        month: dateToShow.month() + 1
      }
      this.getFullDate(this.showDate)
    },
    touchstart (event) {
      if (this.enableTouch) {
        touchStartPosition = event.touches[0].clientX
        touchEndPosition = event.touches[0].clientY
        // timeStamp = event.timeStamp
        this.touch = {
          x: 0,
          y: 0
        }
        this.isTouching = true
      }
    },
    touchmove (event) {
      if (this.enableTouch) {
        this.touch = {
          x: (event.touches[0].clientX - touchStartPosition) / this.$refs.calendar.offsetWidth,
          y: (event.touches[0].clientY - touchEndPosition) / this.$refs.calendar.offsetHeight
        }
      }
    },
    touchend (event) {
      if (this.enableTouch) {
        this.isTouching = false
        // const during = moment(event.timeStamp).diff(timeStamp)
        if (Math.abs(this.touch.x) > Math.abs(this.touch.y) && Math.abs(this.touch.x * this.$refs.calendar.offsetWidth) > 20) {
          if (this.touch.x > 0) {
            this.changeMonth('prev')
          } else if (this.touch.x < 0) {
            this.changeMonth('next')
          }
        } else {
          this.touch = {
            x: 0,
            y: 0
          }
        }
      }
    },
    // 触发change事件
    emitChange () {
      this.$emit('change', moment(this.selectDate).format('YYYY-MM'))
    },
    // 触发切换年月事件
    emitSwitch (showDate) {
      if (this.restrictCurrentMonth) {
        this.selectDate = []
      }
      this.$emit('switch', showDate)
    },
    // 日期点击事件
    onDayClick (day) {
      if (!this.dayClick(day.dateTime)) {
        return
      }
      switch (this.$props.mode) {
        case 'single':
          if (!day.isSelect && !day.isDisable) {
            this.selectDate = day.dateTime
            this.selectShowDate = {
              year: this.selectDate.year(),
              month: this.selectDate.month() + 1
            }
            this.getFullDate(this.selectShowDate)
            this.emitChange()
          }
          break
        case 'multiple':
          if (!day.isSelect && !day.isDisable) {
            this.selectDate.push(day.dateTime)
            this.getFullDate(this.showDate)
            this.emitChange()
          } else {
            if (this.selectDate.length > 1) {
              this.selectDate = this.selectDate.filter((item) => !item.isSame(day.dateTime))
              this.getFullDate(this.showDate)
              this.emitChange()
            }
          }
          break
        case 'during':
          if (day.isDisable) return
          if (this.restrictCurrentMonth) return
          if (this.selectDate.length === 0) {
            this.selectDate = [day.dateTime]
          } else if (this.selectDate.length === 1) {
            this.selectDate.push(day.dateTime)
            if (this.selectDate[1].isBefore(this.selectDate[0])) {
              this.selectDate.reverse()
            }
          } else if (this.selectDate.length === 2) {
            this.selectDate = [day.dateTime]
          }
          this.getFullDate(this.showDate)
          this.emitChange()
          break
      }
    },
    // 切换年份
    changeYear (action) {
      const date = moment(this.showDate.year + '-' + this.showDate.month, 'YYYY-MM')
      let computedDate
      switch (action) {
        case 'prev':
          this.translateX += 1
          computedDate = date.subtract(1, 'year')
          break
        case 'next':
          this.translateX -= 1
          computedDate = date.add(1, 'year')
          break
      }
      this.showDate = {
        year: computedDate.year(),
        month: computedDate.month() + 1
      }
      // this.emitSwitch(this.showDate)
      this.getFullDate(this.showDate)
    },
    // 切换月份
    changeMonth (action) {
      const date = moment(this.showDate.year + '-' + this.showDate.month, 'YYYY-MM')
      let computedDate
      switch (action) {
        case 'prev':
          this.translateX += 1
          computedDate = date.subtract(6, 'month')
          break
        case 'next':
          this.translateX -= 1
          computedDate = date.add(6, 'month')
          break
      }
      this.showDate = {
        year: computedDate.year(),
        month: computedDate.month() + 1
      }
      // this.emitSwitch(this.showDate)
      this.getFullDate(this.showDate)
    },
    // 暴露出去的方法：切换已选的时间
    changeDate (date) {
      if (moment(date).isValid() || Array.isArray(date)) {
        this.init(date)
      } else {
        console.error('Type of parameter is invalid!')
      }
    },
    // 暴露出去的方法：切换当前显示的时间
    changeDateView (date = moment()) {
      const changeDate = moment(date)
      this.showDate = {
        year: changeDate.year(),
        month: changeDate.month() + 1
      }
      this.getFullDate(this.showDate)
    },
    getFullDate () {
      const date = moment(this.showDate.year + '-' + this.showDate.month, 'YYYY-MM')
      const thisDate = this.getDaies(date)
      const prevDate = this.getDaies(date.subtract(6, 'month'))
      const nextDate = this.getDaies(date.add(12, 'month'))
      this.fullDate = [
        prevDate.fullDate,
        thisDate.fullDate,
        nextDate.fullDate
      ]
    },
    // 当前日期是否被选中
    isSelect (date) {
      let select = false
      switch (this.$props.mode) {
        case 'single':
          if (this.selectDate && date.isSame(this.selectDate)) {
            select = true
          }
          break
        case 'multiple':
          if (this.selectDate.length > 0 && this.selectDate.some((item) => date.isSame(item))) {
            select = true
          }
          break
      }
      return select
    },
    getDaies (thisDate) {
      let fullDate = []
      let monthDate = moment(thisDate).month() < 6 ? moment(thisDate).month() : moment(thisDate).month() - 6
      let today = moment()
      for (var i = 0; i < 6; i++) {
        let _theDate = moment(thisDate).subtract(monthDate - i, 'M')
        fullDate[i] = {
          isTomonth: _theDate.format('YYYY-MM') === today.format('YYYY-MM'),
          isSelect: this.isSelect(_theDate),
          valueMonth: this.monthNames[moment(_theDate).month()],
          dateTime: _theDate
        }
      }
      return {
        fullDate
      }
    }
  }
}
</script>

<style scoped>
.m-calendar {
  width: 100%;
  /* background: #fff; */
  box-shadow: 0px 2px 6px 0px rgba(183, 183, 183, 0.2);
}
.m-calendar .m-toolbar {
  padding-bottom: 2px;
  /* border-bottom: #ddd solid 0.5px; */
}
.m-calendar .m-toolbar {
  display: flex;
  /* height: 2.56rem; */
}
.m-calendar .m-toolbar .m-month-selector,
.m-calendar .m-toolbar .m-year-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2px;
}
.m-calendar .m-toolbar .m-month-selector,
.m-calendar .m-toolbar .m-year-selector {
  /* line-height: 1.06666667rem; */
}
.m-calendar .m-toolbar .m-month-selector,
.m-calendar .m-toolbar .m-year-selector {
  /* font-size: 0.768rem; */
  font-family: PingFangSC-Medium, PingFangSC;
  font-weight: 500;
  color: #fff;
}
.m-calendar .m-toolbar .m-year-selector {
  padding-left: 10px;
}
.m-calendar .m-months-container {
  position: relative;
  box-sizing: border-box;
  height: 30px;
  overflow: hidden;
}
.m-calendar .m-months-container .m-months-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.m-calendar .m-months-container .m-months-wrapper .m-months {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  will-change: transform;
  /* width: 16rem; */
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row {
  justify-content: space-between;
  /* padding-top: 0.512rem; */
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row {
  /* width: 16rem; */
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row {
  position: relative;
  display: flex;
  /* height: 1.408rem; */
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day {
  margin-right: 20px;
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day:nth-child(1) {
  margin-left: 20px;
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day {
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFangSC;
  font-weight: 500;
  color: #fff;
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day {
  position: relative;
  /* height: 1.408rem; */
  /* width: 1.408rem; */
  /* line-height: 1.408rem; */
  text-align: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: 50%;
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day .m-day-num {
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 100%;
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day .m-day-num {
  /* height: 1.408rem; */
  /* line-height: 1.408rem; */
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day .m-grey {
  color: #b8b8b8;
  background: #007aff;
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day .m-tomonth {
  background: rgb(103 148 181);
  color: #fff;
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day .m-disable {
  color: #b8b8b8;
  text-decoration: line-through;
}
.m-calendar .m-months-container .m-months-wrapper .m-months .m-row .m-day .m-select {
  background: #fff;
  color: rgb(26, 138, 190);
}
</style>
