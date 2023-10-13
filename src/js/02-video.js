import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframe);

function saveCurrentTimeToLocalStorage(time) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
}

function getCurrentTimeFromLocalStorage() {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  return currentTime ? JSON.parse(currentTime) : 0;
}

const updateLocalStorageTime = throttle(time => {
  saveCurrentTimeToLocalStorage(time);
}, 1000);

player.setCurrentTime(getCurrentTimeFromLocalStorage()).then(function (time) {
  console.log('Timpul de redare inițial:', time);
});

player.on('timeupdate', function (data) {
  updateLocalStorageTime(data.seconds);
});

player.on('play', function () {
  console.log('Videoclipul a început să ruleze.');
});