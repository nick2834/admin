var suber = angular.module('admin', ["ui.router"]);

suber.run(['$rootScope',function($rootScope,$location){
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
