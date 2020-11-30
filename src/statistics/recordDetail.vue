<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div style="height: 100%;width: 100%">
    <template v-if="showNext">
      <van-nav-bar :title="this.title" left-text="" left-arrow @click-left="onClickLeft">
        <template #right>
          <van-icon name="down" @click="exportData"/>
        </template>
      </van-nav-bar>
      <van-row gutter="20">
        <van-col span="10" offset="2">
          <van-button @click="changeDepart">部门
            <i :class="class_dep"></i>
          </van-button>
        </van-col>
        <van-col span="10" ffset="2">
          <van-button @click="selectStatus">状态
            <i :class="class_status"></i>
          </van-button>
        </van-col>
      </van-row>
      <!--动作面板-->
      <template>
        <van-action-sheet v-model="drawer" title="选择" cancel-text="确认" @cancel="confirm">
          <van-checkbox-group v-model="selected">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in gridData"
                clickable
                border
                :key="item.value"
                :title="item.status"
                @click="toggle(index)"
              >
                <template #right-icon>
                  <van-checkbox :name="item" ref="checkboxes" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-action-sheet>
      </template>
      <!--数据-->
      <van-cell-group border
      >
        <van-cell v-for="item in tableData" :key="item.employeeId" :title="item.name" clickable @click="openDetail">
          <template #icon>
            <img :src="item.avatar" style="height: 10%;width: 10%">
          </template>
          <h v-html="item.status"></h>
        </van-cell>
      </van-cell-group>
    </template>
    <template>
      <!--部门-->
      <search-modal v-if="showSearch" :titlename="'编辑人员'" :existlist="attendanceData" @getsearch="getSearch" v-on:closesearch="closeSearch"></search-modal>
    </template>

    <template>
      <!--打卡详情-->
      <check-record @close='closeCheckRecord' :userId="this.employeeId" :checkDate="this.checkDate" :if-show-month-report="false" :go-back="false" v-if="showCheckRecord"></check-record>
    </template>

  </div>
</template>

<script>

import searchModal from '../components/searchModal'

import checkRecord from '../attendance/checkrecord'

