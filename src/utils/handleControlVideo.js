export default function handleControlVideo(action) {
    const videoElement = document.querySelector('#video-container')
    const videoTag = document.querySelector('#video-container video')

    switch(action){
        case "PAUSE":
            videoElement.style.display = "none"
            videoTag.pause();
            break

        case "MUTE":
            videoTag.muted = true;
            break

        default:
            return
    }
}
