document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const mobileViewport = window.matchMedia("(max-width: 680px)");

function closeMenu(returnFocus = false) {
  if (!menuButton || !primaryNav || !mobileViewport.matches) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  primaryNav.hidden = true;
  if (returnFocus) menuButton.focus();
}

if (menuButton && primaryNav) {
  if (mobileViewport.matches) primaryNav.hidden = true;

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
    primaryNav.hidden = isExpanded;
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  mobileViewport.addEventListener("change", (event) => {
    if (event.matches) {
      closeMenu();
    } else {
      primaryNav.hidden = false;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    }
  });
}

const sensorDescriptions = {
  rs485: { title: "RS‑485", copy: "Integramos equipos y sensores compatibles con RS‑485; se valida cada modelo y la información requerida." },
  ma: { title: "4–20 mA", copy: "Recibimos señales industriales de 4–20 mA; la compatibilidad depende del transmisor, el rango y el proceso." },
  pt100: { title: "Temperatura · Pt100", copy: "Integramos sensores industriales Pt100 para medir temperatura; validamos la interfaz y el rango según el proceso." },
  termocupla: { title: "Termocuplas", copy: "Recibimos mediciones de termocuplas para procesos industriales; el tipo de sensor se confirma para cada aplicación." },
  ph: { title: "pH", copy: "Recibimos señales de sensores compatibles; se valida el tipo de salida y la interfaz necesaria para cada aplicación." },
  nivel: { title: "Nivel", copy: "La medición de nivel puede integrarse con sensores compatibles por RS‑485 o mediante la señal adecuada al proceso." },
  presion: { title: "Presión", copy: "Podemos integrar transmisores de presión con salida de 4–20 mA, sujeto a validar el rango y la instalación." },
};
const sensorButtons = document.querySelectorAll(".sensor-choice");
const sensorTitle = document.querySelector("#sensor-title");
const sensorCopy = document.querySelector("#sensor-copy");
const sensorReadout = document.querySelector(".sensor-readout");

sensorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sensor = sensorDescriptions[button.dataset.sensor];
    if (!sensor || !sensorTitle || !sensorCopy) return;

    sensorButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    sensorTitle.textContent = sensor.title;
    sensorCopy.textContent = sensor.copy;

    if (sensorReadout) {
      sensorReadout.classList.remove("is-changing");
      requestAnimationFrame(() => sensorReadout.classList.add("is-changing"));
    }
  });
});

const stageDescriptions = {
  control: "Lee señales y acciona contactores para motores, bombas, válvulas y compuertas, según la etapa de potencia requerida.",
  registro: "Guarda información del proceso localmente para su consulta y seguimiento.",
  nube: "Conecta interfaces web o móviles para consultar datos localmente por Wi‑Fi o en línea."
};
const processNote = document.querySelector("#process-note");
const processStages = document.querySelectorAll(".process-stage");

processStages.forEach((stage) => {
  stage.addEventListener("click", () => {
    const selectedStage = stage.dataset.stage;
    if (!selectedStage || !stageDescriptions[selectedStage] || !processNote) return;

    processStages.forEach((item) => {
      const isSelected = item === stage;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    processNote.textContent = stageDescriptions[selectedStage];
  });
});

const demoForm = document.querySelector("#demo-form");
const whatsappMessage = document.querySelector("#whatsapp-message");

if (demoForm instanceof HTMLFormElement && whatsappMessage instanceof HTMLInputElement) {
  demoForm.addEventListener("submit", () => {
    const formData = new FormData(demoForm);
    const interest = String(formData.get("interest") ?? "").trim();
    const message = [
      "Hola, quiero solicitar una demostración de la solución de automatización industrial ZENIT.",
      `Me interesa: ${interest}`
    ].filter(Boolean).join("\n");

    whatsappMessage.value = message;
  });
}

const whatsappToggle = document.querySelector("#whatsapp-toggle");
const whatsappPanel = document.querySelector("#whatsapp-panel");
const whatsappClose = document.querySelector("#whatsapp-close");
const whatsappWidget = document.querySelector(".whatsapp-widget");

function setWhatsappPanelOpen(isOpen) {
  if (!whatsappToggle || !whatsappPanel) return;

  const shouldReturnFocus = !isOpen && whatsappPanel.contains(document.activeElement);
  whatsappToggle.setAttribute("aria-expanded", String(isOpen));
  whatsappPanel.hidden = !isOpen;

  if (isOpen) {
    whatsappClose?.focus();
  } else if (shouldReturnFocus) {
    whatsappToggle.focus();
  }
}

if (whatsappToggle && whatsappPanel) {
  whatsappToggle.addEventListener("click", () => {
    const isOpen = whatsappToggle.getAttribute("aria-expanded") === "true";
    setWhatsappPanelOpen(!isOpen);
  });

  whatsappClose?.addEventListener("click", () => setWhatsappPanelOpen(false));

  document.addEventListener("pointerdown", (event) => {
    if (whatsappWidget && !whatsappWidget.contains(event.target)) {
      setWhatsappPanelOpen(false);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMenu(true);
  setWhatsappPanelOpen(false);
});

const splash = document.querySelector("#splash");

if (splash) {
  splash.hidden = false;
  requestAnimationFrame(() => splash.classList.add("is-visible"));

  const splashDuration = prefersReducedMotion ? 120 : 1500;
  window.setTimeout(() => {
    splash.classList.remove("is-visible");
    splash.classList.add("is-leaving");
    window.setTimeout(() => {
      splash.hidden = true;
    }, prefersReducedMotion ? 0 : 420);
  }, splashDuration);
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll("[data-reveal]");
const motionSections = document.querySelectorAll(".sensor-section, #interfaces");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  document.body.classList.add("motion-ready");

  const motionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });

  revealElements.forEach((element) => motionObserver.observe(element));
  motionSections.forEach((section) => motionObserver.observe(section));
}
