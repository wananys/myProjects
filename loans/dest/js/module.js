/*!
 * LastModifyTime: 2017-04-12 10:08:26
 * Copyright(c) 2017 H5项目管理
 */
var loan={currentPage:1,keyWord:$("input[name=search]").val(),loading:!1,getList:function(e){var t={from:getUrlParam({name:"from"}),debtorId:getUrlParam({name:"debtorId"}),projectNo:getUrlParam({name:"projectNo"}),contractType:getUrlParam({name:"contractType"})},a=e?e:this;return"nosearch"===t.from?($(".loan-search").remove(),menus()):menus("top"),$(".self-tips").remove(),$(".ui-loading-wrap").removeClass("none").html(message.loading),"s"===a.type&&(a.currentPage=1,$(".loan-list").addClass("none")),a.loading=!0,!!a.loading&&void $.ajax({type:"post",url:url+"/loanContract/list",data:{pageNum:a.currentPage,keyWord:a.keyWord,debtorId:t.debtorId,projectNo:t.projectNo,contractType:t.contractType},success:function(e){if(a.loading=!1,a.type="",0==e.code){var t=e.dataSource,n=template("loanList",t);1==a.currentPage?$(".loan-list").removeClass("none").html(n):$(".loan-list").removeClass("none").append(n),0==t.totalPage?($(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:".loan-list"})):t.totalPage<=a.currentPage&&$(".ui-loading-wrap").html(message.success),a.currentPage++}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){var e=getUrlParam({name:"keyWord",type:"decode"});""!=e&&($("input[name=search]").val(e),this.keyWord=e),this.getList(),this.callback=this.getList,search.init(this),scrollFunc(this)}},loanList={getInfo:function(){var e={contractId:getUrlParam({name:"contractId"})};$.ajax({type:"post",url:url+"/loanContract/details",data:e,success:function(e){if(0==e.code){var t=template("loan-detail-list",e.dataSource);$("#loanInfo").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){templateFun.dueDatesFun(),menus("home"),this.getInfo()}},loanNode={category:"LoanClause",currentPage:{pageLoanClause:1,pageSaleNode:1,pageProjectNode:1,pageOtherNode:1},tabStatus:{tabLoanClause:!1,tabSaleNode:!1,tabProjectNode:!1,tabOtherNode:!1},loading:!1,keyWord:$("input[name=search]").val(),tabList:function(){var e=this;$(document).on("click","#repay-detail>ul li",function(){var t=$(this).data("type");$(this).addClass("current").siblings().removeClass("current"),$(".temp"+t).removeClass("none").siblings().addClass("none"),e.category=t;var a=$("input[name=search]").val();if(e.keyWord==a){if(e.tabStatus["tab"+e.category])return!1}else for(var n in e.tabStatus)e.tabStatus[n]=!1;e.keyWord=a,e.currentPage["page"+e.category]=1,e.getInfo(e)})},getInfo:function(e){var t=e?e:this;return t.tabStatus["tab"+t.category]=!0,t.contractId=getUrlParam({name:"contractId"}),$(".temp"+t.category).children(".ui-loading-wrap").removeClass("none").html(message.loading),t.loading=!0,!!t.loading&&("LoanClause"===t.category?(t.getLoanClause(t),!1):("s"==t.type&&(t.currentPage["page"+t.category]=1),t.getNodeList(t),!1))},getLoanClause:function(e){$.ajax({type:"post",url:url+"/loanClause/list",data:{contractId:e.contractId,pageNum:e.currentPage.pageLoanClause},success:function(t){if(e.loading=!1,0==t.code){var a=t.dataSource,n=template("repayTempLoanClause",a);e.currentPage.pageLoanClause++,1==e.currentPage.pageLoanClause?$("#repayTabLoanClause").html(n):$("#repayTabLoanClause").append(n),0==a.totalPage?($(".temp"+e.category).children(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:"#repayTabLoanClause"})):a.totalPage<=e.currentPage.pageLoanClause&&$(".temp"+e.category).children(".ui-loading-wrap").html(message.success)}else $.tips({content:t.msg,stayTime:3e3}),999001==t.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},getNodeList:function(e){$.ajax({type:"post",url:url+"/loanNode/list",data:{contractId:e.contractId,nodeCategory:e.category,pageNum:e.currentPage["page"+e.category],keyWord:e.keyWord},success:function(t){if(e.loading=!1,0==t.code){var a=t.dataSource,n=template("repayTemp"+e.category,a);e.currentPage["page"+e.category]++,1==e.currentPage["page"+e.category]?$("#repayTab"+e.category).html(n):$("#repayTab"+e.category).append(n),0==a.totalPage?($(".temp"+e.category).children(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:"#repayTab"+e.category})):a.totalPage<e.currentPage["page"+e.category]&&$(".temp"+e.category).children(".ui-loading-wrap").html(message.success)}else $.tips({content:t.msg,stayTime:3e3}),999001==t.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){var e=getUrlParam({name:"keyWord",type:"decode"});""!=e&&($("input[name=search]").val(e),this.keyWord=e);var t=getUrlParam({name:"from"});"loan_list"===t?($(".loan-search").remove(),document.title="合同管理"):($(".loan-search").removeClass("none"),$(".loanClauseTab").remove(),$(".tempLoanClause").remove(),this.category="SaleNode",$(".tempSaleNode").removeClass("none"),$(".saleNodeTab").addClass("current")),this.callback=this.getInfo,this.getInfo(this),this.tabList(),search.init(this),scrollFunc(this)}},LoanClauseList={getInfo:function(){var e=getUrlParam({name:"clauseId"});$.ajax({type:"post",url:url+"/loanClause/details",data:{clauseId:e},success:function(e){if(0==e.code){var t=template("clauseListTemp",e.dataSource);$("#clauseList").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){this.getInfo()}},loanNodeList={getInfo:function(e){$.ajax({type:"post",url:url+"/loanNode/details",data:e,success:function(t){if(0==t.code){template.config("escape",!1);var a=template("nodeListTemp",t);$("#nodeList").html(a),0==t.dataSource.nodeReportList.length&&"loanNodeReport"==e.from&&(tips({classname:"tips-no-message",content:message.noMssege,divBox:".loan-list"}),$(".loan-list").remove())}else $.tips({content:t.msg,stayTime:3e3}),999001==t.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){var e={nodeId:getUrlParam({name:"nodeId"}),status:getUrlParam({name:"status"})};"SaleNode"==e.status?document.title="销售节点":"ProjectNode"==status?document.title="工程节点":"OtherNode"==status&&(document.title="其他节点"),this.getInfo(e)}},loanNodeReport={getInfo:function(){var e={nodeId:getUrlParam({name:"nodeId"}),from:"loanNodeReport"};loanNodeList.getInfo(e)},init:function(){this.getInfo()}},surety={category:"guaranteeInfo",currentPage:{guaranteeInfoPage:1,loanThingsPage:1,singleLoanThingsPage:1},tabStatus:{guaranteeInfoTab:!1,loanThingsTab:!1},keyWord:$("input[name=search]").val(),loading:!1,tabList:function(){var e=this;$(document).on("click",".loan-detail-title>li",function(){var t=$(this).data("type");$(this).addClass("current").siblings().removeClass("current"),$("."+t+"List").removeClass("none").siblings().addClass("none"),e.category=t;var a=$("input[name=search]").val();if(e.keyWord==a){if(e.tabStatus[e.category+"Tab"])return!1}else for(var n in e.tabStatus)e.tabStatus[n]=!1;e.keyWord=a,e.currentPage[e.category+"Page"]=1,e.getInfo(e)})},getInfo:function(e){var t=e?e:this;return t.tabStatus[t.category+"Tab"]=!0,t.contractId=getUrlParam({name:"contractId"}),t.guaranteeId=getUrlParam({name:"guaranteeId"}),$("."+t.category+"List").parent().children(".self-tips").remove(),$("."+t.category+"List").children(".ui-loading-wrap").removeClass("none").html(message.loading),t.loading=!0,!!t.loading&&("s"==t.type&&(t.currentPage[t.category+"Page"]=1),"guaranteeInfo"===t.category?(t.getGuaranteeInfo(t),!1):(t.getLoanThings(t),!1))},getGuaranteeInfo:function(e){$.ajax({type:"post",url:url+"/guaranteeInfo/list",data:{pageNum:e.currentPage[e.category+"Page"],keyWord:e.keyWord,contractId:e.contractId},success:function(t){e.fixTemplate(t,e)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},getLoanThings:function(e){$.ajax({type:"post",url:url+"/loanThings/list",data:{pageNum:e.currentPage[e.category+"Page"],keyWord:e.keyWord,guaranteeId:e.guaranteeId},success:function(t){e.fixTemplate(t,e)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},fixTemplate:function(e,t){if(t.type="",0==e.code){var a=e.dataSource,n=template(t.category+"Temp",a);1==t.currentPage[t.category+"Page"]?$("."+t.category+"List").children(".loan-list").html(n):$("."+t.category+"List").children(".loan-list").append(n),t.currentPage[t.category+"Page"]++,0==a.totalPage?($("."+t.category+"List").children(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:"."+t.category+"List"})):a.totalPage<t.currentPage[t.category+"Page"]&&$("."+t.category+"List").children(".ui-loading-wrap").html(message.success)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},init:function(){var e=getUrlParam({name:"nosearch"}),t=getUrlParam({name:"nohead"}),a=getUrlParam({name:"category"});this.category=a?a:this.category;var n=getUrlParam({name:"keyWord",type:"decode"});""!=n&&($("input[name=search]").val(n),this.keyWord=n),$("."+this.category+"List").removeClass("none"),$("."+this.category+"Tab").addClass("current"),e&&$(".loan-search").remove(),t&&$("#repay-detail .loan-detail-title").remove(),this.callback=this.getInfo,this.getInfo(this),this.tabList(),search.init(this),scrollFunc(this)}},suretyGuaranteeInfo={getInfo:function(){var e={guaranteeId:getUrlParam({name:"guaranteeId"})};$.ajax({type:"post",url:url+"/guaranteeInfo/details",data:e,success:function(e){if(0==e.code){var t=template("suretyGuaranteeInfoTemp",e.dataSource);$("#suretyGuaranteeInfoDetail").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){this.getInfo()}},suretyGuarantyList={getDetails:function(){var e=getUrlParam({name:"thingId"});$.ajax({type:"post",url:url+"/loanThings/details",data:{thingId:e},success:function(e){if(0==e.code){var t=template("suretyGuarantyTemp",e.dataSource);$("#suretyGuarantyDetail").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){}})},getSchedule:function(){var e=getUrlParam({name:"thingId"});$.ajax({type:"post",url:url+"/loanThings/schedule",data:{thingId:e,pageNum:1},success:function(e){if(0==e.code){var t=template("suretyScheduleTemp",e.dataSource);$("#suretyScheduleList").append(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){}})},init:function(){this.getSchedule(),this.getDetails()}},payments={category:"Payable",currentPage:{pagePayable:1,pageActual:1},tabStatus:{tabPayable:!1,tabActual:!1},keyWord:$("input[name=search]").val(),loading:!1,tabList:function(){var e=this;$(document).on("click","#payments-menu li",function(){var t=$(this).data("type");$(this).addClass("current").siblings().removeClass("current"),$(".list"+t).removeClass("none").siblings().addClass("none"),e.category=t;var a=$("input[name=search]").val();if(e.keyWord==a){if(e.tabStatus["tab"+e.category])return!1}else for(var n in e.tabStatus)e.tabStatus[n]=!1;e.keyWord=a,e.currentPage["page"+e.category]=1,e.getInfo(e)})},getInfo:function(e){var t=e?e:this;t.tabStatus["tab"+t.category]=!0,"s"==t.type&&(t.currentPage["page"+t.category]=1);var a={debtorId:getUrlParam({name:"debtorId"}),repayDateFrom:getUrlParam({name:"repayDateFrom"}),repayDateTo:getUrlParam({name:"repayDateTo"}),pageNum:t.currentPage["page"+t.category],keyWord:t.keyWord,repayCategory:t.category};return $(".list"+t.category).parent().children(".self-tips").remove(),$(".list"+t.category).children(".ui-loading-wrap").removeClass("none").html(message.loading),t.loading=!0,!!t.loading&&void $.ajax({type:"post",url:url+"/loanExpenditure/repayPlans",data:a,success:function(e){t.fixTemplate(e,t)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},fixTemplate:function(e,t){if(t.type="",0==e.code){var a=e.dataSource,n=template("temp"+t.category,a);1==t.currentPage["page"+t.category]?$(".list"+t.category).children(".loan-list").html(n):$(".list"+t.category).children(".loan-list").append(n),t.currentPage["page"+t.category]++,0==a.totalPage?($(".list"+t.category).children(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:".list"+t.category})):a.totalPage<t.currentPage["page"+t.category]&&$(".list"+t.category).children(".ui-loading-wrap").html(message.success)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},init:function(){var e=getUrlParam({name:"from"}),t=getUrlParam({name:"category"});"period"==e&&($(".loan-search").remove(),$(".loan-detail-title").remove(),this.category=t,$(".list"+t).removeClass("none").siblings().remove());var a=getUrlParam({name:"keyWord",type:"decode"});""!=a&&($("input[name=search]").val(a),this.keyWord=a),this.callback=this.getInfo,this.getInfo(),this.tabList(),search.init(this),scrollFunc(this)}},paymentsList={getInfo:function(){var e=getUrlParam({name:"repayId"}),t=getUrlParam({name:"from"});"Actual"==t&&(document.title="支出详情"),$.ajax({type:"post",url:url+"/loanExpenditure/repayPlanDetail",data:{repayId:e},success:function(e){if(0==e.code){var t=template("paymentsListTemp",e);$("#paymentsListDetail").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){this.getInfo()}},paymentsDetail={getList:function(){var e=$("#repayCategoryId").val(),t="",a=getUrlParam({name:"contractId"});t=""!=e?e:getUrlParam({name:"repayCategory"}),$(".tab-"+t).addClass("current").siblings().removeClass("current"),$.ajax({type:"post",url:url+"/loanContract/repayPlans",data:{contractId:a,repayCategory:t},success:function(e){if(0==e.code){$(".ui-loading-wrap").remove();var a=(e.dataSource,template("repayment_detail",e));$("#repaymentBox").html(a),$(".temp"+t).removeClass("none").siblings().addClass("none")}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},getExplain:function(){$(document).on("click","#rm-explain-model",function(){var e=$(this).data("tab");0==e?$(".rm-status").removeClass("none"):$(".rm-status").addClass("none"),$("#model-explain").show()})},changeList:function(){$(document).on("click",".repay-change",function(){var e=$(this).data("type");1===e?($(this).html("本金余额"),$(".loanBalance").removeClass("none"),$(".surplusAmount").addClass("none"),$(this).attr("data-type",0)):($(this).html("剩余金额"),$(".loanBalance").addClass("none"),$(".surplusAmount").removeClass("none"),$(this).attr("data-type",1))})},changeRepay:function(){var e=this;$("#repayment-menu").on("click","li",function(){var t=$(this).data("type");$("#repayCategoryId").val(t),e.getList(),$(this).addClass("current").siblings().removeClass("current"),$(".temp"+t).removeClass("none").siblings().addClass("none")})},getAccount:function(){$(document).on("click",".acc-more",function(){var e=$(this).data("acc"),t=[];return t=e.split(","),$(".m-accNo").html(t[0]),$(".m-accName").html(t[1]),$(".m-bankCardNo").html(t[2]),$(".m-bankName").html(t[3]),$("#model-more").show(),!1})},closeAccount:function(){$(document).on("click",".rm-dialog-close",function(){return $(".ui-dialog").hide(),!1})},init:function(){this.getList(),this.getExplain(),this.changeList(),this.changeRepay(),this.getAccount(),this.closeAccount()}},paymentsDetailList={getInfo:function(){var e=getUrlParam({name:"repayId"}),t=getUrlParam({name:"from"});"Actual"==t&&(document.title="实际支出明细"),$.ajax({type:"post",url:url+"/loanExpenditure/repayPlanDetail",data:{repayId:e},success:function(e){if(0==e.code){var t=template("paymentsDetailListTemp",e);$("#paymentsDetailListD").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){}})},init:function(){this.getInfo()}},loanDebtor={currentPage:1,keyWord:$("input[name=search]").val(),getList:function(e){var t=e&&e._this?e._this:this;$(".self-tips").remove(),$(".ui-loading-wrap").removeClass("none").html(message.loading),"s"===t.type&&(t.currentPage=1),$.ajax({type:"post",url:url+"/loanDebtor/list",data:{pageNum:t.currentPage,keyWord:t.keyWord},success:function(e){if(0==e.code){t.type="";var a=e.dataSource,n=template("loanDebtorTemp",a);1==t.currentPage?$(".loan-list").html(n):$(".loan-list").append(n),t.currentPage++,0==a.totalPage?($(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:".loan-list"})):a.totalPage<t.currentPage&&$(".ui-loading-wrap").html(message.success)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){var e=getUrlParam({name:"keyWord",type:"decode"});""!=e&&($("input[name=search]").val(e),this.keyWord=e),this.callback=this.getList,this.getList(),search.init(this),scrollFunc(this)}},loanDebtorDetail={getInfo:function(){var e={debtorId:getUrlParam({name:"debtorId"})};$.ajax({type:"post",url:url+"/loanDebtor/details",data:e,success:function(e){if(0==e.code){var t=template("loanDebtorDetailTemp",e.dataSource);$("#loanDebtorDetail").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){this.getInfo()}},loanLender={currentPage:1,keyWord:$("input[name=search]").val(),getList:function(e){var t=e&&e._this?e._this:this;$(".self-tips").remove(),$(".ui-loading-wrap").removeClass("none").html(message.loading),"s"===t.type&&(t.currentPage=1),$.ajax({type:"post",url:url+"/loanLender/list",data:{pageNum:t.currentPage,keyWord:t.keyWord},success:function(e){if(0==e.code){t.type="";var a=e.dataSource,n=template("loanLenderTemp",a);1==t.currentPage?$(".loan-list").html(n):$(".loan-list").append(n),t.currentPage++,0==a.totalPage?($(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:".loan-list"})):a.totalPage<t.currentPage&&$(".ui-loading-wrap").html(message.success)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){var e=getUrlParam({name:"keyWord",type:"decode"});""!=e&&($("input[name=search]").val(e),this.keyWord=e),this.callback=this.getList,this.getList(),search.init(this),scrollFunc(this)}},loanLenderDetail={getInfo:function(){var e={lenderId:getUrlParam({name:"lenderId"})};$.ajax({type:"post",url:url+"/loanLender/details",data:e,success:function(e){if(0==e.code){var t=template("loanLenderDetailTemp",e.dataSource);$("#loanLenderDetail").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){}})},init:function(){this.getInfo()}},account={currentPage:1,keyWord:"",getList:function(e){var t=getUrlParam({name:"from"}),a={},n="";"nosearch"==t&&$(".loan-search").remove();var o=e&&e._this?e._this:this;$(".self-tips").remove(),$(".ui-loading-wrap").removeClass("none").html(message.loading),"s"===o.type&&(o.currentPage=1),"home"==t?(n="/loanLenderAccounts/listHomePage",a={pageNum:o.currentPage,keyWord:o.keyWord}):(n="/loanLenderAccounts/list",a={lenderId:getUrlParam({name:"lenderId"})}),$.ajax({type:"post",url:url+n,data:a,success:function(e){if(0==e.code){o.type="";var a=e.dataSource,n=template("accountTemp",a);"home"==t?(1==o.currentPage?$(".loan-list").removeClass("none").html(n):$(".loan-list").removeClass("none").append(n),0==a.totalPage?($(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:".loan-list"}),$(".loan-list").addClass("none")):a.totalPage<=o.currentPage&&$(".ui-loading-wrap").html(message.success),o.currentPage++):($(".loan-list").html(n),""==a.loanLenderAccountsList.length?(tips({classname:"tips-no-message",content:message.noMssege,divBox:".loan-list"}),$(".loan-list").remove(),$(".ui-loading-wrap").addClass("none")):$(".ui-loading-wrap").html(message.success))}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){this.callback=this.getList,this.getList(),search.init(this),scrollFunc(this)}},accountDetail={getInfo:function(){var e={accountId:getUrlParam({name:"accountId"})};$.ajax({type:"post",url:url+"/loanLenderAccounts/details",data:e,success:function(e){if(0==e.code){var t=template("accountDetailTemp",e.dataSource);$("#accountDetail").html(t)}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},init:function(){this.getInfo()}},period={currentPage:1,totalPage:100,keyWord:"",year:"",getList:function(e){var t=e?e:this,a=getUrlParam({name:"repayCategory"});"Actual"==a&&(document.title="支出周期表");$(".ui-loading-wrap").removeClass("none").html(message.loading),"s"==t.type&&(t.currentPage=1),t.year=$(".period-date").data("date");var n=$("input[name=loan-status]").val();$.ajax({type:"post",url:url+"/loanExpenditure/periodicTable",data:{pageNum:t.currentPage,debtorName:t.keyWord,repayCategory:a,year:t.year},success:function(e){if(0==e.code){var a=e.dataSource,o=template("periodTemp",a);1==t.currentPage?$("#period").html(o):$("#period").append(o);var s=$(".period-list-quarter"),r=$(".period-list-year"),i=$(".period-list-month");switch(n){case"0":s.removeClass("none"),r.addClass("none"),i.addClass("none");break;case"1":s.addClass("none"),r.removeClass("none"),i.addClass("none");break;case"2":s.addClass("none"),r.addClass("none"),i.addClass("none"),$(".curr-month0,.curr-month1,.curr-month2").removeClass("none"),$(".quarter0").removeClass("none");break;case"3":s.addClass("none"),r.addClass("none"),i.addClass("none"),$(".curr-month3,.curr-month4,.curr-month5").removeClass("none"),$(".quarter1").removeClass("none");break;case"4":s.addClass("none"),r.addClass("none"),i.addClass("none"),$(".curr-month6,.curr-month7,.curr-month8").removeClass("none"),$(".quarter2").removeClass("none");break;case"5":s.addClass("none"),r.addClass("none"),i.addClass("none"),$(".curr-month9,.curr-month10,.curr-month11").removeClass("none"),$(".quarter3").removeClass("none")}0==a.totalPage?($(".ui-loading-wrap").addClass("none"),tips({classname:"tips-no-message",content:message.noMssege,divBox:".loan-list"})):a.totalPage<=t.currentPage&&$(".ui-loading-wrap").html(message.success),t.currentPage++}else $.tips({content:e.msg,stayTime:3e3}),999001==e.code&&setTimeout(function(){window.location.href="login.html"},1e3)},error:function(){$.tips({content:message.serverErr,stayTime:3e3})}})},chooseDate:function(){var e=this,t=new Date,a=t.getFullYear(),n=[],o=[];$(".period-date").html(a),n=[];for(var s=2010;s<=a+20;s++)o.push(s);var r=a;$(".period-date").attr("data-date",r);var i=new WheelPicker({data:[o],value:[r],onSelect:function(t){$(".period-date").html(t[0].value),$(".period-date").attr("data-date",t[0].value),e.keyWord="",e.getList(e)}});$(document).on("click",".period-date",function(){return i.show(),!1})},changeQuarter:function(){$(".period-quarter").on("click",function(){$(this).hasClass("active")?($(this).removeClass("active"),$(".period-quarter-list").addClass("none")):($(this).addClass("active"),$(".period-quarter-list").removeClass("none"))})},selectedQuarter:function(){$(this);$(document).on("click",".period-quarter-list li",function(){var e=$(this).data("type");$(".period-list-month").addClass("none"),$(".period-list-year").addClass("none"),$(".period-list-quarter").addClass("none"),1==e?($(".curr-month0,.curr-month1,.curr-month2").removeClass("none"),$(".quarter0").removeClass("none"),$("input[name=loan-status]").val(2)):2==e?($(".curr-month3,.curr-month4,.curr-month5").removeClass("none"),$(".quarter1").removeClass("none"),$("input[name=loan-status]").val(3)):3==e?($(".curr-month6,.curr-month7,.curr-month8").removeClass("none"),$(".quarter2").removeClass("none"),$("input[name=loan-status]").val(4)):4==e&&($(".curr-month9,.curr-month10,.curr-month11").removeClass("none"),$(".quarter3").removeClass("none"),$("input[name=loan-status]").val(5)),$(".period-quarter").removeClass("active"),$(".period-quarter-list").addClass("none")})},changeYear:function(){$(".period-year").on("click",function(){$(this).addClass("active").siblings().removeClass("active");var e=$(this).data("type");0==e?($(".period-list-year").removeClass("none"),$(".period-list-month").addClass("none"),$(".period-list-quarter").addClass("none"),$("input[name=loan-status]").val(1)):1==e&&($(".period-list-year").addClass("none"),$(".period-list-month").addClass("none"),$(".period-list-quarter").removeClass("none"),$("input[name=loan-status]").val(0))})},goRepay:function(){$(document).on("click","#period .ui-col",function(){var e=$(this).data("from"),t=$(this).data("to"),a=$(this).parent().data("debtorid"),n=getUrlParam({name:"repayCategory"}),o="",s="&debtorId="+a+"&repayDateFrom="+e+"&repayDateTo="+t+"&from=period";o="payments.html?category="+n,window.location.href=o+s})},init:function(){this.chooseDate(),this.changeQuarter(),this.changeYear(),this.selectedQuarter(),this.callback=this.getList,search.init(this),this.getList(),scrollFunc(this),this.goRepay()}};