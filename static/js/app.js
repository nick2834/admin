var suber = angular.module('admin', ["ui.router"]);

suber.run(['$rootScope',function($rootScope,$location){
    ////测试环境路径
    // $rootScope.baseUrl = 'https://test.suber360.com';
    // $rootScope.baseUrl2 = 'https://admin.suber360.com';
    // $rootScope.baseImgUrl ="https://devcdn.suber360.com";
    //生产环境路径
     $rootScope.baseUrl = 'https://www.suber360.com';
     $rootScope.baseUrl2 = 'https://admin.suber360.com';
     $rootScope.baseImgUrl ="https://cdn.suber360.com/@";
     $rootScope.addInput = function(para){
        if($("input[name="+para+"]").length !=0 ){
            layer.msg('你已经添加此条件')
            return;
        }
        $(".searchLine").append('<div class="conditionLine"><input type="date" placeholder="开始时间" name="bgnT" class="marginI"><input type="date" placeholder="结束时间" name="endT"><i class="Hui-iconfont Hui-iconfont-jianhao minus"></i></div>');
        $(".minus").click(function(){
            $(this).parent().remove();
        });
        $(".addList").slideUp();
    };
}])