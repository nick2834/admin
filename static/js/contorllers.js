suber.controller('home',function ($scope,getData) {
    var now = new Date().Format('Y-M-d'),param = '?start_time='+now;
    //注册量
    var dataArrayA1 = [],dataArrayA2 = [],
        dataArrayB1 = [],dataArrayB2 = [],
        dataArrayC1 = [],dataArrayC2 = [],
        dataArrayD1 = [],dataArrayD2 = [],
        dataArrayE1 = [],dataArrayE2 = [];
    getData.register().then(function(data){
        var sendArrayConNum = data.data.daily_create_user;

        for(var i=0; i<sendArrayConNum.length;i++){
            dataArrayA1.push(parseFloat(sendArrayConNum[i].number));
            dataArrayA2[i]=new Date(sendArrayConNum[i].date);
            dataArrayA2[i] = dataArrayA2[i].Format("MM.dd");
        }
        for(var n=0; n<dataArrayA2.length;n++){
            chartPrice.xAxis[0].categories[n] = dataArrayA2[n];
        }
        chartPrice.addSeries({
            name:'注册量',
            data:dataArrayA1
        });
    });
    var chartPrice = new Highcharts.Chart({
        chart:{
            renderTo:'registerCon',
            type:'column',
        },
        title:{
            text:'注册量'
        },
        xAxis:{
            categories: [
                '10.1',
                '10.2',
                '10.3',
                '10.4',
                '10.5',
                '10.6',
                '10.7'
            ]
        }
    });
    // 客单价
    getData.taskCountAll().then(function(data){
        $scope.taskCountAll = data.data.create_task_total;
        var sendArrayConNum = data.data.create_task_total;

        for(var i=0; i<sendArrayConNum.length;i++){
            dataArrayB1.push(parseFloat(sendArrayConNum[i].ave_price));
            dataArrayB2[i]=new Date(sendArrayConNum[i].date);
            dataArrayB2[i] = dataArrayB2[i].Format("MM.dd");
        }
        for(var n=0; n<dataArrayB2.length;n++){
            chartPrice.xAxis[0].categories[n] =dataArrayB2[n];
        }
        //chart.series.data[0] =sendArray;
        chartPrice2.addSeries({
            name:'客单价',
            data:dataArrayB1
        });
    });
    var chartPrice2 = new Highcharts.Chart({
        chart:{
            renderTo:'price',
            type:'column' //闂佸搫�?�晶浠嬪Φ濮樿京灏甸悹鍥皺?? 闂佸搫鑻畷顒勬�??
        },
        title:{
            text:'客单价' //闂佹悶鍎插畷�??濡撮崘顔藉剭闁告洦鍓涢崹鐓幬???
        },
        xAxis:{
            categories: [
                '10.1',
                '10.2',
                '10.3',
                '10.4',
                '10.5',
                '10.6',
                '10.7'
            ]
        }
    });
    // 留存率
    var sendArrayNum = [],sendArrayNum7 = [],sendArrayNu = [],datarray = [];
    getData.rates().then(function(data){
        var sendArrayConNum = data.data.save;
        var arrNum = [];
        var arrNum7 = [];
        var arrNu = [];
        for(var i=0; i<sendArrayConNum.length;i++){
            arrNum[i] = Number(sendArrayConNum[i].one_day_percent).toFixed(2);
            arrNum7[i] = Number(sendArrayConNum[i].one_week_percent).toFixed(2);
            arrNu[i] = Number(sendArrayConNum[i].one_month_percent).toFixed(2);
            //次日留存率
            sendArrayNum.push(parseFloat(arrNum[i]));
            sendArrayNum7.push(parseFloat(arrNum7[i]));
            sendArrayNu.push(parseFloat(arrNu[i]));
            //7日留存率

            //sendArrayNum.push(sendArrayConNum[i].percent);
            datarray[i]=new Date(sendArrayConNum[i].date);
            datarray[i] = datarray[i].Format("MM.dd");
        }
        for(var n=0; n<datarray.length;n++){
            chartPrice5.xAxis[0].categories[n] =datarray[n];
        }
        //chart.series.data[0] =sendArray;
        chartPrice5.addSeries({
            name:'次日',
            data:sendArrayNum
        });
        chartPrice5.addSeries({
            name:'7日',
            data:sendArrayNum7
        });
        chartPrice5.addSeries({
            name:'月',
            data:sendArrayNu
        });
    });
    var chartPrice5 = new Highcharts.Chart({
        chart:{
            renderTo:'rates',
            type:'column'
        },
        title:{
            text:'留存率'
        },
        xAxis:{
            categories: [
                '10.1',
                '10.2',
                '10.3',
                '10.4',
                '10.5',
                '10.6',
                '10.7'
            ]
        }

    });
    var  creatTask = [], datarray = [],cancel = [],complate = [],accept = [];
    var  creatTask2 = [], datarray2 = [],cancel2 = [],complate2 = [],accept2 = [];
    //发布
    getData.taskCount().then(function(data){
        var sendArrayConPrice = data.data.daily_create_task;
        for(var i=0; i<sendArrayConPrice.length;i++){
            creatTask.push(parseFloat(sendArrayConPrice[i].number));
            creatTask2.push(parseFloat(sendArrayConPrice[i].price));

            datarray[i]=new Date(sendArrayConPrice[i].date);
            datarray[i] = datarray[i].Format("MM.dd");
        }
        for(var n=0; n<datarray.length;n++){
            chart.xAxis[0].categories[n] =datarray[n];
        }
        chart.series[0].update({
            data:creatTask
        });
        chart2.series[0].update({
            data:creatTask2
        });
    });
    //取消
    getData.cancel().then(function(data){
        var sendArrayConPrice = data.data.daily_cancel_task;
        for(var i=0; i<sendArrayConPrice.length;i++){
            cancel.push(parseFloat(sendArrayConPrice[i].number));
            cancel2.push(parseFloat(sendArrayConPrice[i].price));
        }
        chart.series[1].update({
            data:cancel
        });
        chart2.series[1].update({
            data:cancel2
        });
    });
    //接受
    getData.seize().then(function(data){
        var sendArrayConPrice = data.data.daily_seize_task;
        for(var i=0; i<sendArrayConPrice.length;i++){
            accept.push(parseFloat(sendArrayConPrice[i].number));
            accept2.push(parseFloat(sendArrayConPrice[i].price));
        }
        chart.series[2].update({
            data:accept
        });
        chart2.series[2].update({
            data:accept2
        });
    });
    //
    getData.complete().then(function(data){
        var sendArrayConPrice = data.data.daily_done_task;
        for(var i=0; i<sendArrayConPrice.length;i++){
            complate.push(parseFloat(sendArrayConPrice[i].number));
            complate2.push(parseFloat(sendArrayConPrice[i].price));
        }
        chart.series[3].update({
            data:complate
        });
        chart2.series[3].update({
            data:complate2
        });
    });
    var chart = new Highcharts.Chart({
        chart:{
            renderTo:'taskCount',
            type:'column' //鏄剧ず绫诲�?? 鏌卞�?
        },
        title:{
            text:'任务数量' //鍥捐〃鐨勬爣�??
        },
        xAxis:{
            categories: [
                '10.1',
                '10.2',
                '10.3',
                '10.4',
                '10.5',
                '10.6',
                '10.7'
            ]
        },
        yAxis:{
            title:{
                text:'' //Y杞寸殑鍚嶇�?
            }
        },
        series: [{
            name: '发布'
        }, {
            name: '取消'
        }, {
            name: '接受'
        }, {
            name: '完成'
        }]
    });
    var chart2 = new Highcharts.Chart({
        chart:{
            renderTo:'water',
            type:'column' //鏄剧ず绫诲�?? 鏌卞�?
        },
        title:{
            text:'流水金额' //鍥捐〃鐨勬爣�??
        },
        xAxis:{
            categories: [
                '10.1',
                '10.2',
                '10.3',
                '10.4',
                '10.5',
                '10.6',
                '10.7'
            ]
        },
        yAxis:{
            title:{
                text:'' //Y杞寸殑鍚嶇�?
            }
        },
        series: [{
            name: '发布'
        }, {
            name: '取消'
        }, {
            name: '接受'
        }, {
            name: '完成'
        }]
    });
    //用户总量
    getData.userCount().then(function(rep){
        $scope.userCount = rep.data.daily_create_user[0];
    });
    //日活量
    getData.dayLive().then(function(rep){
        $scope.dayLive = rep.data.daily_active_user[0];
        $scope.dayLive2 = Math.floor(($scope.dayLive.number / $scope.userCount.number) * 10000)/100;
    });
    // //交易用户
    getData.dealUser().then(function(rep){
        $scope.dealUser = rep.data.deal_user[0];
        $scope.dealUser2 = Math.floor(($scope.dealUser.number / $scope.userCount.number) * 10000)/100;
    });
    //接单时长
    getData.seize_time().then(function(rep){
        $scope.seizeTime = rep.data.average_seize_time[0];
    });
    //完成时长
    getData.done_time().then(function(rep){
        $scope.doneTime = rep.data.average_done_time[0];
    });
    //任务时长
    getData.task_time().then(function(rep){
        $scope.taskTime = rep.data.average_task_time[0];
    });
    //完成任务
    getData.done_task().then(function(rep){
        $scope.doneTask = rep.data.done_task_total[0];
        $scope.doneTask2 = Math.floor(($scope.doneTask.number / $scope.taskCountAll[0].number) * 10000)/100;
    });
    // //取消任务
    getData.cancel_task().then(function(rep){
        $scope.cancelTask = rep.data.cancel_task_total[0];
        $scope.cancelTask2 = Math.floor(($scope.cancelTask.number / $scope.taskCountAll[0].number) * 10000)/100;
    });
    // //过期任务
    getData.overdue_task().then(function(rep){
        $scope.overdueTask = rep.data.overdue_task_total[0];
        $scope.overdueTask2 = Math.floor(($scope.overdueTask.number / $scope.taskCountAll[0].number) * 10000)/100;
    });
    //提现金额
    getData.withdraw().then(function(rep){
        $scope.withdraw = rep.data.withdraw_success_daily[0];
    });
    //提现金额
    getData.ali_binding().then(function(rep){
        $scope.aliBinding = rep.data.ali_bind;
    });
    getData.userGender().then(function(rep){
        $scope.userGender = rep.data.gender;
    });
})
.controller('myapp',function ($scope,$rootScope) {
    if(!sessionStorage.getItem("id") || !sessionStorage.getItem("id")){
        sessionStorage.setItem("loginInfo",false);
        window.location.href = "./login.html";
    }else{
        $scope.username = '欢迎您'+sessionStorage.getItem("id")
    }
    //退出账号
    $scope.logout = function () {
        window.localStorage.removeItem('loginInfo');
        window.location.href = "./login.html";
    }
    //切换账号
    $scope.changeUser = function () {
        window.location.href = "./login.html";
    }
    //显示账号信息
    $scope.myselfinfo = function(){
        layer.open({
            type: 1,
            area: ['300px','200px'],
            fix: false, //不固定
            maxmin: true,
            shade:0.4,
            title: '查看信息',
            content: '<div>'+sessionStorage.getItem("id")+'</div>'
        });
    }
})
.controller('userList',function($scope,getData,tools,$location,$stateParams){
    $scope.title = '会员管理'
    var urlPage = $stateParams.page;
    var param = '';
    $scope.pageComplte = false;//分页还没加载
    $scope.goPage = function(page){
        layer.load(2)
        $scope.page = page;
        getData.userList(page,param).then(function(rep){
            $scope.topicCon = rep.data.user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            //$scope.$emit("topicPage");
            layer.closeAll('loading')
        })
    };
    if(urlPage){
        $scope.goPage(urlPage);
    }else{
        $scope.goPage(1);
    }
    $scope.search = function(){//搜索
        param = '';
        var inputA = $("input[type=text]");
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        var circle_id = $("input[name=circle_id]").val() || '',
            author = $("input[name=author]").val() || '';

        if(endTime){
            param+='&start_time='+bgTime+'&end_time='+endTime
        }
        if(circle_id){
            param+='&circle_id='+circle_id
        }
        if(author){
            param+='&author='+author
        }
        $scope.goPage(1);
        for(var i=0;i<inputA.length;i++){
            if(!inputA.eq(i).val()){
                continue
            }
            param += '&' + inputA.eq(i).attr("name") + '=' + inputA.eq(i).val()
        }
        getData.userList(1,param).then(function(rep){
            $scope.topicCon = rep.data.user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",1);
            //$scope.$emit("topicPage");
        })
    };
    $scope.userEdit = function (topicList) {
        $scope.userInfo = topicList
        $("#modal-demo").modal("show")
    }
    //表格导出
    $scope.excelName = ['用户名','昵称','手机号','性别','发布任务数','接受任务数量','发布任务评分','接受任务评分','邀请码'];
    $scope.excelField = ['excel.id','excel.nickname','excel.phone','excel.gender | gender','excel.publish_count','excel.participate_count','excel.owner_score','excel.employee_score','excel.invite'];
    $scope.export = function(){
         //getData.userList(1,'&per_page='+$scope.topicPage.total_count).then(function(rep){
        getData.userList(1,param).then(function(rep){
            $scope.excelCon = rep.data.user;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
    //全选
    $scope.checkAll = function(){
        var checked = $(".tableCon tbody tr input[type=checkbox]:checked");
        if($scope.selectAll){
            angular.forEach($scope.topicCon, function(item){
                item.select = true;
            })
        }else{
            angular.forEach($scope.topicCon, function(item){
                item.select = !item.select;
            })
        }
    }
    //批量操作
    $scope.operateCon = ["加入黑名单","添加VIP","解除VIP"];
    $scope.operateEvent = function(a){
        var unoArr = [];//被选中的用户的id数组
        eles = $(".tableCon tbody tr input[type=checkbox]:checked").map(function () {
            return $(this).parent().siblings('td')
        });
        angular.forEach(eles, function (item,value) {
           return unoArr.push(item[0].innerText)
        });
        if(unoArr.length == '0'){
            layer.msg('至少选择一个用户');
            return;
        }
        function addMember() {
            angular.forEach(unoArr, function (item,value) {
                var uid = item
                getData.addMember(uid).then(function(rep){
                    if(rep.code == 0){
                        layer.msg('操作成功!');
                        $scope.goPage($scope.topicPage.current_page,param);
                        return;
                    }else{
                        layer.msg(rep.data.msg);
                        return;
                    }
                })
            });
        }
        if(a == "加入黑名单"){
            layer.prompt({title: '请填写拉黑原因'}, function(text, index){
                    angular.forEach(unoArr, function (item,value) {
                        var uid = item,
                            reason = text,
                            mark = '测试'
                        console.log(reason)
                        getData.addBlack(uid,reason,mark).then(function(rep){
                            if(rep.code == 0){
                                layer.msg('操作成功!');
                                return;
                            }else if(rep.code == '401'){
                                layer.msg(rep.data.msg);
                                return;
                            }
                        })
                    });
                layer.close(index);
            });
        }else if(a == "添加VIP"){
            layer.confirm('确定把此用户添加为VIP？', {
                btn: ['确定','取消']
            }, function(index){
                addMember()
            }, function(index){
                layer.close(index);
            });
        }else if(a == "解除VIP"){
            //询问框
            layer.confirm('确定解除此用户VIP？', {
                btn: ['确定','取消']
            }, function(index){
                addMember()
            }, function(index){
                layer.close(index);
            });
        }
    };
    //加V
    $scope.addMember = function(a,user_id){
        var text;
        if(a){
            text = '确定解除此用户VIP？'
        }else{
            text = '确定把此用户添加为VIP？'
        }
        layer.confirm(text, {
            btn: ['确定','取消']
        }, function(index){
            getData.addMember(user_id).then(function(rep){
                if(rep.code == 0){
                    layer.msg('操作成功!');
                    $scope.goPage($scope.topicPage.current_page,param);
                    return;
                }else{
                    layer.msg(rep.data.msg);
                    return;
                }
            })
        }, function(index){
            layer.close(index);
        });
    };
})
.controller('userData',function($scope,getData,tools,$stateParams){
        var uid = $stateParams.id;
        getData.getUser(uid).then(function(rep){
            $scope.title = rep.data.data.user.nickname;
        });
        function refreshUser(){
            getData.getUser(uid).then(function(rep){
                $scope.userCon = rep.data.data.user;
            });
        }
        refreshUser();
    })
.controller('topic',function($scope,getData,tools,getTaskUrl,$timeout,page,$location,$stateParams){
        var urlPage = $stateParams.page,param = '',timeStr;
        $scope.title = '话题管理'
        $scope.conditions = ['circle_id','author'];//搜索条件定义
        $scope.pageComplte = false;//分页还没加载
        $scope.goPage = function(page){
            layer.load(2)
            $scope.page = page;
            getData.topic(page,param).then(function(rep){
                if(rep.data.code == 0){
                    $scope.topicCon = rep.data.data.topics;
                    $scope.topicPage = rep.data.data.paging;
                    $scope.$broadcast("topicPage",page);
                    //$scope.$emit("topicPage");
                    layer.closeAll('loading')
                }
            });
        };
        if(urlPage){
            $scope.goPage(urlPage);
        }else{
            $scope.goPage(1);
        }
        //点击事件开始
        $scope.deletData = function(id){
            tools.creatPop('提示框','确定删除?',
                function(){
                    var that = this;
                    getTaskUrl.goSend({'type':'DELETE',url:'/api/v3/topics/'+id+'.json'}).then(function(rep){
                        if(rep.code == 0){
                            tools.popShow('删除成功');
                            $timeout(function(){
                                $scope.goPage($scope.page);
                            },1000);
                        }
                    });
                }
            );
        };
        $scope.changeLine = function(id,state){
            var _state;
            if(state){
                _state = '下线';
            }else{
                _state = '上线';
            }
            tools.creatPop(
                '提示框',
                '确定'+_state+'?',
                function(){
                    getTaskUrl.goSend({'type':'post',url:'/api/v1/topics/'+id+'/online.json?online='+!state,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(rep){
                        if(rep.code == 0){
                            tools.popShow('操作成功');
                            $timeout(function(){
                                $scope.goPage($scope.page);
                            },1000);

                        }
                    });
                }
            );
        };
        $scope.failEvent = function(id,boole){
            tools.creatPop('提示框','确定审核?',
                function(){
                    var that = this;
                    getData.topicCheck(id,boole).then(function(rep){
                        if(rep.code == 0){
                            tools.popShow('操作成功');
                        }
                    });
                }
            );
        };
        //console.info($scope.topicPage.current_page);
        $scope.goPath2 = function(path){
            history.replaceState('', "", "#/topic/?page="+$scope.topicPage.current_page);
            $location.path(path)
        };
        $scope.search2 = function(){
            param = '';
            var bgTime = $("input[name=bgnT]").val();
            var endTime = $("input[name=endT]").val();
            var circle_id = $("input[name=circle_id]").val() || '',
                author = $("input[name=author]").val() || '';

            if(endTime){
                param+='&start_time='+bgTime+'&end_time='+endTime
            }
            if(circle_id){
                param+='&circle_id='+circle_id
            }
            if(author){
                param+='&author='+author
            }
            $scope.goPage(1);
        }

    })
.controller('coupons',function($scope,getData){

        $scope.title = '财务管理'
        var timeStr;
        $scope.goPage = function(page){
            layer.load(2)
            getData.couponsCon('?page='+page+timeStr).then(function(rep){
                $scope.couponsCon = rep.data;
                $scope.topicPage = rep.data.paging;
                $scope.$broadcast("topicPage",page);
                layer.closeAll('loading')
            });
        };

        $scope.goPage(1);
        $scope.search2 = function(){
            var bgTime = $("input[name=bgnT]").val();
            var endTime = $("input[name=endT]").val();
            if(endTime <= bgTime){
                tools.popShow('开始日期不能大于结束日期');
                return
            }
            timeStr = '&start_time='+bgTime+'&end_time='+endTime;
            $scope.goPage(1);
        }

    })