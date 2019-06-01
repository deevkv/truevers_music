(function() {

  var playButton = document.querySelector('.audio__button');
  var muteButton = document.querySelector('.audio__up');
  var audioWrapper = document.querySelector('.audio__wrapper');

  var seekSlider = document.querySelector('.audio__seek-slider');
  var volumeSlider = document.querySelector('.audio__volume-slider');

  var curTimeText = document.getElementById('curTimeText');
  var durTimeText = document.getElementById('durTimeText'); 

  var playList = document.querySelector('.playList');
  var infoNameTrack = document.getElementById('trackName');

  var audio =  new Audio('mp3/dsm.mp3');
  audio.loop = false;


  playButton.addEventListener('click', playSound);
  muteButton.addEventListener("click", mute);

  seekSlider.addEventListener('mousedown', function(event){ seeking = true; seek(event); });
  seekSlider.addEventListener('mousemove', function(event){ seek(event); });
  seekSlider.addEventListener('mouseup',function(){ seeking = false; });

  audio.addEventListener("ended", stopButton);

  volumeSlider.addEventListener("mousemove", setvolume);

  audio.addEventListener('timeupdate', function(){ seekTimeUpdate(); });

  playList.addEventListener("click", initAudio);



  function initAudio(event) {

    var showTrack = document.querySelector('.tracks-list__item--active');

    playButton.classList.add('button-pause')

    var dir = 'mp3/';
    var ext = '.mp3';

    var audio2 = new Audio();
    audio.src = dir+'dsm'+ext;
    

    var albums = [
      ['dsm', 'will', 'bitter', 'stars'], 
      ['robot', 'revolver', 'breaking_bad', 'war'], 
      ['matrix', 'second_birth', 'dead']
    ];  

    var infoLi = event.target.value;
    var infoTime = event.target.parentNode.value;
    var infoList = event.currentTarget.id;
    var albumNumber;

    if (infoList === 'albumWill') { albumNumber = 0 };
    if (infoList === 'albumDubs') { albumNumber = 1 };
    if (infoList === 'albumMatrix') { albumNumber = 2 };

    if (infoLi == parseInt(infoLi)) {changeTrackPlay(albums[albumNumber][infoLi]);}
    if (infoTime == parseInt(infoTime)) {changeTrackPlay(albums[albumNumber][infoTime]);}
  
    function changeTrackPlay(numTrack) {
      audio.src = dir+numTrack+ext;
      showNameTrack(numTrack);
      playSound(audio.src, );
    }
  }  


  function showNameTrack(trackName) {
    trackName = trackName[0].toUpperCase() + trackName.slice(1).replace('_', ' ');
    infoNameTrack.innerText = trackName;
  }


  function playSound(track, item){ 
    if(audio.paused == false) {
      audio.pause(track);

      playButton.classList.remove('button-pause');
      playButton.classList.add('button-play');
      
      audioWrapper.classList.add('audio__wrapper--closed');
      audioWrapper.classList.remove('audio__wrapper--opened');

    } else {
      audio.play(track);

      playButton.classList.remove('button-play');
      playButton.classList.add('button-pause');
 
      audioWrapper.classList.remove('audio__wrapper--closed');
      audioWrapper.classList.add('audio__wrapper--opened');
    }     
  };

  function mute() {

    if(audio.muted){
      audio.muted = false;
      muteButton.classList.remove('audio__mute');
      muteButton.classList.add('audio__up');

    } else {
      audio.muted = true;
     

      muteButton.classList.remove('audio__up');
      muteButton.classList.add('audio__mute');

    }
  }


  function seek(event){
   if(seeking){
        seekSlider.value = event.clientX - seekSlider.offsetLeft;
        seekto = audio.duration * (seekSlider.value / 120);
        audio.currentTime = seekto;
    }    
  }

  function setvolume(){
    audio.volume = volumeSlider.value / 100;
  }

function stopButton() {
    playButton.classList.remove('button-pause');
    playButton.classList.add('button-play');
}

function seekTimeUpdate(){
    var nt = audio.currentTime * (120 / audio.duration);
    seekSlider.value = nt;


    var curMins = Math.floor(audio.currentTime / 60);
    var curSecs = Math.floor(audio.currentTime - curMins * 60);
    var durMins = Math.floor(audio.duration / 60);
    var durSecs = Math.floor(audio.duration - durMins * 60);

    if(curSecs < 10){ curSecs = "0"+curSecs; }
    if(durSecs < 10){ durSecs = "0"+durSecs; }
    if(curMins < 10){ curMins = "0"+curMins; }
    if(durMins < 10){ durMins = "0"+durMins; }

    curTimeText.innerText = curMins+":"+curSecs
    if ( !isNaN(durMins) ) { durTimeText.innerText = durMins+":"+durSecs }
  }


})();



