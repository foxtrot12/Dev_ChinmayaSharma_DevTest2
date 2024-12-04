const toggleVideoDesc = (ev)=>{
    const desc = document.getElementById('videoDesc');

    if(ev.detail.isPlaying){
        desc.classList.add('hide');
    }
    else{
        desc.classList.remove('hide')
    }
}

const botVid = document.getElementById('botVid')

botVid.addEventListener("videoPlayStateChanged",toggleVideoDesc)

const beforeUnload = ()=>{
    botVid.removeEventListener("videoPlayStateChanged", toggleVideoDesc);
    window.removeEventListener("beforeunload", beforeUnload);
}

window.addEventListener("beforeunload", beforeUnload);
