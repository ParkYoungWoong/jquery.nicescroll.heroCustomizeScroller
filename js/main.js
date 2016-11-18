$(window).load(function () {

    var scroll = $('.scroll_box').customizeScroller({
        niceScrollOpts: {
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
        },
        scrollTarget: '.scroll_area',
        mode: 'horizontal',
        btnClickDistance: 7
    });

    $('.prev').on({ click: scroll.prevScroll });
    $('.next').on({ click: scroll.nextScroll });

});