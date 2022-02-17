const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('video');
    const sounds = document.querySelectorAll('.sound-picker button');
    const timeDisplay = document.querySelector('.time-display');
    const outlineLength = outline.getTotalLength();
    const timeSelect = document.querySelectorAll('.time-select button');
   
    
    sounds.forEach(option => {
        option.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            playChecker(song);
            console.log(video.src)
        })
    })
   
   
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    play.addEventListener('click', () => {
        playChecker(song);})


        timeSelect.forEach(option => {
            option.addEventListener('click', function(){
                fakeDuration = this.getAttribute('data-times');
                timeDisplay.textContent = `${correctionTime(Math.floor(fakeDuration/60))}:${correctionTime(Math.floor(fakeDuration % 60))}`;
                song.currentTime = 0;

            })
        })

    const playChecker = song => {
        if(song.paused){
            video.play();
            song.play();
            play.src = './assets/svg/pause.svg'
        }else{
            video.pause();
            song.pause();
            play.src = './assets/svg/play.svg'
        }
    };
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    correctionTime = (time) => time < 10 ? `0${time}` : time;
    timeDisplay.textContent = `${correctionTime(minutes)}:${correctionTime(seconds)}`;

    if(elapsed <= 0) {
    song.pause();
    video.pause();
    song.currentTime = 0;
    play.src = './assets/svg/play.svg'
}

}

    
 }
 
app();