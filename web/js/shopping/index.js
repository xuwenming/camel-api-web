/**
 * Created by john on 17/5/3.
 */
$(function () {
    //$.hideLoadMore();
    CAMEL_SHOPPING.init();
});


var CAMEL_SHOPPING = {
    init : function() {
        this._bindEvent();
        this._getShoppingList();
    },
    _bindEvent : function() {
        $(".all").on("click",function() {
            var currentClass = $(this).children("span").attr("class");
            var className = (currentClass == "select") ? "selected" : "select";
            $(this).children("span").attr("class",className);
            $(".ui-select span").attr("class",className);
            CAMEL_SHOPPING._totalPrice();
        });

        $("#shoppingList").on("click", ".ui-select", function() {
            var currentClass = $(this).children("span").attr("class");
            var className = (currentClass == "select") ? "selected" : "select";
            $(this).children("span").attr("class",className);
            CAMEL_SHOPPING._checkSelectAll();
            CAMEL_SHOPPING._totalPrice();
        });

        $('.clear-btn').click(function(){
            if($('.ui-select span.selected').length == 0) {
                $.toast("<font size='3pt;'>您还没有选择商品哦</font>", "text");
                return;
            }
            var shoppingIds = $('.ui-select span.selected').map(function(){
                var $li = $(this).closest('li');
                return $li.attr('data-id');
            }).get().join(',');

            window.location.href = '../order/order_confirm.html?shoppingIds=' + shoppingIds;
        });
    },
    _getShoppingList : function() {
        ajaxPost('api/apiShoppingController/dataGrid', {page:1, rows:40, sort:'addtime', order:'desc'}, function(data){
            if(data.success) {
                var result = data.obj;
                if(result.rows.length != 0) {
                    $('.clearing').show();
                    for (var i in result.rows) {
                        var shopping = result.rows[i];
                        CAMEL_SHOPPING._buildShopping(shopping);
                    }
                    $('#shopping_list_template').remove();
                } else {
                    $("#shoppingList").append(Util.noDate(2, '购物车是空的'));
                }
            }
            $.hideLoadMore();
        });
    },
    _buildShopping : function(shopping) {
        var viewData = Util.cloneJson(shopping);
        viewData.marketPrice = '￥' + Util.fenToYuan(shopping.mbItem.marketPrice);
        viewData.contractPrice = '￥' + Util.fenToYuan(shopping.mbItem.contractPrice);
        var dom = Util.cloneDom("shopping_list_template", shopping, viewData);
        dom.attr('data-id', shopping.id);
        dom.find('i.ui-img-cover').css('background-image', 'url('+shopping.mbItem.url+')');
        dom.addClass('ui-row-flex');
        dom.find('.quantity').val(shopping.quantity).attr('data-quantity',shopping.quantity);
        if(!shopping.mbItem.contractPrice) {
            dom.find('.bot').html('<p><span name="contractPrice">'+viewData.marketPrice+'</span></p>');
        }
        $("#shoppingList").append(dom);

        dom.find('.quantity').blur(shopping, function(event){
            var $li = $(this).closest('li'), num = $(this).val(), oldNum = $(this).attr('data-quantity');
            if(oldNum == num) return;
            if(!num || num == 0) {
                $.toast("<font size='3pt;'>数量超出范围~</font>", "text");
                $(this).val(1);
                num = 1;
            }
            if(num > event.data.mbItem.quantity) {
                $.toast("<font size='3pt;'>数量超出范围~</font>", "text");
                $(this).val(event.data.mbItem.quantity);
                num = event.data.mbItem.quantity;
            }

            ajaxPost('api/apiShoppingController/edit', {id:event.data.id, quantity:num}, function(data){
                if(data.success) {
                    $li.find('.quantity').attr('data-quantity',num);
                    if($li.find('span.selected').length != 0) {
                        CAMEL_SHOPPING._totalPrice();
                    } else {
                        $li.find('.ui-select').click();
                    }
                }
            });
        });
        dom.find('.sub').click(shopping.id, function(event){
            var $li = $(this).closest('li'), num = parseInt($li.find('.quantity').val());
            if(num <= 1) return;
            $.showLoading('正在加载');
            ajaxPost('api/apiShoppingController/edit', {id:event.data, quantity:num-1}, function(data){
                if(data.success) {
                    $li.find('.quantity').val(num - 1).attr('data-quantity',num - 1);
                    if($li.find('span.selected').length != 0) {
                        CAMEL_SHOPPING._totalPrice();
                    } else {
                        $li.find('.ui-select').click();
                    }
                }
                setTimeout(function(){
                    $.hideLoading();
                }, 200);
            });
        });
        dom.find('.add').click(shopping, function(event){
            var $li = $(this).closest('li'), num = parseInt($li.find('.quantity').val());
            if(num == event.data.mbItem.quantity) {
                $.toast("<font size='3pt;'>亲，不能购买更多哦</font>", "text");
                return;
            }
            $.showLoading('正在加载');
            ajaxPost('api/apiShoppingController/edit', {id:event.data.id, quantity:num+1}, function(data){
                if(data.success) {
                    $li.find('.quantity').val(num + 1).attr('data-quantity',num + 1);
                    if($li.find('span.selected').length != 0) {
                        CAMEL_SHOPPING._totalPrice();
                    } else {
                        $li.find('.ui-select').click();
                    }
                }
                setTimeout(function(){
                    $.hideLoading();
                }, 200);
            });
        });
        dom.find('.del').click(shopping.id, function(event){
            var $li = $(this).closest('li');
            $.confirm("确认要删除这个商品吗?", "系统提示", function() {
                ajaxPost('api/apiShoppingController/delete', {id:event.data}, function(data){
                    if(data.success) {
                        var len = $li.find('span.selected').length;
                        $li.remove();
                        if(len != 0) CAMEL_SHOPPING._totalPrice();
                        if($("#shoppingList li").length == 0) {
                            $("#shoppingList").append(Util.noDate(2, '购物车是空的'));
                            $('.clearing').hide();
                            $('.bottom .numCount').hide();
                        } else {
                            $('.bottom .numCount').show().find('b').text($("#shoppingList li").length);
                        }
                    }
                });
            });
        });

        dom.find('i.ui-img-cover').click(shopping.mbItem.id, function(event){
            window.location.href = '../item/item_detail.html?itemId=' + event.data;
        });

        return dom;
    },
    _checkSelectAll : function() {
        var isSelectAll = true;

        $(".ui-select span").each(function() {
            if($(this).attr("class") == "select") {
                $(".all span").attr("class","select");
                isSelectAll = false;
            }
        })

        if(isSelectAll) {
            $(".all span").attr("class","selected");
        }
    },
    _totalPrice : function() {
        var totalPrice = $('.ui-select span.selected').map(function(){
            var $li = $(this).closest('li');
            var num = $li.find('.quantity').val();
            return $li.find('[name=contractPrice]').text().substr(1)*100*num;
        }).get().join('+');
        $('.totalPrice').html('￥' + Util.fenToYuan(eval(totalPrice)));
    }
};
