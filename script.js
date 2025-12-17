const buttonsContainer = document.getElementById("buttons");

const sounds = [
  { key: "s1", label: "Apple Pay", src: "./sounds/apple-pay.mp3" },
  { key: "s2", label: "Test 2", src: "./sounds/apple-pay.mp3" },
  { key: "s3", label: "Test 3", src: "./sounds/apple-pay.mp3" },
  { key: "s4", label: "Test 4", src: "./sounds/apple-pay.mp3" },
  { key: "s5", label: "Test 5", src: "./sounds/apple-pay.mp3" },
  { key: "s6", label: "Test 6", src: "./sounds/apple-pay.mp3" },
  { key: "s7", label: "Test 7", src: "./sounds/apple-pay.mp3" },
  { key: "s8", label: "Test 8", src: "./sounds/apple-pay.mp3" },
];

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.className = "sound-btn";
  btn.type = "button";
  btn.innerHTML = `<div class="sound-btn__title">${sound.label}</div>`;

  let playingCount = 0;

  btn.addEventListener("click", async () => {
    const audio = new Audio(sound.src);

    playingCount += 1;
    btn.classList.add("is-playing");
    btn.classList.add("pulse");

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (e) {
      playingCount = Math.max(0, playingCount - 1);
      if (playingCount === 0) {
        btn.classList.remove("is-playing", "pulse");
      }
      console.error(`Impossible de jouer ${sound.src}`, e);
      return;
    }

    const cleanup = () => {
      playingCount = Math.max(0, playingCount - 1);
      if (playingCount === 0) {
        btn.classList.remove("is-playing", "pulse");
      }
      audio.removeEventListener("ended", cleanup);
      audio.removeEventListener("pause", cleanup);
    };

    audio.addEventListener("ended", cleanup);
    audio.addEventListener("pause", cleanup);
  });

  buttonsContainer.appendChild(btn);
});
