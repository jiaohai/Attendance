<template>
  <div class="modal-backdrop">
    <div class="attendance">
      <div class="heading">
        <div class="black common" @click="closeSelf" v-if="!editPlace">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="black common" @click="closeMap" v-if="editPlace">
          <i class="fa fa-arrow-left" />
        </div>
        <div class="title common" style="align-items:center;">打卡位置</div>
        <div class="more common" @click="saveEditData" v-if="editPlace">
          <span>确定</span>
        </div>
        <div class="more common" @click="saveAllData" v-if="editAllPlace">
          <span>确定</span>
        </div>
        <div class="more common" @click="editAllData" v-if="!editPlace && !editAllPlace">
          <span>编辑</span>
        </div>
      </div>
      <div class="optioncont" v-if="editPlace">
        <iframe id="mapPage" width="100%" height="100%" frameborder=0
          src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=5YSBZ-W75KG-VLGQC-I24FQ-GT4A7-O4FBE&referer=myapp">
        </iframe>
      </div>
      <div class="bottoming" v-if="editPlace">
        <div style="width: 100%">
          <div class="titlehead" style="display: inline-flex; width:100%;" @click="editRange">
            <div class="langtitles">
              <span>范围</span>
            </div>
            <div class="shortdescrip">
              <span class="spanstyle">{{ inputRange }}米</span>
            </div>
            <i class="fa fastyle fa-angle-right" />
          </div>
        </div>
      </div>
      <div class="existstyle" v-if="!editPlace">
        <div class="addtitle" @click="editData(newPlace, -1)">
          <i class="fa fa-plus" style="font-size: x-large; margin: auto 0px auto 25px;"/>
          <div style="margin: 5px auto auto 0px;">
            <span style="padding-left: 10px;margin-top: 5px;">添加</span>
          </div>
        </div>
        <div class="options">
          <div class="alloption" v-for="(item, index) in tempexist" :key="index">
            <div class="infos">
              <div class="lione">
                <span class="titlespan">地点</span>
                <div class="spancontent">
                  <span class="spanstyle">{{ item.name }}</span>
                </div>
              </div>
              <div class="lione">
                <span class="titlespan">地址</span>
                <div class="spancontent">
                  <span class="spanstyle" >{{ item.location }}</span>
                </div>
              </div>
              <div class="lione">
                <span class="titlespan">范围</span>
                <div class="spancontent">
                  <span class="spanstyle" >{{ item.range }}米</span>
                </div>
              </div>
            </div>
            <div v-if="editAllPlace" class="fastyle" @click="delData(item)">
              <i class="fa fa-close" />
            </div>
            <div v-if="!editAllPlace" class="fastyle"  @click="editData(item, index)">
              <i class="fa fa-angle-right" />
            </div>
          </div>
        </div>
      </div>
      <input-modal v-if="isInputRange" :titlename="'输入范围'" :onlyNum="true" :inputtxt="inputRange" @getinput="getRange" v-on:closeinput="closeInput"></input-modal>
    </div>
  </div>
</template>

<script>

import inputModal from '../components/inputModal'

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
  data () {
    return {
      inputvlue: '',
      editPlace: false,
      editAllPlace: false,
      isInputRange: false,
      inputRange: '300',
      editIndex: -1,
      newPlace: {
        name: '',
        location: '',
        range: 300,
        latitude: 0,
        longtitude: 0
      },
      tempPlace: null,
      tempexist: this.existlist
    }
  },
  created: function () {
    var _this = this
    window.addEventListener('message', function (event) {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
      var loc = event.data
      if (loc && loc.module === 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        _this.tempPlace = loc
        console.log('location', loc)
      }
    }, false)
    if (this.tempexist.length === 0) {
      this.editData(this.newPlace, -1)
    }
  },
  components: {
    inputModal
  },
  methods: {
    closeSelf () {
      this.$emit('closeposition')
    },
    seveData () {
      this.$emit('getsearch', this.tempexist)
      this.closeSelf()
    },
    editAllData () {
      this.editAllPlace = !this.editAllPlace
    },
    delData (item) {
      this.tempexist.splice(this.tempexist.indexOf(item, 1))
    },
    saveAllData () {
      this.editAllPlace = !this.editAllPlace
    },
    closeMap () {
      this.editPlace = false
    },
    editData (edit, editIndex) {
      this.newPlace = edit
      this.editIndex = editIndex
      this.editAllPlace = false
      this.editPlace = !this.editPlace
    },
    saveEditData () {
      console.log(this.tempPlace)
      if (this.tempPlace) {
        this.newPlace = {
          name: this.tempPlace.poiname,
          location: this.tempPlace.poiaddress,
          range: parseInt(this.inputRange),
          latitude: this.tempPlace.latlng.lat,
          longtitude: this.tempPlace.latlng.lng
        }
        if (this.editIndex === -1) {
          this.tempexist.push(this.newPlace)
        } else {
          this.tempexist[this.editIndex] = this.newPlace
        }
        this.tempPlace = null
        this.editPlace = !this.editPlace
      } else {
        this.$confirm('请选择一个地址！', '提示', {
          showCancelButton: false,
          showConfirmButton: false,
          type: 'warning'
        }).then(() => {}).catch(() => {})
      }
    },
    editRange () {
      this.isInputRange = !this.isInputRange
    },
    getRange (msg) {
      this.inputRange = msg
    },
    closeInput () {
      this.isInputRange = !this.isInputRange
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  .optioncont{
    background-color: white;
    height: calc(100% - 85px);
    text-align: left;
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

  .langtitles{
    text-align: left;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 50%
  }

  .shortdescrip{
    width: calc(45% - 20px);
    text-align: right;
    margin: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .existstyle{
    background-color: white;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 55px);
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
  .options{
    display: inline-grid;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: calc(100% - 41px);
  }
  .alloption{
    display: flex;
    margin-left: 20px;
    width: calc(100% - 20px);
    border-bottom: 1px solid rgb(238, 238, 238);
  }
  .infos{
    width: 95%;
    display: inline-grid;
    margin: 5px auto auto auto;
  }
  .lione{
    display: inline-flex;
    width: 100%;
    text-align: left;
  }
  .titlespan{
    width: 20%;
  }
  .spancontent{
    margin-left: 5px;
    width: calc(80% - 5px);
    /* width: 200px; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .spanstyle{
    margin: auto;
    margin-right: 10px;
    font-size: small;
    color: rgb(165, 165, 165);
  }
  .fastyle{
    width: 5%;
    margin: auto 1px auto auto;
    text-align: left;
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

  .el-message-box{
    max-width: 50%;
  }
</style>
