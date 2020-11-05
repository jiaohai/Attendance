webpackJsonp([5],{"0u5j":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("bjcK"),i=a("pMXI"),n={name:"singlereport",data:function(){return{date:"",msg:"月报",normal:0,error:0,absence:0,ifLate:0,ifAbsent:0,ifLeaveEarly:0}},components:{monthesSlider:s.a},mounted:function(){this.getData()},methods:{drawLine:function(){console.log(this.recordDataList);var t=this.$echarts.init(document.getElementById("myChart")),e={tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",left:10,data:["正常","迟到","旷工","缺卡","早退"]},series:[{name:"上下班统计",type:"pie",radius:["50","70"],avoidLabelOverlap:!1,label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:"30",fontWeight:"bold"}},labelLine:{show:!1},data:this.recordDataList}]};t.setOption(e)},getData:function(){var t=this;Object(i.a)(this.date,"125").then(function(e){var a=[],s=e.data.data.record;for(var i in s){var n={},o={};n.name=s[i],"leaveEarliy"===i?(o.color="#F56C6C",n.name="早退",n.value=s[i]):"normol"===i?(o.color="#67C23A",n.name="正常",n.value=s[i]):"absenceAll"===i?(o.color="#E6A23C",n.name="旷工",n.value=s[i]):"late"===i?(o.color="#F56C6C",n.name="迟到",n.value=s[i]):"absence"===i&&(o.color="#F56C6C",n.name="缺卡",n.value=s[i]),a.push(n)}t.ifLate=e.data.data.record.late,t.ifAbsent=e.data.data.record.absence,t.ifLeaveEarly=e.data.data.record.leaveEarliy,t.absence=e.data.data.record.absenceAll,t.normal=e.data.data.record.normol,t.recordDataList=a,t.drawLine()})},goBackThing:function(){window.history.go(-1)},getSelectDate:function(t){console.log(t),this.date=t,this.normal=0,this.error=0,this.absence=0,this.ifLate=0,this.ifAbsent=0,this.ifLeaveEarly=0,this.getData()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"attendance"},[a("div",{staticClass:"heading"},[a("div",{staticClass:"black common",on:{click:t.goBackThing}},[a("i",{staticClass:"fa fa-arrow-left"})]),t._v(" "),a("div",{staticClass:"title common",staticStyle:{"align-items":"center"}},[t._v(t._s(t.msg))]),t._v(" "),a("div",{staticClass:"more common"})]),t._v(" "),a("div",{staticClass:"heading",staticStyle:{height:"60px"}},[a("monthesSlider",{on:{change:t.getSelectDate}})],1),t._v(" "),a("div",{staticClass:"statisticspiece"},[a("span",{staticClass:"stcspan"},[t._v("上下班统计")]),t._v(" "),a("div",{staticClass:"cotentinfo"},[a("el-row",[a("div",{staticClass:"vol-data"},[a("div",{style:{width:"100%",height:"200px"},attrs:{id:"myChart"}})])]),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6,offset:2}},[a("div",{staticClass:"grid-content bg-purple"}),t._v("迟到: "),a("span",{staticStyle:{color:"#F56C6C","font-weight":"700"}},[t._v(t._s(t.ifLate))])]),t._v(" "),a("el-col",{attrs:{span:6,offset:2}},[a("div",{staticClass:"grid-content bg-purple"}),t._v("缺卡: "),a("span",{staticStyle:{color:"#F56C6C","font-weight":"700"}},[t._v(t._s(t.ifAbsent))])]),t._v(" "),a("el-col",{attrs:{span:6,offset:2}},[a("div",{staticClass:"grid-content bg-purple"}),t._v("早退: "),a("span",{staticStyle:{color:"#F56C6C","font-weight":"700"}},[t._v(t._s(t.ifLeaveEarly))])]),t._v(" "),a("el-col",{attrs:{span:6,offset:2}},[a("div",{staticClass:"grid-content bg-purple"}),t._v("正常: "),a("span",{staticStyle:{color:"#67C23A","font-weight":"700"}},[t._v(t._s(t.normal))])]),t._v(" "),a("el-col",{attrs:{span:6,offset:2}},[a("div",{staticClass:"grid-content bg-purple"}),t._v("缺勤: "),a("span",{staticStyle:{color:"#E6A23C","font-weight":"700"}},[t._v(t._s(t.absence))])])],1)],1)]),t._v(" "),t._m(0),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"statisticspiece"},[e("span",{staticClass:"stcspan"},[this._v("加班统计")]),this._v(" "),e("div",{staticClass:"cotentinfo"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"statisticspiece"},[e("span",{staticClass:"stcspan"},[this._v("假勤统计")]),this._v(" "),e("div",{staticClass:"cotentinfo"})])}]};var r=a("VU/8")(n,o,!1,function(t){a("OaJN")},"data-v-2bff0483",null);e.default=r.exports},OaJN:function(t,e){},"Q/LK":function(t,e){},bjcK:function(t,e,a){"use strict";var s=a("PJh5"),i=a.n(s),n=void 0,o=void 0,r={name:"monthesSlider",props:{defaultDate:{type:[Date,Number,Array,String,i.a]},disabledDate:{type:Array,default:function(){return[]}},minDate:{type:[Date,Number,Array,String,i.a]},maxDate:{type:[Date,Number,Array,String,i.a]},mode:{type:String,default:"single"},dayClick:{type:Function,default:function(){return function(){return!0}}},enableTouch:{type:Boolean,default:!0},monthNames:{type:Array,default:function(){return["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]}},weekNames:{type:Array,default:function(){return["一","二","三","四","五","六","日"]}},yearName:{type:String,default:"年"},restrictCurrentMonth:{type:Boolean,default:!1}},watch:{mode:function(){this.init()}},data:function(){return{fullDate:[[],[],[]],translateX:0,showDate:{year:void 0,month:void 0},selectShowDate:{year:void 0,month:void 0},dateNow:{year:i()().year(),month:i()().month()+1,date:i()().date()},selectDate:[],touch:{x:0,y:0},isTouching:!1}},created:function(){this.init()},methods:{init:function(t){this.selectDate=[];var e=this.defaultDate,a=this.mode;t&&(e=t);var s=i()().startOf("month");if("single"===a&&e&&(this.selectDate=i()(e).startOf("day"),s=this.selectDate.startOf("month")),"multiple"===a&&Array.isArray(e)&&e.length>0&&(this.selectDate=e.map(function(t){return i()(t).startOf("day")})),"during"===a&&Array.isArray(e)&&2===e.length){var n=i()(e[0]).startOf("day"),o=i()(e[1]).startOf("day");(n.isBefore(o)||n.isSame(o))&&(this.selectDate=[n,o])}this.showDate={year:s.year(),month:s.month()+1},this.selectShowDate={year:s.year(),month:s.month()+1},this.getFullDate(this.showDate)},touchstart:function(t){this.enableTouch&&(n=t.touches[0].clientX,o=t.touches[0].clientY,this.touch={x:0,y:0},this.isTouching=!0)},touchmove:function(t){this.enableTouch&&(this.touch={x:(t.touches[0].clientX-n)/this.$refs.calendar.offsetWidth,y:(t.touches[0].clientY-o)/this.$refs.calendar.offsetHeight})},touchend:function(t){this.enableTouch&&(this.isTouching=!1,Math.abs(this.touch.x)>Math.abs(this.touch.y)&&Math.abs(this.touch.x*this.$refs.calendar.offsetWidth)>20?this.touch.x>0?this.changeMonth("prev"):this.touch.x<0&&this.changeMonth("next"):this.touch={x:0,y:0})},emitChange:function(){this.$emit("change",i()(this.selectDate).format("YYYY-MM"))},emitSwitch:function(t){this.restrictCurrentMonth&&(this.selectDate=[]),this.$emit("switch",t)},onDayClick:function(t){if(this.dayClick(t.dateTime))switch(this.$props.mode){case"single":t.isSelect||t.isDisable||(this.selectDate=t.dateTime,this.selectShowDate={year:this.selectDate.year(),month:this.selectDate.month()+1},this.getFullDate(this.selectShowDate),this.emitChange());break;case"multiple":t.isSelect||t.isDisable?this.selectDate.length>1&&(this.selectDate=this.selectDate.filter(function(e){return!e.isSame(t.dateTime)}),this.getFullDate(this.showDate),this.emitChange()):(this.selectDate.push(t.dateTime),this.getFullDate(this.showDate),this.emitChange());break;case"during":if(t.isDisable)return;if(this.restrictCurrentMonth)return;0===this.selectDate.length?this.selectDate=[t.dateTime]:1===this.selectDate.length?(this.selectDate.push(t.dateTime),this.selectDate[1].isBefore(this.selectDate[0])&&this.selectDate.reverse()):2===this.selectDate.length&&(this.selectDate=[t.dateTime]),this.getFullDate(this.showDate),this.emitChange()}},changeYear:function(t){var e=i()(this.showDate.year+"-"+this.showDate.month,"YYYY-MM"),a=void 0;switch(t){case"prev":this.translateX+=1,a=e.subtract(1,"year");break;case"next":this.translateX-=1,a=e.add(1,"year")}this.showDate={year:a.year(),month:a.month()+1},this.getFullDate(this.showDate)},changeMonth:function(t){var e=i()(this.showDate.year+"-"+this.showDate.month,"YYYY-MM"),a=void 0;switch(t){case"prev":this.translateX+=1,a=e.subtract(6,"month");break;case"next":this.translateX-=1,a=e.add(6,"month")}this.showDate={year:a.year(),month:a.month()+1},this.getFullDate(this.showDate)},changeDate:function(t){i()(t).isValid()||Array.isArray(t)?this.init(t):console.error("Type of parameter is invalid!")},changeDateView:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i()(),e=i()(t);this.showDate={year:e.year(),month:e.month()+1},this.getFullDate(this.showDate)},getFullDate:function(){var t=i()(this.showDate.year+"-"+this.showDate.month,"YYYY-MM"),e=this.getDaies(t),a=this.getDaies(t.subtract(6,"month")),s=this.getDaies(t.add(12,"month"));this.fullDate=[a.fullDate,e.fullDate,s.fullDate]},isSelect:function(t){var e=!1;switch(this.$props.mode){case"single":this.selectDate&&t.isSame(this.selectDate)&&(e=!0);break;case"multiple":this.selectDate.length>0&&this.selectDate.some(function(e){return t.isSame(e)})&&(e=!0)}return e},getDaies:function(t){for(var e=[],a=i()(t).month()<6?i()(t).month():i()(t).month()-6,s=i()(),n=0;n<6;n++){var o=i()(t).subtract(a-n,"M");e[n]={isTomonth:o.format("YYYY-MM")===s.format("YYYY-MM"),isSelect:this.isSelect(o),valueMonth:this.monthNames[i()(o).month()],dateTime:o}}return{fullDate:e}}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"calendar",staticClass:"m-calendar"},[a("div",{staticClass:"m-toolbar"},[a("div",{staticClass:"m-year-selector"},[a("span",[t._v(t._s(t.selectShowDate.year)+t._s(t.yearName))])]),t._v(" "),a("div",{staticClass:"m-month-selector"},[a("span",[t._v(t._s(t.monthNames[t.selectShowDate.month-1]))])])]),t._v(" "),a("div",{staticClass:"m-months-container",on:{touchstart:t.touchstart,touchmove:t.touchmove,touchend:t.touchend}},[a("div",{staticClass:"m-months-wrapper",style:{transform:"translate3d("+100*-t.translateX+"%, 0, 0)"}},t._l(t.fullDate,function(e,s){return a("div",{key:s,staticClass:"m-months",style:{transform:"translate3d("+100*(s-1+t.translateX+(t.isTouching?t.touch.x:0))+"%, 0, 0)",transitionDuration:t.isTouching?"0s":".3s"}},[a("div",{staticClass:"m-row"},t._l(e,function(e,s){return a("div",{key:s,staticClass:"m-day",on:{click:function(a){return t.onDayClick(e)}}},[a("span",{class:{"m-day-num":!0,"m-tomonth":e.isTomonth,"m-select":e.isSelect}},[a("span",{staticStyle:{"padding-top":"6px",display:"block"}},[t._v(t._s(e.valueMonth))])]),t._v(" "),t._t("day",null,{date:e})],2)}),0)])}),0)])])},staticRenderFns:[]};var h=a("VU/8")(r,c,!1,function(t){a("Q/LK")},"data-v-5bc16939",null);e.a=h.exports},pMXI:function(t,e,a){"use strict";e.b=function(t,e){return Object(s.a)("/record/recordDate",{recordDate:t,employeeId:e})},e.a=function(t,e){return Object(s.a)("/record/count",{yearMonth:t,employeeId:e})};var s=a("P0Gf")}});
//# sourceMappingURL=5.cd524142ec4f409ecd8a.js.map