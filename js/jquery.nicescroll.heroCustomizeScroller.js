;(function ($) {
    'use strict';

    var defaultOptions = {
        niceScrollOpts: {  // niceScroll options
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
        scrollTarget: '.scroll_area',  // scroll area selector
        mode: 'horizontal'  // 'vertical', 'horizontal'
    };

    $.fn.customizeScroller = function (options) {

        if (this.length === 0) {
            return this;
        }

        // support multiple element.
        if (this.length > 1) {
            this.each(function () {
                $(this).customizeScroller(options);
            });
            return this;
        }

        var s = {};
        var el = this;


        var init = function () {
            s.opts = $.extend({}, defaultOptions, options);

            s.$target = $(s.opts.scrollTarget);
            $(s.opts.scrollTarget).niceScroll(s.opts.niceScrollOpts);

            el.html('<div class="scroller_realbox"><div class="scroller_pointer"></div></div>');

            s.$realbox = $('.scroller_realbox');
            s.$pointer = $('.scroller_pointer');

            if (s.opts.mode === 'horizontal') {
                s.targetScrollMax = s.$target.getNiceScroll(0).getContentSize().w - s.$target.width();
                s.startRange = s.$realbox.offset().left;
                s.endRange = s.startRange + s.$realbox.width();
                s.realboxLength = s.$realbox.width();
                s.pointerLength = s.$pointer.width();
                s.pointerHalfLength = s.pointerLength / 2;
            } else {
                s.targetScrollMax = s.$target.getNiceScroll(0).getContentSize().h - s.$target.height();
                console.log(s.$target.getNiceScroll(0).getContentSize().h);
                console.log(s.$target.height());
                s.startRange = s.$realbox.offset().top;
                s.endRange = s.startRange + s.$realbox.height();
                s.realboxLength = s.$realbox.height();
                s.pointerLength = s.$pointer.height();
                s.pointerHalfLength = s.pointerLength / 2;
            }

            s.pagePos = 0;
            s.doScrolling = true;
            s.doMouseUp = false;

            initEvent();
        };

        var initEvent = function () {
            pointerEvent();
            targetScroll();
            documentMouseUp();
        };

        var pointerEvent = function () {
            s.$pointer.on({
                mousedown: function () {
                    pointerMouseDown();
                }
            });
        };

        var pointerMouseDown = function () {
            s.doScrolling = true;
            s.doMouseUp = true;

            documentMouseMove();
        };

        var documentMouseMove = function () {
            $(document).on({
                mousemove: function (event) {
                    if (s.doScrolling) {
                        s.pagePos = s.opts.mode === 'horizontal' ? event.pageX : event.pageY;

                        setPointer();
                        event.preventDefault();
                    }
                }
            });
        };

        var documentMouseUp = function () {
            $(document).on({
                mouseup: function () {
                    s.doScrolling = false;

                    if (s.doMouseUp) {
                        setPointer();
                        s.doMouseUp = false;
                    }
                }
            });
        };

        var setPointer = function () {
            var result = null;
            var pointerPos = null;

            if (s.pagePos >= s.startRange && s.pagePos <= s.endRange) {

                pointerPos = s.pagePos - s.pointerHalfLength;
                result = s.opts.mode === 'horizontal' ? { left: pointerPos } : { top: pointerPos };
                s.$pointer.offset(result);
                setScrollBar();

            } else if (s.pagePos < s.startRange) {

                result = s.opts.mode === 'horizontal' ? { left: 0 } : { top: 0 };
                s.$pointer.css(result);
                setScrollBar();

            } else if (s.pagePos > s.endRange) {

                result = s.opts.mode === 'horizontal' ? { left: s.realboxLength } : { top: s.realboxLength };
                s.$pointer.css(result);
                setScrollBar();

            }
        };

        var setScrollBar = function () {
            var direction = s.opts.mode === 'horizontal' ? 'left' : 'top';

            s.scrollBarPosPercent = parseInt(s.$pointer.css(direction)) * 100 / s.realboxLength;
            s.scrollAreaScrollPos = s.targetScrollMax / 100 * s.scrollBarPosPercent;

            if (s.opts.mode === 'horizontal') {
                s.$target.getNiceScroll(0).doScrollLeft(s.scrollAreaScrollPos, 0);
            } else {
                s.$target.getNiceScroll(0).doScrollTop(s.scrollAreaScrollPos, 0);
            }
        };

        var targetScroll = function () {
            s.$target.on({
                scroll: getTargetInfo
            });
        };

        var getTargetInfo = function () {
            s.currentScrollPos = s.opts.mode === 'horizontal' ? s.$target.getNiceScroll(0).newscrollx : s.$target.getNiceScroll(0).newscrolly;
            s.scrollAreaPosPercent = s.currentScrollPos * 100 / s.targetScrollMax;
            s.scrollBarScrollPos = s.realboxLength / 100 * s.scrollAreaPosPercent;

            var result = s.opts.mode === 'horizontal' ? { left: s.scrollBarScrollPos } : { top: s.scrollBarScrollPos };

            s.$pointer.css(result);
        };

        $(window).load(init);
        return this;
    }

})(jQuery);