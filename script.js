const buttonsContainer = document.getElementById("buttons");

const sounds = [
  { key: "applePay1", label: "Apple Pay", src: "./sounds/apple-pay.mp3" },
  { key: "applePay2", label: "Test 2", src: "./sounds/apple-pay.mp3" },
  { key: "applePay3", label: "Test 3", src: "./sounds/apple-pay.mp3" },
  { key: "applePay4", label: "Test 4", src: "./sounds/apple-pay.mp3" },
];

// Haptique (best effort). iOS peut l’ignorer, mais aucun souci si c’est bloqué.
function hapticTap(strength = "light") {
  try {
    if (!("vibrate" in navigator)) return;
    const pattern = strength === "light" ? 10 : strength === "medium" ? 20 : 30;
    navigator.vibrate(pattern);
  } catch (_) {}
}

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.className = "sound-btn";
  btn.type = "button";

  btn.innerHTML = `
    <div class="sound-btn__title">${sound.label}</div>
    <div class="sound-btn__subtitle">Tap</div>
  `;

  let playingCount = 0;

  btn.addEventListener("click", async () => {
    hapticTap("light");

    const audio = new Audio(sound.src);

    playingCount += 1;
    btn.classList.add("is-playing");
    btn.classList.add("pulse");

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (e) {
      playingCount = Math.max(0, playingCount - 1);
      if (playingCount === 0) btn.classList.remove("is-playing");
      btn.classList.remove("pulse");
      console.error(`Impossible de jouer ${sound.src}`, e);
      return;
    }

    const cleanup = () => {
      playingCount = Math.max(0, playingCount - 1);
      if (playingCount === 0) btn.classList.remove("is-playing");
      if (playingCount === 0) btn.classList.remove("pulse");
      audio.removeEventListener("ended", cleanup);
      audio.removeEventListener("pause", cleanup);
    };

    audio.addEventListener("ended", cleanup);
    audio.addEventListener("pause", cleanup);
  });

  buttonsContainer.appendChild(btn);
});
