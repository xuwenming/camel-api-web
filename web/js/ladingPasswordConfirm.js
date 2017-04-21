
    var check_pass_word = ''; var passwords = $('#password').get(0);
    $(function(){
        var div = '\
        <div id="key" style="position:absolute;background-color:#A8A8A8;width:99.5%;bottom:0px;">\
            <ul id="keyboard" style="font-size:20px;margin:2px -2px 1px 2px">\
                <li class="symbol"><span class="off">1</span></li>\
                <li class="symbol"><span class="off">2</span></li>\
                <li class="symbol btn_number_"><span class="off">3</span></li>\
                <li class="tab"><span class="off">4</span></li>\
                <li class="symbol"><span class="off">5</span></li>\
                <li class="symbol btn_number_"><span class="off">6</span></li>\
                <li class="tab"><span class="off">7</span></li>\
                <li class="symbol"><span class="off">8</span></li>\
                <li class="symbol btn_number_"><span class="off">9</span></li>\
                <li class="cancle lastitem">取消</li>\
                <li class="symbol"><span class="off">0</span></li>\
                <li class="delete btn_number_">删除</li>\
            </ul>\
        </div>\
        ';
        $("input.pass").attr("disabled",true);
        $("#password").attr("disabled",true);
        $("#keyboardDIV").html(div);
    });
    