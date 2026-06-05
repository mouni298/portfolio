const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

(function initReveal() {
  const revealEls = document.querySelectorAll("[data-reveal], .section-reveal");
  const staggerEls = document.querySelectorAll("[data-reveal-stagger]");

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    [...revealEls, ...staggerEls].forEach((el) => el.classList.add("is-visible"));
    return;
  }

  document.documentElement.classList.add("reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -25% 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
  staggerEls.forEach((el) => observer.observe(el));
})();

(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  if (!("IntersectionObserver" in window)) {
    const updateActiveLink = () => {
      let currentId = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 160) {
          currentId = section.id;
        }
      });
      setActiveLink(currentId);
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("resize", updateActiveLink);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();

(function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();

(function initCursorGlow() {
  const cursorGlow = document.querySelector(".cursor-glow");
  if (!cursorGlow || prefersReducedMotion.matches) return;

  window.addEventListener(
    "pointermove",
    (event) => {
      document.body.classList.add("has-cursor");
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX - 130}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY - 130}px`);
    },
    { passive: true }
  );

  window.addEventListener("pointerleave", () => {
    document.body.classList.remove("has-cursor");
  });
})();

(function initFlowField() {
  const canvas = document.getElementById("flow-field");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(16, Math.floor(width / 58));
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8,
      speed: 0.12 + Math.random() * 0.22,
      phase: index * 0.42,
      size: 1 + Math.random() * 1.4,
    }));
  }

  function drawFlow(time = 0) {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    particles.forEach((particle, index) => {
      particle.x += particle.speed;
      particle.y += Math.sin(time * 0.001 + particle.phase) * 0.06;

      if (particle.x > width + 20) {
        particle.x = -20;
        particle.y = Math.random() * height * 0.7;
      }

      const next = particles[index + 1];
      if (next) {
        const distance = Math.hypot(next.x - particle.x, next.y - particle.y);
        if (distance < 155) {
          ctx.strokeStyle = `rgba(102, 214, 165, ${0.08 - distance / 2400})`;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(102, 214, 165, 0.28)";
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });

    if (!prefersReducedMotion.matches) {
      requestAnimationFrame(drawFlow);
    }
  }

  resizeCanvas();
  drawFlow();
  window.addEventListener("resize", resizeCanvas);
})();
