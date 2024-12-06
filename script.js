const toggleVideoDesc = (ev)=>{
    const desc = document.getElementById('videoDesc');

    if(ev.detail.isPlaying){
        desc.classList.add('hide');
    }
    else{
        desc.classList.remove('hide')
    }
}

const toggleVideoDescMob = (ev)=>{
    const desc = document.getElementById('videoDescMob');

    if(ev.detail.isPlaying){
        desc.classList.add('hide');
    }
    else{
        desc.classList.remove('hide')
    }
}

const botVid = document.getElementById('botVid')

const mobVid = document.getElementById('mobBotVid')

botVid.addEventListener("videoPlayStateChanged",toggleVideoDesc)

mobVid.addEventListener("videoPlayStateChanged",toggleVideoDescMob)

const beforeUnload = ()=>{
    botVid.removeEventListener("videoPlayStateChanged", toggleVideoDesc);
    mobVid.removeEventListener("videoPlayStateChanged",toggleVideoDescMob)
    window.removeEventListener("beforeunload", beforeUnload);
}

window.addEventListener("beforeunload", beforeUnload);
