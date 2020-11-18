<template>
  <div>
    <el-page-header @back="goBack" content="上下班明细" title="">
    </el-page-header>
    <el-row :gutter="20">
      <el-col :span="9" :offset="2">
        <el-button type="text" @click="changeDepart">部门
          <i :class="class_dep"></i>
        </el-button>
      </el-col>
      <el-col :span="9" :offset="2">
        <el-button type="text" @click="selectStatus">状态
          <i :class="class_status"></i>
        </el-button>
      </el-col>
    </el-row>
    <!--状态抽屉-->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <el-row :gutter="20" :class="myRow">
        <el-col :span="9" :offset="2">
          <el-button type="text" @click="closeDrawer"><span>取消</span>
          </el-button>
        </el-col>
        <el-col :span="9" :offset="2">
          <el-button type="text" @click="submit"><span>确认</span>
          </el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="gridData"
        @row-click="selectRow"
        @selection-change="handleSelection">
        <el-table-column property="status"></el-table-column>
        <el-table-column property="key" v-if="false"></el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      </el-table>
    </el-drawer>

    <!--数据-->
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        property="name"
        width="50">
        <el-avatar src="http://wework.qpic.cn/bizmail/ibVp64SEPsDZXiakEkJTdlVrnbl9dpjCURT40mDQUmicjHYs5xe0hl3Jw/0"></el-avatar>
      </el-table-column>
      <el-table-column
        property="name"
        label=""
        width="550">
      </el-table-column>
      <el-table-column
        property="status"
        label="">
      </el-table-column>
    </el-table>
    <search-modal v-if="showSearch" :titlename="'编辑人员'" :existlist="attendanceData" @getsearch="getSearch" v-on:closesearch="closeSearch"></search-modal>
  </div>
</template>

<script>

import searchModal from '../components/searchModal'

export default {
  name: 'recordDetail',

  data () {
    return {
      showSearch: false,
      tableData: [{
        name: '李元元',
        status: '迟到,早退'
      }, {
        name: 'lyy',
        status: '正常'
      }, {
        name: '王小虎',
        status: '早退'
      }, {
        name: '王大虎',
        status: '迟到'
      }],
      currentRow: null,
      myRow: 'myRow',
      direction: 'btt',
      drawer: false,
      disableDep: true,
      disableStatus: true,
      class_up: 'el-select__caret el-input__icon el-icon-arrow-up',
      class_down: 'el-select__caret el-input__icon el-icon-arrow-down',
      class_dep: '',
      class_status: '',
      gridData: [{
        status: '正常',
        key: '0'
      }, {
        status: '迟到',
        key: '1'
      }, {
        status: '早退',
        key: '2'
      }, {
        status: '缺卡',
        key: '3'
      }, {
        status: '旷工',
        key: '4'
      }],
      selected: [],
      attendanceData: {
        departs: [],
        users: []
      }
    }
  },
  components: {
    searchModal
  },
  mounted () {
    console.log(11111)
    this.class_dep = this.class_down
    this.class_status = this.class_down
  },

  methods: {
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
</style>
