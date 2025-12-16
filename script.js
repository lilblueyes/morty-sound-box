const sounds = ["applause", "boo", "gasp"];
const buttonsContainer = document.getElementById("buttons");

const stopSounds = () => {
  // Stop tous les sons
  sounds.forEach((sound) => {
    const audio = document.getElementById(sound);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  });

  // Retire l'état "playing" de tous les boutons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("playing");
  });
};

sounds.forEach((sound) => {
  const audio = document.getElementById(sound);
  if (!audio) return;

  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.innerText = sound; // tu peux renommer en français si tu veux

  btn.addEventListener("click", () => {
    const isAlreadyPlaying =
      !audio.paused && !audio.ended && audio.currentTime > 0;

    // On stoppe tout
    stopSounds();

    // Si on reclique sur le bouton déjà en lecture, on arrête juste
    if (!isAlreadyPlaying) {
      audio.play();
      btn.classList.add("playing");
    }
  });

  // Quand le son se termine, on enlève l'état playing
  audio.addEventListener("ended", () => {
    btn.classList.remove("playing");
  });

  buttonsContainer.appendChild(btn);
});
