document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

const prefersFlashlight = window.matchMedia("(min-width: 851px) and (pointer: fine)").matches;

if (prefersFlashlight) {
  let latestX = window.innerWidth / 2;
  let latestY = window.innerHeight / 3;
  let animationFrameId = null;

  const updateFlashlight = () => {
    document.body.style.setProperty("--flashlight-x", `${latestX}px`);
    document.body.style.setProperty("--flashlight-y", `${latestY}px`);
    animationFrameId = null;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      latestX = event.clientX;
      latestY = event.clientY;

      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(updateFlashlight);
      }
    },
    { passive: true }
  );
}

const localTimeEl = document.getElementById("local-time");
if (localTimeEl) {
  const updateLocalTime = () => {
    const time = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Stockholm",
    }).format(new Date());
    localTimeEl.textContent = time;
  };
  updateLocalTime();
  setInterval(updateLocalTime, 30 * 1000);
}

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.28, rootMargin: "0px 0px -10% 0px" }
);
revealElements.forEach((el) => observer.observe(el));
