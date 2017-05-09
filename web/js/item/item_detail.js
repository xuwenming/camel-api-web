
var itemId = GetRequest('itemId');
var quantity = null;
$(function(){
    $.hideLoadMore();

    init();
    $('.add').click(function(){
        if(quantity <= 0) {
            $.toast("库存不足", "forbidden");
            return;
        }
        ajaxPost('api/apiShoppingController/add', {itemId : itemId, quantity : 1}, function(data){
            if(data.success) {
                $.toast("加入购物车成功", 1000);
            }
        });
    });

    $('.buy').click(function(){
        if(quantity <= 0) {
            $.toast("库存不足", "forbidden");
            return;
        }
        window.location.href = '../order/order_confirm.html?itemId=' + itemId;
    });
});

function init() {
    ajaxPostSync('api/apiItemController/get', {id : itemId}, function(data){
        if(data.success) {
            var item = data.obj;
            quantity = item.quantity;
            if(item.imageList) {
                var images = item.imageList.split(';');
                for(var i in images) {
                    $(".details-banner .swiper-wrapper").append('<div class="swiper-slide"><img src="'+images[i]+'" /></div>');
                }
                setTimeout(function(){
                    $(".details-banner").swiper({
                        pagination: '.swiper-pagination',
                        paginationClickable: true
                    });
                }, 200);
            }
            $('#name').html(item.name);
            $('#quantityUnitName').html(item.quantityUnitName);
            if(item.contractPrice) {
                $('#contractPrice').html('￥' + Util.fenToYuan(item.contractPrice));
                $('#marketPrice').html('￥' + Util.fenToYuan(item.marketPrice));
            } else {
                $('.price').html('￥' + Util.fenToYuan(item.marketPrice));
            }

        }
    });
}

