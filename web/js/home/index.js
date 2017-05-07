
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
            }, 20);
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
    _getItemList : function() {
        var params = {page:currPage, rows:rows};
        ajaxPost('api/apiItemController/dataGrid', params, function(data){
            if(data.success) {
                var result = data.obj;
                for(var i in result.rows) {
                    var item = result.rows[i];
                    CAMEL_HOME._buildItem(item);
                }

                if(result.rows.length >= rows) {
                    $.showLoadMore();
                } else {
                    $.hideLoadMore();
                }
                loading = false;
                currPage ++;
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
        dom.find('a.carts').click(item.id, function(){

        });
        // 立即抢购
        dom.find('a.btn').click(item.id, function(event){
            window.location.href = '../item/item_detail.html?itemId=' + event.data;
        });
        return dom;
    }
};

