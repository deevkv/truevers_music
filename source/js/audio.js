(function() {

  var playButton = document.querySelector('.audio__button');
  var muteButton = document.querySelector('.audio__up');
  var audioWrapper = document.querySelector('.audio__wrapper');

  var seekSlider = document.querySelector('.audio__seek-slider');
  var volumeSlider = document.querySelector('.audio__volume-slider');

  var curTimeText = document.getElementById("curTimeText");
  var durTimeText = document.getElementById("durTimeText"); 


  var seeking = false;
  var seekto;

  var audio =  new Audio('mp3/dsm.mp3');
  audio.loop = false;



  playButton.addEventListener('click', playSound);
  muteButton.addEventListener("click", mute);

  seekSlider.addEventListener("mousedown", function(event){ seeking = true; seek(event); });
  seekSlider.addEventListener("mousemove", function(event){ seek(event); });
  seekSlider.addEventListener("mouseup",function(){ seeking = false; });

  audio.addEventListener("ended", stopButton);

  volumeSlider.addEventListener("mousemove", setvolume);

  audio.addEventListener("timeupdate", function(){ seekTimeUpdate(); });

    

  function playSound(){ 
    if(audio.paused == false) {
      audio.pause();

      playButton.classList.remove('button-pause');
      playButton.classList.add('button-play');

      audioWrapper.classList.remove('audio__wrapper--opened');

    } else {
      audio.play();

      playButton.classList.remove('button-play');
      playButton.classList.add('button-pause');

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

    curTimeText.innerText = curMins+":"+curSecs;
    durTimeText.innerText = durMins+":"+durSecs;
  }


})();



