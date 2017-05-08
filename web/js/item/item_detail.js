
var itemId = GetRequest('itemId');
$(function(){
    $.hideLoadMore();

    init();
    $('.add').click(function(){
        ajaxPost('api/apiShoppingController/add', {itemId : itemId, quantity : 1}, function(data){
            if(data.success) {
                $.toast("加入购物车成功", 1000);
            }
        });
    });
});

function init() {
    ajaxPost('api/apiItemController/get', {id : itemId}, function(data){
        if(data.success) {
            var item = data.obj;
            if(item.imageList) {
                var images = item.imageList.split(';');
                for(var i in images) {
                    $(".details-banner .swiper-wrapper").append('<div class="swiper-slide"><img src="'+images[i]+'" /></div>');
                }
                $(".details-banner").swiper({
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                })
            }
            $('#name').html(item.name);
            $('#quantityUnitName').html(item.quantityUnitName);
            $('#contractPrice').html('￥' + Util.fenToYuan(item.contractPrice));
            $('#marketPrice').html('￥' + Util.fenToYuan(item.marketPrice));
        }
    });
}

