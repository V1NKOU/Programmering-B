var videoButton1, videoButton2, arkVideo1, arkVideo2
var videoPlaying = true

function setup(){
    console.log('P5 setup kaldt inshallah')

    arkVideo1 = select('#arkVideo1')
    //Video control button
      videoButton1 = select('#videoButton1')
        videoButton1.mousePressed(()=>{
            console.log('button pressed')
            if(videoPlaying){
                arkVideo1.pause()
                videoPlaying = false
            }else{
                arkVideo1.play()
                videoPlaying = true
        }
    })
    arkVideo2 = select('#arkVideo2')
    //Video control button
      videoButton2 = select('#videoButton2')
        videoButton2.mousePressed(()=>{
            console.log('button pressed')
            if(videoPlaying){
                arkVideo2.pause()
                videoPlaying = false
            }else{
                arkVideo2.play()
                videoPlaying = true
        }
    })
}