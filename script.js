const buttonsContainer = document.getElementById("buttons");

const sounds = [
  {
    label: "I Like To Move It",
    audio: "./sounds/apple-pay.mp3",
    image: "./assets/m1.png",
  },
  {
    label: "Move It!",
    audio: "./sounds/apple-pay.mp3",
    image: "./assets/m2.png",
  },
  {
    label: "Yeah!",
    audio: "./sounds/apple-pay.mp3",
    image: "./assets/m3.png",
  },
  {
    label: "King Julien!",
    audio: "./sounds/apple-pay.mp3",
    image: "./assets/m4.png",
  },
  {
    label: "Show Me Some Love",
    audio: "./sounds/apple-pay.mp3",
    image: "./assets/m5.png",
  },
  {
    label: "Everybody Dance",
    audio: "./sounds/apple-pay.mp3",
    image: "./assets/m7.png",
  },
  {
    label: "This Is How We Do",
    audio: "./sounds/apple-pay.mp3",
    image: "./assets/m8.png",
  },
  {
    label: "Encore!",
    audio: "./sounds/apple-pay.mp3",
    image: "./assets/m9.png",
  },
];

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.className = "sound-btn";
  btn.type = "button";

  btn.innerHTML = `
    <img
      src="${sound.image}"
      class="sound-btn__icon"
      alt=""
      aria-hidden="true"
    />
    <div class="sound-btn__title">${sound.label}</div>
  `;

  let playingCount = 0;

  btn.addEventListener("click", async () => {
    const audio = new Audio(sound.audio);

    playingCount += 1;
    btn.classList.add("is-playing");

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (err) {
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
