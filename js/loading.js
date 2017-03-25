var loading = (function(){
    var
        loadingDiv,
        loadingClass;

    /**
     * 增加loading标签
     */
    function addLoading() {
        var windowHeight = document.documentElement.clientHeight,
            windowWidth = document.documentElement.clientWidth,
            top = windowHeight/2,
            left = windowWidth/2;

        document.write(loadingDiv);

        var loading = document.getElementsByClassName(loadingClass)[0];
        loading.style.position = 'absolute';

        loading.style.top = top + 'px';
        loading.style.left = left + 'px';

    }

    /**
     * 隐藏loading
     */
    function hideWhenload() {
        window.onload = function () {
            var loading = document.getElementsByClassName(loadingClass)[0];
            loading.parentNode.removeChild(loading);
        }
    }
    /**
     * 初始化loading
     * @param $loadingClass
     */
    function init($loadingDiv) {
        loadingDiv = $loadingDiv;
        loadingClass = 'loader';
        addLoading();
        hideWhenload();
    }
    return {
        init: init
    }
}());