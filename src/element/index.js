import { Main, Image, Timeline, TimelineItem, Avatar, Row, Col } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Main)
    Vue.use(Image)
    Vue.use(Timeline)
    Vue.use(TimelineItem)
    Vue.use(Avatar)
    Vue.use(Row)
    Vue.use(Col)
  }
}
export default element
