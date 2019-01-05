var root = window.player;
var $ = window.Zepto;
var dataList;
var len;
var audio = root.audioManager;
var control = root.controIndex;
var timer = null;
var $scope = $(document.body);
function getData(url) {
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            len = data.length;
            control = new control(len);
            dataList = data;
            root.render(dataList[0]);
            root.pro.renderAllTime(dataList[0].duration);
            audio.getAudio(dataList[0].audio);
            bindTouch();
            bindEvent();
        },
        error: function () {
            console.log('error');
        }
    })
}

function bindEvent() {
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration);
        if (audio.status == 'play') {
            rotated(0);
            audio.play();
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
    })
    $('.prev').on('click', function () {
        var i = control.prev();
        $('body').trigger('play:change', i);
        if (audio.status == 'play') {
            root.pro.start(0);
        } else {
            root.pro.updata(0);
        }
    })
    $('.next').on('click', function () {
        var i = control.next();
        $('body').trigger('play:change', i);
        if (audio.status == 'play') {
            root.pro.start(0);
        } else {
            root.pro.updata(0);
        }
    })
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })
}
function bindTouch() {
    var $slider = $scope.find('.slider');
    var offset = $scope.find(".pro-bottom").offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if (percent > 1 || percent < 0) {
            percent = 0;
        }
        root.pro.updata(percent);
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if (percent > 1 || percent < 0) {
            percent = 0;
        }
        var curDuration = dataList[control.index].duration;
        var curTime = curDuration * percent;
        audio.jumpToplay(curTime);
        $scope.find(".play").addClass("playing");
        root.pro.start(percent);
    })
}
function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 1s ease-out'
        })
    }, 200);
}
getData('../mock/data.json');