window.onload = () => {
  let loader = document.querySelector("body");

  /* 5 Seconds Time Out */
  setTimeout(() => {
    window.scrollTo(0, 0);
    loader.classList.add("loaded");
  }, 5000);

  // GUEST NAME
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var guestBox = document.querySelector("#guest");
  var nameBox = document.querySelector("#name");
  var guest = urlParams.get("guest");
  if (guest != null) {
    guestBox.innerText = guest;
    nameBox.value = guest;
  }

  /* Open Button */
  document.getElementById("open").addEventListener("click", () => {
    window.scrollTo(0, 0);
    let landing = document.getElementById("landing");
    let card = document.querySelector(".card-letter");
    loader.classList.add("open");
    card.style.opacity = "0";
    setTimeout(() => {
      landing.style.opacity = "0";
    }, 500);
    setTimeout(() => {
      landing.remove();
    }, 1000);
    playAudio();

    /* Navigation */
    let height = document.body.clientHeight;
    height = height - height / 10;
    let navTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "200 top",
        end: `bottom-=100px bottom`,
        toggleClass: { targets: "#navigation", className: "show" },
      },
    });

    /* Scroll To */
    let timesection = [];
    let navItems = document.querySelectorAll("#navigation>ul>li");
    navItems.forEach((item, index) => {
      let target = item.getAttribute("data-target");
      item.addEventListener("click", scroll);

      // Navigation Active Toggle
      timesection[index] = gsap.timeline({
        scrollTrigger: {
          trigger: "#" + target,
          start: "top center",
          endTrigger: "#" + target,
          end: "bottom center",
          toggleClass: { targets: item, className: "active" },
        },
      });
    });
    document
      .querySelector(".icon.arrow-down")
      .addEventListener("click", scroll);
    function scroll() {
      let target = this.getAttribute("data-target");
      gsap.to(window, 1, { scrollTo: "#" + target, ease: "power2.inOut" });
    }

    /* ANIMATION */
    let items = [
      { trigger: document.querySelector("#bride"), x: -200, y: 0 },
      { trigger: document.querySelector("#groom"), x: 200, y: 0 },
      { trigger: document.querySelector(".card-akad"), x: -200, y: 0 },
      { trigger: document.querySelector(".card-resepsi"), x: 200, y: 0 },
      { trigger: document.querySelectorAll(".event-details>div")[0] },
      { trigger: document.querySelectorAll(".event-details>div")[1] },
      { trigger: document.querySelectorAll(".event-details>div")[2] },
      { trigger: document.querySelectorAll(".event-details>div")[3] },
      { trigger: document.querySelectorAll(".event-details>div")[4] },
      { trigger: document.querySelectorAll(".event-details>div")[5] },
      { trigger: document.querySelector(".card-kutipan"), x: 0, y: 100 },
      { trigger: document.querySelector(".gift-container"), x: 0, y: 100 },
      { trigger: document.querySelector(".wish-container"), x: 0, y: 100 },
    ];
    items.forEach((item) => {
      timeline(item.trigger, item.x, item.y, item.opacity);
    });
    var animationTimeline = [];
    function timeline(t, xX = 0, yY = 0, oP = true) {
      animationTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: t,
            start: "top 80%",
          },
        })
        .fromTo(
          t,
          1,
          { x: xX, y: yY, opacity: (oP = true ? 0 : 1) },
          { x: 0, y: 0, opacity: 1 }
        );
    }
  });

  /* MODAL BOX */

  // let box = document.querySelector(".gift-box");
  // let modal = document.getElementById("modal");
  // box.addEventListener("click", function () {
  //   modal.classList.toggle("show");
  //   loader.classList.toggle("modal-on");
  //   gsap.from(".card-modal", { opacity: 0, y: -50, duration: 0.5 });
  // });
  // let closeBox = document.querySelector("#close-box");
  // closeBox.addEventListener("click", function () {
  //   modal.classList.toggle("show");
  //   loader.classList.toggle("modal-on");
  // });

  /* COUNTDOWN */
  let dDay = new Date("March 20, 2022 08:00:00").getTime();
  setInterval(function () {
    let now = new Date().getTime();
    let distance = dDay - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector(".days>.number").innerText = days;
    document.querySelector(".hours>.number").innerText = hours;
    document.querySelector(".mins>.number").innerText = minutes;
    document.querySelector(".secs>.number").innerText = seconds;
  }, 1000);

  /* AUDIO CONTROL */
  let audio = document.getElementById("audio");
  let aBtn = document.getElementById("audio-btn");
  let aIcon = document.getElementById("audio-icon");
  audio.addEventListener("click", playAudio);
  function playOnHold() {
    if (document.hidden) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  function playAudio() {
    audio.play();
    aBtn.removeEventListener("click", playAudio);
    aBtn.addEventListener("click", stopAudio);
    aIcon.className = "icon music";

    //Disable background playing - addEventListener
    document.addEventListener("visibilitychange", playOnHold);
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    aBtn.removeEventListener("click", stopAudio);
    aBtn.addEventListener("click", playAudio);
    aIcon.className = "icon mute";

    //Disable background playing - removeEventListener
    document.removeEventListener("visibilitychange", playOnHold);
  }
};
