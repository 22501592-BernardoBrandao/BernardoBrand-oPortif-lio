const THEME_STORAGE_KEY = "bernardo-portfolio-theme";

const root = document.documentElement;
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /*
      O tema continua funcionando mesmo se o navegador
      bloquear o armazenamento local.
    */
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";

  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = themeToggle?.querySelector(".theme-toggle-label");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  root.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Ativar modo claro" : "Ativar modo escuro"
    );
  }

  if (themeLabel) {
    themeLabel.textContent = isDark ? "Modo claro" : "Modo escuro";
  }

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      isDark ? "#050505" : "#0D0D0D"
    );
  }
}

/* Define o tema inicial */

const savedTheme = getSavedTheme();

const initialTheme =
  savedTheme || (systemTheme.matches ? "dark" : "light");

applyTheme(initialTheme);

/* Botão de modo claro e escuro */

const themeToggle = document.getElementById("theme-toggle");

themeToggle?.addEventListener("click", () => {
  const currentTheme = root.dataset.theme;

  const nextTheme =
    currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  saveTheme(nextTheme);
});

/* Atualiza o tema quando o sistema mudar */

systemTheme.addEventListener("change", (event) => {
  const hasSavedTheme = getSavedTheme();

  if (!hasSavedTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

/* Reduz a opacidade da navegação ao rolar */

const navbar = document.getElementById("navbar");

window.addEventListener(
  "scroll",
  () => {
    if (!navbar) {
      return;
    }

    navbar.style.opacity =
      window.scrollY > 60 ? "0.85" : "1";
  },
  {
    passive: true
  }
);

/* Animações das seções */

const animatedSections =
  document.querySelectorAll(".fade-section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  animatedSections.forEach((section) => {
    observer.observe(section);
  });
} else {
  animatedSections.forEach((section) => {
    section.classList.add("visible");
  });
}