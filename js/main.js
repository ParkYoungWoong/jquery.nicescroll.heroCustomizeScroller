// READY
$(function () {
    var herop = new Herop();
    $(window).load(function () {
        herop.setSectionOffset();
    });
});
// NEW
var Herop = function () {
    this._init();
    this._initEvent();
};
// INIT
Herop.prototype._init = function () {
    this._lockScroll = false;
    this.throttleDuration = 400;
    this.$scrollBody = $('.scroll_area');
    this.secPos = [0];
};
// INIT EVENT
Herop.prototype._initEvent = function () {
    this._throttleScroll();
    this.scroll();
    this.plugins();
};
// PLUGINS
Herop.prototype.plugins = function () {
    this.niceScroll();
    // this.bxSlider();
    // this.tweenAnimation();
};

Herop.prototype._throttleScroll = function () {
    var that = this;
    setInterval(function () {
        if (that._lockScroll) {
            that._lockScroll = false;
            that.scrollEvent();
        }
    }, that.throttleDuration);
};

Herop.prototype.scroll = function () {
    var that = this;
    that.$scrollBody.on('scroll', function () {
        that._lockScroll = true;
    });
};

Herop.prototype.scrollEvent = function () {
    // Command..
};

Herop.prototype.setSectionOffset = function () {
    this.secPos = [
        $('#sec1').offset.top
        , $('#sec2').offset.top
        , $('#sec3').offset.top
        , $('#sec4').offset.top
        , $('#sec5').offset.top
    ];
};

Herop.prototype.niceScroll = function () {
    // Options: https://github.com/inuyaksa/jquery.nicescroll
    this.$scrollBody.niceScroll({
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
};

Herop.prototype.bxSlider = function () {
    // Options: http://bxslider.com/options
    $('#selector').bxSlider({
        mode: 'horizontal', // 슬라이드 종류
        speed: 500, // 슬라이드 속도
        slideMargin: 0, // 슬라이드 사이 여백
        startSlide: 0, // 슬라이드 시작 번호
        randomStart: false, // 랜덤 슬라이드 시작 번호
        easing: null, // 슬라이드 'easing' 타입
        captions: false, // 이미지에 타이틀(캡션) 포함 여부
        responsive: true, // 반응형 슬라이드 유무
        preloadImages: 'all', // 보이는 이미지만 로드 or 미리 로드 설정
        pager: true, // 페이지 번호
        pagerSelector: '', // 페이지 번호 선택자
        controls: true, // 이전/다음
        prevText: 'Prev', // 이전 버튼 텍스트
        nextText: 'Next', // 다음 버튼 텍스트
        prevSelector: null, // 이전 버튼 선택자
        nextSelector: null, // 다음 버튼 선택자
        autoControls: false, // 시작/정지
        startText: 'Start', // 시작 버튼 텍스트
        stopText: 'Stop', // 정지 버튼 텍스트
        autoControlsCombine: false, // 시작/정지 토글
        autoControlsSelector: null, // 시작/정지 선택자
        auto: true, // 자동 슬라이드
        pause: 4000, // 자동 슬라이드 시간
        autoStart: true, // 자동 슬라이드 최소 실행 유무
        autoDirection: 'next', // 자동 슬라이드 방향
        autoHover: false, // 마우스 오버 자동 슬라이드 정지
        autoDelay: 0, // 자동 슬라이드 전 대기시간
        minSlides: 1, // 최소 슬라이드 갯수
        maxSlides: 1, // 최대 슬라이드 갯수
        moveSlides: 0, // 한번에 움직일 슬라이드의 갯수
        slideWidth: 0, // 슬라이드 가로 너비
        onSliderLoad: function(currentIndex){}, // 슬라이드 준비되면
        onSlideBefore: function($slideElement, oldIndex, newIndex){}, // 슬라이드 전환 직전
        onSlideAfter: function($slideElement, oldIndex, newIndex){} // 슬라이드 전환 직후
    });
};

Herop.prototype.tweenAnimation = function () {
    (function () { var $obj = $('.selector');
        TweenMax.to( $obj, 2, { marginTop:20, yoyo:true, repeat:-1, ease:Power1.easeInOut });})();
};