export default {
  name: 'recordDetail',

  data () {
    return {
      ifShow: false,
      title: '上下班明细',
      day: '',
      showNext: true,
      showCheckRecord: false,
      showSearch: false,
      employeeId: '',
      tableData: [{
        employeeId:'liyuanyuan',
        name: '李元元',
        status: '<h style="color: #F56C6C">迟到,早退</h>',
        avatar: 'http://wework.qpic.cn/bizmail/ibVp64SEPsDZXiakEkJTdlVrnbl9dpjCURT40mDQUmicjHYs5xe0hl3Jw/0'
      }, {
        employeeId:'lyy',
        name: 'lyy',
        status: '<h style="color: #a5a5a5">正常</h>',
        avatar: 'http://wework.qpic.cn/bizmail/ibVp64SEPsDZXiakEkJTdlVrnbl9dpjCURT40mDQUmicjHYs5xe0hl3Jw/0'
      }, {
        employeeId:'wangxiaohu',
        name: '王小虎',
        status: '<h style="color: #F56C6C">早退</h>',
        avatar: 'http://wework.qpic.cn/bizmail/ibVp64SEPsDZXiakEkJTdlVrnbl9dpjCURT40mDQUmicjHYs5xe0hl3Jw/0'
      }, {
        employeeId:'wangdahu',
        name: '王大虎',
        status: '<h style="color: #F56C6C">迟到</h>',
        avatar: 'http://wework.qpic.cn/bizmail/ibVp64SEPsDZXiakEkJTdlVrnbl9dpjCURT40mDQUmicjHYs5xe0hl3Jw/0'
      }],
      currentRow: {
        employeeId: '',
        name: ''
      },
      myRow: 'myRow',
      direction: 'btt',
      drawer: false,
      showModal: false,
      disableDep: true,
      disableStatus: true,
      class_up: 'el-select__caret el-input__icon el-icon-arrow-up',
      class_down: 'el-select__caret el-input__icon el-icon-arrow-down',
      class_dep: '',
      class_status: '',
      gridData: [{
        status: '正常',
        value: '0'
      }, {
        status: '迟到',
        value: '1'
      }, {
        status: '早退',
        value: '2'
      }, {
        status: '缺卡',
        value: '3'
      }, {
        status: '旷工',
        value: '4'
      }],
      selected: [],
      attendanceData: {
        departs: [],
        users: []
      }
    }
  },
  props : {
    status:{
      type: String,
      default: '0'
    },
    checkDate: {
      type: Date,
      default : new Date()
    },
    data: {
      type: [],
      default: []
    }
  },
  components: {
    checkRecord,
    searchModal
  },
  mounted () {
    this.class_dep = this.class_down
    this.class_status = this.class_down
  },

  methods: {
    confirm () {
      this.$message.info('选取状态')
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    onClickLeft () {
      this.$message.info('返回')
    },
    exportData () {
      this.$message.info('导出')
    },
    closeCheckRecord () {
      this.showCheckRecord = false
      this.showNext = true
    },
    openDetail () {
      this.showCheckRecord = true
      this.showNext = false
      this.employeeId = this.currentRow.employeeId
    },
    getSearch (msg) {
      this.attendanceData = msg
    },
    closeSearch: function () {
      this.showSearch = !this.showSearch
    },
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    closeDrawer () {
      this.drawer = false
    },

    submit () {
      this.drawer = false
    },
    handleSelection (rows) {
      this.selected = rows
      console.log(this.selected)
    },
    selectRow (row, column, event) {
      // 获取表格对象
      let refsElTable = this.$refs.multipleTable
      // 调用选中行方法
      refsElTable.toggleRowSelection(row)
    },
    changeDepart () {
      if (this.class_dep === this.class_down){
        this.class_dep = this.class_up
      } else {
        this.class_dep = this.class_down
      }
      this.showSearch = !this.showSearch
    },
    selectStatus () {
      if (this.class_status === this.class_down){
        this.class_status = this.class_up
      } else {
        this.class_status = this.class_down
      }
      this.drawer = true
    },
    handleClose () {
      this.drawer = false
      this.class_dep = this.class_down
      this.class_status = this.class_down
    },
    goBack () {
      window.history.go(-1)
    },
    inArray (array, search) {
      for (let i in array) {
        if (array[i] === search) {
          return true
        }
      }
      return false
    }
  }
}

</script>

<style scoped>
  .myRow {
    background: #e4e4e4;
  }

  /deep/ .el-icon-back:before {
    margin-left: 12px;
    content: "\E6EA";
  }

  /deep/ .el-page-header__content {
    font-size: 18px;
    color: #303133;
    margin-top: 12px;
  }
  /deep/ .el-page-header {
    height: 50px;
    background-color: rgb(26, 138, 190);
    display: flex;
    line-height: 24px;
  }
  /deep/ .el-table thead {
    display: none;
    color: #909399;
    font-weight: 500;
  }

  /deep/ .el-table th>.cell {
    display: none;
  }

  /deep/ .el-button--text {
    color: #909399;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
  }

  .button_blue {
    color: #0ebce8;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
  }

  /deep/ .el-page-header__content {
    font-size: 14px;
    color: #303133;
    position: relative;
    margin-left: 37%;
  }

  /deep/ .el-page-header__title {
    font-size: 14px;
    font-weight: 200;
  }

  /deep/ .el-page-header {
    display: flex;
    line-height: 24px;
    margin-top: 24px;
  }

  /deep/ .el-drawer__header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #72767b;
    display: none;
    margin-bottom: 32px;
    padding: 20px 20px 0;
  }
  /deep/ .van-cell__title, .van-cell__value {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: left;
    padding-left: 20px;
  }
</style>
