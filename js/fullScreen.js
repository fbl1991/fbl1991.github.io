Zepto(function ($) {

    var fullScreenDom = $('.full-screen');

    /**
     * 单击全屏
     */
    fullScreenDom.on('click', function () {
        var docElm = document.documentElement;
        fun = docElm.requestFullscreen || docElm.msRequestFullscreen ||
            docElm.mozRequestFullScreen || docElm.webkitRequestFullScreen;
        fun.call(docElm);
        fullScreenDom.fadeOut(100);
    });

    /**
     * 退出恢复
     */

    function existFull() {
        fullScreenDom.fadeIn(100);
    }

    document.addEventListener("fullscreenchange", function () {
        (document.fullscreen)? '': existFull() ;}, false);

    document.addEventListener("mozfullscreenchange", function () {
        (document.mozFullScreen)?'': existFull();}, false);

    document.addEventListener("webkitfullscreenchange", function () {
        (document.webkitIsFullScreen)? '': existFull();}, false);
    document.addEventListener("msfullscreenchange", function () {
        (document.msFullscreenElement)? '': existFull();}, false);

});