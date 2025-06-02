const dragon = document.getElementById("dragon");
const fire = document.getElementById("fire");
const clickSound = document.getElementById("clickSound");

let lastX = null;
let lastY = null;
let facingRight = true;
let idleTimeout = null;

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  dragon.style.left = `${x - 40}px`;
  dragon.style.top = `${y - 40}px`;

  if (lastX !== null) {
    if (x > lastX && !facingRight) {
      facingRight = true;
      dragon.style.transform = "scaleX(1)";
    } else if (x < lastX && facingRight) {
      facingRight = false;
      dragon.style.transform = "scaleX(-1)";
    }
  }

  lastX = x;
  lastY = y;

  clearTimeout(idleTimeout);
  dragon.classList.remove("idle");
  idleTimeout = setTimeout(() => {
    dragon.classList.add("idle");
  }, 4000);
});

document.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  // Fire breath position (mouth)
  const mouthX = lastX + (facingRight ? 40 : -70);
  const mouthY = lastY - 15;

  fire.style.left = `${mouthX}px`;
  fire.style.top = `${mouthY}px`;
  fire.style.opacity = "1";

  setTimeout(() => {
    fire.style.opacity = "0";
  }, 500);
});

idleTimeout = setTimeout(() => {
  dragon.classList.add("idle");
}, 4000);
