const languageButtons = document.querySelectorAll("[data-language]");
const translatedElements = document.querySelectorAll("[data-en][data-zh]");
const contentBlocks = document.querySelectorAll("[data-content-language]");
const cvLink = document.querySelector(".cv-link");

function setLanguage(language) {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  translatedElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });

  contentBlocks.forEach((block) => {
    block.hidden = block.dataset.contentLanguage !== language;
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  cvLink.href =
    language === "zh"
      ? "assets/Hongjing-Zhu-CV-ZH.pdf"
      : "assets/Hongjing-Zhu-CV-EN.pdf";
  cvLink.textContent = language === "zh" ? "简历" : "CV";
  localStorage.setItem("language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

setLanguage(localStorage.getItem("language") === "en" ? "en" : "zh");

const sections = document.querySelectorAll("main section");
const navigationLinks = document.querySelectorAll(".topbar nav a");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  sections.forEach((section) => section.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  sections.forEach((section) => revealObserver.observe(section));
}

const navigationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-25% 0px -65% 0px" },
);

sections.forEach((section) => navigationObserver.observe(section));
