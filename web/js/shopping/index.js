/**
 * Created by john on 17/5/3.
 */
$(function () {
    //TODO 写我的页面的js业务代码
    $.hideLoadMore();

    $(".all").on("click",function(){
        var currentClass = $(this).children("span").attr("class");
        var className = (currentClass == "select") ? "selected" : "select";
        $(this).children("span").attr("class",className);
        $(".ui-select span").attr("class",className);
    })

    $(".ui-select").on("click",function(){
        var currentClass = $(this).children("span").attr("class");
        var className = (currentClass == "select") ? "selected" : "select";
        $(this).children("span").attr("class",className);
        checkSelectAll();
    })


});

function checkSelectAll()
{
    var isSelectAll = true;

    $(".ui-select span").each(function(){
        if($(this).attr("class") == "select")
        {
            $(".all span").attr("class","select");
            isSelectAll = false;
        }
    })

    if(isSelectAll)
    {
        $(".all span").attr("class","selected");
    }
}