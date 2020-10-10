<template>
  <div>
    <div :style="{ marginLeft: depth +30+ 'px' }" v-for="(item,index) of list" :key="index">
      <div flex="main:justify cross:center">
        <div class="title">
          <div @click="show(!item.show,item)" style="cursor: pointer">
            <i v-if="item.children && item.children.length>0" class="fa fa-chevron-right" style="vertical-align:middle"/>
            <span v-else style="display: inline-block;width: 14px"></span>
            <img src="../../../assets/logo.png" alt="" style="width: 14px;vertical-align:middle">
          </div>
          <div style="cursor: pointer" @click="checkedOpen(!item.checked,item)" :class="item.checked?'checked':''">
            <span>{{item.title}}</span>
          </div>
        </div>
        <div v-if="checkbox" class="selected" style="margin-right: 20px"
             @click="select(item.selected,item.halfSelected,item)"
             :class="item.halfSelected?'halfSelected':''">
          <p :class="item.selected?'allSelected':''"></p>
        </div>
      </div>
      <div v-show="item.show">
        <detail-list :checkbox="checkbox" v-if="item.children && item.children.length>0" :fatherIndex="index"
                     :list="item.children"
                     :depth="depth+1" @selectFatherNode="selectFatherNode"
                     @checkedFatherNode="checkedFatherNode"></detail-list>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DetailList',//递归组件是指组件自身调用自身(被递归组件名)
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      depth: {
        type: Number,
        default: 0
      },
      fatherIndex: {
        type: Number,
        default: 0
      },
      checkbox: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // indent() {
      //   return { '': `translate(${this.depth +30}px)` }
      // }
    },
    mounted() {
      console.log("this.fatherIndex", this.fatherIndex, this.list)
    },
    data() {
      return {}
    },
    methods: {
      //扩展
      show(show, node) {
        node.show = show
      },
      //选择
      select(selected, halfSelected, node) {
        node.selected = !selected
        if (node.selected) {
          node.halfSelected = false
        }
        if (node.children && node.children.length > 0) {
          this.selectedChildren(node.children, node.selected, false)
        }
        this.$emit('selectFatherNode', this.fatherIndex, this.list.every((nodes) => {
          return nodes.selected === true
        }), this.list.some((nodes) => {
          return nodes.selected === true
        }) || this.list.some((nodes) => {
          return nodes.halfSelected === true
        }))
        //当前选中节点、当前父节点索引、全选与否、半选与否
        // console.log("this.list.every((node) => { return node.selected === node.selected })",this.list.every((node) => { return node.selected === node.selected }))
      },
      selectedChildren(node, selected, halfSelected) {
        node.forEach(item => {
          item.selected = selected
          item.halfSelected = halfSelected
          if (item.children && item.children.length > 0) {
            this.selectedChildren(item.children, selected, halfSelected)
          }
        })
      },
      // 作为父级节点检查是否需要修改选中状态(仅用于子节点调用)
      selectFatherNode(index, childrenState, halfSelected) {
        if (childrenState) {//父节点全选
          this.list[index].selected = true
          this.list[index].halfSelected = false
          this.$emit('selectFatherNode', this.fatherIndex, this.list.every((nodes) => {
            return nodes.selected === true
          }), this.list.some((nodes) => {
            return nodes.selected === true
          }) || this.list.some((nodes) => {
            return nodes.halfSelected === true
          }))
        } else if (!childrenState && halfSelected) {//父节点半选
          this.list[index].selected = false
          this.list[index].halfSelected = true
          this.$emit('selectFatherNode', this.fatherIndex, this.list.every((nodes) => {
            return nodes.selected === true
          }), this.list.some((nodes) => {
            return nodes.selected === true
          }) || this.list.some((nodes) => {
            return nodes.halfSelected === true
          }))
        } else if (!childrenState && !halfSelected) {//全不选
          this.list[index].selected = false
          this.list[index].halfSelected = false
          this.$emit('selectFatherNode', this.fatherIndex, this.list.every((nodes) => {
            return nodes.selected === true
          }), this.list.some((nodes) => {
            return nodes.selected === true
          }) || this.list.some((nodes) => {
            return nodes.halfSelected === true
          }))
        }
      },
      //选中样式
      checkedOpen(checked, item) {
        this.checkedList(this.list)
        this.$emit('checkedFatherNode')
        item.checked = checked
      },
      checkedList(list) {
        list.forEach(item => {
          item.checked = false
          if (item.children && item.children.length) {
            this.checkedList(item.children)
          }
        })
      },
      checkedFatherNode() {
        this.checkedList(this.list)
        this.$emit('checkedFatherNode')
      }
    },
    components: {
    }
  }
</script>
<style scoped>
  .title > div {
    display: inline-block;
  }

  .down {
    transform: rotate(90deg);
    transition: all 0.4s ease;
  }

  .right {
    transition: all 0.4s ease;
  }

  .selected {
    cursor: pointer;
  }

  .checked {
    color: #2d8cf0;
    background: #CBDCF7;
  }

  p {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    top: 0;
    left: 0;
    border: 1px solid #dcdee2;
    border-radius: 2px;
    background-color: #fff;
    transition: border-color .2s ease-in-out, background-color .2s ease-in-out, box-shadow .2s ease-in-out;
  }

  p.allSelected {
    border-color: #2d8cf0;
    background-color: #2d8cf0;
  }

  p.allSelected:after {
    content: "";
    display: table;
    width: 4px;
    height: 8px;
    position: absolute;
    top: 2px;
    left: 5px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    -webkit-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    transition: all .2s ease-in-out;
  }

  .halfSelected > p {
    background-color: #2d8cf0;
    border-color: #2d8cf0;
  }

  .halfSelected > p:after {
    content: "";
    width: 10px;
    height: 1px;
    position: absolute;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    -webkit-transform: scale(1);
    transform: scale(1);
    position: absolute;
    left: 2px;
    top: 6px;
  }
</style>
