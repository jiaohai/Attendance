webpackJsonp([2],{Asb8:function(t,e){},PXrR:function(t,e){},YCaA:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("mvHQ"),a=i.n(s),n=i("aK3q"),c={name:"addadmin",data:function(){return{msg:"设置",showcheck:!0,showstatistics:!0,showrule:!0,showsetting:!0,attendanceList:[],isexist:!1,showSearch:!1,showInput:!1,marktype:"",inputTxt:"",existList:[],user:{},isaddAddmin:!1,newAttendanceGroup:{name:"",people:[],department:[],des:""}}},created:function(){this.user=this.$route.query.user,this.getAttendce(),0===this.attendanceList.length&&(this.isaddAddmin=!0)},components:{inputModal:i("gGZ4").a,searchModal:n.a},methods:{getAttendce:function(){this.attendanceList=[{id:1,name:"考情组一",people:{name:"赵一"}},{id:2,name:"考情组二",people:{name:"钱二"}},{id:3,name:"考情组三",people:{name:"孙三"}}]},goBackThing:function(){window.history.go(-1)},addAddmin:function(){this.isaddAddmin=!this.isaddAddmin},saveAddmin:function(){this.isaddAddmin=!this.isaddAddmin},gocheck:function(){this.$router.push("/check")},goSearch:function(){this.$router.push("/search")},gostatistics:function(){this.$router.push("/statistics")},gorule:function(){this.$router.push("/rule")},gosetting:function(){this.$router.push("/addadmin")},showInputModal:function(t){this.marktype=t,"attendname"===t&&(this.inputTxt=this.newAttendanceGroup.name),"attenddes"===t&&(this.inputTxt=this.newAttendanceGroup.des),this.showInput=!this.showInput},getInput:function(t){"attendname"===this.marktype&&(this.newAttendanceGroup.name=t),"attenddes"===this.marktype&&(this.newAttendanceGroup.des=t)},closeInput:function(){this.showInput=!this.showInput},showSearchModal:function(t){this.marktype=t,"attendrange"===t&&(this.existList=JSON.parse(a()(this.newAttendanceGroup.department))),"attendpeople"===t&&(this.existList=JSON.parse(a()(this.newAttendanceGroup.people))),0===this.existList.length?this.isexist=!0:this.isexist=!1,this.showSearch=!this.showSearch},getSearch:function(t){"attendrange"===this.marktype&&(this.newAttendanceGroup.department=JSON.parse(a()(t))),"attendpeople"===this.marktype&&(this.newAttendanceGroup.people=JSON.parse(a()(t)))},closeSearch:function(){this.showSearch=!this.showSearch}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"attendance"},[i("div",{staticClass:"heading"},[i("div",{staticClass:"black common",on:{click:t.goBackThing}},[i("i",{staticClass:"fa fa-arrow-left"})]),t._v(" "),i("div",{staticClass:"title common",staticStyle:{"align-items":"center"}},[t._v(t._s(t.msg))]),t._v(" "),t.isaddAddmin?t._e():i("div",{staticClass:"more common"},[i("i",{staticClass:"fa fa-plus",on:{click:t.addAddmin}})]),t._v(" "),t.isaddAddmin?i("div",{staticClass:"more common"},[i("i",{staticClass:"fa fa-floppy-o",on:{click:t.saveAddmin}})]):t._e()]),t._v(" "),t.isaddAddmin?i("div",{staticClass:"contentbody"},[i("div",{staticClass:"commonpiece",on:{click:function(e){return t.showInputModal("attendname")}}},[i("div",{staticClass:"titlehead",staticStyle:{display:"inline-flex",width:"100%"}},[t._m(0),t._v(" "),i("div",{staticClass:"descrip",staticStyle:{display:"inline-flex"}},[i("span",{staticClass:"spanstyle"},[t._v(t._s(t.newAttendanceGroup.name))])]),t._v(" "),i("i",{staticClass:"fa fastyle fa-angle-right"})])]),t._v(" "),i("div",{staticClass:"commonpiece",on:{click:function(e){return t.showSearchModal("attendrange")}}},[i("div",{staticClass:"titlehead",staticStyle:{display:"inline-flex",width:"100%"}},[t._m(1),t._v(" "),i("div",{staticClass:"descrip"},t._l(t.newAttendanceGroup.department,function(e,s){return i("span",{key:s,staticClass:"spanstyle"},[t._v(t._s(e.name))])}),0),t._v(" "),i("i",{staticClass:"fa fastyle fa-angle-right"})])]),t._v(" "),i("div",{staticClass:"commonpiece",on:{click:function(e){return t.showSearchModal("attendpeople")}}},[i("div",{staticClass:"titlehead",staticStyle:{display:"inline-flex",width:"100%"}},[t._m(2),t._v(" "),i("div",{staticClass:"descrip"},t._l(t.newAttendanceGroup.people,function(e,s){return i("span",{key:s,staticClass:"spanstyle"},[t._v(t._s(e.name))])}),0),t._v(" "),i("i",{staticClass:"fa fastyle fa-angle-right"})])]),t._v(" "),i("div",{staticClass:"commonpiece",on:{click:function(e){return t.showInputModal("attenddes")}}},[i("div",{staticClass:"titlehead",staticStyle:{display:"inline-flex",width:"100%"}},[t._m(3),t._v(" "),i("div",{staticClass:"descrip",staticStyle:{display:"inline-flex"}},[i("span",{staticClass:"spanstyle"},[t._v(t._s(t.newAttendanceGroup.des))])]),t._v(" "),i("i",{staticClass:"fa fastyle fa-angle-right"})])])]):t._e(),t._v(" "),0===t.attendanceList.length||t.isaddAddmin?t._e():i("div",{staticClass:"contentbody"},t._l(t.attendanceList,function(e){return i("div",{key:e.id,staticClass:"uncommonpiece"},[i("div",{staticClass:"rulecotent"},[i("span",{staticClass:"contentspan"},[t._v(t._s(e.name))]),t._v(" "),i("span",{staticClass:"contentspan secondspan"},[t._v("管理员："+t._s(e.people.name))])]),t._v(" "),t._m(4,!0)])}),0),t._v(" "),i("div",{staticClass:"bottoming"},[t.showcheck?i("button",{staticClass:"clock-in bottomchildre",class:-1!==t.$route.path.indexOf("check")?"colortext":"colorcommon",on:{click:t.gocheck}},[i("i",{staticClass:"fa fa-map-marker"}),t._v(" "),i("span",[t._v("打卡")])]):t._e(),t._v(" "),t.showstatistics?i("button",{staticClass:"statistics bottomchildre",class:-1!==t.$route.path.indexOf("statistics")?"colortext":"colorcommon",on:{click:t.gostatistics}},[i("i",{staticClass:"fa fa-pie-chart"}),t._v(" "),i("span",[t._v("统计")])]):t._e(),t._v(" "),t.showrule?i("button",{staticClass:"rule bottomchildre",class:-1!==t.$route.path.indexOf("rule")?"colortext":"colorcommon",on:{click:t.gorule}},[i("i",{staticClass:"fa fa-sliders "}),t._v(" "),i("span",[t._v("规则")])]):t._e(),t._v(" "),t.showsetting?i("button",{staticClass:"setting bottomchildre",class:-1!==t.$route.path.indexOf("addadmin")?"colortext":"colorcommon",on:{click:t.gosetting}},[i("i",{staticClass:"fa fa-cog"}),t._v(" "),i("span",[t._v("设置")])]):t._e()]),t._v(" "),t.showInput?i("input-modal",{attrs:{titlename:"请输入",inputtxt:t.inputTxt},on:{getinput:t.getInput,closeinput:t.closeInput}}):t._e(),t._v(" "),t.showSearch?i("search-modal",{attrs:{titlename:"添加",showAdd:t.isexist,existlist:t.existList},on:{getsearch:t.getSearch,closesearch:t.closeSearch}}):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"titles"},[e("span",[this._v("考勤组名称")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"titles"},[e("span",[this._v("考勤组范围")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"titles"},[e("span",[this._v("考勤组管理员")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"titles"},[e("span",[this._v("描述")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"rightside"},[e("i",{staticClass:"fa fastyle fa-angle-right"})])}]};var o=i("VU/8")(c,l,!1,function(t){i("Asb8")},"data-v-cf16e2be",null);e.default=o.exports},aK3q:function(t,e,i){"use strict";var s={name:"searchModal",props:{existlist:{type:Array,default:function(){return[]}},titlename:{type:String,default:"0"},showAdd:{type:Boolean,default:!1}},data:function(){return{inputvlue:"",checked:!0,datalist:[{name:"部门一",isdepantment:!0,ischecked:!1,id:1},{name:"部门二",isdepantment:!0,ischecked:!1,id:2},{name:"员工一",isdepantment:!1,ischecked:!1,di:3},{name:"员工二",isdepantment:!1,ischecked:!1,id:4}],depatmentlist:[{name:"通讯录",isdepantment:!1,id:0}],isedit:!1,showDel:!1,issearch:!1,showadd:this.showAdd,isshowExist:!this.showAdd,tempexist:this.existlist}},created:function(){},methods:{closeSelf:function(){this.$emit("closesearch")},addDate:function(){this.isshowExist=!1,this.isedit=!1,this.showadd=!0},seveData:function(){this.$emit("getsearch",this.existlist),this.closeSelf()},clearSearch:function(){this.inputvlue=""},saveSearch:function(t){this.isedit=!this.isedit,this.existlist=this.tempexist},searchDate:function(){this.datalist=[{name:"部门一",isdepantment:!0,ischecked:!1,id:11},{name:"员工一",isdepantment:!1,ischecked:!1,di:13}]},editList:function(){this.isedit=!this.isedit},goSearch:function(){this.issearch=!this.issearch},getDepartment:function(t){console.log(t);for(var e=[],i=0;i<this.depatmentlist.length&&this.depatmentlist[i].id!==t.id;i++)e.push(this.depatmentlist[i]);this.depatmentlist=e,this.getNextLevel(t)},getNextLevel:function(t){t.isdepantment&&(this.depatmentlist.push(t),0===t.id?this.datalist=[{name:"部门一",isdepantment:!0,ischecked:!1,id:1},{name:"部门二",isdepantment:!0,ischecked:!1,id:2},{name:"员工一",isdepantment:!1,ischecked:!1,di:3},{name:"员工二",isdepantment:!1,ischecked:!1,id:4}]:this.datalist=[{name:"部门一",isdepantment:!0,ischecked:!1,id:11},{name:"员工一",isdepantment:!1,ischecked:!1,di:13}])},changeCheck:function(t){console.log(t),console.log(this.showAdd);for(var e=0;e<this.datalist.length;e++)this.datalist[e].name===t.name&&(this.datalist[e].ischecked=!this.datalist[e].ischecked,this.datalist[e].ischecked?this.existlist.push(this.datalist[e]):this.existlist.splice(this.existlist.indexOf(this.datalist[e],1)))},delDate:function(t){this.existlist.splice(this.existlist.indexOf(t,1))}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"modal-backdrop"},[i("div",{staticClass:"attendance"},[i("div",{staticClass:"heading"},[i("div",{staticClass:"black common",on:{click:t.closeSelf}},[i("i",{staticClass:"fa fa-arrow-left"})]),t._v(" "),i("div",{staticClass:"title common",staticStyle:{"align-items":"center"}},[t._v(t._s(t.titlename))]),t._v(" "),t.isedit?i("div",{staticClass:"more common",on:{click:function(e){return t.saveSearch(!1)}}},[i("span",[t._v("确定")])]):t._e(),t._v(" "),t.isshowExist&&!t.isedit?i("div",{staticClass:"more common",on:{click:t.editList}},[i("span",[t._v("编辑")])]):t._e()]),t._v(" "),t.showadd?i("div",{staticClass:"commonpiece"},[t.issearch?i("div",{staticClass:"titlehead",staticStyle:{display:"inline-flex",width:"100%"}},[i("div",{staticStyle:{width:"100%",display:"inline-flex"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.inputvlue,expression:"inputvlue"}],attrs:{id:"focusinput",checked:"",autocomplete:"off",placeholder:"搜索"},domProps:{value:t.inputvlue},on:{input:[function(e){e.target.composing||(t.inputvlue=e.target.value)},t.searchDate]}}),t._v(" "),t.inputvlue?i("i",{staticClass:"fa fa-close fastyle",on:{click:t.clearSearch}}):t._e()]),t._v(" "),i("span",{staticStyle:{margin:"auto 10px auto auto","white-space":"nowrap"},on:{click:t.goSearch}},[t._v("取消")])]):t._e(),t._v(" "),t.issearch?t._e():i("div",{staticClass:"titlehead",staticStyle:{display:"inline-flex",width:"100%",height:"40px"},on:{click:t.goSearch}},[i("span",{staticStyle:{margin:"10px auto 10px auto","white-space":"nowrap",height:"40px"}},[t._v("搜索")])])]):t._e(),t._v(" "),t.showadd?i("div",{staticClass:"optioncont"},[i("div",{staticClass:"depatment"},t._l(t.depatmentlist,function(e,s){return i("span",{key:s,on:{click:function(i){return t.getDepartment(e)}}},[t._v("\n          "+t._s(e.name)+"\n          "),t.depatmentlist.length!==s+1?i("i",{staticClass:"fa fa-angle-right"}):t._e()])}),0),t._v(" "),i("div",{staticClass:"options"},t._l(t.datalist,function(e,s){return i("div",{key:s,staticClass:"alloption"},[e.ischecked?t._e():i("i",{staticClass:"fa fa-circle-o circle",on:{click:function(i){return t.changeCheck(e)}}}),t._v(" "),e.ischecked?i("i",{staticClass:"fa fa-check-circle circle ",on:{click:function(i){return t.changeCheck(e)}}}):t._e(),t._v(" "),i("div",{staticClass:"user",on:{click:function(i){return t.getNextLevel(e)}}},[i("div",[e.isdepantment?t._e():i("img",{attrs:{src:e.avatarurl,width:"30",height:"30"}}),t._v(" "),e.isdepantment?i("i",{staticClass:"fa fa-folder fa-2x",staticStyle:{width:"30px",height:"30px"}}):t._e()]),t._v(" "),i("div",{staticStyle:{margin:"5px auto auto 0px"}},[i("span",{staticStyle:{"padding-left":"10px","margin-top":"5px"}},[t._v(t._s(e.name))])]),t._v(" "),e.isdepantment?i("div",{staticStyle:{margin:"5px 10px 5px 5px"}},[i("i",{staticClass:"fa fa-angle-right"})]):t._e()])])}),0)]):t._e(),t._v(" "),t.showadd?i("div",{staticClass:"bottoming"},[i("div",{staticClass:"checkedlist"},t._l(t.existlist,function(e,s){return i("div",{key:s,staticStyle:{margin:"auto 0px auto 5px"}},[e.isdepantment?t._e():i("div",{staticClass:"checker"},[e.isdepantment?t._e():i("img",{attrs:{src:e.avatarurl,width:"30",height:"30"}})]),t._v(" "),e.isdepantment?i("div",{staticClass:"checker"},[i("div",{staticStyle:{padding:"5px"}},[e.isdepantment?i("i",{staticClass:"fa fa-folder fa-1x"}):t._e(),t._v("\n              "+t._s(e.name)+"\n            ")])]):t._e()])}),0),t._v(" "),i("div",{staticClass:"determin",staticStyle:{margin:"auto"},on:{click:t.seveData}},[i("span",[t._v("确定")])])]):t._e(),t._v(" "),t.isshowExist?i("div",{staticClass:"existstyle"},[i("div",{staticClass:"addtitle",on:{click:t.addDate}},[i("i",{staticClass:"fa fa-plus",staticStyle:{"font-size":"x-large",margin:"auto 0px auto 25px"}}),t._v(" "),t._m(0)]),t._v(" "),i("div",{staticClass:"options"},t._l(t.tempexist,function(e,s){return i("div",{key:s,staticClass:"alloption"},[i("div",{staticClass:"user"},[i("div",[e.isdepantment?t._e():i("img",{attrs:{src:e.avatarurl,width:"30",height:"30"}}),t._v(" "),e.isdepantment?i("i",{staticClass:"fa fa-folder fa-2x",staticStyle:{width:"30px",height:"30px"}}):t._e()]),t._v(" "),i("div",{staticStyle:{margin:"5px auto auto 0px"}},[i("span",{staticStyle:{"padding-left":"10px","margin-top":"5px"}},[t._v(t._s(e.name))])]),t._v(" "),t.isedit?i("div",{staticStyle:{margin:"5px 10px 5px 5px"},on:{click:function(i){return t.delDate(e)}}},[i("i",{staticClass:"fa fa-close"})]):t._e()])])}),0)]):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{margin:"5px auto auto 0px"}},[e("span",{staticStyle:{"padding-left":"10px","margin-top":"5px"}},[this._v("添加")])])}]};var n=i("VU/8")(s,a,!1,function(t){i("PXrR")},"data-v-7bbbcdb2",null);e.a=n.exports},gGZ4:function(t,e,i){"use strict";var s={name:"inputModal",props:{inputtxt:{type:String,default:""},titlename:{type:String,default:"0"},onlyNum:{type:Boolean,default:!1}},data:function(){return{inputvlue:""}},mounted:function(){document.getElementById("focusinput").focus()},created:function(){},methods:{closeSelf:function(){this.$emit("closeinput")},clearInput:function(){this.inputvlue=""},saveInput:function(t){if(this.inputvlue)this.$emit("getinput",this.inputvlue);else{if(t)return;this.$emit("getinput",this.inputtxt)}this.closeSelf()}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"modal-backdrop"},[i("div",{staticClass:"attendance"},[i("div",{staticClass:"heading"},[i("div",{staticClass:"black common",on:{click:t.closeSelf}},[i("i",{staticClass:"fa fa-arrow-left"})]),t._v(" "),i("div",{staticClass:"title common",staticStyle:{"align-items":"center"}},[t._v(t._s(t.titlename))]),t._v(" "),i("div",{staticClass:"more common",on:{click:function(e){return t.saveInput(!1)}}},[i("span",[t._v("确定")])])]),t._v(" "),i("div",{staticClass:"commonpiece"},[i("div",{staticClass:"titlehead",staticStyle:{display:"inline-flex",width:"100%"}},[t.onlyNum?i("input",{directives:[{name:"model",rawName:"v-model",value:t.inputvlue,expression:"inputvlue"}],attrs:{id:"focusinput",autocomplete:"off",oninput:"value=value.replace(/[^\\d]/g,'')"},domProps:{value:t.inputvlue},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.saveInput(!0)},input:function(e){e.target.composing||(t.inputvlue=e.target.value)}}}):t._e(),t._v(" "),t.onlyNum?t._e():i("input",{directives:[{name:"model",rawName:"v-model",value:t.inputvlue,expression:"inputvlue"}],attrs:{id:"focusinput",autocomplete:"off"},domProps:{value:t.inputvlue},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.saveInput(!0)},input:function(e){e.target.composing||(t.inputvlue=e.target.value)}}}),t._v(" "),t.inputvlue?i("i",{staticClass:"fa fa-close fastyle",on:{click:t.clearInput}}):t._e()])])])])},staticRenderFns:[]};var n=i("VU/8")(s,a,!1,function(t){i("l+Nj")},"data-v-1a876f54",null);e.a=n.exports},"l+Nj":function(t,e){},mvHQ:function(t,e,i){t.exports={default:i("qkKv"),__esModule:!0}},qkKv:function(t,e,i){var s=i("FeBl"),a=s.JSON||(s.JSON={stringify:JSON.stringify});t.exports=function(t){return a.stringify.apply(a,arguments)}}});
//# sourceMappingURL=2.ee46fd91df9d37dca93b.js.map