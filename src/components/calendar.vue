<template>
  <v-touch class="wh_container" v-on:swipeup="NextMonth(myDate,false)" v-on:swipedown="PreMonth(myDate,false)">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in textTop" :key="tag.id">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)" :key="index">
          <div
            class="wh_item_date"
            v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]">
            <div>{{item.id}}</div>
            <!-- <div class="status-point"></div> -->
          </div>
        </div>
      </div>
    </div>
  </v-touch>
</template>
<script>
// import timeUtil from "./calendar";

export default {
  data () {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  props: {
    markDate: {
      type: Array,
      default: () => ['2020/9/16']
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ['一', '二', '三', '四', '五', '六', '日']
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: `0`
    },
    futureDayHide: {
      type: String,
      default: `2554387200`
    }
  },
  created () {
    this.intStart()
    this.myDate = new Date()
  },
  methods: {
    getDaysInOneMonth (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const d = new Date(year, month, 0)
      return d.getDate()
    },
    // 向前空几个
    getMonthweek (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const dateFirstOne = new Date(year + '-' + month + '-1')
      return this.sundayStart ? dateFirstOne.getDay() === 0 ? 7 : dateFirstOne.getDay() : dateFirstOne.getDay() === 0 ? 6 : dateFirstOne.getDay() - 1
    },
    /**
     * 获取当前日期上个月或者下个月
    */
    getOtherMonth (date, str = 'nextMonth') {
      const timeArray = this.dateFormat(date).split('-')
      const year = timeArray[0]
      const month = timeArray[1]
      const day = timeArray[2]
      let year2 = year
      let month2
      if (str === 'nextMonth') {
        month2 = parseInt(month) + 1
        if (month2 === 13) {
          year2 = parseInt(year2) + 1
          month2 = 1
        }
      } else {
        month2 = parseInt(month) - 1
        if (month2 === 0) {
          year2 = parseInt(year2) - 1
          month2 = 12
        }
      }
      let day2 = day
      const days2 = new Date(year2, month2, 0).getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      if (day2 < 10) {
        day2 = '0' + day2
      }
      const t2 = year2 + '-' + month2 + '-' + day2
      return new Date(t2)
    },
    // 上个月末尾的一些日期
    getLeftArr (date) {
      const arr = []
      const leftNum = this.getMonthweek(date)
      const num = this.getDaysInOneMonth(this.getOtherMonth(date, 'preMonth')) - leftNum + 1
      const preDate = this.getOtherMonth(date, 'preMonth')
      // 上个月多少开始
      for (let i = 0; i < leftNum; i++) {
        const nowTime = preDate.getFullYear() + '-' + (preDate.getMonth() + 1) + '-' + (num + i)
        arr.push({
          id: num + i,
          date: nowTime,
          isToday: false,
          otherMonth: 'preMonth'
        })
      }
      return arr
    },
    // 下个月末尾的一些日期
    getRightArr (date) {
      const arr = []
      const nextDate = this.getOtherMonth(date, 'nextMonth')
      const leftLength = this.getDaysInOneMonth(date) + this.getMonthweek(date)
      const _length = 7 - leftLength % 7
      for (let i = 0; i < _length; i++) {
        const nowTime = nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-' + (i + 1)
        arr.push({
          id: i + 1,
          date: nowTime,
          isToday: false,
          otherMonth: 'nextMonth'
        })
      }
      return arr
    },
    // format日期
    dateFormat (date) {
      date = typeof date === 'string' ? new Date(date.replace(/-/g, '-')) : date
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    // 获取某月的列表不包括上月和下月
    getMonthListNoOther (date) {
      const arr = []
      const num = this.getDaysInOneMonth(date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const toDay = this.dateFormat(new Date())

      for (let i = 0; i < num; i++) {
        const nowTime = year + '-' + month + '-' + (i + 1)
        arr.push({
          id: i + 1,
          date: nowTime,
          isToday: toDay === nowTime,
          otherMonth: 'nowMonth'
        })
      }
      return arr
    },
    // 获取某月的列表 用于渲染
    getMonthList (date) {
      return [...this.getLeftArr(date), ...this.getMonthListNoOther(date), ...this.getRightArr(date)]
    },
    intStart () {
      // this.sundayStart
    },
    setClass (data) {
      let obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date)
      }
      this.$emit('transferDay', item)
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = this.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit('changeMonth', this.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = this.dateFormat(date)
      this.myDate = this.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', this.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = this.dateFormat(date)
      this.myDate = this.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', this.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map(k => {
        return this.dateFormat(k)
      })
      markDateMore = markDateMore.map(k => {
        k.date = this.dateFormat(k.date)
        return k
      })
      return [markDate, markDateMore]
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs()
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`
      let arr = this.getMonthList(this.myDate)
      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        let k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        const t = new Date(nowTime).getTime() / 1000
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.indexOf(nowTime) > -1
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime)
          this.historyChose.push(nowTime)
          k.chooseDay = true
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true
        }
      }
      this.list = arr
    }
  },
  mounted () {
    this.getList(this.myDate)
  },
  watch: {
    markDate: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    markDateMore: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    agoDayHide: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    futureDayHide: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    sundayStart: {
      handler (val, oldVal) {
        this.intStart()
        this.getList(this.myDate)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: rgb(26, 138, 190);
    cursor: pointer;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 100%;
  margin: auto;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #fff;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: rgb(26, 138, 190);
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: #fff;
  position: relative;
}
.wh_content_item {
  height: 40px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: rgb(103 148 181);
  border-radius: 100px;
}
.wh_content_item .wh_chose_day {
  background: white;
  border-radius: 100px;
  color:rgb(26, 138, 190);
}
.status-point {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: red;
}
</style>
