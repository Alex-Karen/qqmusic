(function ($, root) {
    function AudioManager() {
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToplay: function (time) {
            this.audio.currentTime = time;
            this.audio.play();
        }
    }
    root.audioManager = new AudioManager();
})(window.Zepto, window.player || (window.player = {}))