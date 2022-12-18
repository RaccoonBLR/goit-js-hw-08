import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('#vimeo-player');

const vimeoPlayer = new Player(iframeRef);

vimeoPlayer.on('timeupdate', throttle(onPlay, 1000, { leading: false }));

currentTimeChecker();

function onPlay(event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
}

function currentTimeChecker() {
  if (getCurrentTime()) {
    vimeoPlayer.setCurrentTime(getCurrentTime());
  }
}

function getCurrentTime() {
  return localStorage.getItem('videoplayer-current-time');
}
