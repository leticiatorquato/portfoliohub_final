const songName= document.getElementById("song-name");
const bandName= document.getElementById("band-name");
const song= document.getElementById("audio");
const cover= document.getElementById("cover");
const play= document.getElementById("play");
const next= document.getElementById("next");
const previous= document.getElementById("previous");
const currentProgress= document.getElementById("current-progress");

const BaratoTotal= {
    songName: "Barato Total",
    artist: "Gal Costa",
    file: "barato-total"
};
const CorreCorre= {
    songName: "Corre-corre",
    artist: "Rita Lee",
    file: "corre-corre"
};
const HomemComH= {
    songName: "Homem Com H",
    artist: "Ney Matogrosso",
    file: "homem-com-h"
};
let isPlaying= false;
const playlist=[BaratoTotal, CorreCorre, HomemComH];
let index= 0;

function playSong(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill")
    play.querySelector(".bi").classList.add("bi-pause-circle-fill")
    song.play();
    isPlaying= true;
}

function pauseSong(){
    play.querySelector(".bi").classList.add("bi-play-circle-fill")
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill")
    song.pause();
    isPlaying= false;
}

function playPauseDecider(){
    if(isPlaying===true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function initializeSong(){
    cover.src= `imagens/${playlist[index].file}.jpeg`;
    song.src= `songs/${playlist[index].file}.mp3`;
    songName.innerText= playlist[index].songName;
    bandName.innerText= playlist[index].artist;
}

function previousSong(){
    if(index===0){
        index= playlist.length-1;
    }
    else{
        index-=1;
    }
    initializeSong();
    playSong();

}

function nextSong(){
    if(index=== playlist.length-1){
        index= 0;
    }
    else{
        index+=1;
    }
    initializeSong();
    playSong();

}

function updateProgressBar(){
    const barWidth= (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}



initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);