var clock = document.querySelector('.clock');

function time() {
    var date = new Date();
    var y = date.getFullYear();
    var mon = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    clock.textContent = y + "年" + mon + "月" + d + "日" + h + ":" + m + ":" + s;
}

setInterval(time, 1000);