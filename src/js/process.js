(function ($, root) {
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPer = 0;
    var startTime;
    function formatTime(time) {
        var time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    function renderAllTime(time) {
        lastPer = 0;
        curDuration = time;
        var time = formatTime(time);
        $scope.find('.all-time').html(time);
    }
    function updata(per) {
        var time = formatTime(per * curDuration);
        $scope.find('.cur-time').html(time);
        var perX = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            'transform': 'translateX(' + perX + ')'
        })
    }
    function start(per) {
        cancelAnimationFrame(frameId);
        lastPer = per == undefined ? lastPer : per;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var precent = lastPer + (curTime - startTime) / (curDuration * 1000);
            updata(precent);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        updata: updata,
        formatTime: formatTime
    }

})(window.Zepto, window.player || (window.player = {}))