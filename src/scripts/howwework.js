(function(){

let video;
let durationControl;
let soundControl;
let intervalId;
    video = document.getElementById("video");
let play = document.getElementById("play");
let playGray = document.getElementById("play-gray");
let pause = document.getElementById("pause");

video.addEventListener('click', playStop);
play.addEventListener('click', playStop);
playGray.addEventListener('click', playStop);
pause.addEventListener('click', playStop);

let micControl = document.getElementById('sound');
micControl.addEventListener('click', soundOf);

durationControl = document.getElementById('regulator__line');
durationControl.addEventListener('mousedown', stopInterval);

durationControl.addEventListener('mouseup', setVideoDuration);

durationControl.min = 0;
durationControl.value = 0;

soundControl = document.getElementById('volume__line');
soundControl.addEventListener('mouseup', changeSoundVolume);

soundControl.min = 0;
soundControl.max = 10;

soundControl.value = soundControl.max;


video.addEventListener('ended', function () {
    $(play).toggleClass("play--active");
    video.currentTime = 0;
}, false);

function playStop() {
    $(play).toggleClass("play--active");
    $(playGray).toggleClass("play-gray--active");
    $(pause).toggleClass("pause--active");
    durationControl.max = video.duration;
    
    if(video.paused) {
        video.play();
        intervalId = setInterval(updateDuration, 1000/66)
    } else {
        video.pause();
        clearInterval(intervalId);
    }
}

function stopInterval () {
    video.pause();
    clearInterval(intervalId);
}

function setVideoDuration (){
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration, 1000/66);
    
    if (video.paused) {
        video.play();
        document.getElementsByClassName("play")[0].classList.add("play--active");
    } else {
        video.pause();
    }
}

function updateDuration() {
    durationControl.value = video.currentTime;
}

function soundOf () {
    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}

function changeSoundVolume () {
    video.volume = soundControl.value/10;
}

})()