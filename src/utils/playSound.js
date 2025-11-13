export const playSound=(file="/sound.mp3")=>{
    const audio =new Audio(file)

    audio.play();
}