/**
 * X-MEN TTRPG - Music Player
 * X-Men 97 Theme auto-play on first login with mute toggle
 */

const MUSIC_KEY = 'xmen_music_played';
const MUTE_KEY = 'xmen_music_muted';

const XMEN97_THEME = '/assets/audio/xmen97-theme.mp3'; // Host locally for reliability

let musicPlayer = null;
let musicMuted = false;

function initMusicPlayer() {
  if (!window.getCurrentUser) return;
  
  var hasPlayed = localStorage.getItem(MUSIC_KEY);
  musicMuted = localStorage.getItem(MUTE_KEY) === 'true';
  
  if (!hasPlayed) {
    playTheme().then(function(success) {
      if (success) {
        localStorage.setItem(MUSIC_KEY, 'true');
      }
    });
  }
  
  renderMusicButton();
}

function playTheme() {
  if (musicMuted || musicPlayer) return Promise.resolve(false);
  
  musicPlayer = new Audio(XMEN97_THEME);
  musicPlayer.loop = true;
  musicPlayer.volume = 0.3;
  return musicPlayer.play()
    .then(function() {
      return true;
    })
    .catch(function(e) {
      console.log('Autoplay blocked, user must click to play');
      return false;
    });
}

function toggleMusic() {
  musicMuted = !musicMuted;
  localStorage.setItem(MUTE_KEY, musicMuted ? 'true' : 'false');
  
  if (musicMuted) {
    if (musicPlayer) {
      musicPlayer.pause();
    }
  } else {
    if (!musicPlayer) {
      playTheme().catch(function(e) {
        console.warn('Playback failed:', e.message);
      });
    } else {
      musicPlayer.play().catch(function(e) {
        console.warn('Playback failed:', e.message);
      });
    }
  }
  
  renderMusicButton();
}

function renderMusicButton() {
  var existing = document.getElementById('music-toggle-btn');
  if (existing) existing.remove();
  
  var btn = document.createElement('button');
  btn.id = 'music-toggle-btn';
  btn.className = 'music-toggle-btn' + (musicMuted ? ' muted' : '');
  btn.innerHTML = musicMuted 
    ? '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
    : '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
  btn.title = musicMuted ? 'Ativar música' : 'Desativar música';
  btn.onclick = toggleMusic;
  
  document.body.appendChild(btn);
}

window.initMusicPlayer = initMusicPlayer;
window.toggleMusic = toggleMusic;