webpackJsonp([14],{EQEo:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={name:"rule",data:function(){return{userId:null,authority:null,msg:"规则",showcheck:!0,showstatistics:!0,showrule:!0,showsetting:!0,ruledata:[],newData:{id:null,ruleName:"",ruleType:"固定上下班",lateSign:1,expiration:"不限制",lateSignCount:30,remind:0,offWorkRemind:null,workRemind:"十分钟",split:"12:00",workDay:"",overTime:{id:null,type:"按打卡时间",starTtime:null,shortest:null,longest:null,restStart:null,restEnd:null,ruleId:null,deductionName:null,overHour:null,deductHour:null},special:{id:null,holiday:1,noAttendanceDay:[{date:"",reason:"",id:null,type:0}],attendanceDay:[{date:"",reason:"",id:null,type:1,workTime:[{id:"",startTime:"08:00",endTime:"18:00",target:null,scheduleId:0,overWorkId:0,shiftId:0}]}]},schedule:[{id:null,restStart:"12:00",day:"星期一 星期二 星期三 星期四 星期五",restEnd:"14:00",workTime:[{id:null,startTime:"08:00",endTime:"18:00"}]}],shift:[{id:null,restStart:"12:00",name:"",restEnd:"14:00",workTime:[{id:null,startTime:"08:00",endTime:"18:00"}]}],shiftCycle:[],shiftRule:[],places:[],whiteList:[],attendance:{users:[],departs:[]},supervisors:[]},showfoot:!1,showS:!1,showR:!1,showA:!1}},created:function(){this.userId=this.$route.query.userId,this.authority=parseInt(this.$route.query.authority),this.authority>1&&(this.showfoot=!0),console.log(this.authority),2===this.authority?this.showS=!0:3===this.authority?this.showR=!0:4===this.authority&&(this.showA=!0),this.getInit()},methods:{goBackThing:function(){window.history.go(-1)},goAddRule:function(t){this.$router.push({name:"addrule",params:{editData:t}})},gocheck:function(){"/check"!==this.$route.path&&this.$router.push({path:"/check",query:{userId:this.userId,authority:this.authority}})},gostatistics:function(){"/statistics"!==this.$route.path&&this.$router.push({path:"/statistics",query:{userId:this.userId,authority:this.authority}})},gorule:function(){"/rule"!==this.$route.path&&this.$router.push({path:"/rule",query:{userId:this.userId,authority:this.authority}})},gosetting:function(){"/addadmin"!==this.$route.path&&this.$router.push({path:"/addadmin",query:{userId:this.userId,authority:this.authority}})},getInit:function(){var t=this;this.$axios.get("/api/rule/ruleList").then(function(s){s.data.flag&&(t.ruledata=s.data.data),console.log(s)})}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"attendance",staticStyle:{height:"100%"}},[e("div",{staticClass:"heading"},[e("div",{staticClass:"black common",on:{click:t.goBackThing}},[e("i",{staticClass:"fa fa-arrow-left"})]),t._v(" "),e("div",{staticClass:"title common",staticStyle:{"align-items":"center"}},[t._v(t._s(t.msg))]),t._v(" "),e("div",{staticClass:"more common"},[e("i",{staticClass:"fa fa-plus",on:{click:function(s){return t.goAddRule(t.newData)}}})])]),t._v(" "),0===t.ruledata.length?e("div",[e("span",[t._v("没有打卡规则，请添加打卡规则")])]):t._e(),t._v(" "),e("div",{staticClass:"contentbody",staticStyle:{height:"calc(100% - 86px)"}},t._l(t.ruledata,function(s){return e("div",{key:s.id,staticClass:"uncommonpiece",on:{click:function(e){return t.goAddRule(s)}}},[e("div",{staticClass:"rulecotent"},[e("span",{staticClass:"contentspan"},[t._v(t._s(s.ruleName))]),t._v(" "),"固定上下班"===s.ruleType?e("span",{staticClass:"contentspan secondspan"},[t._v("\n          时间\n          "),t._l(s.schedule,function(s,a){return e("span",{key:a+"s"},[t._v(t._s(s.workTime[0].startTime)+" ~ "+t._s(s.workTime[0].endTime))])})],2):t._e(),t._v(" "),"按班次上下班"===s.ruleType?e("span",{staticClass:"contentspan secondspan"},[t._v("\n          班次\n          "),t._l(s.shift,function(s,a){return e("span",{key:a+"f"},[t._v(t._s(s.name))])})],2):t._e(),t._v(" "),"自由上下班"===s.ruleType?e("span",{staticClass:"contentspan secondspan"},[t._v("\n          工作日 "+t._s(s.workDay))]):t._e(),t._v(" "),0===s.places.length?e("span",{staticClass:"contentspan secondspan"},[t._v("位置 未设置")]):t._e(),t._v(" "),s.places.length>0?e("span",{staticClass:"contentspan secondspan"},[t._v("位置 "+t._s(s.places[0].name))]):t._e()]),t._v(" "),t._m(0,!0)])}),0),t._v(" "),t.showfoot?e("div",{staticClass:"bottoming"},[e("button",{staticClass:"clock-in bottomchildre",class:-1!==t.$route.path.indexOf("check")?"colortext":"colorcommon",on:{click:t.gocheck}},[e("i",{staticClass:"fa fa-map-marker"}),t._v(" "),e("span",[t._v("打卡")])]),t._v(" "),t.showS||t.showR?e("button",{staticClass:"statistics bottomchildre",class:-1!==t.$route.path.indexOf("statistics")?"colortext":"colorcommon",on:{click:t.gostatistics}},[e("i",{staticClass:"fa fa-pie-chart"}),t._v(" "),e("span",[t._v("统计")])]):t._e(),t._v(" "),t.showR?e("button",{staticClass:"rule bottomchildre",class:-1!==t.$route.path.indexOf("rule")?"colortext":"colorcommon",on:{click:t.gorule}},[e("i",{staticClass:"fa fa-sliders "}),t._v(" "),e("span",[t._v("规则")])]):t._e(),t._v(" "),t.showA?e("button",{staticClass:"setting bottomchildre",class:-1!==t.$route.path.indexOf("addadmin")?"colortext":"colorcommon",on:{click:t.gosetting}},[e("i",{staticClass:"fa fa-cog"}),t._v(" "),e("span",[t._v("设置")])]):t._e()]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"rightside"},[s("i",{staticClass:"fa fastyle fa-angle-right"})])}]};var n=e("VU/8")(a,i,!1,function(t){e("bqV3")},"data-v-10a02838",null);s.default=n.exports},bqV3:function(t,s){}});
//# sourceMappingURL=14.1a000a5f08ae255bba37.js.map