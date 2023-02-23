export default function handleVideoScale(width,height,y){
    const videoElement = document.querySelector('#video-container')
    const videoTag = document.querySelector('#video-container video')

    videoElement.style.display = 'flex'

    videoElement.style.width = `${width - width/28}px`
    videoElement.style.height = `${height - width/28}px`
    videoElement.style.top = `${y}px`

    videoTag.play()
}
