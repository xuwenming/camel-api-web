
var loading = true, currPage = 1, rows = 10;
var q = GetRequest('q');
$(function(){
    CAMEL_SEARCH.init();
});
var CAMEL_SEARCH = {
    init : function() {
        document.title = q;
        $('.header-name').html(q);
        this._bindEvent();
        
        $(document.body).infinite().on("infinite", function() {
            if(loading) return;
            loading = true;
            setTimeout(function() {
                CAMEL_SEARCH._getItemList();
            }, 200);
        });
        CAMEL_SEARCH._getItemList();

    },
    _bindEvent : function() {
        
    },
    _getItemList : function() {
        ajaxPost('api/apiItemController/dataGrid', {page:currPage, rows:rows, name: q}, function(data){
            if(data.success) {
                var result = data.obj;
                if(result.rows.length != 0) {
                    for (var i in result.rows) {
                        var item = result.rows[i];
                        CAMEL_SEARCH._buildItem(item);
                    }
                } else {
                    if(result.total == 0)
                        $("#itemList").append(Util.noDate(2, '没有搜索到相关的商品'));
                }

                if(result.rows.length >= rows) {
                    loading = false;
                    currPage ++;
                    $.showLoadMore();
                } else {
                    loading = true;
                    $.hideLoadMore();
                }
            } else {
                $(document.body).destroyInfinite();
                $.hideLoadMore();
            }
        });
    },
    _buildItem : function(item) {
        var viewData = Util.cloneJson(item);
        viewData.marketPrice = '￥' + Util.fenToYuan(item.marketPrice);
        viewData.contractPrice = '￥' + Util.fenToYuan(item.contractPrice);
        var dom = Util.cloneDom("item_list_template", item, viewData);
        dom.find('i.ui-img-cover').css('background-image', 'url('+item.url+')');
        dom.addClass('ui-row-flex');
        if(!item.contractPrice) {
            dom.find('.bot').html('<p>'+viewData.marketPrice+'</p>');
        }
        $("#itemList").append(dom);
        // 加入购入车
        dom.find('a.carts').click(item, function(event){
            if(event.data.quantity <= 0) {
                $.toast("库存不足", "forbidden");
                return;
            }
            ajaxPost('api/apiShoppingController/add', {itemId : event.data.id, quantity : 1}, function(data){
                if(data.success) {
                    $.toast("加入购物车成功", 1500);
                }
            });
        });
        // 立即抢购
        dom.find('a.btn').click(item, function(event){
            if(event.data.quantity <= 0) {
                $.toast("库存不足", "forbidden");
                return;
            }
            window.location.href = '../order/order_confirm.html?itemId=' + event.data.id;
        });

        dom.find('i.ui-img-cover').click(item.id, function(event){
            window.location.href = '../item/item_detail.html?itemId=' + event.data;
        });
        return dom;
    }
};

