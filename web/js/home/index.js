
var loading = true, currPage = 1, rows = 10;
$(function(){
    CAMEL_HOME.init();
});
var CAMEL_HOME = {
    init : function() {
        this._bindEvent();
        this._getItemCategory();
        $(document.body).infinite().on("infinite", function() {
            if(loading) return;
            loading = true;
            setTimeout(function() {
                CAMEL_HOME._getItemList();
            }, 200);
        });
        CAMEL_HOME._getItemList();

    },
    _bindEvent : function() {

    },
    _getItemCategory : function() {
        ajaxPost('api/apiItemCategoryController/dataGrid', {page:1, rows:4, sort:'seq', order:'asc'}, function(data){
            if(data.success) {
                var result = data.obj;
                for(var i in result.rows) {
                    var itemCategory = result.rows[i];
                    CAMEL_HOME._buildItemCategory(itemCategory);
                }
            }
        });
    },
    _getItemList : function(params) {
        params = $.extend(params || {}, {page:currPage, rows:rows});
        if(currPage == 1) {
            $("#itemList").empty();
            $.showLoadMore();
        }
        ajaxPost('api/apiItemController/dataGrid', params, function(data){
            if(data.success) {
                var result = data.obj;
                if(result.rows.length != 0) {
                    for (var i in result.rows) {
                        var item = result.rows[i];
                        CAMEL_HOME._buildItem(item);
                    }
                } else {
                    if(result.total == 0)
                        $("#itemList").append(Util.noDate(2, '没有相关的商品'));
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
    _buildItemCategory : function(itemCategory) {
        var viewData = Util.cloneJson(itemCategory);
        var dom = Util.cloneDom("itemCategory_template", itemCategory, viewData);
        $("#itemCategory").append(dom);
        dom.click(itemCategory.id, function(event){
            currPage = 1;
            CAMEL_HOME._getItemList({categoryId:event.data});
        });
        return dom;
    },
    _buildItem : function(item) {
        var viewData = Util.cloneJson(item);
        viewData.marketPrice = '￥' + Util.fenToYuan(item.marketPrice);
        viewData.contractPrice = '￥' + Util.fenToYuan(item.contractPrice);
        var dom = Util.cloneDom("item_list_template", item, viewData);
        dom.find('i.ui-img-cover').css('background-image', 'url('+item.url+')');
        dom.addClass('ui-row-flex');
        $("#itemList").append(dom);
        // 加入购入车
        dom.find('a.carts').click(item.id, function(event){
            ajaxPost('api/apiShoppingController/add', {itemId : event.data, quantity : 1}, function(data){
                if(data.success) {
                    $.toast("加入购物车成功", 1000);
                }
            });
        });
        // 立即抢购
        dom.find('a.btn').click(item.id, function(event){
            window.location.href = '../item/item_detail.html?itemId=' + event.data;
        });
        return dom;
    }
};

