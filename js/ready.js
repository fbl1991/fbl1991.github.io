/**
 * 一些初始化的工作
 */
Zepto(function($){
    $('.swiper-container').css({
        'height' : window.screen.height,
        'width' : window.screen.width
    });
    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {

        onInit : function (swiper) {
            console.log('init');
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            console.log('change');
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        },
        // Optional parameters
        direction: 'vertical',
        loop: false,

        observer: true,
        // And if we need scrollbar
        scrollbar: '.swiper-scrollbar'
    });
})