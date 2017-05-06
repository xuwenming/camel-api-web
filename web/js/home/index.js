document.onreadystatechange =function(){
    if(document.readyState == 'interactive') {
        $.loading.load();
    }
    if(document.readyState == 'complete') {
        $.loading.close();
    }
}