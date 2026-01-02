import Navigation from "./src/ui/Navigation/Navigation.js";

import { mount } from "../../core/vjs-dom-ui.js";

mount(document.querySelector(".header-nav_container"), Navigation());

const video                         = document.getElementById("video");
const videoPlayer                   = document.querySelector(".video-player");
const videoPlayerPlayButton         = document.getElementById("video-player_play-button");
const videoPlayerPauseButton        = document.getElementById("video-player_pause-button");
const videoPlayerFullscreenButton   = document.getElementById("video-player_fullscreen-button");
const videoPlayerUnfullScreenButton = document.getElementById("video-player_unfullscreen-button");
const videoPlayerVolumeButton       = document.getElementById("video-player_volume-button");
const videoPlayerMuteButton         = document.getElementById("video-player_mute-button");
const videoPlayerTimeLine           = document.querySelector(".video-player_time-container");

const time = formatTime(video.duration);

document.getElementById("video-player_controlls-ftime-hour").textContent = time.h;
document.getElementById("video-player_controlls-ftime-min").textContent = time.m;
document.getElementById("video-player_controlls-ftime-sec").textContent = time.s;

function hiddeElement(element) {
  element.style.display = "none";
};

function showElement(element) {
  element.style.display = "flex";
}

function formatTime(time) {
  const date = new Date(time * 1000);

  return {
    h: formatNumber(date.getHours() - 1),
    m: formatNumber(date.getMinutes()),
    s: formatNumber(date.getSeconds())
  };
};

function formatNumber(number) {
  if(number <= 9) return `0${number}`;
  return number
}

function volumeHandler() {
  if(video.muted) {
    video.muted = false;

    hiddeElement(videoPlayerMuteButton);
    showElement(videoPlayerVolumeButton);
  } else {
    video.muted = true;

    hiddeElement(videoPlayerVolumeButton);
    showElement(videoPlayerMuteButton);
  }
}

async function fullScreenHandler() {
  if(document.fullscreenElement) {
    await document.exitFullscreen();
  
    hiddeElement(videoPlayerUnfullScreenButton);
    showElement(videoPlayerFullscreenButton);
  } else {
    await videoPlayer.requestFullscreen();
    
    hiddeElement(videoPlayerFullscreenButton);
    showElement(videoPlayerUnfullScreenButton);
  }
}

function movieStateHandler(event) {
  event.stopPropagation();

  if((event.target === video ||
     event.target === videoPlayerPlayButton ||
     event.target === videoPlayerPauseButton) &&
     event.target !== videoPlayerTimeLine
  ) {
    if(video.paused) {
      video.play();
     
      hiddeElement(videoPlayerPlayButton);
      showElement(videoPlayerPauseButton);
    } else {
      video.pause();
  
      hiddeElement(videoPlayerPauseButton);
      showElement(videoPlayerPlayButton);
    }
  }  
}

function updateMovieTime() {
  const time = formatTime(video.currentTime);
  
  let progress = 0;

  document.getElementById("video-player_controlls-ctime-hour").textContent = time.h;
  document.getElementById("video-player_controlls-ctime-min").textContent = time.m;
  document.getElementById("video-player_controlls-ctime-sec").textContent = time.s;
  
  progress = (video.currentTime / video.duration);
  document.querySelector(".video-player_time-front").style.width = `${progress * 100}%`
}

function setTimeLineTime(event) {
  const timeLineRect = videoPlayerTimeLine.getBoundingClientRect();
  const progress = calcProgress(event.pageX, timeLineRect);
  const currentTime = calcCurrentTime(progress);

  video.currentTime = currentTime;
  document.querySelector(".video-player_time-front").style.width = `${progress * 100}%`
}

function cleanUpTimeLineEvents() {
  videoPlayerTimeLine.removeEventListener("mousemove", setTimeLineTime);
}

function leaveFromTimeLine(event) {
  const timeLineRect = videoPlayerTimeLine.getBoundingClientRect();
  const progress = calcProgress(event.pageX, timeLineRect);

  if(progress === 0 || progress === 1) {
    const currentTime = calcCurrentTime(progress);
  
    video.currentTime = currentTime;
    document.querySelector(".video-player_time-front").style.width = `${progress * 100}%`
  }
}

function clamp(min, max, value) {
  if(value < min) return min;
  if(value > max) return max;
  return value;
}

function calcProgress(mouseX, inputRect) {
  return clamp(0, inputRect.width, mouseX - ~~inputRect.left) / inputRect.width;
}

function calcCurrentTime(progress) {
  return ~~clamp(0, video.duration, progress * video.duration);
}

video.addEventListener("timeupdate", updateMovieTime);

videoPlayerTimeLine.addEventListener("click", setTimeLineTime);
videoPlayerTimeLine.addEventListener("mouseup", cleanUpTimeLineEvents);
videoPlayerTimeLine.addEventListener("mouseleave", cleanUpTimeLineEvents);
videoPlayerTimeLine.addEventListener("mouseleave", leaveFromTimeLine);

videoPlayerTimeLine.addEventListener("mousedown", function() {
  videoPlayerTimeLine.addEventListener("mousemove", setTimeLineTime);
});

videoPlayerFullscreenButton.addEventListener("click", fullScreenHandler);
videoPlayerUnfullScreenButton.addEventListener("click", fullScreenHandler);

videoPlayer.addEventListener("click", movieStateHandler);
videoPlayerPlayButton.addEventListener("click", movieStateHandler);
videoPlayerPauseButton.addEventListener("click", movieStateHandler);

videoPlayerMuteButton.addEventListener("click", volumeHandler);
videoPlayerVolumeButton.addEventListener("click", volumeHandler);