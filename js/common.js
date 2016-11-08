$(function () {

    var $realbox = $('.scroller_realbox');
    var $pointer = $('.scroller_pointer');

    var startRange = $realbox.offset().left;
    var endRange = startRange + $realbox.width();
    var posX = 0;
    var scrolling = true;
    var mouseup = false;

    function setScroll() {
        var scrollBoxPercent = parseInt($pointer.css('left')) * 100 / 500;
        var scrollAreaPosition = 14.03 * scrollBoxPercent;

        $('.scroll_area').getNiceScroll(0).doScrollLeft(scrollAreaPosition, 0);
    }

    function getScroll() {
        var scrollX = $('.scroll_area').getNiceScroll(0).newscrollx;
        var scrollAreaPercent = scrollX * 100 / 1403;
        var scrollBoxPosition = 5 * scrollAreaPercent;

        $pointer.css({ left: scrollBoxPosition });
    }

    $pointer.on({
        mousedown: function () {
            scrolling = true;
            mouseup = true;

            $(document).on({
                mousemove: function (event) {
                    if (scrolling) {
                        posX = event.pageX;
                        console.log(posX);

                        if (posX >= startRange && posX <= endRange) {
                            $pointer.offset({ left: posX - 50 });
                            setScroll();
                        } else if (posX < startRange) {
                            $pointer.css({ left: 0 });
                            setScroll();
                        } else if (posX > endRange) {
                            $pointer.css({ left: $realbox.width() });
                            setScroll();
                        }
                        event.preventDefault();
                    }
                }
            });
        }
    });

    $(document).on({
        mouseup: function () {
            scrolling = false;

            if (mouseup) {
                if (posX >= startRange && posX <= endRange) {
                    $pointer.offset({left: posX - 50});
                    setScroll();
                }
                if (posX < startRange) {
                    $pointer.css({left: 0});
                    setScroll();
                }
                if (posX > endRange) {
                    $pointer.css({left: $realbox.width()});
                    setScroll();
                }
                mouseup = false;
            }
        }

    });

    $('.scroll_area').on({
        scroll: getScroll
    });

});