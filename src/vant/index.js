// 导入自己需要的组件
import { Row, Col, NavBar, Icon, Calendar, ActionSheet, Cell, CellGroup, Checkbox, CheckboxGroup, Divider } from 'vant'
const vant = {
  install: function (Vue) {
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(NavBar)
    Vue.use(Icon)
    Vue.use(Calendar)
    Vue.use(ActionSheet)
    Vue.use(Cell)
    Vue.use(CellGroup)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Divider)
  }
}
export default vant
