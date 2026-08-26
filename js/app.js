"use strict";

document.documentElement.dataset.jsReady = "true";

const diagnosticForm = document.querySelector("#rewireDiagnostic");
const diagnosticResult = document.querySelector("#diagnosticResult");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const resultScore = document.querySelector("#resultScore");
const diagnosticStatus = document.querySelector("#diagnosticStatus");
const applicationForm = document.querySelector("#applicationForm");
const applicationStatus = document.querySelector("#applicationStatus");
const WHATSAPP_NUMBER = "212662334479";
let latestDiagnostic = null;

function trackEvent(eventName, details = {}) {
  const eventData = { event: eventName, page: "landing_rewire_90", ...details };
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, { page_name: eventData.page, ...details });
  } else {
    window.dataLayer.push(eventData);
  }
  document.dispatchEvent(new CustomEvent("rewire:conversion", { detail: eventData }));
}

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => trackEvent(element.dataset.track));
});

function interpretationFor(score) {
  if (score <= 4) {
    return {
      title: "Des bases déjà présentes",
      text: "Vos réponses indiquent peu de freins récurrents. Identifiez une habitude utile et choisissez une preuve simple pour continuer à l’installer."
    };
  }

  if (score <= 9) {
    return {
      title: "Des schémas à observer",
      text: "Certaines situations semblent freiner votre passage à l’action. Commencez par repérer un déclencheur récurrent et l’action concrète que vous souhaitez lui substituer."
    };
  }

  return {
    title: "Un besoin de démarche structurée",
    text: "Vos réponses font apparaître plusieurs freins récurrents. Une progression étape par étape — observer, interrompre, construire puis répéter — peut vous aider à transformer une intention en comportement observable."
  };
}

function showDiagnosticResult(event) {
  event.preventDefault();
  if (!diagnosticForm || !diagnosticResult || !resultTitle || !resultText || !resultScore || !diagnosticStatus) return;

  if (!diagnosticForm.reportValidity()) {
    diagnosticStatus.textContent = "Répondez aux quatre questions pour afficher votre orientation.";
    return;
  }

  const answers = new FormData(diagnosticForm);
  const score = [...answers.values()].reduce((total, value) => total + Number(value), 0);
  const interpretation = interpretationFor(score);
  latestDiagnostic = { score, title: interpretation.title };

  resultTitle.textContent = interpretation.title;
  resultScore.textContent = `Score indicatif : ${score} / 16`;
  resultText.textContent = interpretation.text;
  diagnosticStatus.textContent = "Votre orientation est prête.";
  diagnosticResult.hidden = false;
  diagnosticResult.focus();
  trackEvent("diagnostic_complete", { score, orientation: interpretation.title });
}

if (diagnosticForm) {
  diagnosticForm.addEventListener("submit", showDiagnosticResult);
}

function submitApplication(event) {
  event.preventDefault();
  if (!applicationForm || !applicationStatus) return;

  if (!applicationForm.reportValidity()) {
    applicationStatus.textContent = "Complétez les trois champs et confirmez votre accord.";
    return;
  }

  const data = new FormData(applicationForm);
  const message = [
    "Bonjour, je souhaite demander à rejoindre REWIRE 90.",
    "",
    `Prénom : ${String(data.get("firstName") || "").trim()}`,
    `Numéro WhatsApp : ${String(data.get("phone") || "").trim()}`,
    `Difficulté principale : ${String(data.get("changeGoal") || "").trim()}`,
    latestDiagnostic ? `Orientation du mini-diagnostic : ${latestDiagnostic.title} (${latestDiagnostic.score}/16)` : "Mini-diagnostic : non réalisé",
    "",
    "Je souhaite échanger pour vérifier si le programme correspond à ma situation.",
    "J’ai pris connaissance de l’offre de lancement à 6 000 DH au lieu de 7 500 DH, valable pour une inscription confirmée avant le 10 septembre 2026, dans la limite des places disponibles."
  ].join("\n");

  applicationStatus.textContent = "WhatsApp va s’ouvrir. Confirmez l’envoi du message pour transmettre votre demande.";
  trackEvent("application_whatsapp_open", { diagnostic_completed: Boolean(latestDiagnostic) });
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

if (applicationForm) {
  applicationForm.addEventListener("submit", submitApplication);
}

const methodsList = document.querySelector("#methodsList");
const methodsStatus = document.querySelector("#methodsStatus");

function setMethodsStatus(message, state) {
  if (!methodsStatus || !methodsList) return;
  methodsStatus.textContent = message;
  methodsStatus.className = `data-status is-${state}`;
  methodsList.setAttribute("aria-busy", String(state === "loading"));
}

function createMethodCard(method) {
  const article = document.createElement("article");
  const number = document.createElement("b");
  const title = document.createElement("h3");
  const description = document.createElement("p");

  article.dataset.methodId = method.id;
  number.textContent = method.number;
  title.textContent = method.title;
  description.textContent = method.description;
  article.append(number, title, description);
  return article;
}

function isValidMethod(method) {
  return method
    && typeof method.id === "string"
    && typeof method.number === "string"
    && typeof method.title === "string"
    && typeof method.description === "string";
}

function renderMethods(methods) {
  if (!methodsList) return;
  methodsList.replaceChildren();

  if (methods.length === 0) {
    setMethodsStatus("Aucun contenu n’est disponible pour le moment.", "empty");
    return;
  }

  const fragment = document.createDocumentFragment();
  methods.forEach((method) => fragment.append(createMethodCard(method)));
  methodsList.append(fragment);
  setMethodsStatus(`${methods.length} mouvements chargés avec succès.`, "success");
}

async function loadMethods() {
  if (!methodsList || !methodsStatus) return;
  setMethodsStatus("Chargement du contenu…", "loading");

  const testState = new URLSearchParams(window.location.search).get("data-state");
  if (testState === "loading") return;

  const dataPath = testState === "error" ? "./data/fichier-absent.json" : "./data/data.json";

  try {
    const response = await fetch(dataPath);
    if (!response.ok) throw new Error(`Réponse HTTP ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data.methods)) throw new TypeError("La collection methods doit être un tableau.");

    const methods = testState === "empty" ? [] : data.methods;
    if (!methods.every(isValidMethod)) throw new TypeError("Une méthode contient des champs absents ou invalides.");
    renderMethods(methods);
  } catch (error) {
    methodsList.replaceChildren();
    setMethodsStatus("Le contenu n’a pas pu être chargé. Le reste de la page demeure disponible.", "error");
    console.error("Échec du chargement des méthodes REWIRE :", error.message);
  }
}

loadMethods();

const pwaStatus = document.querySelector("#pwaStatus");

function showPwaStatus(message) {
  if (!pwaStatus) return;
  pwaStatus.textContent = message;
  pwaStatus.hidden = false;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    showPwaStatus("Préparation des ressources hors connexion…");

    try {
      await navigator.serviceWorker.register("./service-worker.js", { scope: "./" });
      await navigator.serviceWorker.ready;
      showPwaStatus("Ressources hors connexion préparées sur cet appareil.");
    } catch (error) {
      showPwaStatus("Le mode hors connexion n’est pas disponible pour le moment.");
      console.error("Échec de l’enregistrement du service worker :", error.message);
    }
  });
}
