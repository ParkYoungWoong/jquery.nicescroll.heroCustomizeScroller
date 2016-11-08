$(window).load(function () {

    $('.scroll_area').niceScroll({
        cursorcolor: "none",
        cursorwidth: 10,
        scrollspeed: 60,
        cursorborderradius: 0,
        mousescrollstep: 40,
        background: "none",
        cursorborder: "none",
        autohidemode: true,
        boxzoom: false,
        zindex: 990
    });

    $('.scroll_box').customizeScroller({
        mode: 'vertical',
        scrollTarget: '.scroll_area'
    });

});