/**
 * Created by snow on 17/5/3.
 */
var shoppingIds = GetRequest('shoppingIds');
var itemId = GetRequest('itemId');
$(function () {
    CAMEL_ORDER_CONFIRM.init();
});

var CAMEL_ORDER_CONFIRM = {
    init : function() {

        $('.order-mess li:not(:first)').hide();
        this._bindEvent();
        this._getItemList();
        this._initDeliveryWay();
        this._initAddress();
    },
    _bindEvent : function() {
        $('#switchInvoice').click(function(){
            if($(this).is(':checked')) {
                $('.order-mess li:not(:first)').addClass('ui-row-flex').show();
                $('#invoiceWay').val('IW02');
            } else {
                $('.order-mess li:not(:first)').removeClass('ui-row-flex').hide();
                $('#invoiceWay').val('IW01');
            }
        });

        $('.openDeliveryWay').click(function(){
            $('#deliveryWayPopup').popup();
        });

        $('#address').click(function() {
            try {
                JWEIXIN.openAddress(function (data) {
                    var params = {};
                    params.userName = data.userName;
                    params.postalCode = data.postalCode;
                    params.provinceName = data.provinceName;
                    params.cityName = data.cityName;
                    params.countyName = data.countryName;
                    params.detailInfo = data.detailInfo.replace(/[\r\n]/g, "");
                    params.telNumber = data.telNumber;

                    var telNumber = data.telNumber.substr(0, 3) + '****' + data.telNumber.substr(data.telNumber.length - 4);
                    $('#address .info').append('<h3><b>'+data.userName+'</b><span>'+telNumber+'</span></h3>');
                    $('#address .info').append('<p>'+data.provinceName+' '+data.cityName+' '+data.countryName+' '+data.detailInfo+'</p>');

                    $('#contactPhone').val(data.telNumber);
                    $('#contactPeople').val(data.userName);
                    $('#deliveryAddress').val(data.provinceName+' '+data.cityName+' '+data.countryName+' '+data.detailInfo);

                    ajaxPost('api/apiUserAddressController/add', params, function(data){
                        if(data.success) {
                            // 不做任何操作
                        }
                    });
                });
            } catch (e) {
                console.log(e);
            }
        });

        $('#placeOrder').bind('click', CAMEL_ORDER_CONFIRM._placeOrder);
    },
    _getItemList : function() {
        if(itemId) {
            ajaxPost('api/apiItemController/get', {id:itemId}, function(data){
                if(data.success) {
                    var item = data.obj;
                    item.quantity = 1;
                    CAMEL_ORDER_CONFIRM._buildItem(item);
                }
                CAMEL_ORDER_CONFIRM._totalPrice();
                $.hideLoadMore();
            });
        } else if(shoppingIds) {
            ajaxPost('api/apiShoppingController/dataGrid', {page:1, rows:40, sort:'addtime', order:'desc'}, function(data){
                if(data.success) {
                    var result = data.obj;
                    for (var i in result.rows) {
                        var shopping = result.rows[i];
                        if(Util.arrayContains(shoppingIds.split(','), shopping.id)) {
                            shopping.mbItem.quantity = shopping.quantity;
                            CAMEL_ORDER_CONFIRM._buildItem(shopping.mbItem);
                        }
                    }
                    CAMEL_ORDER_CONFIRM._totalPrice();
                }
                $.hideLoadMore();
            });
        }

    },
    _buildItem : function(mbItem) {
        var viewData = Util.cloneJson(mbItem);
        viewData.marketPrice = '￥' + Util.fenToYuan(mbItem.marketPrice);
        viewData.contractPrice = '￥' + Util.fenToYuan(mbItem.contractPrice);
        var dom = Util.cloneDom("order_item_template", mbItem, viewData);

        dom.attr({"data-id" : mbItem.id});
        dom.find('i.ui-img-cover').css('background-image', 'url('+mbItem.url+')');
        dom.addClass('ui-row-flex');
        if(!mbItem.contractPrice) {
            dom.find('.bot').html('<p><span name="contractPrice">'+viewData.marketPrice+'</span></p>');
        }
        $(".confirm-list").append(dom);

        return dom;
    },
    _totalPrice : function() {
        var totalPrice = $('.confirm-list li').map(function(){
            var num = $(this).find('[name=quantity]').text();
            return $(this).find('[name=contractPrice]').text().substr(1)*100*num;
        }).get().join('+');
        $('.totalPrice').html('￥' + Util.fenToYuan(eval(totalPrice)));

        $('#totalPrice').val(eval(totalPrice));
    },
    _initDeliveryWay : function() {
        ajaxPost('api/apiBaseDataController/basedata', {dataType:'DW'}, function(data){
            if(data.success) {
                var result = data.obj;
                for (var i in result) {
                    CAMEL_ORDER_CONFIRM._buildDeliveryWay(result[i]);
                }
            }
        });
    },
    _buildDeliveryWay : function(deliveryWay) {
        var viewData = Util.cloneJson(deliveryWay);
        var dom = Util.cloneDom("dw_template", deliveryWay, viewData);
        $("#dw").append(dom);

        dom.click(deliveryWay, function(event){
            $('.deliveryWay').html(event.data.name);
            $('#deliveryWay').val(event.data.id);
            $.closePopup();
        });
        if(deliveryWay.id == 'DW02') dom.click();
        return dom;
    },
    _initAddress : function() {
        ajaxPost('api/apiUserAddressController/getDefaultAddress', {}, function(data){
            if(data.success && data.obj) {
                var address = data.obj;
                var telNumber = address.telNumber.substr(0, 3) + '****' + address.telNumber.substr(address.telNumber.length - 4);
                $('#address .info').append('<h3><b>'+address.userName+'</b><span>'+telNumber+'</span></h3>');
                $('#address .info').append('<p>'+address.provinceName+' '+address.cityName+' '+address.countyName+' '+address.detailInfo+'</p>');

                $('#contactPhone').val(address.telNumber);
                $('#contactPeople').val(address.userName);
                $('#deliveryAddress').val(address.provinceName+' '+address.cityName+' '+address.countyName+' '+address.detailInfo);
            } else {
                $('#address .info').html('<font color="#FE9900;">请选择您的收货地址</font>');
            }
        });
    },
    _placeOrder : function() {
        var contactPhone = $('#contactPhone').val(), contactPeople = $('#contactPeople').val(),
            deliveryAddress = $('#deliveryAddress').val();
        if(Util.checkEmpty(contactPhone) || Util.checkEmpty(contactPeople) || Util.checkEmpty(deliveryAddress)) {
            $.alert("请选择您的收货地址！", "系统提示");
            return;
        }
        var orderParam = {
            totalPrice : $('#totalPrice').val(),
            deliveryWay : $('#deliveryWay').val(),
            contactPhone : contactPhone,
            contactPeople : contactPeople,
            deliveryAddress : deliveryAddress,
            invoiceWay : $('#invoiceWay').val(),
            userRemark : $('#userRemark').val(),
            mbOrderItemList : []
        };

        // 发票信息
        if($('#invoiceWay').val() == 'IW02') {
            var flag = true;
            $('.order-mess input.required').each(function(){
                if(Util.checkEmpty($(this).val())) {
                    flag = false;
                    var msg = $(this).parent().prev().text();
                    $.toast("请输入" + msg, "text");
                    return false;
                }
            });
            if(!flag) return;

            orderParam.mbOrderInvoice = {
                companyName : $('#companyName').val(),
                companyTfn : $('#companyTfn').val(),
                bankName : $('#bankName').val(),
                bankNumber : $('#bankNumber').val(),
                invoiceUse : $('#invoiceUse').val()
            }
        }

        // 商品信息
        $('.confirm-list li').each(function(){
            var itemId = $(this).attr('data-id'),
                quantity = $(this).find('[name=quantity]').text(),
                buyPrice = $(this).find('[name=contractPrice]').text().substr(1)*100,
                marketPrice = buyPrice;
            if($(this).find('[name=marketPrice]').length != 0) {
                marketPrice = $(this).find('[name=marketPrice]').text().substr(1)*100;
            }
            var item = {
                itemId : itemId,
                marketPrice : marketPrice,
                buyPrice : buyPrice,
                quantity : quantity
            };
            orderParam.mbOrderItemList.push(item);
        });

        ajaxPost('api/apiOrderController/add', {orderParam : JSON.stringify(orderParam)}, function(data) {
            console.log(data);
            if (data.success) {
                // 删除购物车
                CAMEL_ORDER_CONFIRM._deleteShopping();
                window.location.replace('../pay/pay.html?orderId=' + data.obj + '&amount=' + $('#totalPrice').val());
            } else {
                $.loading.close();
                $.alert(data.msg, "系统提示");
            }
        }, function(){
            $.loading.load({type:3, msg:'正在提交...'});
        }, -1);
    },
    _deleteShopping : function(){
        ajaxPostSync('api/apiShoppingController/batchDelete', {ids : shoppingIds}, function(data) {
            if (data.success) {
                // 不做任何操作
            }
        });
    }
};