const buttonsContainer = document.getElementById("buttons");

const sounds = [
  {
    key: "m1",
    label: "I Like To Move It",
    src: "./sounds/apple-pay.mp3",
    img: "./assets/image-removebg-preview.png",
  },
  {
    key: "m2",
    label: "Move It!",
    src: "./sounds/apple-pay.mp3",
    img: "./assets/image-removebg-preview (1).png",
  },
  {
    key: "m3",
    label: "Yeah!",
    src: "./sounds/apple-pay.mp3",
    img: "./assets/image-removebg-preview (2).png",
  },
  {
    key: "m4",
    label: "King Julien!",
    src: "./sounds/apple-pay.mp3",
    img: "./assets/image-removebg-preview (3).png",
  },
  {
    key: "m5",
    label: "Show Me Some Love",
    src: "./sounds/apple-pay.mp3",
    img: "./assets/image-removebg-preview (4).png",
  },
  {
    key: "m6",
    label: "Everybody Dance",
    src: "./sounds/apple-pay.mp3",
    img: "./assets/image-removebg-preview.png",
  },
  {
    key: "m7",
    label: "This Is How We Do",
    src: "./sounds/apple-pay.mp3",
    img: "./assets/image-removebg-preview (1).png",
  },
  {
    key: "m8",
    label: "Dance Dance",
    src: "./sounds/apple-pay.mp3",
    img: "./assets/image-removebg-preview (2).png",
  },
];

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.className = "sound-btn";
  btn.type = "button";

  btn.innerHTML = `
    <img
      src="${sound.img}"
      class="sound-btn__icon"
      alt=""
      aria-hidden="true"
    />
    <div class="sound-btn__title">${sound.label}</div>
  `;

  let playingCount = 0;

  btn.addEventListener("click", async () => {
    const audio = new Audio(sound.src);

    playingCount += 1;
    btn.classList.add("is-playing");

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch {
      playingCount = Math.max(0, playingCount - 1);
      if (playingCount === 0) btn.classList.remove("is-playing");
      return;
    }

    const cleanup = () => {
      playingCount = Math.max(0, playingCount - 1);
      if (playingCount === 0) btn.classList.remove("is-playing");
      audio.removeEventListener("ended", cleanup);
      audio.removeEventListener("pause", cleanup);
    };

    audio.addEventListener("ended", cleanup);
    audio.addEventListener("pause", cleanup);
  });

  buttonsContainer.appendChild(btn);
});
