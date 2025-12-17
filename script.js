const buttonsContainer = document.getElementById("buttons");

async function loadSounds() {
  const response = await fetch("./sounds.json");
  const sounds = await response.json();

  sounds.forEach((sound) => {
    const btn = document.createElement("button");
    btn.className = "sound-btn";
    btn.type = "button";

    btn.innerHTML = `
      <img
        src="${sound.image}"
        class="sound-btn__icon ${sound.imageClass || ""}"
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
}

loadSounds();
