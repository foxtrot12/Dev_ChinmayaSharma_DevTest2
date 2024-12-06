const toggleVideoDesc = (ev) => {
  const desc = document.getElementById("videoDesc");

  if (ev.detail.isPlaying) {
    desc.classList.add("hide");
  } else {
    desc.classList.remove("hide");
  }
};

const toggleVideoDescMob = (ev) => {
  const desc = document.getElementById("videoDescMob");

  if (ev.detail.isPlaying) {
    desc.classList.add("hide");
  } else {
    desc.classList.remove("hide");
  }
};

const submitForm = () => {
  const contactUsForm = document.getElementById("contactUsForm");
  contactUsForm ? contactUsForm.submit() : null;
};

const botVid = document.getElementById("botVid");

const mobVid = document.getElementById("mobBotVid");

const contactusBtn = document.getElementById("contactusBtn");

botVid.addEventListener("videoPlayStateChanged", toggleVideoDesc);

mobVid.addEventListener("videoPlayStateChanged", toggleVideoDescMob);

contactusBtn.addEventListener("cta-click", submitForm);

const beforeUnload = () => {
  botVid.removeEventListener("videoPlayStateChanged", toggleVideoDesc);
  mobVid.removeEventListener("videoPlayStateChanged", toggleVideoDescMob);
  contactusBtn.removeEventListener("cta-click", submitForm);
  window.removeEventListener("beforeunload", beforeUnload);
};

window.addEventListener("beforeunload", beforeUnload);
